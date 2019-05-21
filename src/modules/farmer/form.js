const formFields = [
  {
    name: 'identifier',
    label: 'ID',
    settings: {
      disabled: true,
    },
    show: {
      create: false,
    }
  },
  {
    name: 'name',
    label: 'Name'
  },
  {
    name: 'project_id',
    label: 'Project',
    settings: {
      itemText: 'name',
      itemValue: 'id'
    }
  },
  {
    name: 'email',
    label: 'Email',
    show: {
      edit: false,
    }
  },
  {
    name: 'children',
    label: 'Children',
    empty: true
  },
  {
    name: 'birthday',
    label: 'Birthday',
  },
  {
    name: 'gender_id',
    label: 'Gender',
    settings: {
      itemText: 'name',
      itemValue: 'id'
    }
  },
  {
    name: 'main_occupation',
    label: 'Main Occupation',
  },
  {
    name: 'side_occupation',
    label: 'Side Occupation',
  },
  {
    name: 'spouse_name',
    label: 'Spouse Name',
  },
  {
    name: 'spouse_birthday',
    label: 'Spouse Birthday',
  },
  {
    name: 'spouse_main_occupation',
    label: 'Spouse Main Occupation',
  },
  {
    name: 'spouse_side_occupation',
    label: 'Spouse Side Occupation',
  },
  {
    name: 'family_income_idr',
    label: 'Family Income IDR',
  },
  {
    name: 'address',
    label: 'Address',
    settings: {
      autoGrow: true
    }
  },
  {
    name: 'story',
    label: 'Story',
    settings: {
      autoGrow: true
    }
  },
]

export default {
  fields: formFields
}