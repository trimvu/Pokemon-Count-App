import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: 'Home'}}/>
        <Stack.Screen name="search" options={{ headerShown: true, title: 'Search' }} />
        <Stack.Screen name="+not-found" options={{ headerShown: true }} />
        <Stack.Screen name="soon" options={{ headerShown: true, title: 'Soon' }} />
        <Stack.Screen name="sameNumber/[id]" options={{ headerShown: true, title: 'Same Number?' }} />
        <Stack.Screen name="multipleChoice/[id]" options={{ headerShown: true, title: 'Multiple Choice' }} />
        <Stack.Screen name="search/[searchTerm]" options={{ headerShown: true, title: 'Search Result' }} />
        <Stack.Screen name="card/[cardId]" options={{ headerShown: true, title: 'Card View' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
