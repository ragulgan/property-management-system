export const DashboardTypes = {
  GET_DASHBOARD_LIST: 'GET_DASHBOARD_LIST',
  SAVE_DASHBOARD_LIST_RESPONSE: 'SAVE_DASHBOARD_LIST_RESPONSE',
  CLEAR_DASHBOARD_LIST: 'CLEAR_DASHBOARD_LIST'
}

export const DashboardActions = {
  getdashboardlist: (params) => ({
    type: DashboardTypes.GET_DASHBOARD_LIST,
    params
  }),
  savedashboardlistResponse: (data) => ({
    type: DashboardTypes.SAVE_DASHBOARD_LIST_RESPONSE,
    data
  }),
  cleardashboardlist: () => ({
    type: DashboardTypes.CLEAR_DASHBOARD_LIST
  })

}