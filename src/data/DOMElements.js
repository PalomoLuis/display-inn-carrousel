function DOMElements () {
    const elements = {
        heroImage: document.querySelector('.hero-image'),
        campainClaim: document.querySelector('.campainClaim'),
        enlargedProduct: document.querySelector('.enlargedProduct'),
        focusedCopy: document.querySelector('.focusedCopy'),
        cta: document.querySelector('.cta'),
        mainCarouselItemWrapper: document.querySelector('.main-carousel-item-wrapper'),
        productCards: document.querySelectorAll('.product-card'),
        productImages: document.querySelectorAll('.product-image'),
        carouselNextButton: document.querySelector('.carousel-next-button'),
        carouselPrevButton: document.querySelector('.carousel-prev-button')
    }
    return elements
}

export { DOMElements }