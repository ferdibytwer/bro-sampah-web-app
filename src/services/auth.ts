import axios, { AxiosError } from "axios";
import { apiPost } from "./api"
import useAuthStore from '../stores/auth'
import type { AuthToken } from "../types/auth";
import type { ApiResponse } from "../types/api";
import { handleApiError } from "../hooks/api";
import { deleteRefreshToken, getRefreshToken, saveRefreshToken } from "@/stores/refresh";

export const signupPassword = async (username: string, email: string, password: string, fullName: string ) => {
  try {
    const data = {
      username,
      email,
      password,
      fullName,
    };
     await apiPost<AuthToken>("/auth/signup/password", data);
  } catch (err) {
    throw handleApiError(err)
  }
};

export const loginPassword = async (identifier: string, password: string, loginMethod: string ) => {
  try {
    var data;
    if (loginMethod === "email") {
      data = {
        email: identifier,
        password,
        loginMethod,
      };
    } else if (loginMethod == "username") {
      data = {
        username: identifier,
        password,
        loginMethod,
      };

    } else {
      throw new Error("unsupported login method")
    }

    const res = await apiPost<AuthToken>("/auth/login/password", data);
    if (!res.success || !res.data) {
      throw new Error(`Login Failed: ${res.error?.details ?? "Something Unexpected Happened, Please Try Again Later"}`);
    }
    const accessToken = res.data.accessToken
    const refreshToken = res.data.refreshToken

    useAuthStore.getState().setAccessToken(accessToken);
    await saveRefreshToken(refreshToken);
    return accessToken

  } catch (err) {
    throw handleApiError(err)
  }
};

export const logout = async() => {
  const refreshToken = await getRefreshToken()
  if (refreshToken) {
    await apiPost<AuthToken>(`/auth/logout`, {
      token: refreshToken,
    });
  }
  useAuthStore.getState().clearAccessToken(); 
  await deleteRefreshToken()
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const res = await apiPost<AuthToken>(`/auth/refresh-token`, {
      refreshToken: refreshToken,
    });

    if (!res.success || !res.data) {
      throw new Error(res.error?.details ?? "Invalid Session, Please Login Again");
    }

    const newAccessToken = res.data.accessToken;
    const newRefresh = res.data.refreshToken;

    useAuthStore.getState().setAccessToken(newAccessToken);
    await saveRefreshToken(newRefresh);

    return newAccessToken;
  } catch (err) {

    if (axios.isAxiosError(err)) {
      const axiosErr = err as AxiosError<ApiResponse<unknown>>;

      const status = axiosErr.response?.status;
      const errorCode = axiosErr.response?.data?.error?.code;

      if (status === 401 && errorCode === "INVALID_REFRESH_TOKEN") {
        useAuthStore.getState().clearAccessToken();
        await deleteRefreshToken()
        throw new Error(axiosErr.response?.data?.error?.details ?? "Invalid Session, Please Login Again");
      }
    }
    throw handleApiError(err)
  }
};
