import { ConfigContext, ExpoConfig } from 'expo/config'

const APP_ENV = process.env.APP_ENV || 'development'

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: 'UZZAP 2028',
    slug: 'uzzap2028',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icons/app-icon.png',
    scheme: 'uzzap2028',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.cyanideph.uzzap2028',
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/icons/app-icon.png',
      },
      edgeToEdgeEnabled: true,
      package: 'com.cyanideph.uzzap2028',
    },
    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/splashscreen/splash.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000',
          },
        },
      ],
      [
        'expo-font',
        {
          fonts: [
            './assets/fonts/InstrumentSerif-Regular.ttf',
            './assets/fonts/InstrumentSerif-Italic.ttf',
          ],
        },
      ],
      [
        'expo-audio',
        {
          microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone.',
          recordAudioAndroid: true,
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      eas: {
        projectId: '7e03d0df-270f-42f5-b7a0-ada9675b6d2a',
      },
      appEnv: APP_ENV,
    },
  }
}
