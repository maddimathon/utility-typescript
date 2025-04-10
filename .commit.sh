#!/bin/sh
set -e

touch .gitcommit.md
touch .releasenotes.md
commitmsg="[$(date +%Y-%m-%d)] $(cat .gitcommit.md)"
git commit -m "${commitmsg}"
echo "\n\n\n${commitmsg}" >> .releasenotes.md
echo "\n\n\nDetails:\n- " > .gitcommit.md