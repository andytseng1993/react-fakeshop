
export function image64toCanvasRef( pixelCrop ,imageRef){
    const canvas = document.createElement('canvas')
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
        imageRef,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    )
    return canvas.toDataURL('image/jpeg')
}

export function extractImageFileExtensionFromBase64(base64Data){
    return base64Data.substring("data:image/".length, base64Data.indexOf(";base64"))
}
export function downloadBase64File(base64Data, filename) {
    var element = document.createElement('a');
    element.setAttribute('href', base64Data);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    }