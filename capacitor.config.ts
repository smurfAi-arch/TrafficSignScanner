import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'traffic.sign.scanner',
  appName: 'traffic-sign-scanner',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  bundledWebRuntime: true
};

export default config;
