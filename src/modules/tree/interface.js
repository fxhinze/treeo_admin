import Item from '@/utils/item'

export class Tree extends Item {
  constructor (item) {
    super()

    this.item = {
      ...this.createProperty(item, 'id'),
      ...this.createProperty(item, 'identifier', 'id'),
      ...this.createProperty(item, 'image'),
      ...this.createProperty(item, 'survey_id'),
      ...this.createProperty(item, 'plot_id'),
      ...this.createProperty(item, 'farmer_id'),
      ...this.createProperty(item, 'farmer_name'),
      ...this.createProperty(item, 'project_name'),
      ...this.createProperty(item, 'species'),
      ...this.createProperty(item, 'species_id'),
      ...this.createProperty(item, 'dbh_cm'),
      ...this.createFloat(item, 'dbh_cm_sortable', 'dbh_cm'),
      ...this.createProperty(item, 'height_m'),
      ...this.createFloat(item, 'height_m_sortable', 'height_m'),
      ...this.createProperty(item, 'point_id'),
      ...this.createProperty(item, 'point_coords'),
      ...this.createProperty(item, 'timestamp'),
      ...this.createTime(item, 'timestamp_sortable', 'timestamp'),
      ...this.createProperty(item, 'comment'),
      ...this.createInteger(item, 'health'),
      ...this.createDate(item, 'created_at'),
      ...this.createTime(item, 'created_at_sortable', 'created_at'),
      ...this.createDate(item, 'updated_at'),
      ...this.createTime(item, 'updated_at_sortable', 'updated_at'),
    }
  }
}
