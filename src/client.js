import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '5g58c4t6',
  dataset: 'production',
  apiVersion: '2024-01-01', // Use a recent date string
  useCdn: true, // Use CDN for faster response, false for real-time fresh data
});

// Helper function to build image URLs from Sanity's image records
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
