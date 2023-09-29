import { moveSlide } from "./carouselAnimation"

function animationFrame1 () {
    let tl = gsap.timeline()

    tl.add('frame1', 1)
    tl.to('.content', { duration: 0.1, opacity: 1 }, 'frame1')
    tl.to('.frame1.logo-mark', { duration: 0.4, scale:1.4 }, 'frame1+=0.3') 
    tl.to('.frame1.logo-mark', { duration: 0.4, scale: 1 }, '>')
    tl.to('.frame1.logo-mark', { duration: 0.2, scale: 1.25 }, '>')
    tl.to('.frame1.logo-mark', { duration: 0.2, scale: 0 }, '>')
  
    tl.from('.frame1.whiteblock2', { duration: 0.5, y: '100%', ease: Power1.easeOut }, 'frame1+=1.6')
    tl.to('.frame1.whiteblock1', { duration: 1, y: -78, ease: Power1.easeInOut }, 'frame1+=1.8')
    tl.to('.frame1.title-container', { duration: 1, y: -65, ease: Power1.easeInOut }, '<')
    tl.to('.frame1.whiteblock1', { duration: 1.2, y: -116, ease: Power1.easeInOut }, 'frame1+=2.8')
    tl.to('.frame1.title-container', { duration: 1.2, y: -107, ease: Power1.easeInOut }, '<')
    tl.from(['.frame1 .enlargedProduct', '.frame1 .focusedCopy'], { duration: 0.5, opacity:0 }, '<')
    tl.to('.hero-image', { duration: 1, y: -10, ease: Power2.easeOut }, 'frame1+=3.5')
    tl.to('.hero-image', { duration: 1, y: -250, ease: Power2.easeInOut }, 'frame1+=4.5')
    tl.to('.frame1.whiteblock1', { duration: 1, y: -260, height: 260, ease: Power1.easeOut }, 'frame1+=4.5')
    tl.to('.frame1.title-container', { duration: 1.2, y: -280, opacity: 0, ease: Power1.easeOut }, 'frame1+=4.8')

    tl.to('#carrousel', { duration: 1.5, y: -(300 - 16), ease: Power2.easeOut }, 'frame1+=5')
    tl.to('#carrousel', { duration: 1, onStart: moveSlide, onStartParams: ['left', 0.4]}, 'frame1+=5.5')

    return tl;
}

export { animationFrame1 }