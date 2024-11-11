import dbConnect from "@/util/DB/dbConnect";

import User from "@/models/user.model";

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find();
    if (!users)
      return Response.json({ message: "No users found" }, { status: 200 });
    return Response.json(
      { message: "Succfully fetched users", users },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Response.json({ message: "Error fetching users" }, { status: 500 });
  }
}
