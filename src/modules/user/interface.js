import Item from '@/utils/item'

export class User extends Item {
  constructor (item) {
    super()

    let roles = item.hasOwnProperty('roles') && item.roles.hasOwnProperty('data')
      ? item.roles.data.map(role => role.description).join(', ')
      : null

    let rolesNames = item.hasOwnProperty('roles') && item.roles.hasOwnProperty('data')
      ? item.roles.data.map(role => role.name)
      : null

    this.item = {
      ...this.createProperty(item, 'id'),
      ...this.createProperty(item, 'name'),
      ...this.createProperty(item, 'username'),
      ...this.createProperty(item, 'email'),
      roles: roles,
      admin: rolesNames ? rolesNames.indexOf('admin') > -1 : false,
      ...this.createProperty(item, 'readable_created_at'),
      ...this.createProperty(item, 'readable_updated_at'),
    }
  }
}
