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
    name: 'survey_id',
    label: 'Survey ID',
    settings: {
      itemText: 'name',
      itemValue: 'id'
    }
  },
  {
    name: 'species_id',
    label: 'Species',
    settings: {
      itemText: 'name',
      itemValue: 'id'
    }
  },
  {
    name: 'dbh_cm',
    label: 'DBH [cm]',
    empty: true
  },
  {
    name: 'height_m',
    label: 'Height [m]',
    empty: true
  },
  {
    name: 'timestamp',
    label: 'Timestamp',
  },
  {
    name: 'comment',
    label: 'Comment',
    empty: true,
    settings: {
      autoGrow: true
    }
  },
  {
    name: 'health',
    label: 'Health',
    empty: true
  },
  {
    name: 'amigo_id',
    label: 'Amigo ID',
    empty: true
  },
]

export default {
  fields: formFields
}