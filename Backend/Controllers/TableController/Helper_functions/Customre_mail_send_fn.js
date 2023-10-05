
const nodemailer = require('nodemailer');

exports.send_mail_fn = (to_mail) => {
    console.log(to_mail)
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sourabh386kumar@gmail.com',
      pass: 'fbob dbwx wnpv ppmx'
    }
  });

  var mailOptions = {
    from: 'sourabh386kumar@gmail.com',
    to: to_mail,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      return (res.send(error));

    } else {
      console.log('Email sent: ' + info.response)
      return (res.send('info.response'))
    }
  });
}