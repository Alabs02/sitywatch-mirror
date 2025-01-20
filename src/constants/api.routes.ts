export const routes = {
  external: {
    SPOOL_COUNTRIES: `https://api.countrystatecity.in/v1/countries`,
    SPOOL_STATES: `https://www.universal-tutorial.com/api/states/query`,
    SPOOL_CITIES: (query: string) => `https://www.universal-tutorial.com/api/cities/${query}`
  }
};