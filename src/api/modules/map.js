import axios from 'axios'

const service = axios.create()

// bing api
// doku: https://msdn.microsoft.com/en-us/library/ff701724.aspx
// - Aerial – Aerial imagery.
// - AerialWithLabels – Aerial imagery with a road overlay.
// - AerialWithLabelsOnDemand - Aerial imagery with on-demand road overlay.
// - CanvasDark - A dark version of the road maps.
// - CanvasLight - A lighter version of the road maps which also has some of the details such as hill shading disabled.
// - CanvasGray - A grayscale version of the road maps.
// - Road – Roads without additional imagery.

const bing = {
  fetchSource: async style => {
    const key = process.env.VUE_APP_MAP_BING_TOKEN
    const payload = {
      url: `https://dev.virtualearth.net/REST/v1/Imagery/Metadata/${style}?key=${key}&include=ImageryProviders&uriScheme=https`,
      method: 'get',
      headers: {
        'Content-Type': 'text/plain'
      },
      responseType: 'text'
    }

    return service.request(payload).then(response => {
      if (response.data.statusCode === 200) {
        const data = response.data.resourceSets[0].resources[0]
        const imageUrl = data.imageUrl
        const imageUrlSubdomains = data.imageUrlSubdomains

        return imageUrlSubdomains.map(subdomain => {
          return imageUrl.replace('{subdomain}', subdomain).replace('{culture}', 'en-US')
        })
      }
    })
  },

  getTiles: id => {
    const baseLayer = JSON.parse(window.localStorage.getItem('baselayer'))

    return baseLayer && baseLayer.hasOwnProperty(id) ? baseLayer[id] : null
  },

  setTiles: (id, tiles) => {
    const baseLayer = JSON.parse(window.localStorage.getItem('baselayer')) || {}
    baseLayer[id] = tiles
    window.localStorage.setItem('baselayer', JSON.stringify(baseLayer))
    return tiles
  },
}

// mapbox api
// doku: https://www.mapbox.com/api-documentation/?language=JavaScript#maps
// - mapbox.streets
// - mapbox.light
// - mapbox.dark
// - mapbox.satellite
// - mapbox.streets-satellite
// - mapbox.wheatpaste
// - mapbox.streets-basic
// - mapbox.comic
// - mapbox.outdoors
// - mapbox.run-bike-hike
// - mapbox.pencil
// - mapbox.pirates
// - mapbox.emerald
// - mapbox.high-contrast

const api = {
  fetchBaseLayerMapbox: (name) => {
    return new Promise((resolve, reject) => {
      resolve({
        type: 'raster',
        url: `mapbox://mapbox.${name}`,
        tileSize: 256,
      })
    })
  },

  fetchBaseLayerBingSatellite: () => {
    return new Promise((resolve, reject) => {
      const data = {
        type: 'raster',
        tiles: [],
        tileSize: 256,
      }

      if (bing.getTiles('bing_satellite')) {
        data.tiles = bing.getTiles('bing_satellite')

        resolve(data)
      } else {
        bing.fetchSource('Aerial').then(tiles => {
          data.tiles = bing.setTiles('bing_satellite', tiles)

          resolve(data)
        })
      }
    })
  },

  fetchBaseLayerBingHybrid: () => {
    return new Promise((resolve, reject) => {
      const data = {
        type: 'raster',
        tiles: [],
        tileSize: 256,
      }

      if (bing.getTiles('bing_hybrid')) {
        data.tiles = bing.getTiles('bing_hybrid')

        resolve(data)
      } else {
        bing.fetchSource('AerialWithLabels').then(tiles => {
          data.tiles = bing.setTiles('bing_hybrid', tiles)

          resolve(data)
        })
      }
    })
  },

  fetchBaseLayerBingStreets: () => {
    return new Promise((resolve, reject) => {
      const data = {
        type: 'raster',
        tiles: [],
        tileSize: 256,
      }

      if (bing.getTiles('bing_streets')) {
        data.tiles = bing.getTiles('bing_streets')

        resolve(data)
      } else {
        bing.fetchSource('Road').then(tiles => {
          data.tiles = bing.setTiles('bing_streets', tiles)

          resolve(data)
        })
      }
    })
  },
}

export default {
  fetchBaselayerSource: async (id) => {
    let source = null
    switch (id) {
      case 'bing_satellite':
        source = await api.fetchBaseLayerBingSatellite()
        break
      case 'bing_hybrid':
        source = await api.fetchBaseLayerBingHybrid()
        break
      case 'bing_streets':
        source = await api.fetchBaseLayerBingStreets()
        break
      case 'mapbox_satellite':
        source = await api.fetchBaseLayerMapbox('satellite')
        break
      case 'mapbox_streets-satellite':
        source = await api.fetchBaseLayerMapbox('streets-satellite')
        break
      case 'mapbox_streets':
        source = await api.fetchBaseLayerMapbox('streets')
        break
      case 'mapbox_light':
        source = await api.fetchBaseLayerMapbox('light')
        break
      case 'mapbox_dark':
        source = await api.fetchBaseLayerMapbox('dark')
        break
      case 'mapbox_streets-basic':
        source = await api.fetchBaseLayerMapbox('basic')
        break
      case 'mapbox_outdoors':
        source = await api.fetchBaseLayerMapbox('outdoors')
        break
      case 'mapbox_high-contrast':
        source = await api.fetchBaseLayerMapbox('high-contrast')
        break
    }

    return source
  },
}
