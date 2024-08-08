// "use server";

// import { createAdminClient } from "@/utils/supabase/admin";

// export async function getUsers() {
//   const supabase = createAdminClient();

//   const { data, error } = await supabase.auth.admin.listUsers();

//   if (error) throw new Error(error.message);

//   const devs = data.users.map(({ user_metadata: data }) => {
//     const { email, firstName, lastName, image, links, id } = data;
//     return { email, firstName, lastName, image, links, id };
//   });

//   console.log(devs);
// }
