import {
  DashboardTypes
} from '../actions'

export const DashboardlistInitialState = {
  list: null
}

export const DashboardlistStoreKeys = 'DashboardlistStore'

export const DashboardlistReducers = (state = DashboardlistInitialState, action) => {
  switch (action.type) {
    case DashboardTypes.GET_DASHBOARD_LIST:
      return { ...state, loading: true }
    case DashboardTypes.SAVE_DASHBOARD_LIST_RESPONSE:
      return { ...state, Dashboardlists: action.data, loading: false }
    case DashboardTypes.CLEAR_DASHBOARD_LIST:
      return { ...state, Dashboardlists: null }
    default:
      return state
  }
}