import React, { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { ProjectType, ContactFormData } from '../types';
import { sendLeadToTelegram } from '../services/telegramService';
import { useCountry } from '../contexts/CountryContext';
import { getTranslations } from '../config/translations';
import { trackContactFormSubmit, trackPhoneClick } from '../utils/analytics';

const ContactForm: React.FC = () => {
  const { country } = useCountry();
  const t = getTranslations(country);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    projectType: ProjectType.RENOVATION,
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Track form submission in Google Analytics (LEAD GENERATION)
    trackContactFormSubmit({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.projectType,
      country: country,
    });

    // Simulate a slightly longer delay for the animation effect if the API is too fast
    const minDelay = new Promise(resolve => setTimeout(resolve, 800));
    const request = sendLeadToTelegram(formData);

    const [success] = await Promise.all([request, minDelay]);

    if (success) {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', projectType: ProjectType.RENOVATION, message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-offwhite">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-20">
          
          {/* Text Info */}
          <div className="md:w-5/12">
            <h2 className="text-5xl font-serif text-charcoal mb-8">Let's <span className="italic text-gold">Connect.</span></h2>
            <p className="text-gray-600 mb-12 font-light leading-relaxed text-lg">
              Heeft u een project in gedachten of zoekt u een uniek pand? Wij luisteren graag naar uw verhaal.
            </p>
            
            <div className="space-y-8">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-gray-400 mb-2">Contact</span>
                <a href="mailto:info@hope-connects.com" className="text-xl font-serif hover:text-gold transition-colors">info@hope-connects.com</a>
                <a
                  href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                  onClick={() => trackPhoneClick()}
                  className="text-lg mt-1 hover:text-gold transition-colors cursor-pointer"
                >
                  {t.contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:w-7/12">
            {status === 'success' ? (
               <div className="bg-white p-12 shadow-xl text-center border-t-4 border-gold animate-fade-in-up">
                  <CheckCircle size={48} className="mx-auto text-gold mb-4" />
                  <h3 className="text-2xl font-serif mb-2">Bedankt.</h3>
                  <p className="text-gray-500">We hebben uw bericht goed ontvangen. We nemen spoedig contact op.</p>
                  <button onClick={() => setStatus('idle')} className="mt-8 text-xs uppercase tracking-widest underline hover:text-gold transition-colors">Nog een bericht versturen</button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Naam"
                      className="w-full bg-transparent border-b border-gray-300 py-4 text-charcoal focus:outline-none focus:border-gold transition-colors placeholder-gray-400 font-light"
                    />
                  </div>
                  <div className="relative group">
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Telefoon"
                      className="w-full bg-transparent border-b border-gray-300 py-4 text-charcoal focus:outline-none focus:border-gold transition-colors placeholder-gray-400 font-light"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Adres"
                    className="w-full bg-transparent border-b border-gray-300 py-4 text-charcoal focus:outline-none focus:border-gold transition-colors placeholder-gray-400 font-light"
                  />
                </div>

                <div className="relative group">
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Interesse in</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-300 py-2 text-charcoal focus:outline-none focus:border-gold transition-colors font-serif text-lg cursor-pointer"
                  >
                    {Object.values(ProjectType).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="relative group">
                  <textarea
                    name="message"
                    rows={3}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Vertel ons over uw plannen..."
                    className="w-full bg-transparent border-b border-gray-300 py-4 text-charcoal focus:outline-none focus:border-gold transition-colors placeholder-gray-400 font-light resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-charcoal text-white px-12 py-4 text-xs uppercase tracking-[0.2em] hover:bg-gold disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-4 w-full md:w-auto min-w-[200px]"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Verzenden...</span>
                    </>
                  ) : (
                    <>
                      <span>Verstuur Aanvraag</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;