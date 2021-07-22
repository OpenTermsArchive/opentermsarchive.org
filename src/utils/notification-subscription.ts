import * as SibApiV3Sdk from 'sib-api-v3-typescript';

export type ContactList = SibApiV3Sdk.GetList;
export type Contact = SibApiV3Sdk.GetContactDetails;

class NotificationSubscription {
  private contactsApi: any;

  constructor(apiKey: string) {
    this.contactsApi = new SibApiV3Sdk.ContactsApi();
    this.contactsApi.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, apiKey);
  }

  public async createContactList({ name, folderId }: { name: string; folderId: number }) {
    try {
      const response = await this.contactsApi.createList({ name, folderId });
      return response?.body || [];
    } catch (err) {
      console.error(err.toString(), err?.response?.body?.message);
      return { lists: [], count: 0 };
    }
  }
  public async addContactToList({
    email,
    contactListId,
  }: {
    email: string;
    contactListId: number;
  }) {
    try {
      const response = await this.contactsApi.addContactToList(contactListId, { emails: [email] });

      return response?.body?.contacts || [];
    } catch (err) {
      console.error(err.toString(), err?.response?.body?.message);
      return { lists: [], count: 0 };
    }
  }

  public async getContactLists(limit: number = 50, offset: number = 0) {
    try {
      const response = await this.contactsApi.getLists(limit, offset);
      return response?.body || [];
    } catch (err) {
      console.error(err.toString(), err?.response?.body?.message);
      return { lists: [], count: 0 };
    }
  }

  public async getAllContactLists() {
    let limit = 50; // max number available
    let contactLists = [];

    const { lists, count } = await this.getContactLists(limit, 0);

    contactLists = [...lists];
    const nbPages = Math.ceil(count / limit);

    for (let i = 1; i <= nbPages - 1; i++) {
      const { lists } = await this.getContactLists(limit, limit * nbPages * i);

      contactLists = [...contactLists, ...lists];
    }

    return { lists: contactLists, count };
  }

  public async searchContactList(name: string): Promise<ContactList | undefined> {
    const { lists } = await this.getAllContactLists();
    const list = lists.find((list) => list.name === name);
    return list;
  }

  public async getContact(email: string) {
    try {
      const response = await this.contactsApi.getContactInfo(email);
      return response?.body?.email ? response?.body : null;
    } catch (err) {
      console.error(err.toString(), err?.response?.body?.message);
      return null;
    }
  }

  public async createContact(email: string, otherFields: { listIds?: number[] } = {}) {
    try {
      const response = await this.contactsApi.createContact({ email, ...otherFields });
      return response?.body?.email ? response?.body : null;
    } catch (err) {
      console.error(err.toString(), err?.response?.body?.message);
      return null;
    }
  }
}

export default NotificationSubscription;
