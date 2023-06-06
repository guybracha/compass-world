var comicImages = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    // Add more image URLs as needed
  ];

  var currentComicIndex = 0;
  var comicContainer = document.getElementById("comic-container");
  var prevButton = document.getElementById("prev-button");
  var nextButton = document.getElementById("next-button");

  function displayComic() {
    var currentComic = comicImages[currentComicIndex];
    comicContainer.innerHTML = '<img src="' + currentComic + '" alt="בקרוב">';
  }

  prevButton.addEventListener("click", function() {
    if (currentComicIndex > 0) {
      currentComicIndex--;
      displayComic();
    }
  });

  nextButton.addEventListener("click", function() {
    if (currentComicIndex < comicImages.length - 1) {
      currentComicIndex++;
      displayComic();
    }
  });

  displayComic();