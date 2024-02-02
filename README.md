# openproduct-app
This is a mobile application for OpenProduct runing on Androïd/iOS using React Native framework.

# Why React-Native
Flutter could be an alternative framework, but as our web application is ever on JS, it's seam simpler.

# Build/Debug
Run the command and install Expo Go application on a mobile wich has access to it.
https://docs.expo.dev/workflow/android-studio-emulator/
// https://reactnative.dev/docs/environment-setup

> npx create-expo-app openproduct-app
> npx react-native@latest init openproduct-app
> npx expo start

> npm install @react-navigation/drawer
> npm install @react-native-picker/picker
> npm install @react-navigation/native-stack
> npm install @expo/metro-config
> npx expo install expo-file-system
// https://github.com/itinance/react-native-fs
> npm install react-native-fs --save
// https://medium.com/@yangguang200906/load-local-assets-in-react-native-9e5787fc70e1

# Install on Androïd

## build an APK

> npx react-native bundle --platform android --dev false --entry-file App.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
> npm i metro-config --save-dev

https://medium.com/geekculture/react-native-generate-apk-debug-and-release-apk-4e9981a2ea51
https://instamobile.io/android-development/generate-react-native-release-build-android/

keytool -genkey -v -keystore openproduct.keystore -alias OpenProduct -keyalg RSA -keysize 2048 -validity 10000
./node_modules/react-native-maps/android/gradlew assembleRelease

> 



