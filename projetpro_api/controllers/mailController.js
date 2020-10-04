const { transporter, mailOptions } = require("../utils/nodemailer_utils");
const { BadRequestError } = require("../utils/errors");

module.exports = {
  sendContactMail: async (request, response) => {
    const inputMail = {
      subject: request.body.subject,
      text: request.body.text,
    };

    for (const key in inputMail) {
      if (inputMail[key] == null) {
        throw new BadRequestError("Bad Request", `Input ${key} must be filled`);
      }
    }

    const sendEmail = await transporter.sendMail({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: inputMail.subject,
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
