'use client';

import React, { useState, useEffect } from 'react';
import SectionHeading from '../common/SectionHeading';
import CTAButton from '../common/CTAButton';
import { MessageCircle, Loader2 } from 'lucide-react';

const MONTHS_CZ = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
];

const ContactForm: React.FC = () => {
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');

  useEffect(() => {
    const currentDate = new Date();
    const availableMonthsList: string[] = [];
    
    // Start with next month to ensure 30 days minimum
    let futureDate = new Date(currentDate);
    futureDate.setDate(1); // Start of next month
    futureDate.setMonth(currentDate.getMonth() + 1);
    
    // Get only next 4 valid months
    while (availableMonthsList.length < 4) {
      const monthDate = new Date(futureDate);
      // Check if the month start is at least 30 days away
      const daysDifference = Math.floor((monthDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDifference >= 30) {
        availableMonthsList.push(MONTHS_CZ[monthDate.getMonth()]);
      }
      
      futureDate.setMonth(futureDate.getMonth() + 1);
    }
    
    setAvailableMonths(availableMonthsList);
    // Set first month as default selection
    if (availableMonthsList.length > 0) {
      setSelectedMonth(availableMonthsList[0]);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      preferredMonth: selectedMonth,
      consent: formData.get('consent') === 'on'
    };

    // Validate consent
    if (!data.consent) {
      setSubmitMessage('Musíte souhlasit se zpracováním osobních údajů');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Redirect to payment link
        window.location.href = result.payLink;
      } else {
        setSubmitMessage(result.error || 'Došlo k chybě při odesílání formuláře');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('Došlo k neočekávané chybě. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-montserrat font-medium text-brand-gray mb-2">
            Jméno *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-brand-gray/20 rounded-lg focus:ring-2 focus:ring-brand-olive focus:border-brand-olive font-montserrat disabled:opacity-50"
            placeholder="Jan"
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-montserrat font-medium text-brand-gray mb-2">
            Příjmení *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            disabled={isSubmitting}
            className="w-full px-4 py-3 border border-brand-gray/20 rounded-lg focus:ring-2 focus:ring-brand-olive focus:border-brand-olive font-montserrat disabled:opacity-50"
            placeholder="Novák"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-montserrat font-medium text-brand-gray mb-2">
          E-mail *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 border border-brand-gray/20 rounded-lg focus:ring-2 focus:ring-brand-olive focus:border-brand-olive font-montserrat disabled:opacity-50"
          placeholder="jan@example.cz"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-montserrat font-medium text-brand-gray mb-2">
          Telefon *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 border border-brand-gray/20 rounded-lg focus:ring-2 focus:ring-brand-olive focus:border-brand-olive font-montserrat disabled:opacity-50"
          placeholder="+420 123 456 789"
        />
      </div>
      
      <div>
        <p className="block text-sm font-montserrat font-medium text-brand-gray mb-4">
          Preferovaný měsíc pro absolvování kurzu *
        </p>
        <div className="grid grid-cols-2 gap-4">
          {availableMonths.map((month) => (
            <div key={month} className="flex items-center">
              <input
                type="radio"
                id={`month-${month}`}
                name="preferred-month"
                value={month}
                checked={selectedMonth === month}
                onChange={(e) => setSelectedMonth(e.target.value)}
                required
                disabled={isSubmitting}
                className="mr-3 w-4 h-4 text-brand-olive focus:ring-brand-olive disabled:opacity-50"
              />
              <label htmlFor={`month-${month}`} className="text-sm text-brand-gray/80 font-montserrat">
                {month}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-start">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          disabled={isSubmitting}
          className="mt-1 mr-3 disabled:opacity-50"
        />
        <label htmlFor="consent" className="text-sm text-brand-gray/80 font-montserrat">
          Souhlasím se zpracováním osobních údajů dle zásad ochrany osobních údajů *
        </label>
      </div>
      
      <div className="text-sm text-brand-gray/60 font-montserrat mb-6">
        * Povinné pole
      </div>

      {submitMessage && (
        <div className={`p-4 rounded-lg text-sm font-montserrat ${
          submitMessage.includes('chyb') || submitMessage.includes('Musíte') 
            ? 'bg-red-50 text-red-700 border border-red-200' 
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {submitMessage}
        </div>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-8 rounded-lg font-montserrat font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-brand-red hover:bg-opacity-90 text-white focus:ring-brand-red disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Zpracovávám...
          </>
        ) : (
          'Odeslat a přejít k platbě'
        )}
      </button>
    </form>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Kontaktujte nás" 
          subtitle="Máte zájem o kurz? Neváhejte se přihlásit"
        />
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-brand-beige p-8 md:p-10 rounded-2xl shadow-md">
            <h3 className="text-2xl font-anton mb-8 text-brand-gray">Projevit zájem o kurz</h3>
            <ContactForm />
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-brand-red hover:bg-opacity-90 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-105">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Contact;