export const contactFormFields = [
  {
    name: 'name',
    label: 'Name',
    prefix: '~/name $',
    type: 'text',
    placeholder: 'Your name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    prefix: '~/email $',
    type: 'email',
    placeholder: 'your.email@example.com',
    required: true,
  },
  {
    name: 'message',
    label: 'Message',
    prefix: '~/message $',
    type: 'textarea',
    placeholder: 'Tell me about your project or question',
    rows: 5,
    required: true,
  },
];
