/**
 * 
 * @param {HTMLElement} elements - Optional: HTML elements object.
 * @returns 
 */
function carouselAmnimation (elements = null) {
    let tl = gsap.timeline()
    const { Draggable } = import('gsap/Draggable')
    const { InertiaPlugin } = import('gsap/InertiaPlugin')
    const slidesSpeed = 0.25
    gsap.registerPlugin(Draggable, InertiaPlugin)

    const { carouselNextButton, carouselPrevButton } = elements

    //End timeline
    // tl.add('carousel', 0)
    const moveLeft = () => {
        moveSlide('left', slidesSpeed)
        carouselNextButton.removeEventListener('click', moveLeft)
        setTimeout(()=> carouselNextButton.addEventListener('click', moveLeft), slidesSpeed * 1000 + 0.2)
    }
    const moveRight = () => {
        moveSlide('right', slidesSpeed)
        carouselPrevButton.removeEventListener('click', moveRight)
        setTimeout(()=> carouselPrevButton.addEventListener('click', moveRight), slidesSpeed * 1000 + 0.2)
    }

    carouselNextButton.addEventListener('click', moveLeft)
    carouselPrevButton.addEventListener('click', moveRight)

    return tl;
}

function moveSlide(direction = 'left', speed) {
    const productCards = document.querySelectorAll('.product-card')
    const productCardsParent = productCards[0].parentNode
    const clonedNode = direction === 'left' ? productCards[0] : productCards[productCards.length - 1]

    // 1: Move all one position to left/rioght
    const productCardsWidth = [84, 161]
    const productImageHeight = [108, 192]
    const productImageWidth = [76, 153]

    //Organize the carousel cards in the correct position
    const beforeMainCard = direction === 'left' ? 2 : 0
    productCards.forEach((card, i) => {
        if(i === 1) {
            gsap.to(card, { duration: speed, width: productCardsWidth[0] })
            gsap.to(card.firstElementChild, { duration: speed, height: productImageHeight[0], width: productImageWidth[0] })
        } else if(i === beforeMainCard) {
            gsap.to(card, { duration: speed, width: productCardsWidth[1] })
            gsap.to(card.firstElementChild, { duration: speed, height: productImageHeight[1], width: productImageWidth[1] })
        }

        const moveTo = direction === 'left' ? `-=` : `+=`
        const beforeMainMove = direction === 'left' ? 2 : 1
        if(i === beforeMainMove) gsap.to(card, { duration: speed, x: `${moveTo}${productCardsWidth[1]}` })
        else gsap.to(card, { duration: speed, x: `${moveTo}${productCardsWidth[0]}` })
    });

    // 2: Set the first element to the end.
    if(direction === 'left') {
        productCardsParent.removeChild(productCards[0])
        productCardsParent.appendChild(clonedNode)
        gsap.set(productCardsParent.lastChild, { x: productCardsWidth[0] * (productCards.length - 2) + productCardsWidth[1], delay: speed + 0.01})
    } else {
        productCardsParent.removeChild(productCards[productCards.length - 1])
        productCardsParent.insertBefore(clonedNode, productCards[0])
        gsap.set(productCardsParent.firstElementChild, { x: '0', delay: speed + 0.01})
    }
    // setTimeout(() => {
    // }, speed * 1000 + 1)
}

export { carouselAmnimation }