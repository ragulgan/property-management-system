import { all } from 'redux-saga/effects'
import { fetchLoginWatcher } from './landLordsLogin'
import { fetchLoginAdminWatcher } from './adminLogin'
import { fetchForgotWatcher } from './forgotPassword'
import { fetchUploadWatcher } from '../../utils/dropzone/redux/saga'
import { fetchUSERWatcher } from './user'
import { fetchlandlordsWatcher } from './Landlords'
import { fetchpropertyWatcher } from './Property'
import { fetchleasesListWatcher } from './Leases'
import { fetchtransactionsWatcher } from './Transactions'
import { fetchpaymentsWatcher } from './Payments'
import { fetchcountryWatcher } from './country'
import { fetchstateWatcher } from './state'
import { fetchcityWatcher } from './city'
import { fetchpropertiesWatcher } from './propertyType'
import { fetchpropertyDocWatcher } from './propertyDocument'
import { fetchsettingsWatcher } from './Settings'
import { fetchrolesWatcher } from './Roles'
import { fetchleaseWatcher } from './leaseType'
import { fetchpropertyDocumentTypeWatcher } from './propertyDocumentType'
import { fetchLeaseDocumentWatcher } from './documentLeaseType'
import { fetchleaseDocWatcher } from './leaseDocument'
import { fetchProfileWatcher } from './Profile'
import { fetchPropertySurveyNoWatcher } from './surveyNumber'
import { fetchdashboardWatcher } from './dashboard'
import { fetchLesseeListWatcher } from './lesseeDetails'
import { fetchNomineeWatcher } from './NomineeIdProof'
import { fetchrequestListWatcher } from './requests'
import { apartmentWatcher } from './apartment'
import { propertyManagementWatcher } from './propertyManagement'
import { fetchapartmentAdminWatcher } from './apartmentAdmin'
import { fetchFlatWatcher } from './flatList'
import { fetchApartmentTypeWatcher } from './apartmentType'
import { fetchFlatDocumentTypeWatcher } from './flatDocumentType'
import { fetchFlatDocumentWatcher } from './flatDocument'
import { fetchFlatOwnerWatcher } from './flatOwner'

export default function* rootSaga() {
  yield all([
    fetchPropertySurveyNoWatcher(),
    fetchLoginWatcher(),
    fetchLoginAdminWatcher(),
    fetchForgotWatcher(),
    fetchUploadWatcher(),
    fetchUSERWatcher(),
    fetchlandlordsWatcher(),
    fetchpropertyWatcher(),
    fetchleasesListWatcher(),
    fetchtransactionsWatcher(),
    fetchpaymentsWatcher(),
    fetchcountryWatcher(),
    fetchstateWatcher(),
    fetchcityWatcher(),
    fetchpropertiesWatcher(),
    fetchpropertyDocWatcher(),
    fetchsettingsWatcher(),
    fetchrolesWatcher(),
    fetchleaseWatcher(),
    fetchLeaseDocumentWatcher(),
    fetchpropertyDocumentTypeWatcher(),
    fetchleaseDocWatcher(),
    fetchProfileWatcher(),
    fetchdashboardWatcher(),
    fetchLesseeListWatcher(),
    fetchNomineeWatcher(),
    fetchrequestListWatcher(),
    apartmentWatcher(),
    propertyManagementWatcher(),
    fetchapartmentAdminWatcher(),
    fetchFlatWatcher(),
    fetchApartmentTypeWatcher(),
    fetchFlatDocumentTypeWatcher(),
    fetchFlatDocumentWatcher(),
    fetchFlatOwnerWatcher()
  ])
}