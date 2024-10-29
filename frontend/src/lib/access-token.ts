import { api } from "./api";

const createAccessTokenService = () => {
  let accessToken: string | null = null;

  const getToken = () => accessToken;

  const setToken = (token: string | null) => {
    accessToken = token;

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  };

  return { getToken, setToken };
};

export const tokenService = createAccessTokenService();
