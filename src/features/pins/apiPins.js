import { supabase } from "../../services/supabaseClient.js";

export const getUser = async() => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    
    if (userError) throw userError;

    if (!user) {
      console.error("Chua co nguoi dung dang nhap.");
      return null;
    }
    return user
}

//LAY PINS
export const fetchPins = async () => {
  const { data, error } = await supabase
    .from("pins")
    .select("*")
    .order("created_at", { ascending: false })
    
  if (error) throw error;
  return data;
};

//LAY PIN THEO ID
export const fetchPinById = async (pinId) => {
  const { data, error } = await supabase
    .from("pins")
    .select("*")
    .eq("id", pinId)
    .single();

  if (error) throw error;
  return data;
};

//TAO PIN MOI
export const addNewPin = async (pinData) => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;

    if (!user) {
      console.error("Chua co nguoi dung dang nhap.");
      return null;
    }

    const pinToInsert = {
      ...pinData,
      profile_id: user.id,
    };
    console.log(pinToInsert);
    const { error } = await supabase.from("pins").insert([pinToInsert]);

    if (error) throw error;

    console.log("Dang pin thanh cong:", pinToInsert);
    return pinToInsert;
  } catch (error) {
    console.error("Loi khi dang pin:", error.message);
    return null;
  }
};

//SAVE PIN
export const savePin = async ({ pin_id, board_id }) => {
    const user = await getUser();

    if (!user) {
        return null;
    }

    const { data: existingPins, error: existingError } = await supabase
        .from("savedpins")
        .select("id")
        .eq("pin_id", pin_id)
        .eq("board_id", board_id)
        .eq("profile_id", user.id)
        .limit(1);

    if (existingError) throw existingError;

    if (existingPins?.length > 0) {
        return existingPins[0];
    }

    const pinToInsert = {
        pin_id: pin_id,
        board_id: board_id,
        profile_id: user.id,
    };

    const { data, error } = await supabase
        .from("savedpins")
        .insert([pinToInsert])
        .select()
        .single();

    if (error) throw error;

    return data;
}

//Vut anh vao supabase roi nhe anh ra
export const imageProcessing = async (fileName, file) => {
  const { error: uploadError } = await supabase.storage
    .from("images")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: linkData } = await supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  const publicImageUrl = linkData.publicUrl;
  return publicImageUrl;
};

//Lấy user theo pin
export const getUserByPin = async (pinId) => {
  const { data: pinData, error: pinError } = await supabase
    .from("pins")
    .select('profile_id')
    .eq("id", pinId)
    .single();
  
  if (pinError) throw pinError;

  const { data: userData, error: userError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", pinData.profile_id)
    .single();
    
  if (userError) throw userError;

  return userData;
}
