# Mobile App

A Vue 3 mobile application for browsing and discovering coupons, built with Capacitor for native Android compilation. Provides users with an intuitive interface to find and use available deals.

## 🚀 Tech Stack

- **Framework**: Vue 3 with TypeScript
- **Mobile Framework**: Capacitor 7.x for native compilation
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Routing**: Vue Router
- **Platform**: Android (with support for iOS in the future)

## ✨ Features

### 🛍️ Coupon Discovery
- **Browse Active Coupons**: View all currently available deals
- **Search Functionality**: Find coupons by title, brand, or category
- **Filter Options**: Filter by price range, category, or deal type
- **Detailed Views**: Full coupon information with descriptions and terms

### 📱 Mobile Experience
- **Native Android App**: Compiled to APK/AAB for Google Play Store
- **Responsive Design**: Optimized for mobile screens and touch interaction
- **Fast Performance**: Optimized with Vite and native compilation
- **Offline Capability**: Basic offline functionality for cached content

### 🎨 User Interface
- **Modern Design**: Clean, intuitive interface using Tailwind CSS
- **Touch-Friendly**: Large touch targets and swipe gestures
- **Dark/Light Mode**: Automatic theme switching based on system preference
- **Accessibility**: Screen reader support and proper contrast ratios

## 🏗️ Architecture

### Directory Structure
```
src/
├── App.vue             # Root component
├── main.ts             # Application entry point
├── router/             # Routing configuration
│   └── index.ts        # Router setup with routes
└── style.css           # Global styles with Tailwind
```

### Simple Architecture
The mobile app follows a simple, straightforward architecture:
- **Single-Page App**: Vue Router for navigation between views
- **Component-Based**: Reusable Vue 3 components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Native Compilation**: Capacitor bridges to native Android features

## 🛠️ Development

### Prerequisites
- Node.js 20.19.0+ or 22.12.0+
- pnpm 8.0.0+
- Android Studio (for Android development)
- Android SDK and build tools

### Setup

```bash
# Navigate to mobile app
cd frontend/apps/mobile

# Install dependencies
pnpm install

# Start development server (web preview)
pnpm dev

# Start with local environment variables
pnpm dev:local
```

### Available Scripts

```bash
# Development server (web preview)
pnpm dev

# Development with local environment
pnpm dev:local

# Build for production
pnpm build

# Build with local environment
pnpm build:local

# Build only (skip type checking)
pnpm build-only

# Build only with local environment
pnpm build-only:local

# Preview production build
pnpm preview

# Preview with local environment  
pnpm preview:local

# Type checking
pnpm type-check

# Format code with Prettier
pnpm format

# Sync Capacitor files to Android
pnpm sync_android

# Sync with local environment
pnpm sync_android:local
```

## 📱 Android Development

### Initial Setup

1. **Install Android Studio**
   - Download from https://developer.android.com/studio
   - Install Android SDK and build tools
   - Set up Android emulator or connect physical device

2. **Build the Web App**
   ```bash
   # Build the Vue app
   pnpm build
   
   # Or build with local environment
   pnpm build:local
   ```

3. **Sync with Capacitor**
   ```bash
   # Sync built files to Android project
   pnpm sync_android
   
   # Or sync with local environment
   pnpm sync_android:local
   ```

4. **Open in Android Studio**
   ```bash
   # Open Android project in Android Studio
   npx cap open android
   ```

### Development Workflow

```bash
# 1. Make changes to Vue app
# Edit src/ files

# 2. Build the app
pnpm build:local

# 3. Sync to Android
pnpm sync_android:local

# 4. Run in Android Studio or command line
npx cap run android
```

### Building APK/AAB

1. **Open in Android Studio**: `npx cap open android`
2. **Build APK**: Build → Build Bundle(s) / APK(s) → Build APK(s)
3. **Build AAB**: Build → Build Bundle(s) / APK(s) → Build Bundle(s)
4. **Find builds**: `android/app/build/outputs/`

### Monorepo Build Command
From the frontend root directory:
```bash
# Build and sync Android app in one command
pnpm mobile:build:android
```

## 🌐 Environment Configuration

### Local Development
The app can run in two modes:

1. **Local Mode** (LOCAL=1):
   - Connects to local Supabase instance
   - Used for development with local backend

2. **Remote Mode** (default):
   - Connects to production/staging Supabase
   - Used for production builds

### Environment Variables
Set these in your hosting/build environment:
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📲 Capacitor Configuration

### capacitor.config.ts
```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.apiokazje.couponapp',
  appName: 'Coupon App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

### Native Features
Currently supported:
- **App Icon**: Custom app icon and splash screen
- **Status Bar**: Native status bar styling
- **Deep Links**: URL scheme support
- **File System**: Access to device storage

Future features:
- **Push Notifications**: Deal alerts and updates
- **Camera**: QR code scanning for coupons
- **Geolocation**: Location-based deals
- **Share API**: Share coupons with friends

## 🎨 Styling

### Tailwind CSS v4
- **Mobile-First**: Responsive design starting from mobile
- **Utility Classes**: Comprehensive utility-first approach
- **Custom Components**: Reusable component classes
- **Dark Mode**: Automatic dark/light theme switching

### Design System
- **Colors**: Consistent color palette
- **Typography**: Mobile-optimized font sizes and line heights
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI patterns

## 🔧 Configuration

### Vite Configuration
- **Capacitor Plugin**: Automatic Capacitor integration
- **TypeScript**: Full type checking and intellisense
- **Hot Reload**: Fast development with HMR
- **Build Optimization**: Production-optimized builds

### TypeScript
- **Strict Mode**: Enabled for type safety
- **Vue SFC Support**: Full `.vue` file type checking
- **Capacitor Types**: Native API type definitions

## 📱 Testing

### Web Testing
```bash
# Run development server for web testing
pnpm dev:local

# Test in browser at http://localhost:5173
```

### Android Testing
```bash
# Build and run on Android emulator
pnpm build:local
pnpm sync_android:local
npx cap run android

# Run on connected device
npx cap run android --target=device_id
```

### Device Testing
- **Emulator**: Android Studio emulator for development
- **Physical Device**: USB debugging for real device testing
- **Chrome DevTools**: Remote debugging via `chrome://inspect`

## 🚀 Production Deployment

### Google Play Store

1. **Prepare for Release**
   ```bash
   # Build production version
   pnpm build
   pnpm sync_android
   ```

2. **Build Signed AAB**
   - Open Android Studio
   - Build → Generate Signed Bundle / APK
   - Choose Android App Bundle (AAB)
   - Sign with your keystore

3. **Upload to Play Console**
   - Create app listing in Google Play Console
   - Upload AAB file
   - Complete store listing information
   - Submit for review

### Alternative Distribution
- **Direct APK**: Distribute APK file directly
- **Firebase App Distribution**: Beta testing platform
- **Internal Testing**: Company-internal distribution

## 🔍 Code Quality

- **ESLint**: Code linting and consistency
- **Prettier**: Automatic code formatting  
- **TypeScript**: Type safety and better developer experience
- **Vue 3 Composition API**: Modern, maintainable patterns

## 🤝 Contributing

1. Follow Vue 3 and TypeScript best practices
2. Test on both web and Android platforms
3. Ensure responsive design works across screen sizes
4. Follow the existing component structure
5. Test build and sync process before submitting changes

## 📚 Related Documentation

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Main Project README](../../../README.md)
- [Admin Dashboard README](../admin/README.md)
