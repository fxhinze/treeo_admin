import Item from '@/utils/item'

export class Farmer extends Item {
  constructor (item) {
    super()

    this.item = {
      ...this.createProperty(item, 'id'),
      ...this.createProperty(item, 'identifier', 'id'),
      ...this.createProperty(item, 'project'),
      ...this.createProperty(item, 'project_id'),
      ...this.createProperty(item, 'email'),
      ...this.createProperty(item, 'user_id'),
      ...this.createProperty(item, 'name'),
      ...this.createInteger(item, 'children'),
      ...this.createProperty(item, 'birthday'),
      ...this.createProperty(item, 'gender_id'),
      ...this.createProperty(item, 'gender'),
      ...this.createProperty(item, 'photo'),
      ...this.createProperty(item, 'main_occupation'),
      ...this.createProperty(item, 'side_occupation'),
      ...this.createProperty(item, 'spouse_name'),
      ...this.createProperty(item, 'spouse_birthday'),
      ...this.createProperty(item, 'spouse_main_occupation'),
      ...this.createProperty(item, 'spouse_side_occupation'),
      ...this.createInteger(item, 'family_income_idr'),
      ...this.createProperty(item, 'address'),
      ...this.createProperty(item, 'story'),
      ...this.createDate(item, 'created_at'),
      ...this.createDate(item, 'updated_at'),
    }
  }
}
