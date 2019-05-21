export const columns = [
  {
    primaryKey: true,
    name: 'id',
    label: 'ID',
    width: 200,
    visible: false,
    fixedColumn: true,
    type: 'link',
    link: { name: 'nursery-overview', id: 'id' },
  },
  {
    name: 'cover',
    label: 'Photo',
    width: 60,
    type: 'image',
    sortable: false,
    filterable: false,
  },
  {
    name: 'owner',
    label: 'Owner',
    width: 200,
  },
  {
    name: 'point',
    label: 'Point',
    width: 200,
    sortable: false,
    filterable: false,
  },
]

export const defaultQuery = {
  page: 1,
  limit: 50,
  sortedBy: 'asc',
  orderBy: 'owner',
}

export default {
  columns,
  defaultQuery
}