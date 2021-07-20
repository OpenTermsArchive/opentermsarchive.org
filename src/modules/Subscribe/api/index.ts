import type { NextApiRequest, NextApiResponse } from 'next';

import { CreateSubscriptionResponse } from '../interfaces';
import HttpStatusCode from 'http-status-codes';
import NotificationSubscription from 'utils/notification-subscription';

const notificationSubscription = new NotificationSubscription();

const SIB_SERVICE_PROVIDER_UPDATE_FOLDER_ID = 203;

const createSubscription =
  (contactListName: string, email: string) =>
  async (_: NextApiRequest, res: NextApiResponse<CreateSubscriptionResponse>) => {
    let contactList = await notificationSubscription.searchContactList(contactListName);

    if (!contactList) {
      await notificationSubscription.createContactList({
        name: contactListName,
        folderId: SIB_SERVICE_PROVIDER_UPDATE_FOLDER_ID,
      });

      contactList = await notificationSubscription.searchContactList(contactListName);
    }

    if (!contactList) {
      res.statusCode = HttpStatusCode.NOT_FOUND;
      res.json({ status: 'ko', message: 'Contact list not found' });
      return;
    }

    let contact = await notificationSubscription.getContact(email);

    if (!contact) {
      await notificationSubscription.createContact(email, {
        listIds: [contactList.id],
      });

      contact = await notificationSubscription.getContact(email);
    } else {
      await notificationSubscription.addContactToList({ email, contactListId: contactList.id });
    }

    res.json({
      status: 'ok',
      message: 'Contact added to list',
      contactList,
      contact,
    });
  };

const subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  const queryParams = req?.query;

  if (req.method === 'GET' && queryParams.contactListName && queryParams.email) {
    return createSubscription(queryParams.contactListName as string, queryParams.email as string)(
      req,
      res
    );
  }

  res.statusCode = HttpStatusCode.FORBIDDEN;
  res.json({ status: 'ko', message: 'Nothing there' });
};

export default subscribe;
