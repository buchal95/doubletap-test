/**
 * Localization Constants
 * 
 * All text constants, month names, and localization-related data
 */

import type { PhonePrefix } from '../types';

// Czech month names (nominative case - for form options)
export const MONTHS_CZ = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
] as const;

// Czech month names (genitive case - for dates like "15. ledna 2024")
export const CZECH_MONTHS_GENITIVE = [
  'ledna', 'února', 'března', 'dubna', 'května', 'června',
  'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'
] as const;

// Phone prefixes for Czech Republic and Slovakia
export const PHONE_PREFIXES: PhonePrefix[] = [
  { code: '+420', country: 'CZ', label: '🇨🇿 +420' },
  { code: '+421', country: 'SK', label: '🇸🇰 +421' }
] as const;

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELDS: 'Všechna povinná pole musí být vyplněna',
  CONSENT_REQUIRED: 'Musíte souhlasit se zpracováním osobních údajů',
  INVALID_EMAIL: 'Neplatný formát e-mailové adresy',
  INVALID_PHONE: 'Neplatný formát telefonního čísla',
  FORM_ERROR: 'Došlo k chybě při odesílání formuláře',
  UNEXPECTED_ERROR: 'Došlo k neočekávané chybě. Zkuste to prosím znovu.',
  CALENDAR_ERROR: 'Nepodařilo se načíst události z kalendáře',
  NO_TERMS_AVAILABLE: 'Momentálně nejsou k dispozici žádné termíny. Zkuste to prosím později.',
  LOADING_TERMS: 'Načítám dostupné termíny...'
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Formulář byl úspěšně odeslán',
  REGISTRATION_SUCCESS: 'Registrace byla úspěšná'
} as const;

// Common UI text
export const UI_TEXT = {
  LOADING: 'Načítám...',
  RETRY: 'Zkusit znovu',
  CLOSE: 'Zavřít',
  SUBMIT: 'Odeslat',
  CANCEL: 'Zrušit',
  REQUIRED_FIELD: '* Povinné pole',
  PHONE_HELP: 'Zvolte předvolbu a zadejte číslo bez předvolby'
} as const;

// Course-specific text
export const COURSE_TEXT = {
  TITLE: 'Kurz profesionální tvorby videí',
  SUBTITLE: 'S 82% dotací od státu',
  LOCATION: 'Kurz se koná osobně v Praze',
  SUBSIDY_ENDS: '82% dotace končí koncem roku 2025',
  FULL_PRICE: '15 000 Kč',
  DISCOUNTED_PRICE: '2 700 Kč',
  REGISTRATION_BUTTON: 'Registrovat zájem o kurz',
  USE_SUBSIDY_BUTTON: 'Chci využít 82% dotaci'
} as const;
