const columns = [
  {
    primaryKey: true,
    name: 'id',
    label: 'ID',
    width: 200,
    visible: true,
  },
  {
    name: 'name',
    label: 'Name',
    width: 200,
  },
  {
    name: 'district',
    label: 'District',
    width: 200,
  },
]

const defaultQuery = {
  page: 1,
  limit: 50,
  sortedBy: 'asc',
  orderBy: 'name',
}

export default {
  columns,
  defaultQuery
}