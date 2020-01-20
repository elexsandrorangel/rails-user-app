// GLOBAL CONSTANTS
// -----------------------------------

export const STORAGE_KEYS = {
    JWT_KEY: 'userapp.jwt',
    JWT_REF_KEY: 'userapp.ref_jwt',
    JWT_EXP_KEY: 'userapp.exp_jwt',
    USER_NAME: 'userapp.full_user_name',
    USER_EMAIL: 'userapp.full_user_email'
};

//LOCAL
// export const URLS = {
//     TOKEN_API: "http://localhost:63893/oauth/token",
//     API_URL: "https://apilearningplan-dev.azurewebsites.net/api/",
//     REDIRECT: "https://localhost:44325"
// };

// export const ADAL = {
//     TENANT: "fceupr.onmicrosoft.com",
//     CLIENT_ID: "1d4fff29-84ae-42eb-9d10-5f36c506a170",
//     CLIENT_SECRET: "HgcLBC0?g87agZPySipAlY@P]9pwNkR:"
// };

//HOMOL
export const URLS = {
    TOKEN_API: "http://localhost:3001/auth/login",
    API_URL: "http://localhost:3001/api/v1/",
    REDIRECT: "http://localhost:3001/"
};

export default {
    STORAGE_KEYS,
    URLS,
}
