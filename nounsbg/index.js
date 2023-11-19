const axios = require('axios');
const sharp = require('sharp');
const svgToImg = require('svg-to-img');

const imageURL = 'https://noun-api.com/beta/pfp';
const collageWidth = 1920;
const collageHeight = 1080;
const tileSize = 90;
const tilesX = Math.floor(collageWidth / tileSize);
const tilesY = Math.floor(collageHeight / tileSize);
const totalTiles = tilesX * tilesY;
let i = 0;

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadAndConvertSVG(url) {
    try {
        const response = await axios.get(url, { responseType: 'text' });
        const pngBuffer = await svgToImg.from(response.data).toPng();
        return pngBuffer;
    } catch (error) {
        console.error('Error downloading or converting SVG:', error);
        return null;
    }
}

async function createTile() {
    const pngBuffer = await downloadAndConvertSVG(imageURL);
    return sharp(pngBuffer)
        .resize(tileSize, tileSize)
        .png()
        .toBuffer();
}

async function createCollage() {
    const promises = [];
    for (let i = 0; i < totalTiles; i++) {
        promises.push(createTile());
    }

    const images = await Promise.all(promises);
    const collage = sharp({
        create: {
            width: collageWidth,
            height: collageHeight,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 0 }
        }
    });

    let compositeArray = [];
    for (let y = 0; y < tilesY; y++) {
        for (let x = 0; x < tilesX; x++) {
            const index = y * tilesX + x;
            if (index < images.length) {
                compositeArray.push({ input: images[index], left: x * tileSize, top: y * tileSize });
            }
        }
    }

    collage.composite(compositeArray);

    return collage.toFile(`collage${i++}.png`);
}
async function main() {
    for(let i = 0; i < 29; i++){
        try {
            await createCollage();
            console.log(`Collage created successfully! ${i}`);
        } catch (error) {
            console.error('Error creating collage:', error);
            await wait(3000);
        }
        await wait(1000);
    }
}

main();

