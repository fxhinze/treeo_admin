export const columns = [
  {
    primaryKey: true,
    name: 'id',
    label: 'ID',
    width: 200,
    visible: false,
    fixedColumn: true,
    type: 'link',
    link: { name: 'hotspot-overview', id: 'id' },
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
    name: 'name_de',
    label: 'Name DE',
    width: 200,
  },
  {
    name: 'name_en',
    label: 'Name EN',
    width: 200,
  },
  {
    name: 'name_ms',
    label: 'Name MS',
    width: 200,
  },
  {
    name: 'link_de',
    label: 'Link DE',
    width: 200,
  },
  {
    name: 'link_en',
    label: 'Link EN',
    width: 200,
  },
  {
    name: 'link_ms',
    label: 'Link MS',
    width: 200,
  },
  {
    name: 'description',
    label: 'Description',
    width: 200,
  },
  {
    name: 'point',
    label: 'Point',
    width: 200,
    sortable: false,
    filterable: false,
  }
]

export const defaultQuery = {
  page: 1,
  limit: 50,
  sortedBy: 'asc',
  orderBy: 'name_de',
}

export default {
  columns,
  defaultQuery
}