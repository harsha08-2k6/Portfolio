import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '5g58c4t6',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-03-01', // target latest API version
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
}
