import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export const getMembers = async (groupId: string) => {
  console.log({ groupId})
  const { data: allMembers, error } = await supabase
  .from("members")
  .select("name, selected_by")
  .eq("group_id", groupId);

  console.log({allMembers, error})

// if (error) {
//   console.error(error);
//   return;
// }

// const alreadyHasPerson = allMembers
//   .filter((member) => member.selected_by === null)
//   .map((m) => m.name);

// const members = allMembers
//   .map((m) => m.name)
//   .filter((name) => !alreadyHasPerson.includes(name));
const members = ["John", "Jane", "Joe", "Jill"];
return members
}