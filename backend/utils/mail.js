//yha email send krenge 
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
  service : "Gmail",
  port: 465,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

//OTP Mailer Function using Nodemailer
export const sendotpmail = async (to, otp) => {
await transporter.sendMail({
  from: process.env.EMAIL,
  to,
  subject: "Reset your password",
  html: `<p> Your OTP code for password reset is ${otp}</b> .It expires in 5 minutes. </p>`,
})
}

