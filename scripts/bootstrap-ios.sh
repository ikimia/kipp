#!/bin/bash -e
if ! pip3 show pbxproj > /dev/null; then
    echo python package pbxproj is missing, please run
    echo pip3 install pbxproj
    exit 1
fi
rm -rf ios
react-native eject
pushd ios
    git init
    ln -s ../scripts/files/.gitignore .
    git add .
    git commit -m'react native eject'

    ln -s ../scripts/files/Podfile .
    ln -s ../scripts/files/Podfile.lock .
    git add .
    git commit -m'Add podfile'

    cp -r ../scripts/files/AppIcon.appiconset kipp/Images.xcassets/
    git add .
    git commit -m'Add app icon'

    for file in ../scripts/patches_ios/*.patch; do
        if basename ${file} | grep -iq '^x'; then
            echo "Ignoring $(basename ${file})"
            continue
        fi
        git apply "$file"
        git add .
        git commit -m"Apply $(basename ${file})"
    done
    pod install
popd

react-native-asset
pushd ios
    git add .
    git commit -m'Link assets'
popd

pushd ios
    python3 ../scripts/add_file_to_ios.py ../scripts/files/GoogleService-Info.plist

    git add .
    git commit -m"Add GoogleService-Info.plist"
popd

RNFIREBASE_FUNCTIONS_MD5=$(md5 -q node_modules/react-native-firebase/ios/RNFirebase/functions/RNFirebaseFunctions.m)
if [[ $RNFIREBASE_FUNCTIONS_MD5 == "da28fda6243be263ec00ba38d98de436" ]]; then
    cp scripts/files/RNFirebaseFunctions.m node_modules/react-native-firebase/ios/RNFirebase/functions/
elif [[ $RNFIREBASE_FUNCTIONS_MD5 == $(md5 -q scripts/files/RNFirebaseFunctions.m) ]]; then
    echo "RNFirebase Functions already replaced"
else
    echo "Unexpected version of RNFirebase"
    exit 1
fi