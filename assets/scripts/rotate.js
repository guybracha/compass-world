var imageUrl = "../compass-world/contents/indexphoto/britain.png";

function replaceAnimatedImage(imageId, ImageUrl) {
    // Get the animated image element
    var image = document.getElementById(imageId);
  
    // Create a new image element
    var newImage = new Image();
    newImage.src = ImageUrl;
    newImage.style.margin = "20px";
    newImage.style.display = "block";
    newImage.style.position = "relative";
    newImage.style.width = "200px";
    newImage.style.height = "200px";
    newImage.style.marginLeft = "auto";
    newImage.style.marginRight = "auto";
    newImage.style.top = "0";
    newImage.style.left = "0";

    // Copy the animation properties from the original image to the new image
    var animation = getComputedStyle(image).animation;
    newImage.style.animation = animation;
  
    // Copy the keyframes from the original image to the new image
    var keyframes = getComputedStyle(image).animationName;
    newImage.style.animationName = keyframes;
  
    // Replace the original image with the new image
    image.parentNode.insertBefore(newImage, image);
    image.parentNode.removeChild(image);
}

replaceAnimatedImage("imageId", imageUrl);
