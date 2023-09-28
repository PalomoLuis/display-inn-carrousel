/**
 * 
 * @param {HTMLElement} elements - Optional: HTML elements object.
 * @returns 
 */
export default function initialSetup (elements) {
    const { productCards } = elements

    const productCardsWidth = [84, 161]
    const productImageHeight = [108, 192]
    const productImageWidth = [76, 153]

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

}