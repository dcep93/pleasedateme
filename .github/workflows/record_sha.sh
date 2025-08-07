#!/bin/bash

set -euo pipefail

FMT="$1"
DESTINATION="$2"

cd ../../

CURRENT_TIME="$(TZ='America/New_York' date)"
GIT_LOG="$(git log -1)"

test -f "$DESTINATION"
# shellcheck disable=2059
printf "$FMT" "$CURRENT_TIME" "$GIT_LOG" >"$DESTINATION"
cat "$DESTINATION"
