export default [
  {
    name: 'Data Converter',
    path: '/apps/data-converter',
    component: () => import('../views/apps/DataConverter.vue'),
    meta: {
      title: 'Data Converter',
      description: 'Convert the data into a desirable format.'
    }
  },
  {
    name: 'Password Generator',
    path: '/apps/password-generator',
    component: () => import('../views/apps/PasswordGenerator.vue'),
    meta: {
      title: 'Password Generator',
      description: 'Generate a random password.'
    }
  },
  {
    name: 'Pastebin',
    path: '/apps/pastebin',
    component: () => import('../views/apps/Pastebin.vue'),
    meta: {
      title: 'Pastebin',
      description: 'Retrieve your message anywhere.'
    }
  }
]
