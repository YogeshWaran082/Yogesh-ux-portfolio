import { useEffect, useRef, useState, type FormEvent } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, CheckCircle2, Loader2, X } from "lucide-react"

const FORM_SUBMIT_ENDPOINT = "https://formsubmit.co/ajax/yogeshwaran.ux@gmail.com"
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT
  || (import.meta.env.DEV ? FORM_SUBMIT_ENDPOINT : "/api/contact")
const OWNER_EMAIL = "yogeshwaran.ux@gmail.com"
const REQUEST_TIMEOUT_MS = 30000

type ContactFormModalProps = {
  open: boolean
  onClose: () => void
}

type FormErrors = Partial<Record<"name" | "email" | "projectType" | "description", string>>
type SubmitState = "idle" | "submitting" | "success" | "error"

const focusableSelector = [
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "a[href]",
  "[tabindex]:not([tabindex='-1'])",
].join(",")

const fieldIds: Record<keyof FormErrors, string> = {
  name: "contact-name",
  email: "contact-email-field",
  projectType: "contact-project-type",
  description: "contact-description",
}

export function ContactFormModal({ open, onClose }: ContactFormModalProps) {
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const errorSummaryRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitState, setSubmitState] = useState<SubmitState>("idle")
  const [submitError, setSubmitError] = useState("")

  useEffect(() => {
    if (!open) return
    previousFocusRef.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    setErrors({})
    setSubmitState("idle")
    setSubmitError("")

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLInputElement>("#contact-name")?.focus()
    }, 80)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== "Tab" || !dialogRef.current) return
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [open, onClose])

  const validateField = (name: string, value: string) => {
    if (name === "name" && !value.trim()) return "Enter your full name."
    if (name === "email") {
      if (!value.trim()) return "Enter your email address."
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address."
    }
    if (name === "projectType" && !value) return "Select a project type."
    if (name === "description" && !value.trim()) return "Tell me a little about your project."
    return ""
  }

  const validateForm = (formData: FormData) => {
    const nextErrors: FormErrors = {}
    const requiredFields = ["name", "email", "projectType", "description"] as const
    requiredFields.forEach((field) => {
      const message = validateField(field, String(formData.get(field) || ""))
      if (message) nextErrors[field] = message
    })
    return nextErrors
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget
    if (!["name", "email", "projectType", "description"].includes(name)) return
    const message = validateField(name, value)
    setErrors((current) => {
      const next = { ...current }
      const field = name as keyof FormErrors
      if (message) next[field] = message
      else delete next[field]
      return next
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitState === "submitting") return

    const formData = new FormData(event.currentTarget)
    const nextErrors = validateForm(formData)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus())
      return
    }

    setSubmitState("submitting")
    setSubmitError("")

    const fullName = String(formData.get("name") || "").trim()
    const email = String(formData.get("email") || "").trim()
    const phone = String(formData.get("phone") || "").trim()
    const projectType = String(formData.get("projectType") || "").trim()
    const budget = String(formData.get("budget") || "").trim()
    const description = String(formData.get("description") || "").trim()
    const honeypot = String(formData.get("_honey") || "")
    const isFormSubmitFallback = CONTACT_ENDPOINT.includes("formsubmit.co")
    const submittedAt = new Date().toISOString()
    const submissionData = isFormSubmitFallback
      ? {
          Name: fullName,
          Email: email,
          Phone: phone || "Not provided",
          Project: projectType,
          Budget: budget || "Not specified",
          Message: description,
          Submitted: new Date(submittedAt).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "Asia/Kolkata",
          }),
          _subject: `[YW Portfolio] ${projectType} enquiry from ${fullName}`,
          _template: "box",
          _replyto: email,
          _captcha: "false",
          _honey: honeypot,
          _url: window.location.href.split("#")[0],
        }
      : {
          name: fullName,
          email,
          phone,
          projectType,
          budget,
          description,
          honeypot,
          submittedAt,
          sourceUrl: window.location.href.split("#")[0],
        }

    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
        signal: controller.signal,
      })
      const result = await response.json().catch(() => null)
      const wasAccepted = result?.success === true || result?.success === "true"
      if (!response.ok || !wasAccepted) {
        throw new Error(result?.message || "The message could not be sent.")
      }
      formRef.current?.reset()
      setErrors({})
      setSubmitState("success")
    } catch (error) {
      setSubmitState("error")
      setSubmitError(
        error instanceof DOMException && error.name === "AbortError"
          ? "The request timed out. Please check your connection and try again."
          : error instanceof Error
          ? `${error.message} Please try again, or email me directly.`
          : "The message could not be sent. Please try again, or email me directly.",
      )
    } finally {
      window.clearTimeout(timeout)
    }
  }

  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="contact-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={dialogRef}
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            aria-describedby="contact-modal-description"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.975, y: 12 }}
            transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="contact-modal-glow" aria-hidden="true" />
            <button className="contact-modal-close" type="button" onClick={onClose} aria-label="Close contact form">
              <X size={20} aria-hidden="true" />
            </button>

            {submitState === "success" ? (
              <div className="contact-success" role="status">
                <CheckCircle2 aria-hidden="true" />
                <span className="contact-modal-kicker">Enquiry received</span>
                <h2 id="contact-modal-title">Message Sent<br /><em>Successfully!</em></h2>
                <p>Thanks for reaching out. I&apos;ll get back to you soon.</p>
                <button type="button" onClick={onClose}>
                  <ArrowLeft size={16} aria-hidden="true" /> Back to Portfolio
                </button>
              </div>
            ) : (
              <div className="contact-modal-layout">
                <aside className="contact-modal-intro">
                  <span className="contact-modal-kicker"><i aria-hidden="true" /> Have a project in mind?</span>
                  <h2 id="contact-modal-title">Let&apos;s build<br />something <em>great.</em></h2>
                  <p id="contact-modal-description">Tell me about your idea, and let&apos;s create something meaningful together.</p>
                  <div className="contact-modal-contact">
                    <span><i aria-hidden="true" /> Available for select projects</span>
                    <a href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a>
                  </div>
                  <div className="contact-modal-decoration" aria-hidden="true"><span>YW / 2026</span><b /></div>
                </aside>

                <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={submitState === "submitting"}>
                  {Object.keys(errors).length > 0 && (
                    <div ref={errorSummaryRef} className="contact-error-summary" role="alert" tabIndex={-1}>
                      <strong>Please check the highlighted fields.</strong>
                      <ul>
                        {Object.entries(errors).map(([field, message]) => (
                          <li key={field}><a href={`#${fieldIds[field as keyof FormErrors]}`}>{message}</a></li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="contact-form-grid">
                    <label className="contact-field">
                      <span>Full Name <b aria-hidden="true">*</b></span>
                      <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your full name" required onBlur={handleBlur} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
                      {errors.name && <small id="contact-name-error">{errors.name}</small>}
                    </label>

                    <label className="contact-field">
                      <span>Email Address <b aria-hidden="true">*</b></span>
                      <input id="contact-email-field" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" required onBlur={handleBlur} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
                      {errors.email && <small id="contact-email-error">{errors.email}</small>}
                    </label>

                    <label className="contact-field">
                      <span>Phone Number</span>
                      <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" />
                    </label>

                    <label className="contact-field">
                      <span>Project Type <b aria-hidden="true">*</b></span>
                      <select id="contact-project-type" name="projectType" defaultValue="" required onBlur={handleBlur} aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "contact-type-error" : undefined}>
                        <option value="" disabled>Select project type</option>
                        <option>UI/UX Design</option><option>Product Design</option><option>Website Design</option><option>Website Development</option><option>Mobile App Design</option><option>Branding</option><option>Other</option>
                      </select>
                      {errors.projectType && <small id="contact-type-error">{errors.projectType}</small>}
                    </label>

                    <label className="contact-field contact-field-wide">
                      <span>Project Budget</span>
                      <select name="budget" defaultValue="">
                        <option value="" disabled>Select an estimated budget</option>
                        <option>Under ₹10,000</option><option>₹10,000 – ₹25,000</option><option>₹25,000 – ₹50,000</option><option>₹50,000 – ₹1,00,000</option><option>Above ₹1,00,000</option><option>Let&apos;s Discuss</option>
                      </select>
                    </label>

                    <label className="contact-field contact-field-wide">
                      <span>Project Description <b aria-hidden="true">*</b></span>
                      <textarea id="contact-description" name="description" rows={4} placeholder="Tell me about your project, goals, and timeline..." required onBlur={handleBlur} aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "contact-description-error" : undefined} />
                      {errors.description && <small id="contact-description-error">{errors.description}</small>}
                    </label>
                  </div>

                  <input className="contact-honeypot" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                  {submitState === "error" && (
                    <div className="contact-submit-error" role="alert">
                      <p>{submitError}</p>
                      <a href={`mailto:${OWNER_EMAIL}`}>Email me directly</a>
                    </div>
                  )}
                  <button className="contact-submit" type="submit" disabled={submitState === "submitting"}>
                    {submitState === "submitting" ? <><Loader2 className="contact-submit-spinner" aria-hidden="true" /> Sending enquiry</> : <>Send Enquiry <ArrowUpRight size={18} aria-hidden="true" /></>}
                  </button>
                  <p className="contact-form-note">Your details stay private and are used only to reply to this enquiry.</p>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
