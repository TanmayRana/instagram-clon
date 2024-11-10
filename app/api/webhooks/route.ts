// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { WebhookEvent } from "@clerk/nextjs/server";
// import { ClerkUser, createOrUpdateUser } from "@/actions/user";

// export async function POST(req: Request) {
//   // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

//   if (!WEBHOOK_SECRET) {
//     throw new Error(
//       "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
//     );
//   }

//   // Get the headers
//   const headerPayload = await headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Error occured -- no svix headers", {
//       status: 400,
//     });
//   }

//   // Get the body
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   // Create a new Svix instance with your secret.
//   const wh = new Webhook(WEBHOOK_SECRET);

//   let evt: WebhookEvent;

//   // Verify the payload with the headers
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent;
//   } catch (err) {
//     console.error("Error verifying webhook:", err);
//     return new Response("Error occured", {
//       status: 400,
//     });
//   }

//   // Do something with the payload
//   // For this guide, you simply log the payload to the console
//   const { id } = evt.data;
//   const eventType = evt.type;
//   console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
//   console.log("Webhook body:", body);

//   if (eventType === "user.created" || eventType === "user.updated") {
//     console.log("evt Data=", evt.data);

//     const userData = evt.data as unknown as {
//       id: string;
//       first_name: string;
//       last_name: string;
//       image_url: string;
//       email_addresses: { email: string }[];
//       username: string;
//     };

//     const userProps: ClerkUser = {
//       id: userData.id,
//       first_name: evt.data.unsafe_metadata.first_name,
//       last_name: evt.data.unsafe_metadata.last_name,
//       image_url: userData.image_url,
//       email_addresses: userData.email_addresses,
//       username: userData.username,
//     };
//     console.log("userProps=", userProps);
//     try {
//       const newUser = await createOrUpdateUser(userProps);
//       console.log("newUser=", newUser);

//       return Response.json(
//         {
//           message: "User created or updated",
//           user: newUser,
//         },
//         { status: 200 }
//       );
//     } catch (error) {
//       console.error("Error creating or updating user:", error);
//       return Response.json(
//         { message: "Error creating or updating user" },
//         {
//           status: 500,
//         }
//       );
//     }
//   }

//   return new Response("", { status: 200 });
// }

// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { WebhookEvent } from "@clerk/nextjs/server";
// import { ClerkUser, createOrUpdateUser } from "@/actions/user";

// export async function POST(req: Request) {
//   // Retrieve the WEBHOOK_SECRET from environment variables
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
//   if (!WEBHOOK_SECRET) {
//     throw new Error(
//       "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
//     );
//   }

//   // Access headers directly (no need to await)
//   const headerPayload = headers();
//   const svix_id = (await headerPayload).get("svix-id");
//   const svix_timestamp = (await headerPayload).get("svix-timestamp");
//   const svix_signature = (await headerPayload).get("svix-signature");

//   // Check for required Svix headers
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Missing Svix headers", { status: 400 });
//   }

//   // Parse the request body
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   // Initialize Svix webhook instance
//   const wh = new Webhook(WEBHOOK_SECRET);
//   let evt: WebhookEvent;

//   // Verify the payload
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent;
//   } catch (err) {
//     console.error("Error verifying webhook:", err);
//     return new Response("Verification error", { status: 400 });
//   }

//   // Process event data
//   const eventType = evt.type;
//   console.log(
//     `Received webhook with ID: ${evt.data.id} and type: ${eventType}`
//   );

//   if (eventType === "user.created" || eventType === "user.updated") {
//     console.log("Event data:", evt.data);

//     const userData = evt.data as {
//       id: string;
//       first_name: string;
//       last_name: string;
//       image_url: string;
//       email_addresses: { email: string }[];
//       username: string;
//       unsafe_metadata?: {
//         first_name?: string;
//         last_name?: string;
//       };
//     };

//     const userProps: ClerkUser = {
//       id: userData.id,
//       first_name: userData.unsafe_metadata?.first_name || userData.first_name,
//       last_name: userData.unsafe_metadata?.last_name || userData.last_name,
//       image_url: userData.image_url,
//       email_addresses: userData.email_addresses,
//       username: userData.username,
//     };
//     console.log("User properties:", userProps);

//     try {
//       const newUser = await createOrUpdateUser(userProps);
//       console.log("User created or updated:", newUser);

//       return new Response(
//         JSON.stringify({
//           message: "User created or updated",
//           user: newUser,
//         }),
//         { status: 200, headers: { "Content-Type": "application/json" } }
//       );
//     } catch (error) {
//       console.error("Error creating or updating user:", error);
//       return new Response(
//         JSON.stringify({ message: "Error creating or updating user" }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
//     }
//   }

//   // Respond to non-user creation/update events
//   return new Response("", { status: 200 });
// }

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { ClerkUser, createOrUpdateUser } from "@/actions/user";

export async function POST(req: Request) {
  // Retrieve the WEBHOOK_SECRET from environment variables
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Access headers directly
  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  // Check for required Svix headers
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  // Parse the request body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Initialize Svix webhook instance
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  // Verify the payload
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Verification error", { status: 400 });
  }

  // Process event data
  const eventType = evt.type;
  console.log(
    `Received webhook with ID: ${evt.data.id} and type: ${eventType}`
  );

  if (eventType === "user.created" || eventType === "user.updated") {
    console.log("Event data:", evt.data);

    // Define userData type based on Clerk's WebhookEvent structure
    type UserData = {
      id: string;
      first_name?: string;
      last_name?: string;
      image_url?: string;
      email_addresses?: { email: string }[];
      username?: string;
      unsafe_metadata?: {
        firstName?: string;
        lastName?: string;
      };
    };

    const userData = evt.data as unknown as UserData;

    const userProps: ClerkUser = {
      id: userData.id,
      first_name:
        userData.unsafe_metadata?.firstName || userData.first_name || "",
      last_name: userData.unsafe_metadata?.lastName || userData.last_name || "",
      image_url: userData.image_url || "",
      email_addresses: userData.email_addresses || [],
      username: userData.username || "",
    };
    console.log("User properties:", userProps);

    try {
      const newUser = await createOrUpdateUser(userProps);
      console.log("User created or updated:", newUser);

      return new Response(
        JSON.stringify({
          message: "User created or updated",
          user: newUser,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error creating or updating user:", error);
      return new Response(
        JSON.stringify({ message: "Error creating or updating user" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // Respond to non-user creation/update events
  return new Response("", { status: 200 });
}
