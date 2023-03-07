#/usr/bin/bash



cd ./src/legacy
echo "📦 Installing legacy dependencies."
npm install
echo "🚧 Starting build."
npm run build
echo "👷 Build done."
cp -f ./dist/assets/index-*.js ../components/legacy.js
echo "📋 Build copied."
cd ../../
