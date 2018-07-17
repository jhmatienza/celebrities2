const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: '',
    pass: ''
  }
})

const defaultFrom = 'jhm.atienza@gmail.com';

module.exports.confirmSignUp = (user) => {
  console.log(user)
  return transporter.sendMail({
    from: defaultFrom,
    to: user.email,
    subject: 'Confirm your registration',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
      </head>
      <body>
        <p>Confirma ${user.token}</p>
      </body>
      </html>
    `
  })
}