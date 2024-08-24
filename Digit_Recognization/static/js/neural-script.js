window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var painting = false;

    canvas.addEventListener('mousedown', startPosition);  
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);

    function startPosition(e) {          
        painting = true;
        draw(e);
    }

    function finishedPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'white';

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop); // Draw a line from the last position to the current position
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop); // Move the pen to the current position
    }

    document.getElementById('clear').addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    document.getElementById('predict').addEventListener('click', function() {
        var imgData = canvas.toDataURL('image/png');

        // Normalize the image data
        var img = new Image();  // Create a new image element
        img.src = imgData;
        img.onload = function() {   
            var tempCanvas = document.createElement('canvas'); // Create a temporary canvas
            var tempCtx = tempCanvas.getContext('2d');  // Get the 2D context of the canvas
            tempCanvas.width = 28;
            tempCanvas.height = 28;
            tempCtx.drawImage(img, 0, 0, 28, 28);  // Draw the image on the temporary canvas
            var imgData = tempCtx.getImageData(0, 0, 28, 28); // Get the image data of the temporary canvas
            var data = imgData.data;

            
            for (var i = 0; i < data.length; i += 4) {       // Loop through the image data
                var avg = (data[i] + data[i + 1] + data[i + 2]) / 3; // Calculate the average of the RGB values. Red , blue , green respectively.
                data[i] = data[i + 1] = data[i + 2] = avg; //  Set the RGB component of the pixwl to the average value
                data[i+3] = 255;  // Set the alpha component of the pixel to 255
            }
            tempCtx.putImageData(imgData, 0, 0); // Put the image data back to the temporary canvas
            var normalizedImgData = tempCanvas.toDataURL('image/png');

            // Debugging: Print the normalized image data URL
            console.log("Normalized Image Data URL:", normalizedImgData);

            // Convert the image data to a base64 string
            var base64ImageData = normalizedImgData.split(',')[1];

            fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ img_data: 'data:image/png;base64,' + base64ImageData }) // Send the image data to the server
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {  // If there is an error
                    console.error('Error:', data.error); // Log the error
                    document.getElementById('result').textContent = 'Error: ' + data.error; // Display the error message
                } else {
                    document.getElementById('result').textContent = 'Prediction: ' + data.digit;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('result').textContent = 'Error: ' + error;
            });
        };
    });
};