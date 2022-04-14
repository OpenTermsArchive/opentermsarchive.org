import * as otaApi from 'modules/OTA-api/api';

import type { NextApiRequest, NextApiResponse } from 'next';

import { CreateSubscriptionResponse } from '../interfaces';
import HttpStatusCode from 'http-status-codes';
import NotificationSubscription from 'utils/notification-subscription';

if (!process.env.SENDINBLUE_API_KEY) {
  console.error('You need a SENDINBLUE_API_KEY env variable');
  process.exit();
}

const notificationSubscription = new NotificationSubscription(process.env.SENDINBLUE_API_KEY);

const SIB_SERVICE_PROVIDER_UPDATE_FOLDER_ID = 598;

const createSubscription =
  ({ service, documentType, email }: { service: string; documentType: string; email: string }) =>
  async (_: NextApiRequest, res: NextApiResponse<CreateSubscriptionResponse>) => {
    const existingService = await otaApi.getService(service);
    if (!existingService.includes(documentType)) {
      res.statusCode = HttpStatusCode.NOT_FOUND;
      res.json({ status: 'ko', message: 'Service and document type not found' });
      return;
    }

    const contactListName = `${service} - ${documentType} - Update`;
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
  const bodyParams = req?.body;

  if (req.method === 'POST') {
    return createSubscription(bodyParams)(req, res);
  }

  res.statusCode = HttpStatusCode.FORBIDDEN;
  res.json({ status: 'ko', message: 'Nothing there' });
};

export default subscribe;
