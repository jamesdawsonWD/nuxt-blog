import { Resend } from "resend";

export default defineEventHandler(async (event: any) => {
  const resend = new Resend(process.env.RESNED_API_KEY);
  const { email } = await readBody(event);

  try {
    const { data, error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: "383eb4fa-4374-4ab4-9d4e-ed098225bcaa",
    });

    if (error) {
      console.log("Error creating contact:", error);
      return {
        statusCode: 400,
        body: error.message,
      };
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });

    console.log("Successfully added to the newsletter:", data);
    return {
      statusCode: 200,
      body: "You have been added to the newsletter",
    };
  } catch (err) {
    console.log("Unexpected error:", err);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
});
