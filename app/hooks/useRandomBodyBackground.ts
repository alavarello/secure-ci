// hooks/useRandomBodyBackground.ts
import { useEffect } from 'react';

const useRandomBodyBackground = () => {
    useEffect(() => {
        // Generate a random number and construct the image path
        const randomNumber = Math.floor(Math.random() * 29) + 1;
        const imagePath = `/nouns_bg/collage${randomNumber}.png`;

        // Set the background image of the body
        document.body.style.backgroundImage = `url(${imagePath})`;

        // Clean up function
        return () => {
            document.body.style.backgroundImage = '';
        };
    }, []);
};

export default useRandomBodyBackground;
