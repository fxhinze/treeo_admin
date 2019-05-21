export function buildTooltipHtml (properties) {
  let tooltipData = {
    id: 'ID',
    farmer: 'Farmer',
    active: 'Active',
    area_m2: 'Area [m²]',
    latest_survey_dbh_mean: 'DBH (mean) [cm]',
    latest_survey_height_mean: 'Height (mean) [m]',
    latest_survey_tree_volume: 'Volume [m³]',
    latest_survey_treecount: 'Tree count',
    latest_survey_value_ird: 'Value [IDR]',
    legal_status: 'Legal Status',
    planting_date: 'Planting Date',
    planting_distance: 'Planting Distance',
    plants_planted: 'Plants Planted',
    soil_type: 'Soil Type',
    species: 'Species',
    trees_per_ha: 'Trees/ha',
  }

  let propertiesHtml = ''
  Object.keys(tooltipData).forEach(property => {
    if (
      properties.hasOwnProperty(property) &&
      !(properties[property] === 'null' || properties[property] === null)
    ) {
      propertiesHtml += `
        <div class="of-tooltip-item">
          <div class="label">
            ${tooltipData[property]}:
          </div>
          <div class="property">
            ${properties[property]}
          </div>
        </div>`
    }
  })

  return `
    <div class="of-tooltip">
      ${propertiesHtml}
    </div>
  `
}

export function getUniqueFeatures (array, comparatorProperty) {
  var existingFeatureKeys = {}

  var uniqueFeatures = array.filter(el => {
    if (existingFeatureKeys[el.properties[comparatorProperty]]) {
      return false
    } else {
      existingFeatureKeys[el.properties[comparatorProperty]] = true
      return true
    }
  })

  return uniqueFeatures
}