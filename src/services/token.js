export default function getToken() {
    const { data: { session } } = await supabase.auth.getSession();
        return session
}