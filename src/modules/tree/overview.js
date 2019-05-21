export const detailList = [
  {
    name: 'identifier',
    label: 'ID',
    icon: 'fingerprint',
  },
  {
    name: 'survey_id',
    label: 'Survey',
    route: { name: 'survey-overview', id: 'survey_id' }
  },
  {
    name: 'plot_id',
    label: 'Plot',
    route: { name: 'plot-overview', id: 'plot_id' }
  },
  {
    name: 'famer_name',
    label: 'Farmer',
    route: { name: 'farmer-overview', id: 'farmer_id' }
  },
  {
    name: 'project_name',
    label: 'Project',
  },
  {
    name: 'species',
    label: 'Species',
  },
  {
    name: 'dbh_cm',
    label: 'DBH [cm]',
  },
  {
    name: 'height_m',
    label: 'Height [m]',
  },
  {
    name: 'point_coords',
    label: 'Point',
  },
  {
    name: 'timestamp',
    label: 'Timestamp',
  },
  {
    name: 'comment',
    label: 'Comment',
  },
  {
    name: 'health',
    label: 'Health',
  },
  {
    name: 'amigo_id',
    label: 'Amigo ID',
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