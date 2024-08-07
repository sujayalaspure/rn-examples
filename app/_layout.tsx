import FontAwesome from "@expo/vector-icons/FontAwesome"
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native"
import {useFonts} from "expo-font"
import {SplashScreen, Stack} from "expo-router"
import {useEffect} from "react"
import {useColorScheme} from "react-native"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Home Screen",
            headerBackVisible: false,
          }}
        />
        {/* <Stack.Screen name="(tabs)" options={{headerShown: false}} /> */}
        <Stack.Screen
          name="bottomsheet"
          options={{
            headerTitle: "Bottom Sheet",
          }}
        />
        <Stack.Screen
          name="maskedTabbar"
          options={{
            headerTitle: "Masked Tabbar",
          }}
        />
        <Stack.Screen
          name="carousalSlider"
          options={{
            headerTitle: "Animated Carousal Slider",
          }}
        />
        <Stack.Screen
          name="testPage"
          options={{
            headerTitle: "Test Page",
          }}
        />
        <Stack.Screen
          name="animatedModalScreen"
          options={{
            headerTitle: "Animated Modal",
          }}
        />
        <Stack.Screen name="modal" options={{presentation: "modal"}} />
      </Stack>
    </ThemeProvider>
  )
}
