
import KcAdminClient from '@keycloak/keycloak-admin-Client';
import { Issuer } from 'openid-client';

const grantType = 'password';

const kcClient = async () => {
    
  const keycloakIssuer = await Issuer.discover(
    `${process.env.KEYCLOAK_BASE_URL_CLIENT}`,
  );

  console.log("process.env.CLIENT_ID:::",process.env.KEYCLOAK_CLIENT_ID)
  console.log("process.env.CLIENT_SECRET:::",process.env.KEYCLOAK_CLIENT_SECRET)
  return new keycloakIssuer.Client({
    client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
    client_secret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
  });
};

const kcAdminClient = async () => {
  const kcAdminClientIni = new KcAdminClient({
    baseUrl: process.env.KEYCLOAK_BASE_URL,
    realmName: process.env.KEYCLOAK_REALM,
  });

  async function auth() {
    await kcAdminClientIni.auth({
      username: `${process.env.KEYCLOAK_USER_NAME}`,
      password: `${process.env.KEYCLOAK_USER_PASS}`,
      grantType: 'password',
      clientId: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
    });
  }

  if (kcAdminClientIni.accessToken === undefined) await auth();

  return kcAdminClientIni;
};

export { grantType, kcAdminClient, kcClient };
