# SMB (Stock Management & Billing)

This application is purely a kitchen-sink demo of the Ionic Framework and Angular.

## Table of Contents

- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [App Preview](#app-preview)
- [Deploying](#deploying)
  - [Progressive Web App](#progressive-web-app)
  - [Android](#android)
  - [iOS](#ios)

## Getting Started

- [Download the installer](https://nodejs.org/) for Node LTS.
- Install the ionic CLI globally: `npm install -g ionic`
- Clone this repository: `git clone https://github.com/gys-management/smb-frontend.git`.
- Run `npm install` from the project root.
- Run `ionic serve` in a terminal from the project root.
- Run on external server `ionic serve --host 0.0.0.0 --port 8100` in a terminal from the project root
- Profit. :tada:

_Note: See [How to Prevent Permissions Errors](https://docs.npmjs.com/getting-started/fixing-npm-permissions) if you are running into issues when trying to install packages globally._

## App Preview

### [Menu]

| Material Design                                          | iOS                                              |
| -------------------------------------------------------- | ------------------------------------------------ |
| ![Android Menu](/resources/screenshots/android-menu.png) | ![iOS Menu](/resources/screenshots/ios-menu.png) |

### [Schedule Page]

| Material Design                                                  | iOS                                                      |
| ---------------------------------------------------------------- | -------------------------------------------------------- |
| ![Android Schedule](/resources/screenshots/android-schedule.png) | ![iOS Schedule](/resources/screenshots/ios-schedule.png) |

### [Speakers Page]

| Material Design                                                  | iOS                                                      |
| ---------------------------------------------------------------- | -------------------------------------------------------- |
| ![Android Speakers](/resources/screenshots/android-speakers.png) | ![iOS Speakers](/resources/screenshots/ios-speakers.png) |

### [Speaker Detail Page)

| Material Design                                                              | iOS                                                                  |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| ![Android Speaker Detail](/resources/screenshots/android-speaker-detail.png) | ![iOS Speaker Detail](/resources/screenshots/ios-speaker-detail.png) |

### [About Page]

| Material Design                                            | iOS                                                |
| ---------------------------------------------------------- | -------------------------------------------------- |
| ![Android About](/resources/screenshots/android-about.png) | ![iOS About](/resources/screenshots/ios-about.png) |

## Deploying

### Progressive Web App

1. Un-comment [these lines](https://github.com/ionic-team/ionic2-app-base/blob/master/src/index.html#L21)
2. Run `npm run ionic:build --prod`
3. Push the `www` folder to your hosting service

### Remove cache

ionic build --prod --aot --release --output-hashing=all

# else

ionic build --prod --aot --release

### Android

1. Run `ionic cordova run android --prod`
   ionic capacitor run android --prod

### live reload

ionic capacitor run android --prod --release -l --external

### iOS

1. Run `ionic cordova run ios --prod`
   ionic capacitor run ios --prod

### deployment

Steps to deploy in testing env :

1. build `ionic build --configuration=dev --aot --release --output-hashing=all`
2. deploy `firebase deploy --only hosting:ionic-angular-61cb7`

URL : `https://ionic-angular-61cb7.firebaseapp.com`
make sure environment.ts are mapping right urls

Steps to deploy in Prod env :

1. build `ionic build --prod --aot --release --output-hashing=all`
2. deploy `firebase deploy --only hosting:stockmanagementbilling`

URL : `https://stockmanagementbilling.firebaseapp.com`
make sure environment.prod.ts are mapping right urls
