import Item from '@/utils/item'

export class Hotspot extends Item {
  constructor (item) {
    super()

    this.item = {
      ...this.createProperty(item, 'id'),
      ...this.createProperty(item, 'photo'),
      ...this.createProperty(item, 'name_de'),
      ...this.createProperty(item, 'name_en'),
      ...this.createProperty(item, 'name_ms'),
      ...this.createProperty(item, 'link_de'),
      ...this.createProperty(item, 'link_en'),
      ...this.createProperty(item, 'link_ms'),
      ...this.createProperty(item, 'description'),
      ...this.createPoint(item, 'point'),
      ...this.createGeojson(item, 'geo_data', 'point'),
    }
  }
}
