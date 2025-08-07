#!/bin/bash

set -euo pipefail

DESTINATION="$1"

FMT='const recorded_sha = \`%s\n%s\`;\nexport default recorded_sha;\n'

CURRENT_TIME="$(TZ='America/New_York' date)"
GIT_LOG="$(git log -1)"

test -f "$DESTINATION"
# shellcheck disable=2059
printf "$FMT" "$CURRENT_TIME" "$GIT_LOG" >"$DESTINATION"
cat "$DESTINATION"
