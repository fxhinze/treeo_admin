export const detailList = [
  {
    name: 'identifier',
    label: 'ID',
    icon: 'fingerprint',
  },
  {
    name: 'farmer',
    label: 'Farmer',
    icon: 'person',
    route: { name: 'farmer-overview', id: 'farmer_id' }
  },
  {
    name: 'project',
    label: 'Project',
  },
  {
    name: 'polygon_id',
    label: 'Polygon',
  },
  {
    name: 'area_m2',
    label: 'Area [m²]',
  },
  {
    name: 'species',
    label: 'Species',
  },
  {
    name: 'survey_count',
    label: 'Survey Count',
  },
  {
    name: 'latest_survey_date',
    label: 'Last Survey',
  },
  {
    name: 'latest_survey_treecount',
    label: 'Tree count',
  },
  {
    name: 'latest_survey_dbh_mean',
    label: 'DBH (mean) [cm]',
  },
  {
    name: 'latest_survey_height_mean',
    label: 'Height (mean) [m]',
  },
  {
    name: 'latest_survey_tree_volume',
    label: 'Volume [m³]',
  },
  {
    name: 'latest_survey_value_ird',
    label: 'Value [IDR]',
  },
  {
    name: 'trees_per_ha',
    label: 'Trees/ha',
  },
  {
    name: 'soil_type',
    label: 'Soil Type',
  },
  {
    name: 'legal_status',
    label: 'Legal Status',
  },
  {
    name: 'village',
    label: 'Village',
  },
  {
    name: 'district',
    label: 'District',
  },
  {
    name: 'planting_distance',
    label: 'Planting Distance',
  },
  {
    name: 'field_coordinator',
    label: 'Field Coordinator',
  },
  {
    name: 'supporter',
    label: 'Supporter',
    route: { name: 'supporter-overview', id: 'supporter_id' }
  },
  {
    name: 'planting_date',
    label: 'Planting Date',
  },
  {
    name: 'video_url',
    label: 'Video',
  },
  {
    name: 'active',
    label: 'Active',
    type: 'bool'
  },
  {
    name: 'sample',
    label: 'Sample',
    type: 'bool'
  },
  {
    name: 'plants_planted',
    label: 'Plants Planted',
  },
  {
    name: 'created_at',
    label: 'Created',
  },
  {
    name: 'updated_at',
    label: 'Updated',
  },
]

export default {
  detailList
}