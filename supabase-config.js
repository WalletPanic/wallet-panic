const SUPABASE_URL = "https://jyrjrpbwdtlmgsakijdu.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable__rwO4Dv6dnZ4DCwAEgRKhg_AE9rnCI7";

window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
