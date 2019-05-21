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
    link: { name: 'survey-overview', id: 'identifier' },
  },
  {
    name: 'date_start',
    label: 'Start',
    width: 100,
    filterTypes: [
      { name: 'date_range', label: 'Date Range' },
      { name: 'date', label: 'Month' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'date_end',
    label: 'End',
    width: 100,
    filterTypes: [
      { name: 'date_range', label: 'Date Range' },
      { name: 'date', label: 'Month' },
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
    name: 'dbh_mean',
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
    name: 'height_mean',
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
    name: 'tree_volume',
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
    name: 'value_ird',
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
    name: 'treecount',
    label: 'Tree Count',
    width: 120,
    textAlign: 'right',
    filterTypes: [
      { name: 'number_range', label: 'Number Range' },
      { name: 'number', label: 'Number' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'notes',
    label: 'Notes',
    width: 200,
    filterTypes: [
      { name: 'empty', label: 'Empty' },
    ]
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
  sortedBy: 'asc',
  orderBy: 'date_start',
}

export default {
  columns,
  defaultQuery
}