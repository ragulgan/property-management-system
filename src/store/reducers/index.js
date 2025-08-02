import { combineReducers } from 'redux'
import {
  loginReducer,
  loginStoreKey,
  registerReducer,
  registerStoreKey,
  otpReducer,
  otpStoreKey
} from './landLordsLogin'
import {
  loginAdminReducer,
  loginAdminStoreKey
} from './adminLogin'
import {
  forgotPasswordReducer,
  forgotPasswordStoreKey,
  verifyUserReducer,
  verifyUserStoreKey,
  resetPasswordStoreKey,
  resetPasswordReducer
} from './forgotPassword'
import {
  dropzoneReducer,
  dropzoneStoreKey
} from '../../utils/dropzone/redux/reducer'
import {
  USERlistStoreKeys,
  USERlistReducers,
  UserAddStoreKey,
  UserAddReducer,
  editUsersStoreKey,
  editUsersReducer,
  updateUserStoreKey,
  updateUserReducer,
  UserdeleteStoreKey,
  UserdeleteReducer,
  UserlistDropDownReducers,
  USERlistDropDownStoreKeys
} from './user'
import {
  LandlordslistStoreKeys,
  LandlordslistReducers,
  LandlordsAddStoreKey,
  LandlordsAddReducer,
  editLandlordssStoreKey,
  editLandlordsReducer,
  updateLandlordsStoreKey,
  updateLandlordsReducer,
  LandlordsdeleteStoreKey,
  LandlordsdeleteReducer
} from './Landlords'
import {
  PropertylistStoreKeys,
  PropertylistReducers,
  PropertyAddStoreKey,
  PropertyAddReducer,
  editPropertysStoreKey,
  editPropertyReducer,
  updatePropertyStoreKey,
  updatePropertyReducer,
  PropertydeleteStoreKey,
  PropertydeleteReducer
} from './Property'
import {
  LeasesListlistStoreKeys,
  LeasesListlistReducers,
  LeasesListAddStoreKey,
  LeasesListAddReducer,
  editLeasesListsStoreKey,
  editLeasesListReducer,
  updateLeasesListStoreKey,
  updateLeasesListReducer,
  LeasesListdeleteStoreKey,
  LeasesListdeleteReducer
} from './Leases'
import {
  CitylistStoreKeys,
  CitylistReducers,
  CityAddStoreKey,
  CityAddReducer,
  editCityStoreKey,
  editCityReducer,
  updateCityStoreKey,
  updateCityReducer,
  CitydeleteStoreKey,
  CitydeleteReducer
} from './city'
import {
  StatelistStoreKeys,
  StatelistReducers,
  StateAddStoreKey,
  StateAddReducer,
  editStateStoreKey,
  editStateReducer,
  updateStateStoreKey,
  updateStateReducer,
  StatedeleteStoreKey,
  StatedeleteReducer
} from './state'
import {
  CountrylistStoreKeys,
  CountrylistReducers,
  CountryAddStoreKey,
  CountryAddReducer,
  editCountryStoreKey,
  editCountryReducer,
  updateCountryStoreKey,
  updateCountryReducer,
  CountrydeleteStoreKey,
  CountrydeleteReducer
} from './country'
import {
  PropertieslistStoreKeys,
  PropertieslistReducers,
  PropertiesAddStoreKey,
  PropertiesAddReducer,
  editPerpertiesStoreKey,
  editPerpertiesReducer,
  updatePropertiesStoreKey,
  updatePropertiesReducer,
  PropertiesdeleteStoreKey,
  PropertiesdeleteReducer
} from './propertyType'
import {
  TransactionslistReducers,
  TransactionslistStoreKeys,
  TransactionsAddStoreKey,
  TransactionsAddReducer,
  editTransactionssStoreKey,
  editTransactionsReducer,
  updateTransactionsStoreKey,
  updateTransactionsReducer,
  TransactionsdeleteStoreKey,
  TransactionsdeleteReducer

} from './Transactions'
import {
  PaymentslistReducers,
  PaymentslistStoreKeys,
  PaymentsAddStoreKey,
  PaymentsAddReducer,
  editPaymentssStoreKey,
  editPaymentsReducer,
  updatePaymentsStoreKey,
  updatePaymentsReducer,
  PaymentsdeleteStoreKey,
  PaymentsdeleteReducer
} from './Payments'

