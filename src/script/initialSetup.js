/**
 * 
 * @param {HTMLElement} elements - Optional: HTML elements object.
 * @returns 
 */
export default function initialSetup (elements) {
    const {
        productCards, infoCards,
        paginationItems, additionalFunctional,
        messagingLayer, disclaimer
    } = elements

    const productCardsWidth = [84, 161]
    const productImageHeight = [108, 192]
    const productImageWidth = [76, 153]
    
    const infoCardWidth = 120

    //Organize the carousel cards in the correct position
    productCards.forEach((card, i) => {
        if(i === 1) {
            gsap.set(card, { width: productCardsWidth[1] })
            gsap.set(card.firstElementChild, { height: productImageHeight[1], width: productImageWidth[1] })
        } else {
            gsap.set(card, { width: productCardsWidth[0] })
            gsap.set(card.firstElementChild, { height: productImageHeight[0], width: productImageWidth[0] })
        }

        if(i === 1) gsap.set(card, { x: productCardsWidth[0] })
        if(i > 1) gsap.set(card, { x: (productCardsWidth[0] * i) + productCardsWidth[1] - productCardsWidth[0] })
    });

    infoCards.forEach((card, i) => {
        gsap.set(card, { x: infoCardWidth * i})
    })

    gsap.set(paginationItems[1], { width: 66, backgroundColor: '#1a1a1add' })

    //Final frame setup
    if (additionalFunctional.offsetHeight > 30 || messagingLayer.offsetHeight > 30) {
        gsap.set('.frame3.title-container', { top: 124, height: 96 })
    }

    //TODO: forEach copy in infoCards check if it fits in the container, if not reduce the font-size. like ObjectFit.

}