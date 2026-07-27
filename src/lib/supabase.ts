import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://doqcncnvseuhgbbgwubw.supabase.co";
const supabaseKey =
  "sb_publishable_YoFJ0kmp0a6P0XWfJEhqRg_BW53_-OY";

export const supabase = createClient(supabaseUrl, supabaseKey);