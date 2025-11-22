import { Webhook } from "svix";
import User from "../models/User.js";

// api controller fn to manage clerk user with db

export const clerkWebhooks = async (req, res) => {
  try {
    // CREATE A Svix instance with Clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Access raw body for signature verification
    const rawBody = Buffer.isBuffer(req.body)
      ? req.body.toString()
      : typeof req.body === "string"
        ? req.body
        : JSON.stringify(req.body);

    await whook.verify(rawBody, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Parse the event payload only after successful verification
    const { data, type } = JSON.parse(rawBody);
    //switch cases for diff events

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);

        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: "Webhooks Err" });
  }
};
