const formFields = [
  {
    name: 'id',
    label: 'ID',
    settings: {
      disabled: true,
    },
    show: {
      create: false
    }
  },
  {
    name: 'date_start',
    label: 'Start',
  },
  {
    name: 'date_end',
    label: 'End',
  },
  {
    name: 'plot_id',
    label: 'Plot ID',
    settings: {
      itemText: 'id',
      itemValue: 'id'
    }
  },
  {
    name: 'notes',
    label: 'Notes',
    settings: {
      autoGrow: true
    }
  },
  {
    name: 'treecount',
    label: 'Tree Count',
  },
]

export default {
  fields: formFields
}