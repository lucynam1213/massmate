import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.massmate.app',
  appName: 'Mass Mate',
  webDir: 'dist',

  server: {
    // Use https scheme on Android (required for secure cookies / service workers)
    androidScheme: 'https',
    // Allow live reload during native development (remove in production builds)
    // url: 'http://YOUR_LOCAL_IP:5174',
    // cleartext: true,
  },

  plugins: {
    // Status bar styling — set in App.jsx at runtime for iOS
    StatusBar: {
      style: 'Default',
      backgroundColor: '#f6f5f1',
    },
    // Splash screen — disable for now; add a launch screen in Xcode/Android Studio instead
    SplashScreen: {
      launchShowDuration: 0,
    },
    // Keyboard — push content up so reading area isn't hidden
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },
  },

  ios: {
    // Matches the 8px top stripe — override per-season at runtime if needed
    backgroundColor: '#f6f5f1',
    contentInset: 'automatic',
    allowsLinkPreview: false,
    scrollEnabled: false, // WKWebView scroll is handled by our own .page-content
  },

  android: {
    backgroundColor: '#f6f5f1',
    allowMixedContent: false,
  },
}

export default config
