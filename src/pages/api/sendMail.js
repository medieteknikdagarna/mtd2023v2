import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp01.binero.se",
  port: 587,
  secure: true,
  auth: {
    user: "webb@medieteknikdagarna.se",
    pass: "#MTD15utantjugo",
  },
});

export const mailOptions = {
  from: "webb@medieteknikdagarna.se",
};
