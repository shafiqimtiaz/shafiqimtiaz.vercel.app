import { useEffect, useState } from 'react';
import { TerminalPanel, Button, Icon } from '../../components/ui';
import { contactFormFields } from '../../data/contactForm';

const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const getRecaptchaToken = () =>
  new Promise((resolve, reject) => {
    if (!RECAPTCHA_SITE_KEY) {
      reject(new Error('Missing reCAPTCHA site key'));
      return;
    }

    const execute = () => {
      if (!window.grecaptcha) {
        reject(new Error('reCAPTCHA failed to load'));
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(RECAPTCHA_SITE_KEY, { action: 'submit' })
          .then(resolve)
          .catch(reject);
      });
    };

    if (window.grecaptcha) {
      execute();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}`;
    script.async = true;
    script.defer = true;
    script.onload = execute;
    script.onerror = () => reject(new Error('reCAPTCHA failed to load'));
    document.head.appendChild(script);
  });

export default function ContactFormSection() {
  const initialFormData = contactFormFields.reduce(
    (acc, field) => ({ ...acc, [field.name]: '' }),
    {}
  );
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (status !== 'sent' && status !== 'error') return undefined;

    const timeout = window.setTimeout(() => setStatus('idle'), 3500);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = (formData.name || '').trim();
    const email = (formData.email || '').trim();
    const message = (formData.message || '').trim();

    if (!name || !email || !message || !CONTACT_FORM_ENDPOINT) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      const recaptchaToken = await getRecaptchaToken();
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio contact — ${name}`,
          'g-recaptcha-response': recaptchaToken,
        }),
      });

      if (!response.ok) throw new Error('Contact form submission failed');

      setStatus('sent');
      setFormData(initialFormData);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-w-0">
      <TerminalPanel
        title="shafiq@portfolio: ~/contact"
        bodyClassName="grid gap-0 p-6 text-[0.95rem] md:p-7"
      >
        <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
          {contactFormFields.map((field) => {
            const isTextarea = field.type === 'textarea';
            return (
              <div key={field.name} className="group/input">
                <label
                  htmlFor={`contact-${field.name}`}
                  className="font-body mb-2 block text-[0.8rem] text-[var(--theme-text-muted)]"
                >
                  <span className="text-[var(--theme-primary)]">{field.prefix}</span>{' '}
                  <span className="text-[var(--theme-text)]">{field.label}</span>
                </label>

                <div
                  className={`flex gap-2 border-b border-[var(--theme-outline-variant)] transition-colors focus-within:border-[var(--theme-primary)] ${
                    isTextarea ? 'items-start' : 'items-center'
                  }`}
                >
                  <span
                    className={`text-[var(--theme-primary)] ${isTextarea ? 'mt-2.5' : ''}`}
                    aria-hidden="true"
                  >
                    ❯
                  </span>

                  {isTextarea ? (
                    <textarea
                      id={`contact-${field.name}`}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      rows={field.rows || 4}
                      placeholder={field.placeholder}
                      className="font-body w-full resize-none border-none bg-transparent py-2 text-[var(--theme-text)] outline-none placeholder:text-[var(--theme-outline)] focus:ring-0 focus:outline-none"
                    />
                  ) : (
                    <input
                      id={`contact-${field.name}`}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="font-body w-full border-none bg-transparent py-2 text-[var(--theme-text)] outline-none placeholder:text-[var(--theme-outline)] focus:ring-0 focus:outline-none"
                    />
                  )}
                </div>
              </div>
            );
          })}

          <div className="pt-1">
            <Button
              type="submit"
              variant="primary"
              disabled={status === 'sending'}
              className="min-h-13 w-full px-8 text-[0.72rem]"
            >
              <span>
                {status === 'sending'
                  ? 'Sending…'
                  : status === 'sent'
                    ? 'Message sent'
                    : 'Send message'}
              </span>
              <Icon name="send" size={18} />
            </Button>
          </div>
        </form>
      </TerminalPanel>

      {(status === 'sent' || status === 'error') && (
        <div
          role="status"
          className={`font-body fixed right-4 bottom-20 z-50 rounded-lg border px-4 py-3 text-[0.72rem] shadow-lg sm:right-6 ${
            status === 'sent'
              ? 'border-[var(--theme-secondary)] bg-[var(--theme-surface)] text-[var(--theme-secondary)]'
              : 'border-[var(--theme-error-dim)] bg-[var(--theme-surface)] text-[var(--theme-error-dim)]'
          }`}
        >
          {status === 'sent' ? 'Message sent.' : 'Unable to send message.'}
        </div>
      )}
    </div>
  );
}
