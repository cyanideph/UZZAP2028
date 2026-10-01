import { ConfigContext, ExpoConfig } from 'expo/config'

const APP_ENV = process.env.APP_ENV || 'development'

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: 'UZZAP 2028',
    slug: 'uzzap2028',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icons/uzzap-icon.png',
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
        foregroundImage: './assets/icons/uzzap-icon.png',
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
          image: './assets/icons/uzzap-icon.png',
          backgroundColor: '#FFFFFF',
          resizeMode: 'contain',
          dark: {
            image: './assets/icons/uzzap-icon.png',
            backgroundColor: '#111111',
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
      appEnv: APP_ENV,
    },
  }
}
