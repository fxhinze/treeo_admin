export const columns = [
  {
    primaryKey: true,
    name: 'id',
    label: 'ID',
    visible: false
  },
  {
    name: 'identifier',
    label: 'ID',
    width: 80,
    fixedColumn: true,
    type: 'link',
    link: { name: 'farmer-overview', id: 'identifier' },
  },
  {
    name: 'name',
    label: 'Name',
    width: 180,
  },
  {
    name: 'photo',
    label: 'Photo',
    width: 60,
    type: 'image',
    sortable: false,
    filterable: false,
  },
  {
    name: 'user_id',
    label: 'User',
    visible: false,
  },
  {
    name: 'email',
    label: 'User',
    width: 200,
    type: 'link',
    link: { name: 'user-overview', id: 'user_id' },
  },
  {
    name: 'project',
    label: 'Project',
    width: 180,
    filterTypes: [
      { name: 'select', label: 'Select', dispatch: 'farmer/fetchProjects', itemText: 'name' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'children',
    label: 'Children',
    width: 180,
    filterTypes: [
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'birthday',
    label: 'Birthday',
    width: 180,
    filterTypes: [
      { name: 'date_range', label: 'Date Range' },
      { name: 'date', label: 'Month' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'gender',
    label: 'Gender',
    width: 180,
    filterTypes: [
      { name: 'select', label: 'Select', dispatch: 'farmer/fetchGenders', itemText: 'name' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'main_occupation',
    label: 'Main Occupation',
    width: 180,
    filterTypes: [
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'side_occupation',
    label: 'Side Occupation',
    width: 180,
    filterTypes: [
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'spouse_name',
    label: 'Spouse Name',
    width: 180,
    filterTypes: [
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'spouse_birthday',
    label: 'Spouse Birthday',
    width: 180,
    filterTypes: [
      { name: 'date_range', label: 'Date Range' },
      { name: 'date', label: 'Month' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'spouse_main_occupation',
    label: 'Spouse Main Occupation',
    width: 200,
    filterTypes: [
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'spouse_side_occupation',
    label: 'Spouse Side Occupation',
    width: 200,
    filterTypes: [
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'family_income_idr',
    label: 'Family Income IDR',
    width: 180,
    filterTypes: [
      { name: 'number_range', label: 'Number Range' },
      { name: 'number', label: 'Number' },
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'address',
    label: 'Address',
    width: 180,
    filterTypes: [
      { name: 'empty', label: 'Empty' },
    ],
  },
  {
    name: 'story',
    label: 'Story',
    width: 180,
    filterTypes: [
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
  orderBy: 'name',
}

export default {
  columns,
  defaultQuery
}