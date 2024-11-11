import User from "@/models/user.model";
import dbConnect from "@/util/DB/dbConnect";

export interface ClerkUser {
  id: string;
  first_name: string;
  last_name: string;
  image_url: string;
  email_addresses: { email: string }[];
  username?: string;
}

export const createOrUpdateUser = async (data: ClerkUser) => {
  try {
    await dbConnect();

    console.log("user.ts=", data);

    const { id, first_name, last_name, image_url, email_addresses, username } =
      data;

    const email = email_addresses.length > 0 ? email_addresses[0].email : "";

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        clerkId: id,
        email: email,
        firstName: first_name,
        lastName: last_name,
        username,
        avatar: image_url,
      },
      { new: true, upsert: true }
    );

    return user;
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw new Error("Failed to create or update user");
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await dbConnect();

    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
