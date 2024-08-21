document.getElementById('poll-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var selectedHero = document.querySelector('input[name="hero"]:checked').value;
    localStorage.setItem('favoriteHero', selectedHero);
    document.getElementById('poll-result').innerText = 'Thank you for voting!';
  });
  
  // Display stored vote
  window.onload = function() {
    var storedVote = localStorage.getItem('favoriteHero');
    if (storedVote) {
      document.getElementById('poll-result').innerText = 'You voted for: ' + storedVote;
    }
  };
  