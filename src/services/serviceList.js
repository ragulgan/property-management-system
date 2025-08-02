const API_URL = 'https://property.shenll.in/api/v1/admin'
const COUNTRY_URL = 'https://countriesnow.space/api/v0.1/countries'

const serviceList = {
  login: `${API_URL}/auth`,
  forgotPassword: `${API_URL}/user/forgotPassword`,
  verifyUser: `${API_URL}/user/checkForgotToken`,
  resetPassword: `${API_URL}/user/resetPassword`,
  landlord: `${API_URL}/landlord`,
  users: `${API_URL}/users`,
  property: `${API_URL}/property`,
  leaseType: `${API_URL}/leaseType`,
  city: `${API_URL}/city`,
  state: `${API_URL}/state`,
  country: `${API_URL}/country`,
  propertyType: `${API_URL}/propertyType`,
  propertyDocument: `${API_URL}/propertyDocument`,
  propertyDocumentType: `${API_URL}/propertyDocType`,
  leasedocumentType: `${API_URL}/leaseDocType`,
  leases: `${API_URL}/leases`,
  leaseDocument: `${API_URL}/leaseDocument`,
  config: `${API_URL}/config`,
  role: `${API_URL}/role`,
  upload: `${API_URL}/upload`,
  imageDelete: `${API_URL}/upload/file`,
  surveyNo: `${API_URL}/property`,
  dashboard: `${API_URL}/dashboard`,
  apartment: `${API_URL}/apartment`,
  apartmentType: `${API_URL}/apartmentType`,
  apartmentAdmin: `${API_URL}/users`,
  flatList: `${API_URL}/flat`,
  flatDocument: `${API_URL}/flatDoc`,
  flatDocumentType: `${API_URL}/flatDocType`,
  flatOwner: `${API_URL}/flatOwner`,

  opencountry: `${COUNTRY_URL}/capital`,
  openstate: `${COUNTRY_URL}/states`,
  opencity: `${COUNTRY_URL}/state/cities`,

  transaction: 'https://run.mocky.io/v3/fa37facf-8bec-4f8a-9b8f-0945ecd5eb7c',
  payment: 'https://run.mocky.io/v3/7bffc481-5265-4ff5-9d16-f08a8a8e3786',
  request: 'https://run.mocky.io/v3/0aa13bff-0481-4ee8-a433-4cd7a0a9d4c2',
}
export default serviceList