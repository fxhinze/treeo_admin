export const columns = [
  {
    primaryKey: true,
    name: 'id',
    label: 'ID',
    width: 200,
  },
  {
    name: 'name',
    label: 'Name',
    width: 200,
  },
  {
    name: 'username',
    label: 'Username',
    width: 200,
  },
  {
    name: 'email',
    label: 'Email',
    width: 250,
  },
  {
    name: 'roles',
    label: 'Roles',
    width: 200,
  },
  {
    name: 'readable_created_at',
    label: 'Created at',
    width: 200,
  },
  {
    name: 'readable_updated_at',
    label: 'Updated at',
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