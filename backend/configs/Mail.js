import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? `present (${process.env.EMAIL_PASS.length} chars)` : "MISSING");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"MyWallet" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email send failed:", error.message);
    throw error;
  }
};

export const otpMailTemplate = (otp) => `
  <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
    <h2>MyWallet Password Reset</h2>
    <p>Your OTP for resetting your password is:</p>
    <h1 style="letter-spacing: 4px;">${otp}</h1>
    <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
  </div>
`;
