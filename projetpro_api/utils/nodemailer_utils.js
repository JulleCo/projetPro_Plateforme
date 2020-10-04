var nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = {
    transporter: nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "julle4co@gmail.com",
        pass: process.env.NODEMAILER_PSW,
    },
    }),

    mailOptions: {
    from: "julle4co@gmail.com",
    to: "colineleroy@gmail.com",
    subject: "Sending blabla",
    text: "That works!",
    },
}