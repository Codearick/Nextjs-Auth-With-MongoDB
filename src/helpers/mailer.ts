import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //TODO: configure mail for usage. => Done
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: new Date(Date.now() + 3600000) //Expiry one hour from now
                    }
                })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                })
        }


        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "87ed859a292800", // ❌
                pass: "9f7b59b63a707d" // ❌
            }
        });

        const mailOptions = {
            from: 'rohan@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType == 'Verify' ? "Verify your email"
                : "Reset your Password", // Subject line

            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>` // html body
        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message)
    }
}