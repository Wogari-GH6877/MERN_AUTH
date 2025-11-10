import nodemailer from "nodemailer";

const Transporter=nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure:process.env.EMAIL_PORT==465,
    auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
    }

});

export default Transporter