import { Resend } from "resend";

export default defineEventHandler(async (event: any) => {
  const resend = new Resend(process.env.RESNED_API_KEY);
  const { email } = await readBody(event);

  try {
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: "383eb4fa-4374-4ab4-9d4e-ed098225bcaa",
    });

    if (error) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Hello, builder",
      html: "<p>Thank you so much for joining the community and supporting our mission of bring builders together. <strong>We drop our newsletter every Sunday</strong>! So make sure you keep an eye out for that! If this landed in your spam folder, drag it into your main folder. </p>",
    });

    return {
      statusCode: 200,
      body: "You have been added to the newsletter",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
});
