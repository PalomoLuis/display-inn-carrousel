/**
 * 
 * @param {HTMLElement} elements - Optional: HTML elements object.
 * @returns {Object} - gsap timeline
 * @description Returns the animation of the carousel. It also set the click events.
 */
function carouselAmnimation (elements = null) {
    let tl = gsap.timeline()
    const slidesSpeed = 0.4
    const { carouselNextButton, carouselPrevButton } = elements
    let animationPaused = false
    let slideIsMoving = true

    //move slides animations
    const setSlideIsMoving = () => slideIsMoving = !slideIsMoving
    const moveLeft = () => {
        function move () {
            moveSlide('left', slidesSpeed)
            carouselNextButton.removeEventListener('click', moveLeft)
            setTimeout(()=> carouselNextButton.addEventListener('click', moveLeft), slidesSpeed * 1000 + 0.2)
            tl.pause()
            animationPaused = true
            setSlideIsMoving()
        }
        //if the animation is moving will wait to finish before run the click animation
        if(slideIsMoving) setTimeout(() => move(), slidesSpeed)
        else move()
    }
    const moveRight = () => {
        const move = () => {
            moveSlide('right', slidesSpeed)
            carouselPrevButton.removeEventListener('click', moveRight)
            setTimeout(()=> carouselPrevButton.addEventListener('click', moveRight), slidesSpeed * 1000 + 0.2)
            tl.pause()
            animationPaused = true
            setSlideIsMoving()
        }
        //if the animation is moving will wait to finish before run the click animation
        if(slideIsMoving) setTimeout(() => move(), slidesSpeed)
        else move()
    }

    //add slides animation to slider buttons
    carouselNextButton.addEventListener('click', moveLeft)
    carouselPrevButton.addEventListener('click', moveRight)

    //carrousel intro
    const slidesDuration = 1
    tl.add('carousel', slidesDuration)
    if(!animationPaused) tl.to('#carrousel', { duration: slidesDuration, onStart: moveSlide, onStartParams: ['left', slidesSpeed], onComplete: setSlideIsMoving }, 'carousel')
        .to('#carrousel', { direction: 0.01, onStart: setSlideIsMoving}, '>')
    if(!animationPaused) tl.to('#carrousel', { duration: slidesDuration, onStart: moveSlide, onStartParams: ['left', slidesSpeed], onComplete: setSlideIsMoving }, '>+=1')
        .to('#carrousel', { direction: 0.01, onStart: setSlideIsMoving}, '>')
    if(!animationPaused) tl.to('#carrousel', { duration: slidesDuration, onStart: moveSlide, onStartParams: ['left', slidesSpeed], onComplete: setSlideIsMoving }, '>+=1')
        .to('#carrousel', { direction: 0.01, onStart: setSlideIsMoving}, '>')
    if(!animationPaused) tl.to('#carrousel', { duration: slidesDuration, onStart: moveSlide, onStartParams: ['left', slidesSpeed], onComplete: setSlideIsMoving }, '>+=1')
        .to('#carrousel', { direction: 0.01, onStart: setSlideIsMoving}, '>')

    return tl;
}

/**
 * 
 * @param {String} direction - Could be "left" or "right"
 * @param {Number} speed - The time counted in seconds.
 * @description Move the slides in the product cards slides one time to any direction.
 * @returns 
 * Example:
 * moveSlide('left', 0.25)
 */
function moveSlide(direction = 'left', speed) {
    const productCards = document.querySelectorAll('.product-card')
    const infoCards = document.querySelectorAll('.info-card')
    const productCardsParent = productCards[0].parentNode
    const clonedNode = direction === 'left' ? productCards[0] : productCards[productCards.length - 1]
    const infoCardsParent = infoCards[0].parentNode
    const clonedInfoNode = direction === 'left' ? infoCards[0] : infoCards[infoCards.length - 1]

    // 1: Move all one position to left/rioght
    const productCardsWidth = [84, 161]
    const productImageHeight = [108, 192]
    const productImageWidth = [76, 153]
    const infoCardWidth = 120

    //Organize the carousel cards in the correct position
    const beforeMainCard = direction === 'left' ? 2 : 0
    const moveTo = direction === 'left' ? `-=` : `+=`
    const beforeMainMove = direction === 'left' ? 2 : 1

    productCards.forEach((card, i) => {
        if(i === 1) {
            gsap.to(card, { duration: speed, width: productCardsWidth[0] })
            gsap.to(card.firstElementChild, { duration: speed, height: productImageHeight[0], width: productImageWidth[0] })
        } else if(i === beforeMainCard) {
            gsap.to(card, { duration: speed, width: productCardsWidth[1] })
            gsap.to(card.firstElementChild, { duration: speed, height: productImageHeight[1], width: productImageWidth[1] })
        }

        if(i === beforeMainMove) gsap.to(card, { duration: speed, x: `${moveTo}${productCardsWidth[1]}` })
        else gsap.to(card, { duration: speed, x: `${moveTo}${productCardsWidth[0]}` })

        //infoCards
        if(i === beforeMainCard) {
            //get the correct info card that matches with the product card
            const cardSelector = card.className.split(' ')[1]
            const selectId = Number(cardSelector.slice(-1, cardSelector.length))
            const cardId = selectId > 4 ? selectId - 4 : selectId
            let beforeCardId = cardId === 1 ? 4 : cardId - 1
            const infoCard = document.querySelector(`.info-card-${cardId}`)
            let infoBeforeCard = document.querySelector(`.info-card-${beforeCardId}`)
            
            //animate info card
            if(direction === 'left') {
                gsap.fromTo(infoBeforeCard, { opacity: 1 }, { duration: speed / 4, opacity: 0, ease: Power1.easeOut })
                gsap.fromTo(infoCard, { opacity: 0, x: infoCardWidth * 1.5}, { duration: speed, opacity: 1, x: infoCardWidth, ease: Power1.easeOut, delay: speed / 4 - 0.1 })
            } else {
                beforeCardId = cardId === 4 ? 1 : cardId + 1
                infoBeforeCard = document.querySelector(`.info-card-${beforeCardId}`)
                gsap.fromTo(infoBeforeCard, { opacity: 1 }, { duration: speed / 4, opacity: 0, ease: Power1.easeOut })
                gsap.fromTo(infoCard, { opacity: 0, x: -(infoCardWidth * 1.5)}, { duration: speed, opacity: 1, x: infoCardWidth, ease: Power1.easeOut, delay: speed / 4 - 0.1 })
            }
        }
    });

    // 2: Set the first element to the end.
    if(direction === 'left') {
        //product Cards
        productCardsParent.removeChild(productCards[0])
        productCardsParent.appendChild(clonedNode)
        gsap.set(productCardsParent.lastChild, { x: productCardsWidth[0] * (productCards.length - 2) + productCardsWidth[1], delay: speed + 0.01})
    } else {
        //product Cards
        productCardsParent.removeChild(productCards[productCards.length - 1])
        productCardsParent.insertBefore(clonedNode, productCards[0])
        gsap.set(productCardsParent.firstElementChild, { x: '0', delay: speed + 0.01})
    }
}

export { carouselAmnimation, moveSlide }