#!/bin/sh

deployDirectory="deploy"
documentationPath="$deployDirectory/documentation"
remoteControllerPath="$deployDirectory/remote-controller"

{ # try
  yarn --version > /dev/null 2> /dev/null && useYarn=1
} || { # catch
  useYarn=0
}

# clean deploy folder
rm -rf $deployDirectory
mkdir $deployDirectory

# build documentation
mkdir $documentationPath
cd documentation-src
gatsby build --prefix-paths
cd ..

# copy documentation build to deploy folder
cp -r documentation-src/public/ $documentationPath

# build katpat-remote
mkdir $remoteControllerPath
cd katpat-remote
if [ $useYarn = 1 ]
then
  yarn build
else
  npm run build
fi
cd ..

# copy katpat-remote build to deploy folder
cp -r katpat-remote/build/ $remoteControllerPath

# copy index.html for redirection in deploy folder
cp resources/index.html "$deployDirectory/index.html"

# deploy on github repo
documentation-src/node_modules/.bin/gh-pages -d deploy

echo "Done"