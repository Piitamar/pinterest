import { supabase } from "../../services/supabaseClient.js";

//DANG KI BANG SUPABASE
export const addNewUserSupabase = async (userData) => {
  const { data, error } = await supabase.auth.signUp({
    email: userData.email.trim(),
    password: userData.password,
  });

  console.log("signup:", data, error);

  if (error || !data?.user) {
    return null;
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    username: userData.name,
    email: userData.email,
  });

  if (profileError) {
    console.error("Loi khi them profile:", profileError.message);
    return null;
  }

  return data;
};

//DANG NHAP BANG SUPABASE
export const signInUser = async (userData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userData.email.trim(),
    password: userData.password,
  });

  if (error) {
    console.error("Loi dang nhap:", error.message);
    return null;
  }

  console.log("Dang nhap thanh cong:", data);
  alert('đăng nhập thành công')
  return data;
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Loi dang xuat:", error.message);
    return null;
  }

  console.log("Dang xuat thanh cong");
  localStorage.clear();
  alert('đăng xuất thành công')
  return true;
};