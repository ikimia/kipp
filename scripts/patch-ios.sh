#!/bin/bash
set -ex

cp scripts/patches/Podfile ios/
patch -d ios/StreetPay < scripts/patches/Info.plist.patch
patch -d ios/StreetPay < scripts/patches/AppDelegate.m.patch
