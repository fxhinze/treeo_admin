import Item from '@/utils/item'

export class Supporter extends Item {
  constructor (item) {
    super()

    this.item = {
      ...this.createProperty(item, 'id'),
      ...this.createProperty(item, 'name'),
      ...this.createProperty(item, 'image'),
      ...this.createProperty(item, 'path'),
    }
  }
}
