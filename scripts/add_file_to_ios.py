#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import sys

from pbxproj import XcodeProject

if len(sys.argv) != 2:
    print('Usage:', sys.argv[0], 'filename (Relative to ios folder)')
    exit(1)

file_path = sys.argv[1]
if not os.path.isfile(file_path):
    print('Cannot find', file_path)
    exit(1)

project = XcodeProject.load('kipp.xcodeproj/project.pbxproj')
project.add_file(file_path, force=False)
project.save()
