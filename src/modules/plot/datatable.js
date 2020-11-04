export const columns = [
  {
    primaryKey: true,
    name: 'id',
    label: 'ID',
    visible: false,
  },
  {
    name: 'identifier',
    label: 'ID',
    width: 100,
    fixedColumn: true,
    type: 'link',
    link: { name: 'plot-overview', id: 'identifier' },
  },
  {
    name: 'farmer',
    label: 'Farmer',
    width: 180,
    type: 'link',
    link: { name: 'farmer-overview', id: 'farmer_id' },
  },
  {
    name: 'farmer_id',
    label: 'Farmer ID',
    visible: false,
  },
  {
    name: 'polygon_id',
    label: 'Polygon',
    width: 150,
    filterTypes: [
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'project',
    label: 'Project',
    width: 150,
    filterTypes: [
      { name: 'select', label: 'Select', dispatch: 'plot/fetchProjects', itemText: 'name' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'area_m2',
    label: 'Area [m²]',
    width: 100,
    textAlign: 'right',
    filterTypes: [
      // { name: 'number_range', label: 'Number Range', range: [0, 500] },
      { name: 'number_range', label: 'Number Range' },
      { name: 'number', label: 'Number' },
      { name: 'empty', label: 'Empty' },
    ],
    // filterRange: [0, 500],
  },
  {
    name: 'species',
    label: 'Species',
    width: 150,
    filterTypes: [
      { name: 'select', label: 'Select', dispatch: 'plot/fetchSpecies', itemText: 'name' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'survey_count',
    label: 'Survey Count',
    width: 120,
    textAlign: 'right',
    filterTypes: [
      { name: 'number_range', label: 'Number Range' },
      { name: 'number', label: 'Number' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'latest_survey_date',
    label: 'Last Survey',
    width: 120,
    filterTypes: [
      { name: 'date_range', label: 'Date Range' },
      { name: 'date', label: 'Month' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'latest_survey_treecount',
    label: 'Tree count',
    width: 120,
    textAlign: 'right',
    filterTypes: [
      { name: 'number_range', label: 'Number Range' },
      { name: 'number', label: 'Number' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'latest_survey_dbh_mean',
    label: 'DBH (mean) [cm]',
    width: 150,
    textAlign: 'right',
    filterTypes: [
      { name: 'number_range', label: 'Number Range' },
      { name: 'number', label: 'Number' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'latest_survey_height_mean',
    label: 'Height (mean) [m]',
    width: 150,
    textAlign: 'right',
    filterTypes: [
      { name: 'number_range', label: 'Number Range' },
      { name: 'number', label: 'Number' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'latest_survey_tree_volume',
    label: 'Volume [m³]',
    width: 150,
    textAlign: 'right',
    filterTypes: [
      { name: 'number_range', label: 'Number Range' },
      { name: 'number', label: 'Number' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'latest_survey_value_ird',
    label: 'Value [IDR]',
    width: 150,
    textAlign: 'right',
    filterTypes: [
      { name: 'number_range', label: 'Number Range' },
      { name: 'number', label: 'Number' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'trees_per_ha',
    label: 'Trees/ha',
    width: 120,
    textAlign: 'right',
    filterTypes: [
      { name: 'number_range', label: 'Number Range' },
      { name: 'number', label: 'Number' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'soil_type',
    label: 'Soil Type',
    width: 150,
    filterTypes: [
      { name: 'select', label: 'Select', dispatch: 'plot/fetchSoilTypes', itemText: 'name' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'legal_status',
    label: 'Legal Status',
    width: 150,
    filterTypes: [
      { name: 'select', label: 'Select', dispatch: 'plot/fetchLegalStatuses', itemText: 'name' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'village',
    label: 'Village',
    width: 150,
    filterTypes: [
      { name: 'select', label: 'Select', dispatch: 'plot/fetchVillages', itemText: 'name' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'district',
    label: 'District',
    width: 150,
    filterTypes: [
      { name: 'select', label: 'Select', dispatch: 'plot/fetchDistricts', itemText: 'name' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'planting_distance',
    label: 'Planting Distance',
    width: 180,
    filterTypes: [
      { name: 'select_range', label: 'Select', dispatch: 'plot/fetchPlantingDistances', itemText: 'name' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'field_coordinator',
    label: 'Field Coordinator',
    width: 150,
    filterTypes: [
      { name: 'select', label: 'Select', dispatch: 'plot/fetchFieldCoordinators', itemText: 'name' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'supporter',
    label: 'Supporter',
    width: 200,
  },
  {
    name: 'planting_date',
    label: 'Planting Date',
    width: 180,
    filterTypes: [
      { name: 'date_range', label: 'Date Range' },
      { name: 'date', label: 'Month' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'video_url',
    label: 'Video',
    width: 150,
    filterTypes: [
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'active',
    label: 'Active',
    width: 180,
    type: 'bool',
    filterTypes: [
      { name: 'bool', label: 'Bool' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'sample',
    label: 'Sample',
    width: 180,
    type: 'bool',
    filterTypes: [
      { name: 'bool', label: 'Bool' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'plants_planted',
    label: 'Plants Planted',
    width: 200,
    textAlign: 'right',
    filterTypes: [
      { name: 'number_range', label: 'Number Range' },
      { name: 'number', label: 'Number' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'created_at',
    label: 'Created',
    width: 150,
    filterTypes: [
      { name: 'date_range', label: 'Date Range' },
      { name: 'date', label: 'Month' },
    ],
  },
  {
    name: 'updated_at',
    label: 'Updated',
    width: 150,
    filterTypes: [
      { name: 'date_range', label: 'Date Range' },
      { name: 'date', label: 'Month' },
    ],
  },
]

export const defaultQuery = {
  page: 1,
  limit: 50,
  sortedBy: 'asc',
  orderBy: 'id',
}

export default {
  columns,
  defaultQuery
}