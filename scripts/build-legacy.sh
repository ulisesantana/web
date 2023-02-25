#/usr/bin/bash

dev=false

while getopts ":d" opt; do
  case $opt in
    d) # flag -d
      dev=true
      ;;
    \?) # if any other flag
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

cd ./src/legacy
if test -z "$dev"; then
  echo "Installing legacy dependencies."
  npm install
fi
echo "Starting build."
npm run build
echo "Build done."
cp -f ./build/static/js/main.*.js ../components/legacy.js
echo "Build copied."
