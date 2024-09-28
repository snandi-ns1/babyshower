const MAX_PHOTOS = 25;
let photoCount = 0;
const photoArray = [];
const photoCountDisplay = document.getElementById('photoCount');
const takePhotoButton = document.getElementById('takePhoto');
const sendPhotosButton = document.getElementById('sendPhotos');
const galleryDiv = document.getElementById('gallery');

// Function to handle photo capturing
takePhotoButton.addEventListener('click', () => {
    if (photoCount < MAX_PHOTOS) {
        // Open the device camera using input type file
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'camera';
        input.addEventListener('change', () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const img = document.createElement('img');
                    img.src = reader.result;
                    img.style.width = '100px';
                    img.style.height = '100px';
                    galleryDiv.appendChild(img);

                    // Add the image data to an array
                    photoArray.push(reader.result);
                    photoCount++;
                    photoCountDisplay.innerText = `${photoCount}/${MAX_PHOTOS} photos taken`;

                    if (photoCount === MAX_PHOTOS) {
                        takePhotoButton.disabled = true;
                        sendPhotosButton.disabled = false;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
        input.click();
    }
});

// Function to handle sending photos via email
sendPhotosButton.addEventListener('click', () => {
    const email = prompt("Enter your email address:");
    if (email) {
        fetch('https://your-backend-url/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                photos: photoArray
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Photos sent successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
