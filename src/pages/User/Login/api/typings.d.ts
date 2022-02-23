// @ts-ignore
/* eslint-disable */

declare namespace API_USER {
  type LoginResult = {
    accessToken: string;
    refreshToken: string;
    userId: number;
    errorCode: string | undefined;
    errorMessage: string | undefined;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };
  type LoginParams = {
    email?: string;
    password?: string;
  };
}
