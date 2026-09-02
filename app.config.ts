import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  name: "Errands",
  slug: "errands",
  scheme: "errands",
  version: "0.1.0",

  orientation: "portrait",
  userInterfaceStyle: "light",
  newArchEnabled: true,

  icon: "./assets/icon.png",

  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#F0EFE8"
  },

  assetBundlePatterns: ["**/*"],

  // 🌐 Web / PWA
  web: {
    bundler: "metro",
    output: "static"
  },

  // 📦 GitHub Pages
  // Il repository si chiama "errands",
  // quindi l'app sarà disponibile sotto /errands
  experiments: {
    baseUrl: "/errands"
  },

  // 🍎 iOS
  ios: {
    supportsTablet: false,

    bundleIdentifier: "com.errands.app",

    config: {
      googleMapsApiKey:
        process.env.EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY
    },

    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        "Errands usa la tua posizione per ricordarti le commissioni quando sei vicino a un luogo.",

      NSLocationAlwaysAndWhenInUseUsageDescription:
        "Errands usa la tua posizione per suggerirti commissioni vicine e percorsi ottimizzati."
    }
  },

  // 🤖 Android
  android: {
    package: "com.errands.app",

    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#F0EFE8"
    },

    config: {
      googleMaps: {
        apiKey:
          process.env.EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_API_KEY
      }
    },

    permissions: [
      "ACCESS_COARSE_LOCATION",
      "ACCESS_FINE_LOCATION"
    ]
  },

  // 🔌 Expo plugins
  plugins: [
    "expo-router",
    "expo-location",
    "expo-notifications",
    "expo-font",
    "expo-asset"
  ],

  // ⚙️ Extra
  extra: {
    eas: {
      projectId: process.env.EAS_PROJECT_ID
    }
  }
});