import { Redirect } from 'expo-router';

import { useAuthCheck } from "../hooks/auth";
import LoadingScreen from '@/components/loading-screen';

export default function Index() {
  const { status } = useAuthCheck();

  if (status === "loading") {
    return <LoadingScreen/>; // or splash screen
  }

  if (status === "unauthenticated") {
    return <Redirect href="/(auth)/welcome" />;
  }

  if (status === "unauthorized") {
    return <Redirect href="/(auth)/welcome" />;
  }

  if (status === "error") {
    return <Redirect href="/(auth)/welcome" />;
  }

  // authenticated
  return <Redirect href="/(tabs)" />;
}
