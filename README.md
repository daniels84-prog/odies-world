# Odie's World

A sensory play game for Odie: workshop tools, pond, yard and science.

- `game/odies-world.html` is the game itself. Edit this file; everything else is built from it.
- **Website:** every change is published to https://daniels84-prog.github.io/odies-world/ by the *Website* workflow.
- **Android app:** the *Android app* workflow builds the app on every change. Download the newest copy on the tablet from
  https://github.com/daniels84-prog/odies-world/releases/latest/download/odies-world.apk
  (first time only: allow your browser or file manager to "install unknown apps").

The app carries its own copy of the game, so it works with no internet. When it is online it checks the website
for a newer version and switches to it the next time the app is opened, or when it comes back after being in the
background for a bit, so most changes reach the tablet without reinstalling.

`app/signing/sideload.jks` is only for copies installed directly on the family's devices. A Google Play upload key
should be kept private as GitHub secrets (`RELEASE_KEYSTORE` and friends), never committed here.
