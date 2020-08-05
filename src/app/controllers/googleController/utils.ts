import * as queryString from "query-string";
import fetch from "isomorphic-fetch";
import decode from "jwt-decode";

import { GoogleResponse, TranslatedIDToken } from "./types";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
} = process.env;

const stringifiedParams = queryString.stringify({
  client_id: GOOGLE_CLIENT_ID,
  redirect_uri: GOOGLE_REDIRECT_URI,
  scope: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ].join(" "), // space seperated string
  response_type: "code",
  access_type: "offline",
  prompt: "consent",
});

export const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

export const getJSONFromCode = async (
  input: string,
  isCode: boolean = true
) => {
  const data = isCode
    ? {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
        code: input,
      }
    : {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: input,
      };
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const decodeToken = async (input: string, isCode: boolean = true) => {
  const json: GoogleResponse = await getJSONFromCode(input, isCode);
  const decoded: TranslatedIDToken = decode(json.id_token);
  const newUser = {
    name: {
      givenName: decoded.given_name,
      familyName: decoded.family_name,
      name: decoded.name,
    },
    email: decoded.email,
    picture: decoded.picture,
    accessToken: json.access_token,
    refreshToken: isCode ? json.refresh_token : input,
  };
  return newUser;
};
