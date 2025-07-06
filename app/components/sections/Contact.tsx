'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import SectionHeading from '../common/SectionHeading';
import CTAButton from '../common/CTAButton';
import { MapPin, Loader2, AlertTriangle } from 'lucide-react';
import {
  trackFormStart,
  trackFormInteraction,
  trackFormSubmit,
  trackFormSuccess,
  trackFormError,
  initializeDataLayer
} from '../../../utils/dataLayer';

// Import shared types and constants
import type { ContactFormData } from '../../../types';
import { useAvailableMonths, useFormTracking, useFormSubmission } from '../../../hooks';
import { useAccessibility, useSkipLinks } from '../../../hooks/useAccessibility';
import { FormField, PhoneInput, MonthSelector } from '../ui';
import { SkeletonForm } from '../ui/Skeleton';
import AccessibleButton from '../ui/AccessibleButton';

const ContactForm: React.FC = memo(() => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consent: false
  });

  // Accessibility hooks
  const { announceToScreenReader } = useAccessibility();
  useSkipLinks();

  // Use custom hooks
  const {
    availableMonths,
    selectedMonth,
    setSelectedMonth,
    isLoading: isLoadingMonths,
    hasMonths
  } = useAvailableMonths();

  const {
    handleFormStart,
    handleFieldInteraction,
    handleFormSubmit,
    handleFormSuccess,
    handleFormError
  } = useFormTracking();

  const {
    isSubmitting,
    submitMessage,
    submitForm
  } = useFormSubmission({
    onSuccess: (response) => {
      handleFormSuccess({
        orderId: response.orderNumber || response.hash || `LEAD_${Date.now()}`,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        preferredMonth: selectedMonth
      });
    },
    onError: (errorMessage) => {
      handleFormError(errorMessage, formData);
    }
  });

  // Initialize dataLayer on component mount
  useEffect(() => {
    initializeDataLayer();
  }, []);

  // Handle form field changes with tracking (memoized for performance)
  const handleFieldChange = useCallback((fieldName: string, value: string | boolean) => {
    handleFieldInteraction(fieldName, value);

    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  }, [handleFieldInteraction]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataSubmit = new FormData(e.currentTarget);
    const submissionData = {
      firstName: formDataSubmit.get('firstName') as string,
      lastName: formDataSubmit.get('lastName') as string,
      email: formDataSubmit.get('email') as string,
      phone: formData.phone, // Use the phone from formData (already includes prefix)
      preferredMonth: selectedMonth,
      consent: formDataSubmit.get('consent') === 'on'
    };

    // Track form submission attempt
    handleFormSubmit(formData);

    // Submit the form using the hook
    await submitForm(submissionData);
  };

  // Show skeleton while months are loading
  if (isLoadingMonths && !hasMonths) {
    return <SkeletonForm fields={5} className="max-w-md mx-auto" />;
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4">
        <FormField
          label="Jméno"
          id="firstName"
          name="firstName"
          placeholder="Jan"
          required
          disabled={isSubmitting}
          onFocus={handleFormStart}
          onChange={(e) => handleFieldChange('firstName', e.target.value)}
        />

        <FormField
          label="Příjmení"
          id="lastName"
          name="lastName"
          placeholder="Novák"
          required
          disabled={isSubmitting}
          onFocus={handleFormStart}
          onChange={(e) => handleFieldChange('lastName', e.target.value)}
        />
      </div>
      
      <FormField
        label="E-mail"
        id="email"
        name="email"
        type="email"
        placeholder="jan@example.cz"
        required
        disabled={isSubmitting}
        onFocus={handleFormStart}
        onChange={(e) => handleFieldChange('email', e.target.value)}
      />
      
      <PhoneInput
        required
        disabled={isSubmitting}
        onFocus={handleFormStart}
        onPhoneChange={(fullPhone) => {
          setFormData(prev => ({ ...prev, phone: fullPhone }));
          handleFieldInteraction('phone', fullPhone);
        }}
      />
      
      <MonthSelector
        availableMonths={availableMonths}
        selectedMonth={selectedMonth}
        isLoading={isLoadingMonths}
        required
        disabled={isSubmitting}
        onMonthChange={(month) => {
          setSelectedMonth(month);
          handleFieldInteraction('preferredMonth', month);
        }}
        onInteraction={handleFormStart}
      />
      
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
      
      <AccessibleButton
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isSubmitting}
        loadingText="Zpracovávám registraci..."
        ariaLabel={isSubmitting ? "Zpracovávám registraci kurzu" : "Registrovat zájem o kurz"}
        className="bg-brand-red hover:bg-brand-red/90 focus:ring-brand-red"
        onClick={() => {
          if (isSubmitting) return;
          announceToScreenReader('Odesílám formulář registrace');
        }}
      >
        Registrovat zájem o kurz
      </AccessibleButton>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';

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