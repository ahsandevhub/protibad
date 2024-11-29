"use server";

import ejs from "ejs";
import nodemailer from "nodemailer";

export async function sendSignupEmail(to, userName) {
  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Render the confirmation mail template
    const renderedTemplate = await ejs.renderFile(
      "app/templates/signup-confirmation.ejs",
      {
        userName,
      },
    );

    // Define mail options
    const mailOptions = {
      from: `"Robogearbd.com" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Sign-Up Successful.`,
      html: renderedTemplate,
    };

    // Send reset mail
    const mailInfo = await transporter.sendMail(mailOptions);

    console.log("Password reset mail sent:", mailInfo.response);

    return { message: "Password reset email sent successfully!", status: 200 };
  } catch (error) {
    console.error("Error sending email:", error.message);

    return { message: "Error sending email", status: 500 };
  }
}

export async function sendResetPasswordEmail(to, resetLink) {
  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Render the confirmation mail template
    const renderedTemplate = await ejs.renderFile(
      "app/templates/reset-password.ejs",
      {
        resetLink,
      },
    );

    // Define mail options
    const mailOptions = {
      from: `"Robogearbd.com" <${process.env.EMAIL_USER}>`,
      to,
      subject: `Confirm your password reset.`,
      html: renderedTemplate,
    };

    // Send reset mail
    const mailInfo = await transporter.sendMail(mailOptions);

    console.log("Password reset mail sent:", mailInfo.response);

    return { message: "Password reset email sent successfully!", status: 200 };
  } catch (error) {
    console.error("Error sending email:", error.message);

    return { message: "Error sending email", status: 500 };
  }
}
