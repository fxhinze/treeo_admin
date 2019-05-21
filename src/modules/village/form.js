const formFields = [
  {
    name: 'id',
    label: 'ID',
    show: {
      create: false
    }
  },
  {
    name: 'name',
    label: 'Name'
  },
  {
    name: 'district_id',
    label: 'District',
    settings: {
      itemText: 'name',
      itemValue: 'id',
    }
  },
]

export default {
  fields: formFields
}