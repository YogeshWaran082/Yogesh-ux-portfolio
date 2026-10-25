# Yogesh UX Portfolio

## Contact email setup

The deployed Vercel site sends contact-form enquiries through the `/api/contact`
function using a custom responsive YW email template.

Add these Environment Variables in the Vercel project settings for Production,
Preview, and Development:

```text
RESEND_API_KEY=re_your_api_key
CONTACT_TO_EMAIL=yogeshwaran.ux@gmail.com
CONTACT_FROM_EMAIL=YW Portfolio <onboarding@resend.dev>
```

Use `onboarding@resend.dev` while testing with the email address connected to
your Resend account. For public production delivery, verify a sending domain in
Resend and replace `CONTACT_FROM_EMAIL` with an address on that domain.
