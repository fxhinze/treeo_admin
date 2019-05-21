export const columns = [
  {
    primaryKey: true,
    name: 'id',
    label: 'ID',
    width: 200,
    visible: false,
    fixedColumn: true,
    type: 'link',
    link: { name: 'supporter-overview', id: 'id' },
  },
  {
    name: 'image',
    label: 'Logo',
    width: 60,
    type: 'image',
    sortable: false,
    filterable: false,
  },
  {
    name: 'name',
    label: 'Name',
    width: 200,
  },
  {
    name: 'path',
    label: 'Path',
    width: 200,
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