import axios from 'axios';

export interface PhotoResult {
    manipulatedData: string;
    predictedClass: string;
    googleSearchLink: string;
}

export const useWebClient = () => {

    var newPhoto;

    const manipulatePhoto = async (photo: string, width: number, height: number, x: number, y: number, title: string, confidence: number): Promise<string> => {
        const img = new Image();
        img.src = photo;

        // Wait for the image to load
        await new Promise(resolve => {
            img.onload = resolve;
        });

        // Create a canvas element
        const canvas = document.createElement('canvas');

        // Set the size of the canvas to the size of the image
        canvas.width = img.width;
        canvas.height = img.height;

        // Get the 2D context of the canvas
        const ctx = canvas.getContext('2d');
        if (ctx !== null) {
            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0);

            //calculate the top left corner ot the box based on the center of the box
            x = x - width / 2;
            y = y - height / 2;

            // Draw a box on the canvas at the specified coordinates with the specified width and height
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 5;
            ctx.strokeRect(x, y, width, height);

            // Write the text and number on the canvas under the box
            ctx.font = '20px Arial';
            const text = `${title}: ${confidence.toFixed(2)}`;
            const textWidth = ctx.measureText(text).width;
            const xText = x + (width - textWidth) / 2;
            const yText = y + height + 20;
            ctx.fillStyle = 'white';
            ctx.fillRect(xText - 10, yText - 20, textWidth + 20, 30);
            ctx.fillStyle = 'black';
            ctx.fillText(text, xText, yText);

            // Convert the canvas to a base64-encoded image
            const newPhoto = canvas.toDataURL('image/jpeg');
            console.log("newPhoto = " + newPhoto);

            // Return the new base64-encoded image
            return newPhoto;
        } else {
            // Handle the case where the context is null
            throw new Error('Failed to get 2D context of canvas');
        }
    }

    const resizeImage = async (image: string): Promise<string> => {
        const img = new Image();
        img.src = image;

        await new Promise(resolve => {
            img.onload = resolve;
        });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Failed to get 2D context of canvas');
        }

        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;

        let width = img.width;
        let height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        const resizedImage = canvas.toDataURL('image/jpeg', 0.9);
        console.log("resizedImage = " + resizedImage);

        return resizedImage;
    }


    const uploadPhoto = async (image: string): Promise<PhotoResult> => {

        const resizedImage = await resizeImage(image);

        //const resizedImage = image;
        return new Promise<PhotoResult>((resolve) => {
            axios({
                method: 'POST',
                url: 'http://localhost:5047/Tsscanner',
                data: resizedImage,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then(async function (response) {
                    console.log(response.data);
                    const manipulatedData = await manipulatePhoto(
                        resizedImage,
                        response.data.predictions[0].width,
                        response.data.predictions[0].height,
                        response.data.predictions[0].x,
                        response.data.predictions[0].y,
                        response.data.predictions[0].class,
                        response.data.predictions[0].confidence
                    );
                    resolve({
                        manipulatedData,
                        predictedClass: response.data.predictions[0].class.replace(/_/g, ' '),
                        googleSearchLink: "https://www.google.com/search?q=" + response.data.predictions[0].class.replace(/_/g, '+')    
                    });
                })
                .catch(function (error) {
                    resolve({
                        manipulatedData: resizedImage,
                        predictedClass: 'Not Found',
                        googleSearchLink: "",
                    });
                });
        
            })
    };

    return {
        uploadPhoto,
    }
}

