import { Contact, ContactList } from 'utils/notification-subscription';

export interface GetServiceResponse {
  status: 'ok' | 'ko';
  message?: string;
}

export interface CreateSubscriptionResponse extends GetServiceResponse {
  contactList?: ContactList;
  contact?: Contact;
}
