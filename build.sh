#!/bin/bash

###########
# ANDROID #
###########

# sudo apt install android-sdk

# keytool -genkey -v -keystore openproduct.keystore -alias OpenProduct -keyalg RSA -keysize 2048 -validity 10000

npx react-native bundle --platform android --dev false --entry-file App.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

cd android
export ANDROID_HOME=$HOME/Android/Sdk
# export ANDROID_HOME="/usr/lib/android-sdk/"
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
./gradlew assembleRelease
cd ..

##########
# IPHONE #
##########

