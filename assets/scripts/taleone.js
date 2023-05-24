function loadChapter(chapterNumber) {
  let text;

  switch (chapterNumber) {
    case 1:
      // Chapter 1 text
      text = `
        <p>בוקר החל לו עם זריחה מעל הארץ, יום חדש התחיל בעולמנו</p>
        <p>Here is some more text.</p>
      `;
      break;
    case 2:
      // Chapter 2 text
      text = `
        <h1>Chapter 2</h1>
        <p>This is the second chapter.</p>
        <p>More text goes here.</p>
      `;
      break;
    // Add more cases for additional chapters
    default:
      // Handle the end of the story or unrecognized chapter
      text = "<p>End of the story.</p>";
  }

  document.getElementById("storyone").innerHTML = text;
  processChapter(chapterNumber);
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