import {
  PropertyDoclistReducers,
  PropertyDoclistStoreKeys,
  PropertyDocAddStoreKey,
  PropertyDocAddReducer,
  editPropertysDocStoreKey,
  editPropertyDocReducer,
  updatePropertyDocStoreKey,
  updatePropertyDocReducer,
  PropertyDocdeleteStoreKey,
  PropertyDocdeleteReducer
} from './propertyDocument'

import {
  PropertyDocumentTypelistStoreKeys,
  PropertyDocumentTypelistReducers,
  PropertyDocumentTypeAddStoreKey,
  PropertyDocumentTypeAddReducer,
  editPropertyDocumentTypesStoreKey,
  editPropertyDocumentTypeReducer,
  updatePropertyDocumentTypeStoreKey,
  updatePropertyDocumentTypeReducer,
  PropertyDocumentTypedeleteStoreKey,
  PropertyDocumentTypedeleteReducer
} from './propertyDocumentType'

import {
  SettingslistStoreKeys,
  SettingslistReducers,
  SettingsAddStoreKey,
  SettingsAddReducer,
  editSettingssStoreKey,
  editSettingsReducer,
  updateSettingsStoreKey,
  updateSettingsReducer,
  SettingsdeleteStoreKey,
  SettingsdeleteReducer
} from './Settings'

import {
  RoleslistStoreKeys,
  RoleslistConfigStoreKeys,
  RoleslistConfigReducers,
  RoleslistReducers,
  RolesAddStoreKey,
  RolesAddReducer,
  editRolessStoreKey,
  editRolesReducer,
  updateRolesStoreKey,
  updateRolesReducer,
  RolesdeleteStoreKey,
  RolesdeleteReducer
} from './Roles'

import {
  LeaselistStoreKeys,
  LeaselistReducers,
  LeaseAddStoreKey,
  LeaseAddReducer,
  editLeasesStoreKey,
  editLeaseReducer,
  updateLeaseStoreKey,
  updateLeaseReducer,
  LeasedeleteStoreKey,
  LeasedeleteReducer
} from './leaseType'

import {
  LeaseDocumentlistStoreKeys,
  LeaseDocumentlistReducers,
  LeaseDocumentAddStoreKey,
  LeaseDocumentAddReducer,
  editLeaseDocumentsStoreKey,
  editLeaseDocumentReducer,
  updateLeaseDocumentStoreKey,
  updateLeaseDocumentReducer,
  LeaseDocumentdeleteStoreKey,
  LeaseDocumentdeleteReducer
} from './documentLeaseType'

import {
  LeaseDoclistStoreKeys,
  LeaseDoclistReducers,
  LeaseDocAddStoreKey,
  LeaseDocAddReducer,
  editLeasesDocStoreKey,
  editLeaseDocReducer,
  updateLeaseDocStoreKey,
  updateLeaseDocReducer,
  LeaseDocdeleteStoreKey,
  LeaseDocdeleteReducer
} from './leaseDocument'
import {
  editProfileStoreKey,
  editProfileReducer,
  MultifileAddStoreKey,
  MultifileAddReducer,
  ImageDeleteStoreKey,
  ImageDeleteReducer,
} from './Profile'
import {
  PropertySurveyNolistStoreKeys,
  PropertySurveyNolistReducers,
} from './surveyNumber'
import {
  LesseeListlistStoreKeys,
  LesseeListlistReducers,
  LesseeListAddStoreKey,
  LesseeListAddReducer,
  editLesseeListsStoreKey,
  editLesseeListReducer,
  updateLesseeListStoreKey,
  updateLesseeListReducer,
  LesseeListdeleteStoreKey,
  LesseeListdeleteReducer
} from './lesseeDetails'

import { DashboardlistStoreKeys, DashboardlistReducers } from './dashBoard'

