const nodeMailer = require("nodemailer");
const Mailgen = require("mailgen");
const smtpTransport = require("nodemailer-smtp-transport");
const validator = require("validator");
require("dotenv").config();

// Models / Collection
const Student = require("../models/studentModel");
const Admin = require("../models/adminModel");

// send Password Controller
async function emailToSendPassword(req, res) {
  const { emailUser } = req.body;

  if(!validator.isEmail(emailUser)){
    return res.status(400).json({err: "email yang anda masukkan salah"});
  }

  // Create Transport
  const config = {
    service: "gmail",
    auth: {
      user: process.env.ADDRESS_ACCOUNT_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  };

  const transporter = nodeMailer.createTransport(smtpTransport(config));

  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Learning Management System FE UIR",
      link: "https://mailgen.js/",
    },
  });

  if (emailUser.includes("student")) {
    const findAccount = await Student.findOne({ email: emailUser });

    if (!findAccount) {
      return res.status(404).json({ err: "Akun Tidak Ditemukan" });
    }

    const response = {
      body: {
        name: "Your Forget The Password",
        intro: "Your Password has Arrived",
        table: {
          data: [
            {
              address: `${findAccount.email}`,
              password: `${findAccount.password}`,
            },
          ],
        },
        outro: "terimakasih, kemudian hari jangan lupa lagi",
      },
    };

    let mail = mailGenerator.generate(response);

    const messages = {
      from: process.env.ADDRESS_ACCOUNT_GMAIL,
      to: findAccount.email,
      subject: "Mengirim Password Anda",
      html: mail,
    };

    transporter
      .sendMail(messages)
      .then(() => {
        return res.status(201).json({ msg: "success to send mail" });
      })
      .catch((err) => {
        return res.status(500).json({ err });
      });

  }
}

module.exports = emailToSendPassword;
