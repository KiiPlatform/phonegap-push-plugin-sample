### Setup tools
```
sudo gem install cocoapods
pod setup
npm install -g cordova-jquery
```

### Setup plugins
```
cordova plugin add cordova-plugin-device
cordova plugin add phonegap-plugin-push --variable SENDER_ID={YOUR SENDER ID}
cordova platform add android
cordova platform add ios
```

