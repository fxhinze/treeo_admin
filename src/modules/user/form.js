const formFields = [
  {
    name: 'id',
    label: 'ID',
  },
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'email',
    label: 'Email',
    show: {
      profile: false,
    }
  },
  {
    name: 'password',
    label: 'Password',
    settings: {
      type: 'password'
    },
    show: {
      create: false,
    },
  },
  {
    name: 'username',
    label: 'Username',
    show: {
      edit: false,
      profile: false,
    }
  },
  {
    name: 'admin',
    label: 'Administrator',
    show: {
      profile: false,
    }
  }
]

export default {
  fields: formFields
}