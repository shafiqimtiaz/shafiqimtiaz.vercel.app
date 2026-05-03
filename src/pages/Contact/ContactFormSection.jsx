import { useState } from 'react';
import { TerminalPanel, Button } from '../../components/ui';
import { contactFormFields } from '../../data/contactForm';

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
  };

  const CONTACT_FORM_RECIPIENT =
    import.meta.env.VITE_CONTACT_FORM_RECIPIENT || 'shafiqimtiaz@gmail.com';
  const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    const payload = contactFormFields.reduce((acc, field) => {
      const value = (formData[field.name] || '').toString().trim();
      return { ...acc, [field.name]: value };
    }, {});

    if (!payload.name || !payload.email || !payload.message) {
      setStatus('error');
      return;
    }

    try {
      if (CONTACT_FORM_ENDPOINT) {
        const res = await fetch(CONTACT_FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...payload,
            recipient: CONTACT_FORM_RECIPIENT,
          }),
        });

        if (!res.ok) {
          throw new Error(`Contact endpoint failed with status ${res.status}`);
        }

        setStatus('sent');
        setFormData(initialFormData);
        return;
      }

      const subject = `New contact form message from ${payload.name}`;
      const body = `Name: ${payload.name}%0D%0AEmail: ${payload.email}%0D%0AMessage:%0D%0A${payload.message}`;
      window.location.href = `mailto:${encodeURIComponent(CONTACT_FORM_RECIPIENT)}?subject=${encodeURIComponent(subject)}&body=${body}`;

      setStatus('sent');
      setFormData(initialFormData);
    } catch (error) {
      console.error('Contact form submit error', error);
      setStatus('error');
    }
  };

  return (
    <div className="h-full min-w-0">
      <TerminalPanel
        title="ssh root@614.514.183 > CONTACT_FORM"
        className="h-full shadow-[var(--shadow-soft)]"
        bodyClassName="grid h-full gap-0 p-5 text-[0.95rem] md:p-6"
      >
        <form className="space-y-10" onSubmit={handleSubmit}>
          {contactFormFields.map((field) => {
            const isTextarea = field.type === 'textarea';
            return (
              <div key={field.name} className="group/input">
                <label className="mb-2 block text-[0.85rem] text-[var(--theme-text-muted)] opacity-80">
                  <span className="text-[var(--theme-primary)]">{field.prefix}</span>{' '}
                  <span className="text-[var(--theme-text)]">{field.label}</span>
                </label>

                <div
                  className={`flex gap-2 border-b border-[var(--theme-outline-variant)] transition-colors focus-within:border-[var(--theme-primary)] ${
                    isTextarea ? 'items-start' : 'items-center'
                  }`}
                >
                  <span className={`text-[var(--theme-primary)] ${isTextarea ? 'mt-2' : ''}`}>
                    ❯
                  </span>

                  {isTextarea ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      rows={field.rows || 4}
                      placeholder={field.placeholder}
                      className="w-full resize-none border-none bg-transparent py-2 text-[var(--theme-text)] outline-none placeholder:text-[var(--theme-text-muted)] focus:ring-0 focus:outline-none"
                    />
                  ) : (
                    <input
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full border-none bg-transparent py-2 text-[var(--theme-text)] outline-none placeholder:text-[var(--theme-text-muted)] focus:ring-0 focus:outline-none"
                    />
                  )}
                </div>
              </div>
            );
          })}

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={status === 'sending'}
              className="min-h-14 px-8 text-[0.76rem]"
            >
              {status === 'sending'
                ? 'IN_PROCESS...'
                : status === 'sent'
                  ? 'SEND_COMPLETE'
                  : status === 'error'
                    ? 'RETRY_SEND'
                    : 'EXECUTE_SEND'}
            </Button>
          </div>

          {status === 'sent' && (
            <p className="text-sm text-[var(--theme-secondary)]">
              Message sent successfully. I’ll respond in 24h or less.
            </p>
          )}

          {status === 'error' && (
            <p className="text-sm text-[var(--theme-error)]">
              Failed to send message. Please check your internet connection and try again.
            </p>
          )}
        </form>
      </TerminalPanel>
    </div>
  );
}
