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
        carouselPrevButton: document.querySelector('.carousel-prev-button'),
        infoCarouselWrapper: document.querySelector('.info-carousel-wrapper'),
        infoCards: document.querySelectorAll('.info-card'),
        infoCardsBrands: document.querySelectorAll('.info-card .brand'),
        infoCardsTitles: document.querySelectorAll('.info-card .title'),
        infoCardsVatPrice: document.querySelectorAll('.info-card .price'),
        infoCardsPrices: document.querySelectorAll('.info-card .sale_price'),
        infoCardsVatLabel: document.querySelectorAll('.info-card .vat_label'),
        paginationItems: document.querySelectorAll('.pagination-item')
    }
    return elements
}

export { DOMElements }