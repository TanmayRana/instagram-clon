// import User from "@/models/user.model";
// import dbConnect from "@/util/DB/dbConnect";

// export interface ClerkUser {
//   id: string;
//   first_name: string;
//   last_name: string;
//   image_url: string;
//   email_addresses: { email: string }[];
//   username?: string;
// }

// export const createOrUpdateUser = async (data: ClerkUser) => {
//   try {
//     await dbConnect();

//     console.log("user.ts=", data);

//     const { id, first_name, last_name, image_url, email_addresses, username } =
//       data;

//     const email = email_addresses.length > 0 ? email_addresses[0].email : "";
//     console.log("createOrUpdateUser email=", email);

//     const user = await User.findOneAndUpdate(
//       { clerkId: id },
//       {
//         clerkId: id,
//         email: email,
//         firstName: first_name,
//         lastName: last_name,
//         username,
//         avatar: image_url,
//       },
//       { new: true, upsert: true }
//     );
//     console.log("createOrUpdateUser user=", user);

//     return user;
//   } catch (error) {
//     console.error("Error creating or updating user:", error);
//     throw new Error("Failed to create or update user");
//   }
// };

// export const deleteUser = async (id: string): Promise<void> => {
//   try {
//     await dbConnect();

//     await User.findOneAndDelete({ clerkId: id });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//   }
// };

import User from "@/models/user.model";
import dbConnect from "@/util/DB/dbConnect";

export interface ClerkUser {
  id: string;
  first_name: string;
  last_name: string;
  image_url: string;
  email_addresses: { email_address: string }[];
  username?: string;
}

export const createOrUpdateUser = async (
  data: ClerkUser
): Promise<typeof User | null> => {
  try {
    await dbConnect();

    console.log("user.ts=", data);

    const { id, first_name, last_name, image_url, email_addresses, username } =
      data;

    // Extract primary email if it exists, otherwise default to an empty string
    const email =
      email_addresses.length > 0 ? email_addresses[0].email_address : "";
    console.log("createOrUpdateUser email=", email);

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        clerkId: id,
        email: email,
        firstName: first_name,
        lastName: last_name,
        username: username || "", // Default to empty string if username is undefined
        avatar: image_url,
      },
      { new: true, upsert: true }
    );
    console.log("createOrUpdateUser user=", user);

    return user;
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw new Error("Failed to create or update user");
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await dbConnect();

    const deletedUser = await User.findOneAndDelete({ clerkId: id });
    console.log("User deleted:", deletedUser);
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw new Error("Failed to delete user");
  }
};
