const nodemailer = require('nodemailer');

const sendVerificationEmail = (sender, recip, user, token, cb) => {
  const { host } = process.env;

  const smtpTransport = nodemailer.createTransport({
    host: process.env.email_uri,
    port: process.env.email_port,
    auth: {
      user: process.env.aut_user,
      pass: process.env.aut_passw,
    },
  });
 
 
  const mailOptions = {
    from: sender,
    to: recip,
    subject: 'Sending Email using Node.js[nodemailer]',
    text: `Спасибо за регистрацию ! Пользователь «${user}» (${recip})\n
  инициировал запрос на проверку этого адреса электронной почты kumpel62@list.ru.
  Вы должны перейти по этой ссылке, чтобы активировать свою учетную запись: \n
  Пожалуйста, нажмите на следующую ссылку или вставьте ее в браузер, чтобы завершить процесс:\n
  http://${host}/verifymail/?email=${recip}&token=${token}\n\n`,
  };

  smtpTransport.sendMail(mailOptions, cb);
  return cb;
};
const sendUpdatePassw = (sender, recip, user, token, cb) => {
  const { host } = process.env;

  const smtpTransport = nodemailer.createTransport({
    host: process.env.email_uri,
    port: process.env.email_port,
    auth: {
      user: process.env.aut_user,
      pass: process.env.aut_passw,
    },
  });
  
  const mailOptions = {
    from: sender,
    to: recip,
    subject: 'Sending Email using Node.js[nodemailer]',
    text: `Вы получаете это письмо, потому что кто- то сбросил пароль, связанный с этим письмом.
  Даже не беспокойтесь об этом! Мы сбросили ваш пароль,\n
  поэтому вы можете создать новый, используя ссылку ниже:\n
  http://${host}/reset/${token}\n\n\n`,
  };

  smtpTransport.sendMail(mailOptions, cb);
  return cb;
};

module.exports = {
  sendUpdatePassw,
  sendVerificationEmail,
};
