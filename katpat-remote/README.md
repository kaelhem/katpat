# katpat-remote

The Katpat bluetooth controller app.

This is a simple react webapp (set up with [CRA](https://github.com/facebook/create-react-app)) that runs on mobile with the help of [Capacitor](https://capacitor.ionicframework.com/).

## Web app

As this webapp is a bluetooth controller, it use the Web Bluetooth API for the browser version, and this **will only works with Chrome**.

The webapp is accessible online juste [here](https://kaelhem.github.io/katpat/remote-controller)

## iOS app

As iOS simulators are not emulating bluetooth, this **will only works with real devices**.

So, if you have an iOS device (iOS 11.0 minimum) and an Apple developer account, you can build it with XCode.

To setup the XCode project, do this :
```sh
npm install
npm run build
npx cap copy
npx cap open ios
```
Once Xcode is open, connect your device and select it. Then, just click the Play button to run your app.

Read more about it in the [Capacitor iOS documentation](https://capacitor.ionicframework.com/docs/ios/).

## Android app

As Android simulators are not emulating bluetooth, this **will only works with real devices**.

To setup the XCode project, do this :
```sh
npm install
npm run build
npx cap copy
npx cap open android
```

## Development

Type `npm run start` and then open Chrome and navigate to `http://localhost:3000/`.
You're ready to start hacking.

## Build
To make a production build, type `yarn build`.
Then you can publish the content of the `build` folder to a web server.

*Note that the Web Bluetooth API will only works with `https`. Only `localhost` is allowed without the `https` protocol.*
