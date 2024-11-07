import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD,
  },
});

export default transporter;
