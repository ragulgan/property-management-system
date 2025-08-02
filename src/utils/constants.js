import { toAbsoluteUrl } from '../theme/helpers'

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount'
export const DAEMON = '@@saga-injector/daemon'
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount'

export const colors = {
  oxfordBlue: '#153D58'
}

export const ERROR = {
  INVALID_RESPONSE: 'Invalid response',
  MSG: 'error'
}

export const EMPTY_DROPZONE = {
  MSG: 'Drag and drop here.',
  FILE_MSG: 'Upload file here. Only Json file are allowed.Allowed Size 1MB'
}

export const IMAGE = {
  'image/jpeg': "jpeg.jpeg",
  'image/png': "png.png",
  'application/pdf': "pdf.png",
  'text/plain': "plain.png",
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': "docx.png",
  'undefined': "blank.png"
}
export const FILE_FORMAT_TYPE_VIDEO = [
  'video/MP4',
  'video/mp4',
  'video/MOV',
  'video/mov',
  'video/WMV',
  'video/wmv',
  'video/AVI',
  'video/avi',
  'video/AVCHD',
  'video/avchd',
  'video/FLV',
  'video/flv',
  'video/F4V',
  'video/f4v',
  'video/SWF',
  'video/swf',
  'video/WEBM',
  'video/webm',
  'video/HTML5',
  'video/html5',
  'video/MPEG-2',
  'video/mpeg-2'
]

export const FILE_FORMAT_TYPE = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/svg+xml',
  'image/JPEG',
  'image/PNG',
  'image/JPG',
  'video/MP4',
  'video/mp4',
  'video/MOV',
  'video/mov',
  'video/WMV',
  'video/wmv',
  'video/AVI',
  'video/avi',
  'video/AVCHD',
  'video/avchd',
  'video/FLV',
  'video/flv',
  'video/F4V',
  'video/f4v',
  'video/SWF',
  'video/swf',
  'video/WEBM',
  'video/webm',
  'video/HTML5',
  'video/html5',
  'video/MPEG-2',
  'video/mpeg-2'
]


export const DROPZONE_IMAGE_NAME_TYPES = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  APPUSER: 'appuser',
  DOCUMENTS: 'FILES',
  USER_PROFILE: 'userprofile',
}

export const DROPZONE_IMAGE_FLAG = {
  PROFILES: 'PROFILES',
  UPLOAD_DAILIES: 'UPLOAD_DAILIES',
  APPUSER: 'appuser',
  STILS: 'STILS',
  AUDIO: 'AUDIO',
  DOCUMENTS: 'FILES'
}

export const MAP = {
  BUSINESSADDRESS: '/media/icons/duotune/maps/map020.png',
  INDIVIDUALADDRESS: '/media/icons/duotune/maps/map011.png',
  IP: '/media/icons/duotune/maps/map013.png',
  BillingAdderess: '/media/icons/duotune/maps/map016.png',
  ShippingAdderess: '/media/icons/duotune/maps/map019.png',
}

export const RISKSTATUSCOLOR = {
  APPROVED: 'sucess-color',
  HOLD: 'holding-color',
  PENDING: 'pending-color',
  REJECTED: 'danger-color'
}

export const QUEUE_ROUTING = {
  SUSPECT_ACCOUNTS_Q: '/risk-management',
  SUSPECT_TXN_Q: '/transaction',
  CHARGEBACK_Q: '/upcoming',
  KYC_Q: '/upcoming',
  AML_Q: '/aml-queue',
  ATO_Q: '/upcoming'
}

export const TXNSTATUS = {
  Success: 'badge-primary',
  Dispute: 'badge-orange text-black',
  Refund: 'badge-warning text-black',
  Chargeback: 'badge-danger'
}

export const RISKSTATUS = {
  APPROVED: 'badge-success',
  HOLD: 'badge-orange text-black',
  PENDING: 'badge-warning text-black',
  REJECTED: 'badge-danger',
  "MANUAL REVIEW": 'badge-orange text-black',
  "DATA CAPTURED": 'badge-secondary text-black',
  COMPLETED: 'badge-success text-black',
  "DATA PROCESSING": 'badge-warning text-black'
}

