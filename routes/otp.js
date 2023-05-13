import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

router.post("/send-otp", async (req, res) => {
  const { email, otp } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "secretuseemail@gmail.com",
      pass: "mrxryekepzeysqki",
    },
  });

  const mailOptions = {
    from: "secretuseemail@gmail.com",
    to: email,
    subject: "OTP for Signup",
    text: `Your OTP for signup is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("OTP sent successfully");
  } catch (err) {
    console.log(err);
    console.error(err);
    res.status(500).send("Error while sending OTP");
  }
});
export default router;
