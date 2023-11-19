const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './nouns';  // Replace with your input directory path
const outputDir = './nouns2'; // Replace with your output directory path

fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading the directory:', err);
        return;
    }

    files.forEach(file => {
        const inputFile = path.join(inputDir, file);
        const outputFile = path.join(outputDir, file);

        sharp(inputFile)
            .ensureAlpha()
            .composite([{ input: Buffer.from([0, 0, 0, 0]), blend: 'dest-in', raw: { width: 1, height: 1, channels: 4 } }])
            .toColourspace('b-w')  // Convert to black and white
            .tint({ r: 255, g: 255, b: 255, alpha: 0.53 })  // Apply 13% opacity
            .toFile(outputFile)
            .then(() => {
                console.log(`Processed: ${file}`);
            })
            .catch(err => {
                console.error(`Error processing ${file}:`, err);
            });
    });
});

