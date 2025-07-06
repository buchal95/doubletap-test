/**
 * Form and User Input Related Types
 */

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
}

export interface ContactFormSubmission extends ContactFormData {
  preferredMonth: string;
}

export interface PhonePrefix {
  code: string;
  country: string;
  label: string;
}

export interface FormValidationError {
  field: string;
  message: string;
}

export interface FormState {
  isSubmitting: boolean;
  isLoading: boolean;
  errors: FormValidationError[];
  submitMessage: string;
}

// Order/API related types
export interface OrderRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredMonth: string;
  consent: boolean;
}

export interface OrderResponse {
  success: boolean;
  orderNumber?: string;
  hash?: string;
  error?: string;
  links?: {
    payLink: string;
    orderPageLink: string;
  };
}

export interface BRJOrderData {
  customer: {
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    phone: string;
    newsletter: boolean;
    primaryLocale: string;
    customerRealIp: string;
  };
  items: Array<{
    label: string;
    price: number;
    vat: number;
    count: number;
    sale: number;
    unit: string;
  }>;
  locale: string;
  currency: string;
  publicNotice: string;
  internalNotice: string;
  returnUrl: string;
}

export interface BRJOrderResponse {
  orderNumber: string;
  hash: string;
  links: {
    payLink: string;
    orderPageLink: string;
  };
}
