#!/bin/bash -e

pushd ios > /dev/null
    if [[ -z $(git diff --name-only --cached) ]]; then
        echo 'No files are staged for commit'
        exit 1
    fi
popd > /dev/null

PATCHES="scripts/patches_ios"
PREFIX=$(($(ls "$PATCHES" | awk -F_ '{print $1}' | sort -n | tail -n 1) + 1))"_"
echo -n "Please give name for the patch: ${PREFIX}" && read NAME
FILE_NAME=${PREFIX}${NAME}
if ! echo $FILE_NAME |grep -q '\.patch$'; then
    FILE_NAME=${FILE_NAME}.patch
fi
echo 'Writing' $FILE_NAME

pushd ios > /dev/null
    git diff --cached > ../$PATCHES/$FILE_NAME
    git commit -m "Apply $FILE_NAME"
popd > /dev/null
