const nodemailer = require('nodemailer');

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    // auth: {
    //   user: process.env.SMTP_EMAIL,
    //   pass: process.env.SMTP_PASSWORD
    // }
    service: 'gmail',
    auth: {
        user: 'deepkerzing@gmail.com',
        pass: 'deep@kerzing11'
    }
  });

  const message = {
    from: 'deepkerzing@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
console.log(message);
  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
