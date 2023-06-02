// Get all the elements to fade in (including paragraphs, headings, and images)
const elementsToFadeIn = document.querySelectorAll('p, h1, h2, img');

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle the scroll event
function handleScroll() {
  elementsToFadeIn.forEach((element) => {
    if (isInViewport(element) && !element.classList.contains('fadeIn')) {
      element.classList.add('fadeIn');
    }
  });
}

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);