export const REVIEWTYPE = {
  Auto: 'badge-success text-black',
  Manual: 'badge-orange text-black',
  "SUSPECTED ACCOUNT": 'badge-success text-black',
  "NOT SUSPECTED": 'badge-orange text-black'
}

export const AVSSTATUS = {
  M: 'badge-success text-black',
  N: 'badge-danger text-black',
  S: 'badge-danger text-black',
  P: 'badge-danger text-black',
  U: 'badge-danger text-black'
}

export const CVSSTATUS = {
  X: 'badge-success text-black',
  Y: 'badge-success text-black',
  Z: 'badge-danger text-black',
  A: 'badge-danger text-black',
  N: 'badge-danger text-black',
  U: 'badge-danger text-black'
}

export const STATUS_BADGE = {
  ACTIVE: 'badge-success',
  INACTIVE: 'badge-danger warning-lanloard text-black',
  PENDING: 'badge-danger'
}

export const STATUS_BADGE_APARTMENTADMIN = {
  Active: 'badge-success',
  InActive: 'badge-danger warning-lanloard text-black',
  OnVist: 'badge-success'
}

export const STATUS_BADGE_LANDLORD = {
  ACTIVE: 'badge-success',
  INACTIVE: 'badge-danger warning-lanloard text-black',
}

export const STATUS_BADGE_TRANSACTION = {
  'Payment Successful': 'badge-success',
  'Payment Failed': 'badge-danger warning-lanloard text-black'
}

export const STATUS_BADGE_REQUEST = {
  'New': 'badge-success',
  'Completed': 'badge-success',
  'In Progress': 'badge-danger warning-lanloard text-black'
}

export const STATUS_BADGE_PAYMENT = {
  'Pay Now': 'badge-success',
  'Payment Failed': 'badge-danger warning-lanloard text-black',
  'Pending': 'badge-warning warning-payment-pending',
  'Payment Due': 'badge-warning warning-payment-due',
  'Received': 'badge-info warning-payment-received'
}

export const PROPERTY_STATUS_BADGE = {
  VACANT: 'vacant-status',
  UNDER_MAINTENANCE: 'undermaintenance-status',
  OCCUPIED: 'onlease-status',
  REPAIR: 'repair-status',
  MAINTENANCE: 'undermaintenance-status'
}

export const LEASE_STATUS_BADGE = {
  ACTIVE: 'active-status',
  EXPIRED: 'expired-status',
  RENEWAL: 'renewal-status',
  EXPIRE_SOON: 'expire-soon-status',
  TERMINATED: 'terminated-status',
  DRAFT: 'draft-status',
  INACTIVE: 'inactive-status'
}

export const APARTMENT_STATUS_BADGE = {
  ACTIVE: 'apartment-active-status',
  INACTIVE: 'apartment-inactive-status'
}

