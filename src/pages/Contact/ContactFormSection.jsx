import { useState } from 'react';
import { TerminalPanel, Button } from '../../components/ui';
import { contactFormFields } from '../../data/contactForm';

const CONTACT_RECIPIENT = 'shafiqimtiaz@gmail.com';

export default function ContactFormSection() {
  const initialFormData = contactFormFields.reduce(
    (acc, field) => ({ ...acc, [field.name]: '' }),
    {}
  );
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState('idle');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = (formData.name || '').trim();
    const email = (formData.email || '').trim();
    const message = (formData.message || '').trim();

    if (!name || !email || !message) {
      setStatus('error');
      return;
    }

    const subject = `Portfolio contact — ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:${CONTACT_RECIPIENT}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open the visitor's default mail app with the message prefilled.
    window.location.href = mailto;

    setStatus('opened');
    setFormData(initialFormData);
  };

  return (
    <div className="min-w-0">
      <TerminalPanel
        title="shafiq@flexspring: ~/contact"
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
            <Button type="submit" variant="primary" className="min-h-13 w-full px-8 text-[0.72rem]">
              <span>{status === 'opened' ? 'Opening mail app…' : 'Open mail app'}</span>
              <span className="material-symbols-outlined text-[1.1rem]" aria-hidden="true">
                send
              </span>
            </Button>

            {status === 'opened' && (
              <p className="font-body mt-3 text-[0.78rem] text-[var(--theme-secondary)]">
                Your email client should be opening with the message prefilled. Didn&apos;t open?
                Email me directly at{' '}
                <a
                  href={`mailto:${CONTACT_RECIPIENT}`}
                  className="text-[var(--theme-primary)] underline"
                >
                  {CONTACT_RECIPIENT}
                </a>
                .
              </p>
            )}

            {status === 'error' && (
              <p className="font-body mt-3 text-[0.78rem] text-[var(--theme-error-dim)]">
                Please fill in your name, email, and message.
              </p>
            )}
          </div>
        </form>
      </TerminalPanel>
    </div>
  );
}
