const images = [
    {
      imgSrc: "../contents/gallery/UniteCol-min.png"
    },
    {
      imgSrc: "../contents/gallery/hanukkah-min.png"
    },
    {
      imgSrc: "../contents/art/CoverDSFinished-min.png"
    }
  ];
  
  class Carousel {
    constructor() {
      this.render();
    }
  
    render() {
      let div = document.getElementById("carousel");
      div.innerHTML = `
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            ${this.generateCarouselItems()}
          </div>
          <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      `;
    }
  
    generateCarouselItems() {
      return images
        .map((image, index) => `
          <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img class="d-block w-100" src="${image.imgSrc}" alt="Slide ${index + 1}">
          </div>
        `)
        .join("");
    }
  }
  
  // Instantiate the Carousel class
  const carousel = new Carousel();
  