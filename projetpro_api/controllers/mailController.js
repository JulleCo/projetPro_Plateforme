const { transporter, mailOptions } = require("../utils/nodemailer_utils");
const { BadRequestError } = require("../utils/errors");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

module.exports = {
  sendContactMail: async (request, response) => {
    const inputMail = {
      email: request.body.email,
      messageSubject: request.body.messageSubject,
      text: request.body.text,
    };

    for (const key in inputMail) {
      if (inputMail[key] == null) {
        throw new BadRequestError("Bad Request", `Input ${key} must be filled`);
      }
    }
    if (emailRegex.test(inputMail.email) == false) {
      throw new BadRequestError("Bad Request", "Invalid email");
    }

    const sendEmail = await transporter.sendMail({
      from: mailOptions.from,
      to: mailOptions.to,
      cc: inputMail.email,
      subject: `PLATEFORME || new message from ${inputMail.email} >> SUBJECT : ${inputMail.messageSubject}`,
      text: inputMail.text,
    });

    if (!sendEmail) {
      response.status(500).json({ error: "problème de mail" });
      console.log("Problem occured, aarrh", error);
    }
    response.status(201).json({ sendEmail });
    console.log("Email send with succes, yeah !");
  },
};
