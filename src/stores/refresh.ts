import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveRefreshToken = async(refreshToken: string) => {
  if (Platform.OS === "web") {
    await AsyncStorage.setItem('refreshToken', refreshToken)
  } else if (Platform.OS === "android" || Platform.OS === "ios") {
    await SecureStore.setItemAsync("refreshToken", refreshToken)

  }
}

export const getRefreshToken = async(): Promise<string | null> => {
  if (Platform.OS === "web") {
    return await AsyncStorage.getItem('refreshToken')
  } else if (Platform.OS === "android" || Platform.OS === "ios") {
    return await SecureStore.getItemAsync("refreshToken")
  }
  return null
}

export const deleteRefreshToken = async() => {
  if (Platform.OS === "web") {
    await AsyncStorage.removeItem("refreshToken")

  } else if (Platform.OS === "android" || Platform.OS === "ios") {
    await SecureStore.deleteItemAsync("refreshToken")
  }
}

