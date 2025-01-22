export const routes = {
  external: {
    SPOOL_STATES: `https://api.countrystatecity.in/v1/states`,
    SPOOL_COUNTRIES: `https://api.countrystatecity.in/v1/countries`,
    SPOOL_CITIES: (query: string) => `https://www.universal-tutorial.com/api/cities/${query}`
  }
};