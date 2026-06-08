import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // Gmail with port 587 uses STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

// Verify SMTP connection when server starts
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error)
  } else {
    console.log("SMTP Server is ready to send emails")
  }
})

export async function sendPasswordResetEmail(
  email: string,
  resetLink: string
) {
  try {
    const info = await transporter.sendMail({
      from: `"Soul Support" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: "Soul Support - Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2>Password Reset Request</h2>

          <p>Hello,</p>

          <p>
            We received a request to reset the password for your
            Soul Support account.
          </p>

          <p>
            Click the button below to reset your password:
          </p>

          <p>
            <a
              href="${resetLink}"
              style="
                background-color: #2563eb;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
              "
            >
              Reset Password
            </a>
          </p>

          <p>
            Or copy and paste this link into your browser:
          </p>

          <p>
            ${resetLink}
          </p>

          <p>
            This link will expire in 15 minutes.
          </p>

          <p>
            If you did not request a password reset,
            you can safely ignore this email.
          </p>

          <hr />

          <p>
            Regards,<br />
            Soul Support Team
          </p>
        </div>
      `,
    })

    console.log("Email sent successfully:", info.messageId)

    return info
  } catch (error) {
    console.error("Failed to send email:", error)
    throw error
  }
}