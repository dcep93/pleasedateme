#!/bin/bash

set -euo pipefail

cd app/src/PleaseDateMe
printf "export default \`%s\n%s\`;\nexport default recorded_sha;\n" "$(TZ='America/New_York' date)" "$(git log -1)" > recorded_sha.tsx
