export const API_ENDPOINT: string = (process.env.REACT_APP_API_ENDPOINT || "") + "/v2";
export const END_TRIP_PHOTO = "https://end-trip-photo.s3.eu-west-3.amazonaws.com/";
// Auth ----------------------------------------------------------------------------------------------------------------
export const POST_LOGIN = `${API_ENDPOINT}/auth/login`;

// Trips ---------------------------------------------------------------------------------------------------------------
export const TRIPS_ENDPOINT = `${API_ENDPOINT}/trips`;
export const GET_TRIPS_LIST = `${TRIPS_ENDPOINT}/`;
export const PUT_TRIP = `${TRIPS_ENDPOINT}/`;
export const GET_TRIP_DETAILS = (tripId: string | number) => `${TRIPS_ENDPOINT}/${tripId}/details`;
export const GET_TRIPS_END_COORDS = `${TRIPS_ENDPOINT}/end-coordinates`;
export const GET_TRIPS_START_COORDS = `${TRIPS_ENDPOINT}/start-coordinates`;
export const FORCE_END_TRIP = `${TRIPS_ENDPOINT}/end/force`;

// Users ---------------------------------------------------------------------------------------------------------------
export const USER_ENDPOINT = `${API_ENDPOINT}/users`;
export const GET_USERS_LIST = `${USER_ENDPOINT}/`;
export const GET_USER_DETAIL = (userId: string | number) => `${USER_ENDPOINT}/${userId}`;
export const PUT_USER_DETAIL = (userId: string | number) => `${USER_ENDPOINT}/${userId}`;


// Events --------------------------------------------------------------------------------------------------------------
export const EVENT_LOGS =  `${API_ENDPOINT}/event-log`;
export const GET_OPEN_APP_COORDS = `${EVENT_LOGS}/open-coordinates`;
export const GET_USER_EVENT_LOGS = (userId: string | number) => `${EVENT_LOGS}/${userId}`;

// Bikes ---------------------------------------------------------------------------------------------------------------
export const BIKE_ENDPOINT = `${API_ENDPOINT}/bikes`;
export const GET_BIKES_LIST = `${BIKE_ENDPOINT}/`;
export const GET_BIKES_POSITION = (bikeId: string | number) => `${BIKE_ENDPOINT}/positions/${bikeId}`;
export const POST_BIKE = `${BIKE_ENDPOINT}/`;
export const PUT_BIKE = `${BIKE_ENDPOINT}/`;
export const GET_BIKE_MARKER_DATA = `${BIKE_ENDPOINT}/technician`;
export const GET_BIKE_DETAIL = (bikeId: string | number) => `${BIKE_ENDPOINT}/detail/${bikeId}`;
export const PUT_BIKES_ADDRESS = (bikeId: string | number) => `${BIKE_ENDPOINT}/address/${bikeId}`;

// Reviews -------------------------------------------------------------------------------------------------------------
export const REVIEW_LIST_ENDPOINT = `${API_ENDPOINT}/reviews`;
export const GET_REVIEWS_LIST = `${REVIEW_LIST_ENDPOINT}/`;
export const GET_LAST_REVIEW = (bikeId: number | string) => `${REVIEW_LIST_ENDPOINT}/bike/${bikeId}`;

// Spots ---------------------------------------------------------------------------------------------------------------
export const SPOTS_ENDPOINT = `${API_ENDPOINT}/spots`;
export const GET_SPOTS_LIST = `${SPOTS_ENDPOINT}/`;
export const POST_SPOT = `${SPOTS_ENDPOINT}/`;
export const PUT_SPOT = `${SPOTS_ENDPOINT}/`;
export const GET_SPOT = (spotId: string | number) => `${SPOTS_ENDPOINT}/${spotId}`;
export const DELETE_SPOT = (spotId: string | number) => `${SPOTS_ENDPOINT}/${spotId}`;
export const GET_SPOTS_MARKER_DATA = `${SPOTS_ENDPOINT}/near-by`;
export const POST_SPOT_UPLOAD_CSV = `${SPOTS_ENDPOINT}/upload-csv-spots`;

// Reports -------------------------------------------------------------------------------------------------------------
export const REPORTS_LIST_ENDPOINT = `${API_ENDPOINT}/reports`;
export const GET_REPORTS_LIST = `${REPORTS_LIST_ENDPOINT}/`;
export const GET_REPORTS_DETAIL = (bikeId: string | number) => `${REPORTS_LIST_ENDPOINT}/${bikeId}`;
export const GET_LAST_REPORT = (id: number | string) => `${REPORTS_LIST_ENDPOINT}/${id}`;

// Discounts -----------------------------------------------------------------------------------------------------------
export const DISCOUNTS_LIST_ENDPOINT = `${API_ENDPOINT}/discounts`;
export const GET_DISCOUNTS_LIST = `${DISCOUNTS_LIST_ENDPOINT}/`;
export const POST_DISCOUNT = `${DISCOUNTS_LIST_ENDPOINT}/`;
export const PUT_DISCOUNT = `${DISCOUNTS_LIST_ENDPOINT}/`;
export const GET_DISCOUNT = (discountId: string | number) => `${DISCOUNTS_LIST_ENDPOINT}/${discountId}`;
export const DELETE_DISCOUNT = (discountId: string | number) => `${DISCOUNTS_LIST_ENDPOINT}/${discountId}`;

