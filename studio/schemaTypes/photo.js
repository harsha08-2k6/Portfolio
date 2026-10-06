export default {
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.custom((title, context) => {
        if (context.document.category === 'Travel' && !title) {
          return 'Title is required for Travel';
        }
        return true;
      }),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Photos', value: 'Photos' },
          { title: 'Travel', value: 'Travel' },
          { title: 'Videos', value: 'Videos' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      // Make image optional if category is Videos, otherwise required
      validation: Rule => Rule.custom((image, context) => {
        if (context.document.category !== 'Videos' && !image && (!context.document.images || context.document.images.length === 0)) {
          return 'At least one image is required for this category'
        }
        return true
      }),
    },
    {
      name: 'images',
      title: 'Gallery Images (Multiple)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Upload multiple images here (e.g. for a Travel location).',
    },
    {
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      description: 'Upload a video file (MP4, WebM, etc.). You can also provide a thumbnail image above.',
      hidden: ({ document }) => !['Videos', 'Travel'].includes(document?.category),
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Important for accessibility and SEO.',
    },
  ],
}
