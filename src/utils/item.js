import { featureCollection, feature } from '@turf/turf'

const numberWithCommas = (number, toFixed = 0) => {
  return number.toFixed(toFixed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const imageUrl = id => {
  return `${process.env.VUE_APP_API_URL}/media/small_square/${id}`
}

export default class Item {
  constructor () {
    this.item = {}
  }

  parseDate (date) {
    let test = new Date(date)
    test.setDate(test.getDate() + 1)
    return test.toISOString().substring(0, 10)
  }

  createProperty (item, name, mapName = null) {
    try {
      return {
        [name]: item[mapName || name] || null
      }
    } catch (error) {
      return {}
    }
  }

  createInteger (item, name) {
    try {
      let value = Number.parseInt(item[name])

      return {
        [name]: !Number.isNaN(value) ? value : null
      }
    } catch (error) {
      return {}
    }
  }

  createNumber (item, name, toFixed = 2) {
    try {
      let value = Number.parseFloat(item[name])

      return {
        [name]: !Number.isNaN(value) ? numberWithCommas(value, toFixed) : null
      }
    } catch (error) {
      return {}
    }
  }

  createDateSubstring (item, name) {
    try {
      if (!item.hasOwnProperty(name) || !item[name]) return null

      return {
        [name]: item[name].substring(0, 10) || null
      }
    } catch (error) {
      return {}
    }
  }

  createDate (item, name) {
    try {
      if (!item.hasOwnProperty(name) || !item[name]) return null

      return {
        [name]: item[name].substring(0, 10) || null
      }
    } catch (error) {
      return {}
    }
  }

  createTime (item, name, mapName) {
    try {
      const date = item[mapName] ? new Date(item[mapName]) : null
      return {
        [name]: date ? date.getTime() / 1000 : 0
      }
    } catch (error) {
      return {
        [name]: 0
      }
    }
  }

  createFloat (item, name, mapName) {
    try {
      return {
        [name]: parseFloat(item[mapName] || 0.0) || 0.0
      }
    } catch (error) {
      return {
        [name]: 0.0
      }
    }
  }

  createInclude (item, name, setting) {
    try {
      return item.hasOwnProperty(name) && item[name] ? {
        [name]: {
          value: item[name].data[setting.value] || null,
          text: item[name].data[setting.text] || null,
        },
        [`${name}_value`]: item[name].data[setting.value] || null,
        [`${name}_text`]: item[name].data[setting.text] || null,
      } : {
        [name]: null
      }
    } catch (error) {
      return {}
    }
  }

  createImage (item, name) {
    try {
      return {
        [name]: item[name] ? imageUrl(item[name]) : null
      }
    } catch (error) {
      return {}
    }
  }

  createPoint (item, name, mapName) {
    try {
      const point = item[mapName || name]
      let coords = null

      if (point && point.point && point.point.coordinates) {
        coords = point.point.coordinates
      }

      return {
        [name]: coords ? coords.join(', ') : null
      }
    } catch (error) {
      return {}
    }
  }

  createGeojson (item, name, mapName) {
    try {
      const point = item[mapName || name]
      let geojson = null

      if (point && point.point) {
        geojson = JSON.stringify(
          featureCollection([
            feature(
              point.point
            )
          ])
        )
      }

      return {
        [name]: geojson || null
      }
    } catch (error) {
      return {}
    }
  }

  create () {
    return this.item
  }
}