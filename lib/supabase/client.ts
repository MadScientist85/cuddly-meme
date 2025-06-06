import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/db_types"

export const createClient = () => createClientComponentClient<Database>()
