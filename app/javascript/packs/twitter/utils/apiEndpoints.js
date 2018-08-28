export const apiBaseRoute =  process.env.API_BASE_URL || 'http://localhost:3000/api/v1';

export default {
  //---------------------------------------------------------------------------

  // /tweets GET
  tweets: () => `${apiBaseRoute}/tweets`,
};
