// @ts-ignore
/* eslint-disable */

declare namespace API_USER {
  type CurrentUser =
    | {
        checkLocationOnLogin: false;
        countryCode: string;
        gender: string;
        id: number;
        name: string;
        notificationEmail: string;
        prefersLanguage: string;
        prefersColorScheme: string;
        prefersReducedMotion: string;
        prefersEmailId: number;
        profilePictureUrl: string;
        role: string;
        timezone: string;
        twoFactorMethod: string;
        twoFactorPhone: null;
        attributes: null;
        createdAt: string;
        updatedAt: string;
        updatedBy: string;
        active: boolean;
        hasPassword: boolean;
      }
    | undefined;

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
