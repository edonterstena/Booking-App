require("dotenv").config();
const nodemailer = require("nodemailer");

const createContact = async (req, res, next) => {
  const { subject, email, message } = req.body;

  try {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com", // hostname
      secureConnection: false, // TLS requires secureConnection to be false
      port: 587,
      // port for secure SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Create the email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: subject,
      text: `Email: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        next(error);
      } else {
        console.log("Email sent: " + info.response);
        res.send("Email sent successfully");
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createContact;
