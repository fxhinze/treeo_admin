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
    name: 'farmer_id',
    label: 'Farmer',
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
    name: 'soil_type_id',
    label: 'Soil Type',
    settings: {
      itemText: 'name',
      itemValue: 'id'
    }
  },
  {
    name: 'legal_status_id',
    label: 'Legal Status',
    settings: {
      itemText: 'name',
      itemValue: 'id'
    }
  },
  {
    name: 'village_id',
    label: 'Village',
    settings: {
      itemText: 'name',
      itemValue: 'id'
    }
  },
  {
    name: 'planting_distance_id',
    label: 'Planting Distance',
    settings: {
      itemText: 'name',
      itemValue: 'id'
    }
  },
  {
    name: 'field_coordinator_id',
    label: 'Field Coordinator',
    settings: {
      itemText: 'name',
      itemValue: 'id'
    }
  },
  {
    name: 'supporter_id',
    label: 'Supporter',
    settings: {
      itemText: 'name',
      itemValue: 'id'
    }
  },
  {
    name: 'planting_date',
    label: 'Planting Date'
  },
  {
    name: 'video_url',
    label: 'Video'
  },
  {
    name: 'active',
    label: 'Active'
  },
  {
    name: 'sample',
    label: 'Sample'
  },
  {
    name: 'plants_planted',
    label: 'Plants Planted'
  },
]

export default {
  fields: formFields
}