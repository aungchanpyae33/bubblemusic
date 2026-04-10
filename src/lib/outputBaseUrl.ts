export const outputBaseUrl = () => {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : `http://${process.env.LOCAL_HOST}`;
  return new URL(baseUrl);
};