export const USER_ERROR = {
  COMPANYNAME: 'Company Name is required.',
  PRODUCTNAME: 'Product name is required.',
  MERCHANTNAME: 'Merchant Name is required.',
  DBA: 'DBA is required.',
  MERCHANT_ID: 'Merchant Id is required.',
  DISPUTE_METHOD: 'Dispute method is required.',
  DISPUTE_AMOUNT: 'Dispute amount is required.',
  DISPUTE_DATE: 'Dispute date is required.',
  CB_CASE: 'Chargeback case is required.',
  CB_DATE: 'Chargeback Date is required.',
  CB_DEADLINE: 'Chargeback Deadline is required.',
  CB_AMOUNT: 'Chargeback amount is required.',
  CB_STATUS: 'Chargeback status is required.',
  CB_TYPE: 'Chargeback Type is required.',
  CARD_SIX: 'Card first six number is required.',
  CARD_FOUR: 'Card last four digit is required.',
  CARD_TYPE: 'Card Type is required.',
  CB_REASON: 'Chargeback reason is required.',
  TD_DATE: 'Transaction Date is required.',
  TD_AMT: 'Transaction amount is required.',
  TD_NO: 'Transaction number is required.',
  SA_TY: 'Sale Type is required.',
  CUS_IP: 'Cutomer IP is required.',
  CUS_PH: 'Customer Phone is required.',
  AFF_ID: 'Affiliate ID is required.',
  AVS_MATCH: 'AVS is required.',
  CVV: 'CVV is required.',
  CUS_NA: 'Customer Name is required.',
  AUTH_CODE: 'Authentication code is required.',
  COUNTRY: 'Country is required. ',
  NON_US: 'Non US country is required.',
  MERCHANT_DESCRIPTOR: 'Merchant Descriptor is required.',
  ARN: 'ARN is required.',
  TRANSACTION_CODE: 'Transaction Code is required.',
  TRANSACTION_ID: 'Transaction ID is required.',
  TRANSACTION_AMOUNT: 'Transaction Amount is required.',
  TRANSACTION_CURRENCY: 'Transaction Currency is required.',
  AVS_CODE: 'AVS Code is required.',
  CVV_CODE: 'CVV Code is required.',
  SECURE_CODE: 'Secure Code is required.',
  RE_FUNDED: 'Refunded is required.',
  ISSUE_BANK: 'IssueBank is required.',
  CARD_COUNTRY: 'Card Country is required.',
  BILLING_COUNTRY: 'Billing Country is required.',
  BILLING_STATE: 'Billing State is required.',
  BILLING_CITY: 'Billing City is required.',
  BILLING_ZIPCODE: 'Billing ZipCode is required.',
  ACC_USERNAME: 'Account UserName is required.',
  EMAIL: 'Email is required.',
  PHONE_NUMBER: 'Phone Number is required.',
  ACC_ACTIVEDATE: 'Account Active Date is required.',
  PURCHASE_DATE: 'First Purchase Date is required.',
  LAST_LOGIN: 'Last Login is required.',
  IP_ADDRESS: 'IP Address is required.',
  IP_LOCATION: 'IP Location is required.',
  DEVICE_NAME: 'Device Name is required.',
  LOGIN_HISTORY: 'Login History is required.',
  TRANSACTION_HISTORY: 'Transaction History is required.',
  PRODUCT_TYPE: 'Product Type is required.',
  PRODUCT_NAME: 'Product Name is required.',
  PRO_ACQ_DATE: 'Product Acquisation Date is required.',
  DELIVERY_DATE: 'Delivery Date is required.',
  TRACKING_NO: 'Tracking Number is required.',
  SHIPPING_COUNTRY: 'Shipping Country is required.',
  SHIPPING_STATE: 'Shipping State is required.',
  SHIPPING_CITY: 'Shipping City is required.',
  SHIPPING_ADDRESS: 'Shipping Address is required.',
  SHIPPING_ZIPCODE: 'Shipping ZipCode is required.',
  WEBSITE: 'Website is required.',
  DESCRIPTION: 'Description is required.',
  BENIFITS: 'Benifits is required.',
  SPECIFICINFO: 'Specific Info is required.',
  CONTACT_URL: 'Contact URL is required.',
  LIVE_CHAT: 'Support Live Chat is required.',
  TERMS_URL: 'Terms and Condition URL is required.',
  REFUND_URL: 'Refund Policy URL is required.',
  FILE: 'File is required. ',
  EMAIL_REQUIRED: 'Email address is required.',
  EMAIL_INVALID: 'Email address is invalid.',
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_MIN_MAX_LENGTH: 'Should be greater than 6 or less than 14 digits.',
  PASSWORD_INVALID: 'Please enter valid password.',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required.',
  PASSWORD_SAME: 'Password and Confirm password should be same.',
  ALERT_ID: 'Alert Id is required.',
  ALERT_DATE: 'Alert Date is required.',
  ALERT_TYPE: 'Alert Type is required.',
  TRNS_TYPE: 'Transaction Type is required.',
  UPI_ID: 'UPI Transaction ID is required.',
  CUS_FNAME: 'Customer First Name is required.',
  CARD_BIN: 'Card Bin is required. ',
  EXP_MONTH: 'Expiration Month is required.',
  EXP_YEAR: 'Expiration Year is required.',
  CUS_LNAME: 'Customer Last Name is required.',
  DES: 'Descriptor is required.',
  DES_CONTACT: 'Descriptor Contact is required.',
  DES_CONTACT_INVALID: 'Descriptor Contact is invalid.',
  NOT_TYPE: 'Notification Type is requirted.',
  BANK: 'Bank Selection is required.',
  CARD_SIX_INVALID: 'Card First Six digits is invalid.',
  CARD_FOUR_INVALID: 'Card Last Four digits is invalid.',
  PROVIDER: 'Provider is required. ',
  RES_DATE: 'Resolution Date is required.',
  DURATION: 'Duration is required.',
  MERCHANT: 'Merchant is required.',
  REFUND_STATUS: 'Refund Status is required.',
  REFUND_AMOUNT: 'Refund Amount is required.',
  REFUND_DATE: 'Refund Date is required.',
  REFUND_DATE: 'Refund Date is required.',
  ADDRESS: 'Address is required.',
  PHONE: 'Phone is required.',
  DEVICE_ID: 'Device ID is required.',
  F_NAME: 'First Name is required.',
  L_NAME: 'Last Name is required.',
  COMPANY_NAME: 'Company Name is required.',
  P_EMAIL: 'Personal email is required.',
  B_EMAIL: 'Buisness email is required.',
  BUSINESS_PHONE: 'Business Phone is required.',
  BUSINESS_ADDRESS: 'Business Address is required.',
  REASON: 'Reason is required.',
  WEBSITE: 'Website is required.',
  QUEUE_NAME: 'Queue Name is required.',
  SLA_HIGH: 'SlaHigh is required.',
  SLA_MEDIUM: 'SlaMedium is required.',
  SLA_LOW: 'SlaLow is required.',
  PHONE_NUMBER_INVALID: 'Phone Number is invalid. (ex: 555-555-1234)',
  ADDRESS_REQUIRED: 'Address is required.',
  ZIPCODE_REQUIRED: 'Zip Code is required.',
  ZIPCODE_INVALID: 'Zip Code is should be in 6 digits.',
  INDUSTRY_REQUIRED: 'Industry is required.',
  ROLE_REQUIRED: 'Role is required.',
  STATE_REQUIRED: 'State is required.',
  CITY_REQUIRED: 'City is required.',
  GSTIN_REQUIRED: 'GSTIN is required.',

}

