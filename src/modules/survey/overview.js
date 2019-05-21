export const detailList = [
  {
    name: 'id',
    label: 'ID',
    icon: 'fingerprint',
  },
  {
    name: 'plot_id',
    label: 'Plot',
    route: { name: 'plot-overview', id: 'plot_id' }
  },
  {
    name: 'farmer_name',
    label: 'Farmer',
    route: { name: 'farmer-overview', id: 'farmer_id' }
  },
  {
    name: 'project_name',
    label: 'Project',
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
    name: 'dbh_mean',
    label: 'DBH (mean) [cm]',
  },
  {
    name: 'height_mean',
    label: 'Height (mean) [m]',
  },
  {
    name: 'tree_volume',
    label: 'Volume [m³]',
  },
  {
    name: 'value_ird',
    label: 'Value [IDR]',
  },
  {
    name: 'trees_per_ha',
    label: 'Trees/ha',
  },
  {
    name: 'notes',
    label: 'Notes',
  },
  {
    name: 'treecount',
    label: 'Tree Count',
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