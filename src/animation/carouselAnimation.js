/**
 * 
 * @param {HTMLElement} elements - Optional: HTML elements object.
 * @returns 
 */
function carouselAmnimation (elements = null) {
    let tl = gsap.timeline()
    const { Draggable } = import('gsap/Draggable')
    const { InertiaPlugin } = import('gsap/InertiaPlugin')
    gsap.registerPlugin(Draggable, InertiaPlugin)

    const { carouselNextButton, carouselPrevButton } = elements

    //End timeline
    tl.add('carousel', 0)

    // for (let i = 0; i < 5; i++) {
    //     tl.add(moveSlide('left', elements, i), '>')
    // }

    carouselNextButton.addEventListener('click', () => {
        // moveSlidesLeft(window.itemsMoved.left)
        // window.itemsMoved.left++
        sliderAnimation('left', elements)
    })

    return tl;
}

function moveSlide (direction = 'left', elements, frameNumber) {
    const { productCards, productImages } = elements
    const moveX = direction === 'left' ? `-=100%` : `+=100%`
    const tl = gsap.timeline()

    tl.add(`moveSlide${frameNumber}`)
    tl.to(productCards, { duration: 1, x: moveX, ease: Power2.easeInOut}, `moveSlide${frameNumber}+=0.5`)
    tl.to(productImages, { duration: 2, objectPosition: 'center 100%', ease: Power2.easeInOut}, '<')

    return tl
}

function sliderAnimation (direction = 'left', elements) {
    const { productCards, mainCarouselItemWrapper, carouselNextButton, carouselPrevButton } = elements
    const DELAY = 1.5
    const DURATION = 0.3
    var wrap = true
    let progressWrap = gsap.utils.wrap(0, 1)
    // const directionValue = direction === 'left' ? -1 : 1
    const carouselItemsLength = mainCarouselItemWrapper.length

    var wrapX = gsap.utils.wrap(-100, (carouselItemsLength - 1) * 100)
    var timer = gsap.delayedCall(DELAY, autoPlay) //autoPlay will be a function

    var animation = gsap.to(productCards, {
        xPercent: "+=" + (carouselItemsLength * 100),
        duration: 1,
        ease: "none",
        paused: true,
        repeat: -1,
        modifiers: {
          xPercent: wrapX
        }
    })

    carouselPrevButton.addEventListener("click", function() {
        animateSlides(1);
    })
    
    carouselNextButton.addEventListener("click", function() {
        animateSlides(-1);
    })

    gsap.set(productCards, { xPercent: i => i})

    function animateSlides(direction) {
        timer.restart(true)
        let x = snapX(gsap.getProperty(productCards[0], 'xPercent') + direction * 100)
        gsap.to(productCards, { duration: DURATION, xPercent: x, onUpdate: upgradeProgress})
    }

    function upgradeProgress() {
        animation.progress(progressWrap(gsap.getProperty(productCards[0], 'xPercent')))
    }

    function snapX(value) {
        let snapped = gsap.utils.snap(100, value);
        return wrap ? snapped : gsap.utils.clamp(-100 * (carouselItemsLength - 1), 0, snapped);
    }

    function autoPlay() {  
        if (!timer.isActive() && !gsap.isDragging(productCards) && !gsap.isThrowing(productCards)) {
          animateSlides(-1);
        }
    }
}

// function expandCarrouselItems (direction = 'left', elements) {
//     const { productCards, mainCarouselItemWrapper } = elements

//     return function move (id) {
//         const templateColumsLenght = window.getComputedStyle(mainCarouselItemWrapper).gridTemplateColumns.split(' ').length
//         console.log(templateColumsLenght)
//         const node = productCards[id]
//         const clonedNode = node.cloneNode(true)
//         clonedNode.classList.remove(`product-card-${id + 1}`)
//         clonedNode.classList.add(`product-card-${id + 1 + templateColumsLenght}`)
    
//         if(direction === 'left') {
//             mainCarouselItemWrapper.appendChild(clonedNode)
//         } else {
//             mainCarouselItemWrapper.insertBefore(clonedNode, node)
//         }
    
//         mainCarouselItemWrapper.style.gridTemplateColumns = `repeat(${templateColumsLenght}, 1fr)`
//     }
// }

export { carouselAmnimation }