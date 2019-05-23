#!/bin/bash
set -e
rm -rf ios
react-native eject
pushd ios
    git init
    ln -s ../scripts/files/.gitignore
    git add .
    git commit -m'react native eject'

    ln -s ../scripts/files/Podfile
    ln -s ../scripts/files/Podfile.lock
    git add .
    git ci -m'Add podfile'

    for file in ../scripts/patches_ios/*.patch; do
        git apply $file
        git add .
        git ci -m"Apply $(basename ${file})"
    done
    pod install
popd

react-native-asset
pushd ios
    git add .
    git ci -m'Link assets'
popd

pushd ios
    python3 ../scripts/add_file_to_ios.py ../scripts/files/GoogleService-Info.plist

    git add .
    git ci -m"Add GoogleService-Info.plist"
popd
