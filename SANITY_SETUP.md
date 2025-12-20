# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for your portfolio website.

## Step 1: Create a Sanity Project

1. Go to [sanity.io](https://sanity.io) and sign up/log in
2. Create a new project from the dashboard
3. Choose the "Clean project with no predefined schema" template
4. Note your **Project ID** and **Dataset name** (usually "production")

## Step 2: Configure Environment Variables

Add these to your environment (in Lovable, you can add secrets):

```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
```

## Step 3: Set Up Sanity Studio

In your Sanity project folder, create the following schema files:

### schemas/heroContent.ts
```typescript
export default {
  name: 'heroContent',
  title: 'Hero Content',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'text' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    {
      name: 'ctaPrimary',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Link', type: 'string' },
      ],
    },
    {
      name: 'ctaSecondary',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        { name: 'text', title: 'Button Text', type: 'string' },
        { name: 'link', title: 'Link', type: 'string' },
      ],
    },
  ],
}
```

### schemas/skill.ts
```typescript
export default {
  name: 'skill',
  title: 'Skills',
  type: 'document',
  fields: [
    { name: 'name', title: 'Skill Name', type: 'string' },
    { name: 'category', title: 'Category', type: 'string' },
    { name: 'proficiency', title: 'Proficiency (%)', type: 'number', validation: (Rule: any) => Rule.min(0).max(100) },
    { name: 'icon', title: 'Icon Name', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
}
```

### schemas/activity.ts
```typescript
export default {
  name: 'activity',
  title: 'Recent Activities',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Project', 'Certification', 'Publication', 'Event', 'Achievement'] } },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'link', title: 'External Link', type: 'url' },
  ],
}
```

### schemas/certification.ts
```typescript
export default {
  name: 'certification',
  title: 'Certifications',
  type: 'document',
  fields: [
    { name: 'title', title: 'Certificate Title', type: 'string' },
    { name: 'issuer', title: 'Issuing Organization', type: 'string' },
    { name: 'year', title: 'Year', type: 'string' },
    { name: 'credentialId', title: 'Credential ID', type: 'string' },
    { name: 'credentialUrl', title: 'Credential URL', type: 'url' },
    { name: 'image', title: 'Certificate Image', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
}
```

### schemas/experience.ts
```typescript
export default {
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    { name: 'title', title: 'Job Title', type: 'string' },
    { name: 'company', title: 'Company', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'startDate', title: 'Start Date', type: 'string' },
    { name: 'endDate', title: 'End Date', type: 'string' },
    { name: 'current', title: 'Currently Working', type: 'boolean' },
    { name: 'description', title: 'Description Points', type: 'array', of: [{ type: 'string' }] },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
}
```

### schemas/education.ts
```typescript
export default {
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    { name: 'degree', title: 'Degree', type: 'string' },
    { name: 'institution', title: 'Institution', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'startYear', title: 'Start Year', type: 'string' },
    { name: 'endYear', title: 'End Year', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
}
```

### schemas/project.ts
```typescript
export default {
  name: 'project',
  title: 'Design Projects',
  type: 'document',
  fields: [
    { name: 'title', title: 'Project Title', type: 'string' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Mechanical', 'Automotive', 'Aerospace', 'Manufacturing', 'Product'] } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'image', title: 'Project Image', type: 'image', options: { hotspot: true } },
    { name: 'problem', title: 'Problem Statement', type: 'text' },
    { name: 'solution', title: 'Solution', type: 'text' },
    { name: 'tools', title: 'Tools Used', type: 'array', of: [{ type: 'string' }] },
    { name: 'featured', title: 'Featured Project', type: 'boolean' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
}
```

### schemas/siteSettings.ts
```typescript
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'name', title: 'Your Name', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'resumeUrl', title: 'Resume PDF URL', type: 'url' },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'github', title: 'GitHub', type: 'url' },
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
      ],
    },
  ],
}
```

### schemas/index.ts
```typescript
import heroContent from './heroContent'
import skill from './skill'
import activity from './activity'
import certification from './certification'
import experience from './experience'
import education from './education'
import project from './project'
import siteSettings from './siteSettings'

export const schemaTypes = [
  heroContent,
  skill,
  activity,
  certification,
  experience,
  education,
  project,
  siteSettings,
]
```

## Step 4: Deploy Sanity Studio

1. Run `npx sanity deploy` to deploy your Sanity Studio
2. Access it at `https://your-project.sanity.studio`

## Step 5: Add Content

1. Go to your Sanity Studio
2. Add content for each content type
3. The website will automatically fetch and display your content

## Fallback Content

The website includes fallback data that displays when Sanity is not connected. Once you connect your Sanity project and add content, it will automatically use your CMS data instead.