import {
  editNomineeStoreKey,
  editNomineeReducer,
  MultifileNomineeAddStoreKey,
  MultifileNomineeAddReducer,
  ImageDeleteNomineeStoreKey,
  ImageDeleteNomineeReducer,
} from './NomineeIdProof'

import {
  getApartmentlistStoreKeys,
  getApartmentListReducers,
  postApartmentStoreKey,
  postApartmentReducer,
  getApartmentDetialsStoreKey,
  getApartmentDetialsReducer,
  updateApartmentStoreKey,
  updateApartmentReducer,
  deleteApartmentStoreKey,
  deleteApartmentReducer
} from './apartment'

import {
  getPropertylistStoreKeys,
  getPropertyListReducers,
  postPropertyStoreKey,
  postPropertyReducer,
  getProprtDetialsStoreKey,
  getProprtDetialsReducer,
  updatePropertyManagementStoreKey,
  updatePropertyManagementReducer,
  deletePropertyStoreKey,
  deletePropertyReducer
} from './propertyManagement'

import {
  RequestListlistStoreKeys,
  RequestListlistReducers,
  RequestListAddStoreKey,
  RequestListAddReducer,
  editRequestListsStoreKey,
  editRequestListReducer,
  updateRequestListStoreKey,
  updateRequestListReducer,
  RequestListdeleteStoreKey,
  RequestListdeleteReducer
} from './requests'

import {
  ApartmentAdminlistReducers,
  ApartmentAdminlistStoreKeys,
  ApartmentAdminAddStoreKey,
  ApartmentAdminAddReducer,
  editApartmentAdminStoreKey,
  editApartmentAdminReducer,
  updateApartmentAdminStoreKey,
  updateApartmentAdminReducer,
  ApartmentAdmindeleteStoreKey,
  ApartmentAdmindeleteReducer
} from './apartmentAdmin'

import {
  FlatlistReducers,
  FlatlistStoreKeys,
  FlatAddStoreKey,
  FlatAddReducer,
  editFlatStoreKey,
  editFlatReducer,
  updateFlatStoreKey,
  updateFlatReducer,
  FlatdeleteStoreKey,
  FlatdeleteReducer
} from './flatList'

import {
  OpenCountrylistReducers,
  OpenCountrylistStoreKeys,
  OpenStatelistReducers,
  OpenStatelistStoreKeys,
  OpenCitylistReducers,
  OpenCitylistStoreKeys
} from './openCountry'

import {
  ApartmentTypelistStoreKeys,
  ApartmentTypelistReducers,
  ApartmentTypeAddStoreKey,
  ApartmentTypeAddReducer,
  editApartmentTypeStoreKey,
  editApartmentTypeReducer,
  updateApartmentTypeStoreKey,
  updateApartmentTypeReducer,
  ApartmentTypedeleteStoreKey,
  ApartmentTypedeleteReducer
} from './apartmentType'

import {
  FlatDocumentTypelistStoreKeys,
  FlatDocumentTypelistReducers,
  FlatDocumentTypeAddStoreKey,
  FlatDocumentTypeAddReducer,
  editFlatDocumentTypeStoreKey,
  editFlatDocumentTypeReducer,
  updateFlatDocumentTypeStoreKey,
  updateFlatDocumentTypeReducer,
  FlatDocumentTypedeleteStoreKey,
  FlatDocumentTypedeleteReducer
} from './flatDocumentType'

import {
  FlatDocumentlistStoreKeys,
  FlatDocumentlistReducers,
  FlatDocumentAddStoreKey,
  FlatDocumentAddReducer,
  editFlatDocumentStoreKey,
  editFlatDocumentReducer,
  updateFlatDocumentStoreKey,
  updateFlatDocumentReducer,
  FlatDocumentdeleteStoreKey,
  FlatDocumentdeleteReducer
} from './flatDocument'

