function loadChapter(chapterNumber) {
    fetch('chapter' + chapterNumber + '.txt')
      .then(response => response.text())
      .then(text => {
        document.getElementById("storyone").innerHTML = text;
        processChapter(chapterNumber);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  function processChapter(chapterNumber) {
    // Perform additional processing based on the chapter
    switch (chapterNumber) {
      case 1:
        // Set up choices for Chapter 1
        document.getElementById("storyone").innerHTML += '<button onclick="loadChapter(2)">Go left</button>';
        document.getElementById("storyone").innerHTML += '<button onclick="loadChapter(3)">Go right</button>';
        break;
      case 2:
        // Set up choices for Chapter 2
        document.getElementById("storyone").innerHTML += '<button onclick="loadChapter(4)">Enter the cave</button>';
        document.getElementById("storyone").innerHTML += '<button onclick="loadChapter(5)">Continue along the path</button>';
        break;
      // Add more cases for additional chapters
      default:
        // Handle the end of the story or unrecognized chapter
        document.getElementById("storyone").innerHTML += "<p>End of the story.</p>";
    }
  }
  