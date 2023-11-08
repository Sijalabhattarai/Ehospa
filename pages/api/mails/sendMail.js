var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

export default function handler(req, res) {
    var { email, queueNumber, appointDate } = req.body;
    sendMail(email, queueNumber, appointDate);
    return res.status(200).json({ status: "success", message: "Success" })
}

function sendMail(email, queueNumber, appointDate) {
    if (!email) {
        console.log("Email or queueNumber is empty");
        return;
    };
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'meprazhant@gmail.com',
            pass: process.env.NEXT_PUBLIC_STMP
        }
    }));

    var mailOptions = {
        from: 'meprazhant@gmail.com',
        to: email,
        subject: 'Appointment Booked',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Appointment Booked for ${appointDate}</title>
        </head>
        <body style="background-color: #f2f2f2; font-family: Arial, sans-serif; padding:2px">
        
            <div style="background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px #cccccc; margin: 50px auto; max-width: 600px; padding: 20px;">
                <h1 style="color: #0099cc; font-size: 28px; margin-bottom: 20px;">Appointment Booked</h1>
                <p style="font-size: 18px; line-height: 1.5;">Hello User,</p>
                <p style="font-size: 18px; line-height: 1.5;">Your Appintment has been booked for <span style='color:red;'>${appointDate}</span> and Queue Number <span style='color:red'>${queueNumber}</span>.</p>
                <p style="font-size: 18px; line-height: 1.5;">Best regards,</p>
                <p style="font-size: 18px; line-height: 1.5;">Ehospa - Automatic System</p>
            </div>
        
        </body>
        </html>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
