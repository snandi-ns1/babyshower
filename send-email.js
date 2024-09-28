const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { email, photos } = req.body;

    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'SendGrid', // Or any other service you prefer
        auth: {
            user: 'US31003c21da401128cf5c7d54a4184246',
            pass: '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',
        },
    });

    const mailOptions = {
        from: 'nandi67@gmail.com.com',
        to: 'nandi67@gmail.com.com',
        subject: 'Your Captured Photos',
        text: 'Here are your captured photos!',
        attachments: photos.map((photo, index) => ({
            filename: `photo${index + 1}.png`,
            content: photo.split('base64,')[1],
            encoding: 'base64'
        }))
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ error: 'Failed to send email' });
        }
        res.status(200).send({ message: 'Email sent successfully' });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
