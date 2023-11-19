# Nouns BG

This scripts generated Nouns background for Secure CI application.

## Run it

```sh
nvm use
npm intall
node index.js
mkdir nouns/
mv 'collage*.png' nouns/
```

Optionally can apply an opacity:

```sh
mkdir nouns2/
node opacity.js
```

Or alternative with the use of ImageMagik:

```sh
mkdir nouns2/
convert 'nouns/*.png' -alpha on -channel A -evaluate set 24% +channel 'nouns2/collage%d.png'
```
