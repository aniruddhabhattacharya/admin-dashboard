const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: "@gmail.com",
        pass: "@d",
        // clientId: process.env.OAUTH_CLIENTID,
        // clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: "1//04Cf3O_IAeN8DCgYIARAAGAQSNwF-L9IrGzkfUgbtaY3s-Sap0a57LJvotG-971KVs8_jISJVR-yHLNJBtZ3YHtSLfljqZS_X1xU"
    }
});

let mailOptions = {
    from: "tomerpacific@gmail.com",
    to: "tomerpacific @gmail.com",
    subject: 'Nodemailer Project',
    text: 'Hi from your nodemailer project'
};

transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
        console.log("Error " + err);
    } else {
        console.log("Email sent successfully");
    }
});