function toggleContainer() {
    console.log('Toggle container function called');
    var container = document.getElementById('myContainer');
    var lists = container.querySelectorAll('ol');
    var images = container.querySelectorAll('img');

    // Toggle the display of ordered lists and images
    lists.forEach(function (list) {
        list.style.display = (list.style.display === 'none' || list.style.display === '') ? 'block' : 'none';
    });

    images.forEach(function (image) {
        image.style.display = (image.style.display === 'none' || image.style.display === '') ? 'block' : 'none';
    });
}
