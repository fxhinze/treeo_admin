import Item from '@/utils/item'

export class Nursery extends Item {
  constructor (item) {
    super()

    this.item = {
      ...this.createProperty(item, 'id'),
      ...this.createProperty(item, 'owner'),
      ...this.createProperty(item, 'cover'),
      ...this.createPoint(item, 'point', 'geo_point'),
      ...this.createGeojson(item, 'geo_point', 'geo_point'),
    }
  }
}
