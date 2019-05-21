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
    link: { name: 'tree-overview', id: 'identifier' },
  },
  {
    name: 'survey_id',
    label: 'Survey',
    width: 100,
    type: 'link',
    link: { name: 'survey-overview', id: 'survey_id' },
  },
  {
    name: 'image',
    label: 'Photo',
    width: 100,
    type: 'image',
    filterTypes: [
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'plot_id',
    label: 'Plot',
    width: 80,
    type: 'link',
    link: { name: 'plot-overview', id: 'plot_id' }
  },
  {
    name: 'farmer_id',
    label: 'Farmer',
    visible: false,
  },
  {
    name: 'farmer_name',
    label: 'Farmer',
    width: 150,
    type: 'link',
    link: { name: 'farmer-overview', id: 'farmer_id' }
  },
  {
    name: 'project_name',
    label: 'Project',
    width: 120,
    filterTypes: [
      { name: 'select', label: 'Select', dispatch: 'plot/fetchProjects', itemText: 'name' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'species',
    label: 'Species',
    width: 180,
    filterTypes: [
      { name: 'select', label: 'Select', dispatch: 'tree/fetchSpecies', itemText: 'name' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'dbh_cm',
    label: 'DBH [cm]',
    width: 120,
    textAlign: 'right',
    filterTypes: [
      { name: 'number_range', label: 'Number Range' },
      { name: 'number', label: 'Number' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'height_m',
    label: 'Height [m]',
    width: 120,
    textAlign: 'right',
    filterTypes: [
      { name: 'number_range', label: 'Number Range' },
      { name: 'number', label: 'Number' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'point_coords',
    label: 'Point',
    width: 200,
    filterTypes: [
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'timestamp',
    label: 'Timestamp',
    width: 200,
    filterTypes: [
      { name: 'date_range', label: 'Date Range' },
      { name: 'date', label: 'Month' },
    ],
  },
  {
    name: 'comment',
    label: 'Comment',
    width: 200,
  },
  {
    name: 'health',
    label: 'Health',
    width: 200,
  },
  {
    name: 'amigo_id',
    label: 'Amigo ID',
    width: 200,
  },
  {
    name: 'created_at',
    label: 'Created',
    width: 180,
    filterTypes: [
      { name: 'date_range', label: 'Date Range' },
      { name: 'date', label: 'Month' },
    ],
  },
  {
    name: 'updated_at',
    label: 'Updated',
    width: 180,
    filterTypes: [
      { name: 'date_range', label: 'Date Range' },
      { name: 'date', label: 'Month' },
    ],
  },
]

export const defaultQuery = {
  page: 1,
  limit: 50,
  sortedBy: 'desc',
  orderBy: 'updated_at',
}

export default {
  columns,
  defaultQuery
}