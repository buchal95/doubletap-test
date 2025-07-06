/**
 * Analytics and Tracking Related Types
 */

export interface BaseEventData {
  event: string;
  event_category?: string;
  event_label?: string;
  fb_event_parameters?: any;
  [key: string]: any;
}

export interface MetaAdvancedMatching {
  em?: string;        // Email - lowercase, bez mezer
  fn?: string;        // Křestní jméno - lowercase, bez mezer  
  ln?: string;        // Příjmení - lowercase, bez mezer
  ph?: string;        // Telefon - s kódem země, bez mezer/pomlček
  external_id?: string; // Externí ID
}

export interface FormEventData extends BaseEventData {
  form_name?: string;
  form_step?: string;
  field_name?: string;
  field_value?: string;
  error_message?: string;
  button_text?: string;
  button_location?: string;
  user_data?: {
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
  };
  fb_advanced_matching?: MetaAdvancedMatching;
}

export interface ConversionEventData extends BaseEventData {
  conversion_id?: string;
  order_id?: string;
  transaction_id?: string;
  page_title?: string;
  page_location?: string;
  video_name?: string;
  video_action?: string;
  video_progress?: number;
  scroll_depth?: number;
  fb_advanced_matching?: MetaAdvancedMatching;
}

export interface CTAClickData {
  button_text: string;
  button_location: string;
  timestamp: number;
}

export interface FormSuccessData {
  orderId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  preferredMonth?: string;
}
