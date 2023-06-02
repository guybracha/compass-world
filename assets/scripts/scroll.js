// Get all the paragraphs
const paragraphs = document.querySelectorAll('p, h1, h2');

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
  paragraphs.forEach((paragraph) => {
    if (isInViewport(paragraph) && !paragraph.classList.contains('fadeIn')) {
      paragraph.classList.add('fadeIn');
    }
  });
}

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);
