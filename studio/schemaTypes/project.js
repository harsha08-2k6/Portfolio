export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'general', title: 'General Info' },
    { name: 'details', title: 'Detailed Case Study' },
  ],
  fields: [
    // General Info (Used for the cards and hero)
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'general',
    },
    {
      name: 'description',
      title: 'Short Description (Card)',
      type: 'text',
      group: 'general',
    },
    {
      name: 'tagline',
      title: 'Tagline (Hero)',
      type: 'string',
      group: 'general',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      group: 'general',
    },
    {
      name: 'link',
      title: 'Live Link',
      type: 'url',
      group: 'general',
    },
    {
      name: 'github',
      title: 'GitHub Repo',
      type: 'url',
      group: 'general',
    },
    {
      name: 'tags',
      title: 'Tags (Card)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'general',
    },
    
    // Details Page Fields (Used when you click into a project)
    {
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'details',
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
      group: 'details',
    },
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      group: 'details',
    },
    {
      name: 'overview',
      title: 'Project Overview',
      type: 'text',
      group: 'details',
    },
    {
      name: 'role',
      title: 'Your Role(s)',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'details',
    },
    {
      name: 'techStack',
      title: 'Tech Stack (Detailed)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label (e.g. Frontend)', type: 'string' },
            { name: 'value', title: 'Value (e.g. React, Next.js)', type: 'string' }
          ]
        }
      ],
      group: 'details',
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'details',
    },
    {
      name: 'structure',
      title: 'Code Structure (Code snippet)',
      type: 'text',
      group: 'details',
    },
    {
      name: 'structureBullets',
      title: 'Code Structure Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'details',
    },
    {
      name: 'challenges',
      title: 'Challenges & Solutions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'challenge', title: 'Challenge', type: 'string' },
            { name: 'solution', title: 'Solution', type: 'text' }
          ]
        }
      ],
      group: 'details',
    }
  ]
}
