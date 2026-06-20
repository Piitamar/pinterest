import { supabase } from "../../services/supabaseClient";

//Lấy thông tin user
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

//thêm bảng mới 
export const createBoard = async(boardName) => {
    const user = await getUser();

    const boardToInsert = {
        name : boardName,
        profile_id: user.id
    }
    console.log(boardToInsert);
    const {data, error} = await supabase
        .from('boards')
        .insert([boardToInsert])
    if (error) throw error;
    return data;
}

export const fetchMyBoards = async () => {
    const user = await getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase
        .from("boards")
        .select("*")
        .eq("profile_id", user.id)
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
}

export const fetchMyProfile = async () => {
    const user = await getUser();

    if (!user) {
        return null;
    }

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) throw error;

    return data;
}

export const fetchLatestPinsForBoardPreview = async (board_id, limitCount = 3, ascending = false) => {
    const user = await getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase
        .from("savedpins")
        .select(`
            pin_id,
            pins (*) 
        `) // Lấy dữ liệu từ bảng pins thông qua quan hệ khóa ngoại
        .eq("profile_id", user.id)
        .eq("board_id", board_id)
        .order("created_at", { ascending })
        .limit(limitCount);

    if (error) throw error;
    return data.map((item) => item.pins);
}
//Hàm lấy pin để để vào bảng
export const fetchPinsForBoard = async (board_id) => {
    const user = await getUser();

    if (!user) {
        return [];
    }

    const { data, error } = await supabase
        .from("savedpins")
        .select(`
            pin_id,
            pins (*) 
        `) // Lấy dữ liệu từ bảng pins thông qua quan hệ khóa ngoại
        .eq("profile_id", user.id)
        .eq("board_id", board_id)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data.map((item) => item.pins);
}

//Hàm thêm pin ngoài vào bảng
export const addPinToBoard = async ({ src, width, height }) => 
    {
    const { data, error } = await supabase
        .from("pins")
        .insert({ src: src,
                width: width,
                height: height })
        .select()
        .single();
    if (error) throw error;
    return data;    
    }
