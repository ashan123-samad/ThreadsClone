import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ?? "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

const PLACEHOLDER_URL = "https://your-project-id.supabase.co";
const PLACEHOLDER_KEY = "your-supabase-anon-key";

export const isSupabaseConfigured =
  supabaseUrl.length > 0 &&
  supabaseAnonKey.length > 0 &&
  supabaseUrl !== PLACEHOLDER_URL &&
  supabaseAnonKey !== PLACEHOLDER_KEY;

function createSupabaseClient(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase is not configured. Copy .env.example to .env and set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY from Supabase Dashboard → Project Settings → API, then restart Expo with npm run start:clear."
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: Platform.OS === "web",
    },
  });
}

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!client) {
    client = createSupabaseClient();
  }
  return client;
}

/** @deprecated Prefer getSupabase() so missing env fails at use-time, not import-time. */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getSupabase(), prop, receiver);
  },
});

AppState.addEventListener("change", (state) => {
  if (!isSupabaseConfigured) {
    return;
  }

  if (state === "active") {
    getSupabase().auth.startAutoRefresh();
  } else {
    getSupabase().auth.stopAutoRefresh();
  }
});
