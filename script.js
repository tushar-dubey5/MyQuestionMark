document.getElementById('imageUpload').addEventListener('change', function(event) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Add linear gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0.5)'); // 50% opacity
gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');   // 0% opacity

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Show the preview
            const preview = document.getElementById('preview');
            preview.src = canvas.toDataURL();
            preview.style.display = 'block';

            // Show the download button
            document.getElementById('downloadBtn').style.display = 'block';
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'gradient-image.png';
    link.href = canvas.toDataURL();
    link.click();
});
