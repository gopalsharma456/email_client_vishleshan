import axios from "axios";

const SENDGRID_API_URL:string = "https://api.sendgrid.com/v3/mail/send";
const SENDGRID_API_KEY:string = process.env.SENDGRID_API_KEY

 const sendEmail: any = async (recipient: string, subject: string, body: string) => {
  try {
    await axios.post(
      SENDGRID_API_URL,
      {
        personalizations: [{ to: [{ email: recipient }] }],
        from: { email: "your-email@example.com" },
        subject,
        content: [{ type: "text/plain", value: body }],
      },
      {
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    throw new Error("Failed to send email.");
  }
};

export default sendEmail;