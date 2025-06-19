'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SectionHeading from '../common/SectionHeading';
import CTAButton from '../common/CTAButton';
import { Loader2, AlertTriangle, MapPin, ChevronDown } from 'lucide-react';
import { 
  trackFormStart, 
  trackFormInteraction, 
  trackFormSubmit, 
  trackFormSuccess, 
  trackFormError,
  initializeDataLayer 
} from '../../../utils/dataLayer';

const MONTHS_CZ = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
];

const PHONE_PREFIXES = [
  { code: '+420', country: 'CZ', label: '🇨🇿 +420' },
  { code: '+421', country: 'SK', label: '🇸🇰 +421' }
];

const ContactForm: React.FC = () => {
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [formStarted, setFormStarted] = useState(false);
  const [selectedPrefix, setSelectedPrefix] = useState(PHONE_PREFIXES[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPrefixDropdown, setShowPrefixDropdown] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consent: false
  });

  // Initialize dataLayer on component mount
  useEffect(() => {
    initializeDataLayer();
  }, []);

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

  // Track form start when user begins interacting
  const handleFormStart = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart({
        email: formData.email || undefined,
        first_name: formData.firstName || undefined,
        last_name: formData.lastName || undefined,
        phone: formData.phone || undefined
      });
    }
  };

  // Handle form field changes with tracking
  const handleFieldChange = (fieldName: string, value: string | boolean) => {
    handleFormStart(); // Track form start on first interaction
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));

    // Track field interaction
    trackFormInteraction(fieldName, typeof value === 'string' ? value : value.toString());
  };

  // Handle phone number changes
  const handlePhoneChange = (value: string) => {
    // Remove any non-digit characters except spaces and dashes for display
    const cleaned = value.replace(/[^\d\s\-]/g, '');
    setPhoneNumber(cleaned);
    
    // Create full phone number for form data
    const fullPhone = selectedPrefix.code + cleaned.replace(/[\s\-]/g, '');
    handleFieldChange('phone', fullPhone);
  };

  // Handle prefix selection
  const handlePrefixChange = (prefix: typeof PHONE_PREFIXES[0]) => {
    setSelectedPrefix(prefix);
    setShowPrefixDropdown(false);
    
    // Update full phone number
    if (phoneNumber) {
      const fullPhone = prefix.code + phoneNumber.replace(/[\s\-]/g, '');
      handleFieldChange('phone', fullPhone);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const formDataSubmit = new FormData(e.currentTarget);
    const data = {
      firstName: formDataSubmit.get('firstName') as string,
      lastName: formDataSubmit.get('lastName') as string,
      email: formDataSubmit.get('email') as string,
      phone: selectedPrefix.code + phoneNumber.replace(/[\s\-]/g, ''), // Combine prefix + number
      preferredMonth: selectedMonth,
      consent: formDataSubmit.get('consent') === 'on'
    };

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !phoneNumber) {
      const errorMsg = 'Všechna povinná pole musí být vyplněna';
      setSubmitMessage(errorMsg);
      trackFormError(errorMsg, {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone
      });
      setIsSubmitting(false);
      return;
    }

    // Validate consent
    if (!data.consent) {
      const errorMsg = 'Musíte souhlasit se zpracováním osobních údajů';
      setSubmitMessage(errorMsg);
      trackFormError(errorMsg, {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone
      });
      setIsSubmitting(false);
      return;
    }

    // Track form submission attempt
    trackFormSubmit({
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone
    });

    try {
      // Call BRJ API to create order in system for tracking
      const response = await fetch('/api/proxy/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Track successful registration with order ID
        trackFormSuccess({
          orderId: result.orderNumber || result.hash || `LEAD_${Date.now()}`,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          preferredMonth: data.preferredMonth
        });

        // ✅ KEY CHANGE: Redirect to thank you page instead of payment
        window.location.href = '/dekujeme';
      } else {
        const errorMsg = result.error || 'Došlo k chybě při odesílání formuláře';
        setSubmitMessage(errorMsg);
        trackFormError(errorMsg, {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      const errorMsg = 'Došlo k neočekávané chybě. Zkuste to prosím znovu.';
      setSubmitMessage(errorMsg);
      trackFormError(errorMsg, {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block font-montserrat font-medium text-brand-gray mb-2">
            Jméno *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            disabled={isSubmitting}
            onFocus={handleFormStart}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-brand-gray/20 rounded-lg focus:ring-2 focus:ring-brand-olive focus:border-brand-olive font-montserrat disabled:opacity-50"
            placeholder="Jan"
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block font-montserrat font-medium text-brand-gray mb-2">
            Příjmení *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            disabled={isSubmitting}
            onFocus={handleFormStart}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-brand-gray/20 rounded-lg focus:ring-2 focus:ring-brand-olive focus:border-brand-olive font-montserrat disabled:opacity-50"
            placeholder="Novák"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="email" className="block font-montserrat font-medium text-brand-gray mb-2">
          E-mail *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={isSubmitting}
          onFocus={handleFormStart}
          onChange={(e) => handleFieldChange('email', e.target.value)}
          className="w-full px-4 py-3 border border-brand-gray/20 rounded-lg focus:ring-2 focus:ring-brand-olive focus:border-brand-olive font-montserrat disabled:opacity-50"
          placeholder="jan@example.cz"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block font-montserrat font-medium text-brand-gray mb-2">
          Telefon *
        </label>
        <div className="flex">
          {/* Country prefix dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPrefixDropdown(!showPrefixDropdown)}
              onFocus={handleFormStart}
              disabled={isSubmitting}
              className="flex items-center px-3 py-3 border border-brand-gray/20 border-r-0 rounded-l-lg focus:ring-2 focus:ring-brand-olive focus:border-brand-olive font-montserrat disabled:opacity-50 bg-brand-beige hover:bg-brand-beige/80 transition-colors min-w-[100px]"
            >
              <span className="text-sm">{selectedPrefix.label}</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            
            {showPrefixDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white border border-brand-gray/20 rounded-lg shadow-lg z-10 mt-1">
                {PHONE_PREFIXES.map((prefix) => (
                  <button
                    key={prefix.code}
                    type="button"
                    onClick={() => handlePrefixChange(prefix)}
                    className="w-full px-3 py-2 text-left hover:bg-brand-beige font-montserrat text-sm transition-colors"
                  >
                    {prefix.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Phone number input */}
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            disabled={isSubmitting}
            value={phoneNumber}
            onFocus={handleFormStart}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className="flex-1 px-4 py-3 border border-brand-gray/20 rounded-r-lg focus:ring-2 focus:ring-brand-olive focus:border-brand-olive font-montserrat disabled:opacity-50"
            placeholder="123 456 789"
          />
        </div>
        <p className="text-sm text-brand-gray/60 font-montserrat mt-1">
          Zvolte předvolbu a zadejte číslo bez předvolby
        </p>
      </div>
      
      <div>
        <p className="block font-montserrat font-medium text-brand-gray mb-4">
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
                onChange={(e) => {
                  handleFormStart();
                  setSelectedMonth(e.target.value);
                  trackFormInteraction('preferredMonth', e.target.value);
                }}
                required
                disabled={isSubmitting}
                className="mr-3 w-4 h-4 text-brand-olive focus:ring-brand-olive disabled:opacity-50"
              />
              <label htmlFor={`month-${month}`} className="text-brand-gray/80 font-montserrat">
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
          onFocus={handleFormStart}
          onChange={(e) => handleFieldChange('consent', e.target.checked)}
          className="mt-1 mr-3 disabled:opacity-50"
        />
        <label htmlFor="consent" className="text-brand-gray/80 font-montserrat">
          Souhlasím se zpracováním osobních údajů dle zásad ochrany osobních údajů *
        </label>
      </div>
      
      <div className="text-brand-gray/60 font-montserrat mb-6">
        * Povinné pole
      </div>

      {submitMessage && (
        <div className={`p-4 rounded-lg font-montserrat ${
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
            Zpracovávám registraci...
          </>
        ) : (
          'Registrovat zájem o kurz'
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
          title="Registrace zájmu o kurz s 82% dotací" 
          subtitle="Po registraci vás budeme kontaktovat s dalšími informacemi o termínech a procesu"
        />

        {/* Warning about program ending */}
        <div className="bg-brand-red/10 border border-brand-red/20 rounded-xl p-6 mb-8 max-w-3xl mx-auto">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-brand-red mt-1 mr-4 flex-shrink-0" />
            <div className="text-center w-full">
              <h4 className="font-anton text-lg text-brand-red mb-2">⏰ 82% dotace končí koncem roku 2025</h4>
              <p className="text-brand-gray/80 font-montserrat">
                Po ukončení dotačního programu bude kurz stát plných <span className="whitespace-nowrap">15 000 Kč</span>
              </p>
            </div>
          </div>
        </div>

        {/* Location highlight */}
        <div className="bg-brand-beige border border-brand-olive/20 rounded-xl p-6 mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-center">
            <MapPin className="w-8 h-8 text-brand-olive mr-4" />
            <div className="text-center">
              <h4 className="font-anton text-xl text-brand-gray mb-1">Kurz se koná osobně v Praze</h4>
              <p className="text-brand-gray/80 font-montserrat">Přesnou adresu oznámíme po potvrzení registrace</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-brand-beige p-8 md:p-10 rounded-2xl shadow-md">
            {/* Logo in contact form */}
            <div className="text-center mb-8">
              <Image
                src="/doubletap-logo.webp"
                alt="Double Tap Logo"
                width={150}
                height={70}
                className="mx-auto h-12 w-auto mb-4"
                loading="lazy"
              />
              <h3 className="text-2xl font-anton text-brand-gray">Registrace zájmu o kurz s 82% dotací</h3>
              <p className="text-brand-gray/60 font-montserrat mt-2">
                Po odeslání vás budeme kontaktovat s dalšími informacemi
              </p>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;