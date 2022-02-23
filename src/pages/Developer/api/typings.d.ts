// @ts-ignore
/* eslint-disable */

declare namespace API_KEY {
  type ResultAPI = {
    apiKey: string;
    createdAt: string;
    description: string | null;
    groupId: string | null;
    id: number;
    ipRestrictions: string | null;
    name: string | null;
    referrerRestrictions: string | null;
    scopes: any;
    updatedAt: Date;
    userId: number;
  };
  type ResultDeleteAPI = {
    apiKey: string | null;
    createdAt: Date;
    description: string | null;
    groupId: string | null;
    id: number;
    ipRestrictions: string | null;
    name: string | null;
    referrerRestrictions: string | null;
    scopes: any;
    updatedAt: Date;
    userId: number;
    errorCode: string | null;
    errorMessage: string | null;
  };
}
