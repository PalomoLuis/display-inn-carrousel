function DOMElements () {
    const elements = {
        //Frame1
        heroImage: document.querySelector('.hero-image'),
        campainClaim: document.querySelector('.campainClaim'),
        enlargedProduct: document.querySelector('.enlargedProduct'),
        focusedCopy: document.querySelector('.focusedCopy'),
        //general
        cta: document.querySelector('.cta'),
        ctaArrow: document.querySelector('.cta-arrow'),
        logo: document.querySelector('.logo'),
        //Carousel
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
        paginationItems: document.querySelectorAll('.pagination-item'),
        additionalText: document.querySelectorAll('.additional-text'),
        originalPrice: document.querySelectorAll('.additional-text.original-price'),
        discountText: document.querySelectorAll('.discount'),
        //Frame 3 - final
        additionalFunctional: document.querySelector('.additionalFunctional'),
        messagingLayer: document.querySelector('.messagingLayer'),
        disclaimer: document.querySelector('.disclaimer')
    }
    return elements
}

export { DOMElements }