// Admins --------------------------------------------------------------------------------------------------------------
export const ADMIN_ENDPOINT = `${API_ENDPOINT}/admins`;
export const GET_ADMINS_LIST = `${ADMIN_ENDPOINT}/`;
export const GET_ADMIN = (adminId: string | number) => `${ADMIN_ENDPOINT}/${adminId}`;
export const POST_ADMIN = `${ADMIN_ENDPOINT}/`;
export const PUT_ADMIN = `${ADMIN_ENDPOINT}/`;
export const DELETE_ADMIN = (adminId: string | number) => `${ADMIN_ENDPOINT}/${adminId}`;
export const GET_ADMINS_ME = `${ADMIN_ENDPOINT}/me`;

// Roles ---------------------------------------------------------------------------------------------------------------
export const ROLES_ENDPOINT = `${API_ENDPOINT}/roles`;
export const GET_ROLES = `${ROLES_ENDPOINT}/`;
export const GET_ACCESS_RIGHTS = `${ROLES_ENDPOINT}/access-rights`;
export const GET_ROLE = (role_id: string | number) => `${ROLES_ENDPOINT}/${role_id}`;
export const DELETE_ROLE = (role_id: string | number) => `${ROLES_ENDPOINT}/${role_id}`;
export const POST_ROLES = `${ROLES_ENDPOINT}/`;
export const PUT_ROLES = `${ROLES_ENDPOINT}/`;

// Cities --------------------------------------------------------------------------------------------------------------
export const CITIES_ENDPOINT = `${API_ENDPOINT}/cities`;
export const GET_CITIES = `${CITIES_ENDPOINT}/`;
export const GET_CITIES_POLYGONS = `${CITIES_ENDPOINT}/polygons`;
export const GET_CITIES_RED_ZONES = `${CITIES_ENDPOINT}/red-zones`;
export const GET_CITY_RED_ZONE = (redZoneId: string | number) => `${CITIES_ENDPOINT}/red-zone/${redZoneId}`;
export const GET_CITY_POLYGON = (cityPolygonId: string | number) => `${CITIES_ENDPOINT}/polygon/${cityPolygonId}`;
export const DELETE_CITY_RED_ZONE = (redZoneId: string | number) => `${CITIES_ENDPOINT}/red-zone/${redZoneId}`;
export const DELETE_CITY_POLYGON = (cityPolygonId: string | number) => `${CITIES_ENDPOINT}/polygon/${cityPolygonId}`;
export const POST_CITY_RED_ZONE = `${CITIES_ENDPOINT}/red-zones`;
export const POST_CITY_POLYGON = `${CITIES_ENDPOINT}/polygons`;

// Notifications -------------------------------------------------------------------------------------------------------
export const NOTIFICATIONS_ENDPOINT = `${API_ENDPOINT}/notifications/list`;
export const GET_NOTIFICATIONS = `${NOTIFICATIONS_ENDPOINT}/list`;
export const POST_NOTIFICATIONS = `${NOTIFICATIONS_ENDPOINT}/send-notification`;

// Marketing -----------------------------------------------------------------------------------------------------------
export const MARKETING_ENDPOINT = `${API_ENDPOINT}/marketings`;
export const GET_MARKETING_LIST = `${MARKETING_ENDPOINT}/`;
export const POST_MARKETING = `${MARKETING_ENDPOINT}/`;
export const GET_MARKETING = (marketing_id: string | number) => `${MARKETING_ENDPOINT}/${marketing_id}`;
export const PUT_MARKETING = (marketing_id: string | number) => `${MARKETING_ENDPOINT}/${marketing_id}`;
export const DELETE_MARKETING = (marketing_id: string | number) => `${MARKETING_ENDPOINT}/${marketing_id}`;

// Products ------------------------------------------------------------------------------------------------------------
export const PRODUCTS_ENDPOINT = `${API_ENDPOINT}/products`;
export const GET_PRODUCTS = `${PRODUCTS_ENDPOINT}/`;
export const GET_SUBSCRIPTIONS_LIST = `${PRODUCTS_ENDPOINT}/subscriptions`;
export const GET_SUBSCRIPTION_DETAIL = (subscriptionID: string | number) => `${PRODUCTS_ENDPOINT}/subscriptions/${subscriptionID}`;
export const PUT_SUBSCRIPTION = (subscriptionID: string | number) => `${PRODUCTS_ENDPOINT}/subscriptions/${subscriptionID}`;

// Deposits ------------------------------------------------------------------------------------------------------------
export const DEPOSITS_ENDPOINT = `${API_ENDPOINT}/deposits`;
export const GET_DEPOSITS = `${DEPOSITS_ENDPOINT}/`;
