import globalModule from './global'
import authModule from './auth'

// import datatableModule from '@/modules/datatable/store'
import mapModule from '@/modules/map/store'

// Main tables
import farmerModule from '@/modules/farmer/store'
import plotModule from '@/modules/plot/store'
import surveyModule from '@/modules/survey/store'
import treeModule from '@/modules/tree/store'
import supporterModule from '@/modules/supporter/store'
import userModule from '@/modules/user/store'

// Lookup tables
import districtModule from '@/modules/district/store'
import hotspotModule from '@/modules/hotspot/store'
import legalStatusModule from '@/modules/legal-status/store'
import nurseryModule from '@/modules/nursery/store'
import plantingDistanceModule from '@/modules/planting-distance/store'
import fieldCoordinatorModule from '@/modules/field-coordinator/store'
import projectModule from '@/modules/project/store'
import soilTypeModule from '@/modules/soil-type/store'
import speciesModule from '@/modules/species/store'
import surveyStatusModule from '@/modules/survey-status/store'
import villageModule from '@/modules/village/store'

const modules = {
  global: globalModule,
  auth: authModule,

  // datatable: datatableModule,
  map: mapModule,

  farmer: farmerModule,
  plot: plotModule,
  survey: surveyModule,
  tree: treeModule,
  supporter: supporterModule,
  user: userModule,

  district: districtModule,
  hotspot: hotspotModule,
  legalStatus: legalStatusModule,
  nursery: nurseryModule,
  plantingDistance: plantingDistanceModule,
  fieldCoordinator: fieldCoordinatorModule,
  project: projectModule,
  soilType: soilTypeModule,
  species: speciesModule,
  surveyStatus: surveyStatusModule,
  village: villageModule,
}

export default modules