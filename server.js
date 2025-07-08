import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import up from 'up-node';
import homeRouter from './routes/home.js';
import searchRouter from './routes/search.js';

// Set your app token from environment variables
// You can obtain this from the Underlings Developer Dashboard
up.setToken(process.env.UP_TOKEN);

const app = express();

app.use(cors());
app.use(express.static('www'));

/**
 * To enable your app to display a home card on the Underlings Platform:
 * 1. Configure a home card endpoint
 * 2. Register the endpoint in the Underlings Developer Dashboard
 */
app.use('/home', homeRouter);

/**
 * To enable your app to display a search card on the Underlings Platform:
 * 1. Configure a search card endpoint
 * 2. Register the endpoint in the Underlings Developer Dashboard
 */
app.use('/search', searchRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

/**
 * Registers an example item with the Underlings Platform. 
 * Registering items enables Underlings to recommend this item to users based on their goals.
 * It also allows you to create notifications for users about this item.
 */
async function registerExampleItem() {
  const item = {
    type: 'article', // The type of the item, e.g., 'article', 'video', 'podcast', etc.
    title: 'An Incredible Article', // The title of the item - required
    description: 'This article provides insights into leadership and personal growth.', // A description of the item - optional
    pictureUrl: 'https://example.com/article-image.png', // A URL to an image representing the item - optional
    ref: 'incredible-article', // Your reference ID for the item (can be used to reconcile data) - optional
    path: '/incredible-article', // The relative path where the item can be accessed in your app - optional
  };
  const registeredItemId = await up.registerItem(item);
  console.log('Registered item:', registeredItemId);
  return registeredItemId;
}

/**
 * Creates an example notification for a user.
 * Notifications are used to inform users about important events or updates.
 * You can create notifications for registered items, or for general events.
 */
async function createExampleNotification() {
  const notification = {
    recipientId: '8e21eb1f-e15e-5c23-9c6a-46c94719da36', // The UP user ID of the recipient
    title: 'Video Transcribed', // The title of the notification - required
    message: 'Your transcript has finished processing', // A longer message content of the notification - optional
    // actorId: null, // The UP user ID of the actor (the user who triggered the notification) - optional
    path: '/videos/131krae', // The relative path where the user can view the notification in your app - optional
    // itemId: registeredItemId, // The ID of the item associated with the notification - optional (you must register the item first)
  };
  const notificationId = await up.createNotification(notification);
  console.log('Created notification:', notificationId);
  return notificationId;
}

/**
 * Creates an example SKU (Stock Keeping Unit) for a product.
 * SKUs are used to represent products or services that can be charged to users.
 * You can create SKUs via the API or through the Underlings Developer Dashboard.
 * This example creates a SKU for video transcription services.
 * You must create the SKU before incurring charges for it.
 */
async function createExampleSku() {
  const SKU_SLUG = 'video-transcription-minutes'; // A unique identifier for the SKU
  const sku = {
    slug: SKU_SLUG, // A unique identifier for the SKU - required
    name: 'Video Transcription', // The name of the SKU - required
    unitName: 'minute', // The unit name for the SKU - required
    unitPrice: 0.30, // The price per unit for the SKU (in USD) - required
    description: 'Transcribe videos into text', // A description of the SKU - optional
  }
  await up.createSku(sku);
}

/**
 * Incurs an example charge
 * This example uses the SKU slug 'video-transcription-minutes' 
 * You must create the SKU before incurring charges for it.
 */
async function incurExampleCharge() {
    const SKU_SLUG = 'video-transcription-minutes'; // A unique identifier for the SKU
  const charge = {
    userId: '8e21eb1f-e15e-5c23-9c6a-46c94719da36', // The ID of the user to charge - required
    skuSlug: SKU_SLUG, // The SKU slug to charge for - required
    quantity: 1, // The number of units to charge. The total billed amount = sku.unitPrice * quantity - required
    ref: 'video-transcription-12345', // Your unique reference ID for the charge - optional
  }
  const chargeId = await up.incurCharge(charge);
  console.log('Charge incurred:', chargeId);
  return chargeId;
}