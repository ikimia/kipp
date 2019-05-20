#!/bin/bash
set -ex

cp scripts/patches/Podfile ios/
patch -d ios/kipp < scripts/patches/Info.plist.patch
patch -d ios/kipp < scripts/patches/AppDelegate.m.patch
