import User from "../models/userModel";
import bcrypt from "bcryptjs";

export async function createAdmin() {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const ADMIN_FIRST_NAME = "admin";
  const ADMIN_LAST_NAME = "admin";
  const ADMIN_PHONE = "admin";
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD)
    throw new Error(
      "Please provide ADMIN_EMAIL and ADMIN_PASSWORD in .env file"
    );

  if (await User.findOne({ email: ADMIN_EMAIL })) return;
  console.log("Creating admin user");

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const newAdmin = new User({
    email: ADMIN_EMAIL,
    password: hashedPassword,
    firstName: ADMIN_FIRST_NAME,
    lastName: ADMIN_LAST_NAME,
    phone: ADMIN_PHONE,
    role: "admin",
  });
  await newAdmin.save();
  return;
}