import {
  FlatOwnerlistReducers,
  FlatOwnerlistStoreKeys,
  FlatOwnerAddStoreKey,
  FlatOwnerAddReducer,
  editFlatOwnerStoreKey,
  editFlatOwnerReducer,
  updateFlatOwnerStoreKey,
  updateFlatOwnerReducer,
  FlatOwnerdeleteStoreKey,
  FlatOwnerdeleteReducer
} from './flatOwner'

export default function createReducer() {
  const rootReducer = combineReducers({
    [loginAdminStoreKey]: loginAdminReducer,
    [otpStoreKey]: otpReducer,
    [registerStoreKey]: registerReducer,
    [loginStoreKey]: loginReducer,
    [forgotPasswordStoreKey]: forgotPasswordReducer,
    [verifyUserStoreKey]: verifyUserReducer,
    [resetPasswordStoreKey]: resetPasswordReducer,
    [dropzoneStoreKey]: dropzoneReducer,
    // Staff module
    [USERlistStoreKeys]: USERlistReducers,
    [UserAddStoreKey]: UserAddReducer,
    [editUsersStoreKey]: editUsersReducer,
    [updateUserStoreKey]: updateUserReducer,
    [UserdeleteStoreKey]: UserdeleteReducer,
    // Landlord module
    [LandlordslistStoreKeys]: LandlordslistReducers,
    [LandlordsAddStoreKey]: LandlordsAddReducer,
    [editLandlordssStoreKey]: editLandlordsReducer,
    [updateLandlordsStoreKey]: updateLandlordsReducer,
    [LandlordsdeleteStoreKey]: LandlordsdeleteReducer,
    //transaction key
    [TransactionslistStoreKeys]: TransactionslistReducers,
    [TransactionsAddStoreKey]: TransactionsAddReducer,
    [editTransactionssStoreKey]: editTransactionsReducer,
    [updateTransactionsStoreKey]: updateTransactionsReducer,
    [TransactionsdeleteStoreKey]: TransactionsdeleteReducer,
    //payments key
    [PaymentslistStoreKeys]: PaymentslistReducers,
    [PaymentsAddStoreKey]: PaymentsAddReducer,
    [editPaymentssStoreKey]: editPaymentsReducer,
    [updatePaymentsStoreKey]: updatePaymentsReducer,
    [PaymentsdeleteStoreKey]: PaymentsdeleteReducer,
    //setting Add profile key
    [SettingslistStoreKeys]: SettingslistReducers,
    [SettingsAddStoreKey]: SettingsAddReducer,
    [editSettingssStoreKey]: editSettingsReducer,
    [updateSettingsStoreKey]: updateSettingsReducer,
    [SettingsdeleteStoreKey]: SettingsdeleteReducer,
    //setting Role
    [RoleslistStoreKeys]: RoleslistReducers,
    [RolesAddStoreKey]: RolesAddReducer,
    [editRolessStoreKey]: editRolesReducer,
    [updateRolesStoreKey]: updateRolesReducer,
    [RolesdeleteStoreKey]: RolesdeleteReducer,
    //config role
    [RoleslistConfigStoreKeys]: RoleslistConfigReducers,

    // LeaseType setting
    [LeaselistStoreKeys]: LeaselistReducers,
    [LeaseAddStoreKey]: LeaseAddReducer,
    [editLeasesStoreKey]: editLeaseReducer,
    [updateLeaseStoreKey]: updateLeaseReducer,
    [LeasedeleteStoreKey]: LeasedeleteReducer,
    // Property module
    [PropertylistStoreKeys]: PropertylistReducers,
    [PropertyAddStoreKey]: PropertyAddReducer,
    [editPropertysStoreKey]: editPropertyReducer,
    [updatePropertyStoreKey]: updatePropertyReducer,
    [PropertydeleteStoreKey]: PropertydeleteReducer,
    // Lease module
    [LeasesListlistStoreKeys]: LeasesListlistReducers,
    [LeasesListAddStoreKey]: LeasesListAddReducer,
    [editLeasesListsStoreKey]: editLeasesListReducer,
    [updateLeasesListStoreKey]: updateLeasesListReducer,
    [LeasesListdeleteStoreKey]: LeasesListdeleteReducer,

    // lease document
    [LeaseDoclistStoreKeys]: LeaseDoclistReducers,
    [LeaseDocAddStoreKey]: LeaseDocAddReducer,
    [editLeasesDocStoreKey]: editLeaseDocReducer,
    [updateLeaseDocStoreKey]: updateLeaseDocReducer,
    [LeaseDocdeleteStoreKey]: LeaseDocdeleteReducer,

     // Apartment
     [getApartmentlistStoreKeys]: getApartmentListReducers,
     [postApartmentStoreKey]: postApartmentReducer,
     [getApartmentDetialsStoreKey]: getApartmentDetialsReducer,
     [updateApartmentStoreKey]: updateApartmentReducer,
     [deleteApartmentStoreKey]: deleteApartmentReducer,

    //  // Property
     [getPropertylistStoreKeys]: getPropertyListReducers,
     [postPropertyStoreKey]: postPropertyReducer,
     [getProprtDetialsStoreKey]: getProprtDetialsReducer,
     [updatePropertyManagementStoreKey]: updatePropertyManagementReducer,
     [deletePropertyStoreKey]: deletePropertyReducer,

    [USERlistDropDownStoreKeys]: UserlistDropDownReducers,
    [CitylistStoreKeys]: CitylistReducers,
    [CityAddStoreKey]: CityAddReducer,
    [editCityStoreKey]: editCityReducer,
    [updateCityStoreKey]: updateCityReducer,
    [CitydeleteStoreKey]: CitydeleteReducer,
    [StatelistStoreKeys]: StatelistReducers,
    [StateAddStoreKey]: StateAddReducer,
    [editStateStoreKey]: editStateReducer,
    [updateStateStoreKey]: updateStateReducer,
    [StatedeleteStoreKey]: StatedeleteReducer,
    [CountrylistStoreKeys]: CountrylistReducers,
    [CountryAddStoreKey]: CountryAddReducer,
    [editCountryStoreKey]: editCountryReducer,
    [updateCountryStoreKey]: updateCountryReducer,
    [CountrydeleteStoreKey]: CountrydeleteReducer,
    [PropertieslistStoreKeys]: PropertieslistReducers,
    [PropertiesAddStoreKey]: PropertiesAddReducer,
    [editPerpertiesStoreKey]: editPerpertiesReducer,
    [updatePropertiesStoreKey]: updatePropertiesReducer,
    [PropertiesdeleteStoreKey]: PropertiesdeleteReducer,

    [PropertyDoclistStoreKeys]: PropertyDoclistReducers,
    [PropertyDocAddStoreKey]: PropertyDocAddReducer,
    [editPropertysDocStoreKey]: editPropertyDocReducer,
    [updatePropertyDocStoreKey]: updatePropertyDocReducer,
    [PropertyDocdeleteStoreKey]: PropertyDocdeleteReducer,

    // setting propertydocument type
    [PropertyDocumentTypelistStoreKeys]: PropertyDocumentTypelistReducers,
    [PropertyDocumentTypeAddStoreKey]: PropertyDocumentTypeAddReducer,
    [editPropertyDocumentTypesStoreKey]: editPropertyDocumentTypeReducer,
    [updatePropertyDocumentTypeStoreKey]: updatePropertyDocumentTypeReducer,
    [PropertyDocumentTypedeleteStoreKey]: PropertyDocumentTypedeleteReducer,

    //setting leasedocument type
    [LeaseDocumentlistStoreKeys]: LeaseDocumentlistReducers,
    [LeaseDocumentAddStoreKey]: LeaseDocumentAddReducer,
    [editLeaseDocumentsStoreKey]: editLeaseDocumentReducer,
    [updateLeaseDocumentStoreKey]: updateLeaseDocumentReducer,
    [LeaseDocumentdeleteStoreKey]: LeaseDocumentdeleteReducer,

    //surveyNumber
    [PropertySurveyNolistStoreKeys]: PropertySurveyNolistReducers,

    //myprofile
    [editProfileStoreKey]: editProfileReducer,
    [MultifileAddStoreKey]: MultifileAddReducer,
    [ImageDeleteStoreKey]: ImageDeleteReducer,

    //dashboard
    [DashboardlistStoreKeys]: DashboardlistReducers,

    // Lessee module
    [LesseeListlistStoreKeys]: LesseeListlistReducers,
    [LesseeListAddStoreKey]: LesseeListAddReducer,
    [editLesseeListsStoreKey]: editLesseeListReducer,
    [updateLesseeListStoreKey]: updateLesseeListReducer,
    [LesseeListdeleteStoreKey]: LesseeListdeleteReducer,

    //nominee
    [editNomineeStoreKey]: editNomineeReducer,
    [MultifileNomineeAddStoreKey]: MultifileNomineeAddReducer,
    [ImageDeleteNomineeStoreKey]: ImageDeleteNomineeReducer,

    // Request module
    [RequestListlistStoreKeys]: RequestListlistReducers,
    [RequestListAddStoreKey]: RequestListAddReducer,
    [editRequestListsStoreKey]: editRequestListReducer,
    [updateRequestListStoreKey]: updateRequestListReducer,
    [RequestListdeleteStoreKey]: RequestListdeleteReducer,

    // Apartment-Admin module
    [ApartmentAdminlistStoreKeys]: ApartmentAdminlistReducers,
    [ApartmentAdminAddStoreKey]: ApartmentAdminAddReducer,
    [editApartmentAdminStoreKey]: editApartmentAdminReducer,
    [updateApartmentAdminStoreKey]: updateApartmentAdminReducer,
    [ApartmentAdmindeleteStoreKey]: ApartmentAdmindeleteReducer,

    // flat module
    [FlatlistStoreKeys]: FlatlistReducers,
    [FlatAddStoreKey]: FlatAddReducer,
    [editFlatStoreKey]: editFlatReducer,
    [updateFlatStoreKey]: updateFlatReducer,
    [FlatdeleteStoreKey]: FlatdeleteReducer,

    //open-region-api
    [OpenCountrylistStoreKeys]: OpenCountrylistReducers,
    [OpenStatelistStoreKeys]: OpenStatelistReducers,
    [OpenCitylistStoreKeys]: OpenCitylistReducers,

    // ApartmentType setting
    [ApartmentTypelistStoreKeys]: ApartmentTypelistReducers,
    [ApartmentTypeAddStoreKey]: ApartmentTypeAddReducer,
    [editApartmentTypeStoreKey]: editApartmentTypeReducer,
    [updateApartmentTypeStoreKey]: updateApartmentTypeReducer,
    [ApartmentTypedeleteStoreKey]: ApartmentTypedeleteReducer,

    // FlatDocumentType setting
    [FlatDocumentTypelistStoreKeys]: FlatDocumentTypelistReducers,
    [FlatDocumentTypeAddStoreKey]: FlatDocumentTypeAddReducer,
    [editFlatDocumentTypeStoreKey]: editFlatDocumentTypeReducer,
    [updateFlatDocumentTypeStoreKey]: updateFlatDocumentTypeReducer,
    [FlatDocumentTypedeleteStoreKey]: FlatDocumentTypedeleteReducer,

    // FlatDocument setting
    [FlatDocumentlistStoreKeys]: FlatDocumentlistReducers,
    [FlatDocumentAddStoreKey]: FlatDocumentAddReducer,
    [editFlatDocumentStoreKey]: editFlatDocumentReducer,
    [updateFlatDocumentStoreKey]: updateFlatDocumentReducer,
    [FlatDocumentdeleteStoreKey]: FlatDocumentdeleteReducer,

    //FlatOwner
    [FlatOwnerlistStoreKeys]: FlatOwnerlistReducers,
    [FlatOwnerAddStoreKey]: FlatOwnerAddReducer,
    [editFlatOwnerStoreKey]: editFlatOwnerReducer,
    [updateFlatOwnerStoreKey]: updateFlatOwnerReducer,
    [FlatOwnerdeleteStoreKey]: FlatOwnerdeleteReducer
  })

  return rootReducer
}