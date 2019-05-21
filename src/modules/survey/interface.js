import Item from '@/utils/item'

export class Survey extends Item {
  constructor (item) {
    super()

    this.item = {
      ...this.createProperty(item, 'id'),
      ...this.createProperty(item, 'identifier', 'id'),
      ...this.createDateSubstring(item, 'date_start'),
      ...this.createTime(item, 'date_start_sortable', 'date_start'),
      ...this.createDateSubstring(item, 'date_end'),
      ...this.createTime(item, 'date_end_sortable', 'date_end'),
      ...this.createProperty(item, 'plot_id'),
      ...this.createProperty(item, 'project_name'),
      ...this.createProperty(item, 'farmer_id'),
      ...this.createProperty(item, 'farmer_name'),
      ...this.createProperty(item, 'dbh_mean'),
      ...this.createFloat(item, 'dbh_mean_sortable', 'dbh_mean'),
      ...this.createProperty(item, 'height_mean'),
      ...this.createProperty(item, 'tree_volume'),
      ...this.createNumber(item, 'value_ird', 0),
      ...this.createFloat(item, 'value_ird_sortable', 'value_ird'),
      ...this.createNumber(item, 'value_usd', 2),
      ...this.createFloat(item, 'value_usd_sortable', 'value_usd'),
      ...this.createProperty(item, 'trees_per_ha'),
      ...this.createProperty(item, 'notes'),
      ...this.createProperty(item, 'status_id'),
      ...this.createInteger(item, 'treecount'),
      ...this.createDate(item, 'created_at'),
      ...this.createTime(item, 'created_at_sortable', 'created_at'),
      ...this.createDate(item, 'updated_at'),
      ...this.createTime(item, 'updated_at_sortable', 'updated_at'),
    }
  }
}
