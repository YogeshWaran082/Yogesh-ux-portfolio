const OWNER_EMAIL = process.env.CONTACT_TO_EMAIL || "yogeshwaran.ux@gmail.com"
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "YW Portfolio <onboarding@resend.dev>"
const PORTFOLIO_URL = "https://yogesh-ux-portfolio.vercel.app/"

const PROJECT_TYPES = new Set([
  "UI/UX Design",
  "Product Design",
  "Website Design",
  "Website Development",
  "Mobile App Design",
  "Branding",
  "Other",
])

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;")

const clean = (value, maxLength) => String(value || "").trim().slice(0, maxLength)
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

function formatSubmittedAt(value) {
  const date = value && !Number.isNaN(Date.parse(value)) ? new Date(value) : new Date()
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date)
}

function textVersion(data) {
  return [
    `New ${data.projectType} enquiry from ${data.name}`,
    "",
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Budget: ${data.budget || "Not specified"}`,
    `Submitted: ${data.submittedAt}`,
    `Source: ${data.sourceUrl || PORTFOLIO_URL}`,
    "",
    "Project brief",
    data.description,
  ].join("\n")
}

function emailTemplate(data) {
  const name = escapeHtml(data.name)
  const firstName = escapeHtml(data.name.split(/\s+/)[0])
  const email = escapeHtml(data.email)
  const phone = escapeHtml(data.phone || "Not provided")
  const projectType = escapeHtml(data.projectType)
  const budget = escapeHtml(data.budget || "Not specified")
  const submittedAt = escapeHtml(data.submittedAt)
  const sourceUrl = escapeHtml(data.sourceUrl || PORTFOLIO_URL)
  const description = escapeHtml(data.description).replaceAll("\n", "<br>")
  const replyLink = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(`Re: Your ${data.projectType} enquiry`)}`

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light only">
    <meta name="supported-color-schemes" content="light only">
    <title>New portfolio enquiry</title>
    <style>
      @media only screen and (max-width: 620px) {
        .email-shell { width: 100% !important; }
        .content-pad { padding-left: 24px !important; padding-right: 24px !important; }
        .detail-cell { display: block !important; width: 100% !important; padding-right: 0 !important; }
        .detail-cell + .detail-cell { padding-top: 20px !important; }
        .brand-block { width: 108px !important; height: 108px !important; }
        .headline { font-size: 27px !important; line-height: 34px !important; }
        .cta { display: block !important; text-align: center !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#202220;color:#171917;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${projectType} enquiry from ${name}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#202220;">
      <tr>
        <td align="center" style="padding:32px 14px;">
          <table role="presentation" class="email-shell" width="620" cellspacing="0" cellpadding="0" border="0" style="width:620px;max-width:620px;background:#f7f8f5;">
            <tr>
              <td class="content-pad" style="padding:0 50px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td class="brand-block" width="130" height="130" align="center" valign="middle" style="width:130px;height:130px;background:#080a08;color:#f7f8f5;font-size:31px;font-weight:900;letter-spacing:-2px;">
                      YW<span style="color:#42f56b;">.</span>
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="content-pad" style="padding:54px 50px 22px;">
                <div style="margin-bottom:12px;color:#168a34;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">New project enquiry</div>
                <h1 class="headline" style="margin:0;color:#111311;font-size:32px;line-height:39px;letter-spacing:-0.8px;">${firstName} wants to build something great.</h1>
                <p style="margin:18px 0 0;color:#5d625d;font-size:15px;line-height:24px;">A new enquiry was submitted through your YW portfolio. The complete project details are organised below.</p>
              </td>
            </tr>
            <tr>
              <td class="content-pad" style="padding:24px 50px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #dfe3dd;border-bottom:1px solid #dfe3dd;">
                  <tr>
                    <td class="detail-cell" width="50%" valign="top" style="width:50%;padding:24px 18px 24px 0;">
                      <div style="margin-bottom:7px;color:#7b817b;font-size:10px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">Project type</div>
                      <div style="color:#151715;font-size:15px;font-weight:700;line-height:22px;">${projectType}</div>
                    </td>
                    <td class="detail-cell" width="50%" valign="top" style="width:50%;padding:24px 0 24px 18px;">
                      <div style="margin-bottom:7px;color:#7b817b;font-size:10px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">Estimated budget</div>
                      <div style="color:#151715;font-size:15px;font-weight:700;line-height:22px;">${budget}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="content-pad" style="padding:18px 50px 8px;">
                <div style="margin-bottom:10px;color:#7b817b;font-size:10px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">Project brief</div>
                <div style="padding:22px;background:#ffffff;border-left:4px solid #42f56b;color:#303530;font-size:15px;line-height:24px;">${description}</div>
              </td>
            </tr>
            <tr>
              <td class="content-pad" style="padding:28px 50px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td class="detail-cell" width="50%" valign="top" style="width:50%;padding-right:18px;">
                      <div style="margin-bottom:7px;color:#7b817b;font-size:10px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">Client</div>
                      <div style="color:#151715;font-size:14px;font-weight:700;line-height:22px;">${name}</div>
                      <a href="mailto:${email}" style="color:#168a34;font-size:13px;line-height:22px;text-decoration:none;">${email}</a>
                    </td>
                    <td class="detail-cell" width="50%" valign="top" style="width:50%;padding-left:18px;">
                      <div style="margin-bottom:7px;color:#7b817b;font-size:10px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">Phone</div>
                      <div style="color:#151715;font-size:14px;line-height:22px;">${phone}</div>
                      <div style="color:#7b817b;font-size:11px;line-height:19px;">${submittedAt}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="content-pad" style="padding:36px 50px 58px;">
                <a class="cta" href="${replyLink}" style="display:inline-block;padding:16px 28px;border-radius:999px;background:#111311;color:#ffffff;font-size:11px;font-weight:800;letter-spacing:2px;text-decoration:none;text-transform:uppercase;">Reply to enquiry&nbsp;&nbsp;↗</a>
              </td>
            </tr>
            <tr>
              <td class="content-pad" style="padding:34px 50px 38px;background:#111311;color:#9ca29c;text-align:center;">
                <div style="margin-bottom:14px;color:#ffffff;font-size:18px;font-weight:900;letter-spacing:-0.5px;">YW<span style="color:#42f56b;">.</span></div>
                <a href="${sourceUrl}" style="color:#c7ccc7;font-size:12px;line-height:20px;text-decoration:none;">${sourceUrl}</a>
                <div style="margin-top:13px;color:#656b65;font-size:10px;line-height:17px;">Portfolio contact notification · Private enquiry details</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST")
    return response.status(405).json({ success: false, message: "Method not allowed." })
  }

  if (!process.env.RESEND_API_KEY) {
    return response.status(503).json({
      success: false,
      message: "Email delivery is not configured yet.",
    })
  }

  let body
  try {
    body = typeof request.body === "string" ? JSON.parse(request.body) : request.body || {}
  } catch {
    return response.status(400).json({ success: false, message: "Invalid request body." })
  }
  if (clean(body.honeypot, 100)) return response.status(200).json({ success: true })

  const data = {
    name: clean(body.name, 100),
    email: clean(body.email, 254).toLowerCase(),
    phone: clean(body.phone, 40),
    projectType: clean(body.projectType, 80),
    budget: clean(body.budget, 80),
    description: clean(body.description, 4000),
    submittedAt: formatSubmittedAt(body.submittedAt),
    sourceUrl: PORTFOLIO_URL,
  }

  if (!data.name || !validEmail(data.email) || !PROJECT_TYPES.has(data.projectType) || !data.description) {
    return response.status(400).json({ success: false, message: "Please check the required form fields." })
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [OWNER_EMAIL],
        reply_to: data.email,
        subject: `[YW Portfolio] ${data.projectType} enquiry from ${data.name}`,
        html: emailTemplate(data),
        text: textVersion(data),
      }),
    })

    const result = await resendResponse.json().catch(() => null)
    if (!resendResponse.ok) {
      console.error("Resend delivery failed", resendResponse.status, result)
      return response.status(502).json({ success: false, message: "The enquiry could not be delivered." })
    }

    return response.status(200).json({ success: true, id: result?.id })
  } catch (error) {
    console.error("Contact form delivery failed", error)
    return response.status(500).json({ success: false, message: "The enquiry could not be delivered." })
  }
}
