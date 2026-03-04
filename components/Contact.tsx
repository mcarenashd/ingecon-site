import React, { useState } from 'react';
import { useTranslation } from '../i18n';

type FormData = { name: string; email: string; message: string };
type FormErrors = { name: string; email: string; message: string };
type Status = 'idle' | 'success' | 'error';

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);
const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);
const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = { name: '', email: '', message: '' };
    let isValid = true;
    if (!formData.name.trim()) { newErrors.name = t.contact.errorNameRequired; isValid = false; }
    if (!formData.email.trim()) { newErrors.email = t.contact.errorEmailRequired; isValid = false; }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = t.contact.errorEmailInvalid; isValid = false; }
    if (!formData.message.trim()) { newErrors.message = t.contact.errorMessageRequired; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setErrors({ name: '', email: '', message: '' });
  };

  const inputBase = 'w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#6a9a10]/40';
  const inputIdle = 'border-gray-200 focus:border-[#6a9a10]';
  const inputError = 'border-red-400 focus:border-red-400 focus:ring-red-200';

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#6a9a10] mb-3">{t.contact.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t.contact.heading}
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed">
            {t.contact.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#6a9a10]/10 text-[#6a9a10] flex items-center justify-center">
                <PhoneIcon />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">{t.contact.phoneLabel}</p>
                <p className="text-gray-500 text-sm">+(57) 317 434 7113</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#6a9a10]/10 text-[#6a9a10] flex items-center justify-center">
                <EmailIcon />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">{t.contact.emailLabel}</p>
                <a href="mailto:info@ingecon.com.co" className="text-[#6a9a10] hover:underline text-sm">
                  info@ingecon.com.co
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#6a9a10]/10 text-[#6a9a10] flex items-center justify-center">
                <LocationIcon />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">{t.contact.addressLabel}</p>
                <p className="text-gray-500 text-sm">Calle 148 No. 7G-42, Barrio Cedritos<br />Bogotá, Colombia</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.223933276813!2d-74.03212808573756!3d4.731778942621434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f8f7b1c3e3a4f%3A0x6a0c5c8d6d84a566!2sCl.%20148%20%237g-42%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1683226786183!5m2!1ses!2sco"
                width="100%"
                height="220"
                className="border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.contact.mapTitle}
              />
            </div>
          </div>

          <div>
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16 px-6 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-[#6a9a10]/10 text-[#6a9a10] flex items-center justify-center mb-4">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t.contact.successTitle}</h3>
                <p className="text-gray-500 text-sm mb-6">{t.contact.successText}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm text-[#6a9a10] hover:underline"
                >
                  {t.contact.successAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.contact.formName}</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t.contact.formNamePlaceholder}
                    value={formData.name}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.name ? inputError : inputIdle}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.contact.formEmail}</label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t.contact.formEmailPlaceholder}
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.email ? inputError : inputIdle}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.contact.formMessage}</label>
                  <textarea
                    name="message"
                    placeholder={t.contact.formMessagePlaceholder}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputBase} resize-none ${errors.message ? inputError : inputIdle}`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#6a9a10] hover:bg-[#5a8509] text-white font-semibold py-3.5 px-6 rounded-lg text-sm transition-all duration-200 shadow-sm hover:shadow"
                >
                  {t.contact.formSubmit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
