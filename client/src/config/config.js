const envVars = process.env;

const config = {
  url: `${envVars.REACT_APP_BACKEND_CONNECTION}`,
};
export default config;
