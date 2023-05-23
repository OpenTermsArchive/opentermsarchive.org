// do not use IMPORT as it would break the build
// https://github.com/sendinblue/APIv3-typescript-library/pull/24
// https://github.com/vercel/next.js/discussions/20315
const {
  ContactsApi,
  ContactsApiApiKeys,
  GetContactDetails,
  GetList,
} = require('sib-api-v3-typescript');

export type ContactList = typeof GetList;
export type Contact = typeof GetContactDetails;

class NotificationSubscription {
  private contactsApi: any;

  constructor(apiKey: string) {
    this.contactsApi = new ContactsApi();
    this.contactsApi.setApiKey(ContactsApiApiKeys.apiKey, apiKey);
  }

  public async createContactList({ name, folderId }: { name: string; folderId: number }) {
    try {
      const response = await this.contactsApi.createList({ name, folderId });
      return response?.body || [];
    } catch (err) {
      // @ts-ignore
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
      // @ts-ignore
      console.error(err.toString(), err?.response?.body?.message);
      return { lists: [], count: 0 };
    }
  }

  public async getContactLists(limit: number = 50, offset: number = 0) {
    try {
      const response = await this.contactsApi.getLists(limit, offset);
      return response?.body || [];
    } catch (err) {
      // @ts-ignore
      console.error(err.toString(), err?.response?.body?.message || err?.response?.statusMessage);

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
      // @ts-ignore
      console.error(err.toString(), err?.response?.body?.message);
      return null;
    }
  }

  public async createContact(email: string, otherFields: { listIds?: number[] } = {}) {
    try {
      const response = await this.contactsApi.createContact({ email, ...otherFields });
      return response?.body?.email ? response?.body : null;
    } catch (err) {
      // @ts-ignore
      console.error(err.toString(), err?.response?.body?.message);
      return null;
    }
  }
}

export default NotificationSubscription;
