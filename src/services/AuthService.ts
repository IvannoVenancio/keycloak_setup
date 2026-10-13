import jwt from 'jsonwebtoken';
import { UserinfoResponse } from 'openid-client';

import { grantType, kcAdminClient, kcClient } from '../../config/keycloak';
import { UserLoginInterface } from '../intrefaces/KeycloakInterface';

export default class AuthService {

  static async login({ username, password }: UserLoginInterface) {
    try {
      const kcC = await kcClient();
      const tokenSet = await kcC.grant({
        grant_type: grantType,
        username,
        password,
      });

      const userInfo: UserinfoResponse = await kcC.userinfo(tokenSet);
      const decodedToken: any = jwt.decode(String(tokenSet.access_token));
      const { groups, resource_access } = decodedToken;
      console.log("group::::", decodedToken)

      return {
        status: true,
        data: {
          accessToken: tokenSet.access_token,
          refreshToken: tokenSet.refresh_token,
          userInfo,
          groups,
        },
      };
    } catch (e: any) {
      return {
        status: false,
        message: e,
      };
    }
  }
}