export const DATE = {
  TIME: 'Time',
  TIME_INTERVAL: 15,
  TWELVE_HRS_FORMAT: 'h:mm A',
  DATE_TIME_FORMAT: ' D/MM/YYYY, h:mm A',
  DATE_ONLY: 'DD/MM/YYYY',
  DATE_PICKER: 'dd-MM-yyyy',
  DATE_FOR_PICKER: 'yyyy/MM/dd',
  DATE_MONTH_ONLY: 'dd/MM',
  DATE_MONTH_ONLY__: 'DD/MM',
  MONTH_ONLY: 'MM',
  YEAR_ONLY: 'yyyy',
  EXAMPLE_DATE: '2017-03-13',
  DATE_FORMAT: 'YYYY-MM-DD',
  DATE_FORMAT_MINS: 'MMM-DD-YYYY, hh:mm',
  DATE_FOR_PICKER_MONTH: 'MM'
}

export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  DOB: /^\d{2}[-/.]\d{2}[-/.]\d{4}$/,
  PHONE: /^[0][1-9]\d{9}$|^[1-9]\d{9}$/,
  NUMERIC: /^[0-9]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PASSWORD_MIN_MAX_LENGTH: /^[a-zA-Z0-9@#^\-_$]{6,14}$/,
  TEXT: /^[a-zA-Z_ ]*$/,
  ALPHA_NUMERIC: /^[a-zA-Z0-9 /]*$/,
  ALPHA_NUMERIC_CHARS: /^[a-zA-Z0-9@#^\-_$/]*$/,
  ALPHA_NUMERIC_CHARS_SPACE: /^[a-zA-Z0-9@^\-_.,àâçéèêëîïôûùüÿñæœ +g]*$/,
  ALPHA_CHARS_SPACE: /^[a-zA-Z^-_$.,àâçéèêëîïôûùüÿñæœ +g]*$/,
  ZIP_CODE: /^[0-9]\d{0,6}$/,
  NUMERIC_EIGHT_DIGITS: /^([0-9]){1,8}$/,
  NUMERIC_FOUR_DIGITS: /^([0-9]){1,4}$/,
  NUMERIC_THREE_DIGITS: /^([0-9]){1,3}$/,
  SPACE: / +/g,
  WEBSITE_URL: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  PHONE_NUMBER_1: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  PHONE_NUMBER: /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/,
  NUMERIC_CHARS: /^[0-9-_]+$/,
  ALPHA_UPPER_CASE: /^[A-Z]*$/,
  ALPHA_NUMERIC_SPECIAL_CHARS: /^[a-zA-Z0-9@^\-_:/'"{}|.,àâçéèêëîïôûùüÿñæœ +g]*$/,
  CAID_NUMBER: /^([0-9]){6,8}$/,
  BIN_NUMBER: /^([0-9]){4,6}$/,
  // NUMERIC_SIX_DIGITS: /^([0-9]{6}|[0-9]{8})$/,
  // NUMERIC_FOUR_DIGITS: /^([0-9]){4}$/,
  URL: /^(ftp|http|https):\/\/[^ "]+\.[a-zA-Z]{2,4}$/,
  URL_ONE: /^(ftp|http|https):\/\/[^ "]+$/,
  LENGTH: /^(?!.*  )(?=.*[\w-])[\w -]{50,10000}$/,
  // PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  PAN: /^([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([0-9]([0-9]([0-9]([0-9]([a-zA-Z])?)?)?)?)?)?)?)?)?)?$/,
  EDUCATION: /^[a-zA-Z., ]*$/,
  NUMERIC_DIGITS: /^[6-9]\d{0,9}$/,
  AADHAAR: /^[2 - 9]{ 1}[0 - 9]{ 3 } \\s[0 - 9]{ 4 } \\s[0 - 9]{ 4 } $/,
  MOBILE_NUMBER_VALID: /^[6-9]\d{9}$/
}

export const RESPONSE_STATUS = {
  SUCCESS: 'ok',
  ERROR: 'error'
}

export const SESSION = {
  TOKEN: 'token',
  EXPIRED: 'session_expired',
  RESET_TOKEN: 'resetToken',
  AUTH_FAILED: 'Auth failed',
  AUTH_SUCCESS: 'Auth success',
  ROLE: 'role_type',
  USER: 'UserId'
}

export const ORDER_INSIGHT_LAYOUT = {
  EXPORT: 'exportPIselectedCols',
  SEARCH: 'searchPIselectedCols',
  TABLE_LAYOUT: 'tableLayoutPIselectedCols'
}

export const CHARGEBACK_LAYOUT = {
  EXPORT: 'exportCBselectedCols',
  SEARCH: 'searchCBselectedCols',
  TABLE_LAYOUT: 'tableLayoutCBselectedCols'
}

export const INQUIRY_ALERT_LAYOUT = {
  EXPORT: 'export',
  SEARCH: 'search',
  TABLE_LAYOUT: 'tableLayout'
}

export const LAYOUT_DETAILS = {
  EXPORT_IBA: 'exportIBAselectedCols',
  SEARCH_IBA: 'searchIBAselectedCols',
  TABLE_LAYOUT_IBA: 'tableLayoutIBAselectedCols'
}

export const PREVENTION_LAYOUT = {
  EXPORT: 'exportPAselectedCols',
  SEARCH: 'searchPAselectedCols',
  TABLE_LAYOUT: 'tableLayoutPAselectedCols'
}

export const ENV = {
  SDK_URL: process.env.REACT_APP_SDK_URL
}

export const GOOGLE_MAP = {
  KEY: process.env.REACT_APP_SDK_URL
}

export const STATUS_RESPONSE = {
  SUCCESS_MSG: 'ok',
  ERROR_MSG: 'error'
}

export const ALERT_TYPE = {
  SELECT: '',
  INQUIERY: 'Inquiry',
  NOTIFICATION: 'Notification'
}

export const MONTH = {
  SELECT: '',
  INQUIERY: 'Inquiry',
  NOTIFICATION: 'Notification'
}

export const NOTIFICATION_TYPE = {
  SELECT: '',
  BLANK_SPACE: 'Blank Space',
  CANCEL_REQURRING: 'Cancel Recurring',
  CHARGEBACK: 'Chargeback',
  EXCEPTION_UNKOWN: 'Exception or Unknown',
  FRAUD_ALERT: 'Fraud Alert'
}

export const SWEET_ALERT_MSG = {
  DELETE: '',
  CREATE: 'Created Successfully',
  UPDATE: '',
  CONFIRMATION_TEXT_UPDATE: 'Are you sure want to update !',
  CONFIRMATION_TEXT_DELETE: 'Are you sure want to delete !',
  UPDATE_QUEUE: 'Want To Update This Landlord !',
  REJECT: 'Want To Reject !',
  HOLD: 'Want To Hold !',
  DELETE_RULES: 'Want to delete this Rules !',
  DELETE_BLOCKLIST: 'Want to delete this Block List !',
  DELETE_WHITELIST: 'Want to delete this Whitelist !',
  DELETE_WATCHLIST: 'Want to delete this Watchlist !',
  DELETE_CITY: 'Want to delete this city !',
  DELETE_STATE: 'Want to delete this state !',
  DELETE_COUNTRY: 'Want to delete this country !',
  DELETE_AREA: 'Want to delete this area !',
  DELETE_ADVERTISER: 'Want to delete this Advertiser !',
  DELETE_OFFERS: 'Want to delete this Offers !',
  DELETE_MEMBERS: 'Want to delete this LandLords !',
  DELETE_ROLE: 'Want to delete this role member !',
  DELETE_MANAGER: 'Want to delete this State Manager !',
  DELETE_EXCUTIVE: 'Want to delete this Executive !',
  DELETE_FRANCHISE: 'Want to delete this Franchise',
  DELETE_WEB: 'Want to delete this Web Risk Analysis !',
  UPDATE_WEB: 'Want To Update This Web Risk Analysis !',
  UPDATE_ASSIGN: 'Want To Assign This Members !',
  UPDATEUSER: 'Want To Update This User !',
  DELETE_DOCUMENT: 'Want to delete this Document !',
  DELETE_LEASE_TYPE: 'Want to delete this Lease type !',
  DELETE_APARTMENT_TYPE: 'Want to delete this Apartment type !'
}

export const HEADER = {
  TOKEN: 'Authorization',
  CONTENT_TYPE: 'application/json',
  MULTIPART_CONTENT_TYPE: 'multipart/form-data,boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL',
  TIMEOUT: 30000,
  BEARER: 'Bearer'
}

export const DROPZONE_MESSAGES = {
  JSON_INVALID: 'Uploaded file is not a valid json file.',
  IMAGE_INVALID: 'Uploaded file is not a valid image. Only JPG, PNG and JPEG files are allowed.',
  VIDEO_INVALID: 'Uploaded file is not a valid video format.',
  AUDIO_INVALID: 'Uploaded file is not a valid audio format.',
  DOCUMENT_INVALID: 'Uploaded file is not a valid document format.',
  CSV_INVALID: 'Uploaded Document is not a valid document.Only CSV files are allowed'
}

export const FILE_FORMAT_CB_DOCUMENT = [
  'text/csv',
  'application/pdf',
  'application/msword',
  'application/vnd.ms-excel',
  'text/plain',
  'image/gif',
  'image/vnd.adobe.photoshop'
]

//onboarding

export const VIEW_PERMISSION = [
  "view"
]
export const CREATE_PERMISSION = [
  "create"
]
export const UPDATE_PERMISSION = [
  "update"
]
export const DELETE_PERMISSION = [
  "delete"
]
export const IMPORT_PERMISSION = [
  "import"
]
export const EXPORT_PERMISSION = [
  "export"
]
export const UPDATE_DELETE_PERMISSION = [
  "update", "delete"
]
export const API_URL = process.env.REACT_APP_API_URL
export const CB_URL = `${process.env.REACT_APP_CHARGEBACK_URL}/uploads`
export const PROFILE_URL = process.env.REACT_APP_FILE_UPLOAD


export const refundVerifiOptions = [
  { value: "Partially", label: "Partially" },
  { value: "Fully", label: "Fully" },
]

export const API_MESSAGES = {
  SOMETHING_WRONG: 'Something went wrong. Please try again later!',
}

export const USER_MANAGEMENT_ERROR = {
  USER_ROLE_REQUIRED: 'User Role is required.',
  USER_TYPE_REQUIRED: 'Please select the user type.',
  PERMISSIONS_REQUIRED: 'Please select the permissions.',
  USER_FNAME: 'Please enter the firstname.',
  USER_LNAME: 'Please enter the lastname.',
  USER_EMAIL: 'Please enter the email.',
  USER_ADDRESS: 'Please enter the address.',
  // USER_PHONE: 'Phone Number is required.',
  USER_PASSWORD: 'Please enter the password.',
  USER_NAME: 'Please enter the name.',
  FATHER_NAME: 'Please enter the father name.',
  GENDER_SELECT: 'Please select the gender.',
  PHONE_NUMBER: 'Please enter the mobile number.',
  MARTIAL_SELECT: 'Please select the martial status.',
  BLOOD_GROUP_SELECT: 'Please select the blood group.',
  CURRENT_ADDRESS: 'Please enter the current address.',
  PERMANENT_ADDRESS: 'Please enter the permanent address.',
  PG: 'Please enter the PG information.',
  UG: 'Please enter the UG information.',
  STATUS_SELECT: 'Please select the status.',
  DATE_OF_JOIN: 'Please select the date of joining.',
  ROLEID_SELECT: 'Please select the role.',
  REPORT_TO_SELECT: 'Please select the reported person.',
  RELATION_TEXT: 'Please enter the relationship',
  DOB: 'Please select the date of birth.',
  BIO: 'Please enter the bio.',
  PHONE_NUMBER_VALID: 'Please enter the valid mobile number',
  PROPERTIES_TYPE: 'Please enter the property type.',
  USER_ROLE: 'Please enter the role name',
  PHONE_NUMBER_VALID: 'Please enter the valid mobile number',
  LEASE_TYPE: 'Please enter the lease type',
  LANDLORD_IMG: "Please add your image",
  PAN: 'Please enter the pan number.',
  AADHAR_NUMBER: 'Please enter the aadhar number.',
  CONTACT_RELATIONSHIP: 'Please enter the relationship.',
  NOMINEE_ADDRESS: 'Please enter the address.',
  COUNTRY_SELECT: 'Please select the country.',
  STATE_SELECT: 'Please select the state.',
  CITY_SELECT: 'Please select the city.',
  PINCODE: 'Please enter the Postal Code.'
}

export const PROPERTY_MANAGEMENT_ERROR = {
  LANDLORD_NAME: 'Please select the lanlord.',
  PROPERTY_NAME: 'Please enter the property name.',
  PROPERTY_OWNER_NAME: 'Please enter the property owner name.',
  SURVEY_NUMBER: 'Please enter the survey number.',
  PROPERTY_TYPE: 'Please select the property type.',
  PROPERTY_SIZE: 'Please enter the property size.',
  BUILD_NUMBER: 'Please enter the build no and street name .',
  COUNTRY_SELECT: 'Please select the country.',
  STATE_SELECT: 'Please select the state.',
  CITY_SELECT: 'Please select the city.',
  BLOOD_GROUP_SELECT: 'Please select the blood group.',
  CURRENT_ADDRESS: 'Please enter the current address.',
  PERMANENT_ADDRESS: 'Please enter the permanent address.',
  ADDRESS: 'Please enter the address.',
  AMOUNT: 'Please enter the amount.',
  STATUS_SELECT: 'Please select the property status.',
  DATE_ERROR: 'Please select the date',
  PROPERTY_SELECT_NAME: 'Please select the property name.',
  DOCUMENT_UPLOAD: 'Please select the document.',
  SELECT_DISTRICT: 'Please select the district.'
}

export const PROPERTY_DOCUMENT_ERROR = {
  PROPERTY_DOC_TYPE: 'Please select the document type.',
  PROPERTY_DOC_NAME: 'Please enter the document name.',
  PROPERTY_DOC_DES: 'Please enter the document description.'
}

export const USER_MANAGEMENT_VALIDATION = {
  USER_ROLE_REQUIRED: 'Not a Valid User Role.',
  USER_TYPE_REQUIRED: 'Not a Valid User Type.',
  USER_FNAME: 'First Name is required.',
  USER_LNAME: 'Last Name is required.',
  USER_PHONE: 'Please enter a Valid Phone Number.',
  USER_EMAIL: 'Please enter a valid email.',
  USER_PASSWORD: 'Please enter a valid password.',
  USER_PASSWORD_TYPE: 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  USER_VALID_PHONE_NUMBER: 'Please enter the valid mobile number.',
  USER_SAME_PHONE_NUMBER: 'Alternate number should be different.'
}

export const LEASE_MANAGEMENT_ERROR = {
  LESSOR_NAME: 'Please enter the leaser name.',
  LEASETYPE: 'Please select the lease type',
  LEASETERM: 'Please select the lease term',
  AMOUNT: 'Please enter the amount.',
  STATUS_SELECT: 'Please select the lease status.',
  DATE_ERROR: 'Please select the date',
  MAINTENANCE: 'Please enter the maintainer name'
}

export const SAVE_CURRENT = {
  CLIENT_ID: 'SAVE_CURRENT_CLIENT_ID',
  MID_ID: 'SAVE_CURRENT_MID_ID',
  ADD_MID_ID: 'SAVE_CURRENT_ADD_MID_ID',
  PARTNER_ID: 'SAVE_CURRENT_PARTNER_ID'
}

export const SET_STORAGE = {
  PARTNER_DETAILS: 'PARTNER_DETAILS',
  PARTNER_USER_DETAILS: 'PARTNER_USER_DETAILS',
  USER_MENU_DETAILS: 'USER_MENU_DETAILS',
  IS_FIRST_LOGIN: 'IS_FIRST_LOGIN'
}

export const FLATS_SELECT_ERROR = {
  APARTMENT_SELECT: 'Please select the apartment.',
}

export const APARTMENT_MANAGEMENT_ERROR = {
  APARTMENTTYPE_NAME: 'Please select the apartmentType.',
  APARTMENT_NAME: 'Please enter the apartment name.',
  COUNTRY_SELECT: 'Please select the country.',
  STATE_SELECT: 'Please select the state.',
  CITY_SELECT: 'Please select the city.',
  STREET_NAME: 'Please enter the street name.',
  ZIP_CODE: 'Please enter the zip code.',
  LANDMARK: 'Please select the land mark.',
  DESCRIPTION: 'Please enter the description.',
  ADDRESS: 'Please enter the address.'
}

export const FLAT_MANAGEMENT_ERROR = {
  BLOCK_SELECT: 'Please select the block.',
  FLOOR_SELECT: 'Please select the floor.',
  UNIT_NUMBER: 'Please enter the flat no.',
  SQUARE_FOOT: 'Please enter the property size.',
  BED_ROOM: 'Please enter the number of bedrooms.',
  BATH_ROOM: 'Please enter the number of bathrooms.',
  KITCHEN_SELECT: 'Please enter the number of kitchen.',
  BALCONY_SELECT: 'Please enter the number of balcony.',
  ORIENTATION: 'Please select the orientation.',
  FURNISH_STATUS: 'Please select the furnish status.',
  PARKING_SLOT: 'Please enter the no of parking slot.',
  VEHICLE_SELECT: 'Please select the vehicle details.',
  NOTES: 'Please enter the description.'
}

export const SLICE_CHARACTERS = {
  UP_TO_70: 70,
  UP_TO_35: 35,
  UP_TO_50: 50,
  UP_TO_40: 40,
  UP_TO_25: 25,
  UP_TO_15: 15
}

export const FILE_FORMAT_TYPE_DOCUMENT = [
  'text/csv',
  'application/pdf',
  'application/msword',
  'application/vnd.ms-excel',
  'text/plain',
  'image/vnd.adobe.photoshop'
]

export const FILE_FORMAT_CB_EVIDENCE = [
  'text/csv',
  'application/vnd.ms-excel'
]

export const FILE_FORMAT_IMAGES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/svg+xml',
  'image/JPEG',
  'image/PNG',
  'image/JPG',
]

export const FILE_FORMAT_MID = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/svg+xml',
  'image/JPEG',
  'image/PNG',
  'image/JPG',
  'application/pdf',
]

export const googleApiKey = process.env.GOOGLE_API_KEY