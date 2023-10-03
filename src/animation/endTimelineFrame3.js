/**
 * 
 * @param {string} version - Options: "outro-message", "no-outro-message"
 * @returns a gsap timeline with the final animation
 */
function endTimeline (version) {
    const tl = gsap.timeline()

    //End timeline
    switch (version) {
        case 'outro-message':
            animationWithOutroMessage(tl)
            break;
        default:
            animationWithOutroMessage(tl)
            break;
    }

    return tl;
}

function animationWithOutroMessage (tl) {
    tl.add('last', 0)
    tl.to('.frame1.whiteblock1', { duration: 1.5, y: 260, ease: Power2.easeInOut }, 'last')
    tl.to('.frame1.whiteblock2', { duration: 0.6, backgroundColor: '#ffffff' }, 'last')
    tl.from('.frame3.title-container', { duration: 1.5, y: -220, ease: Power2.easeInOut }, 'last+=0.1')
    tl.to('.hero-image', { duration: 1.5, y: -30, ease: Power2.easeInOut }, 'last+=0.3')
    tl.to('#carrousel', { duration: 1.5, y: 300, ease: Power2.easeInOut }, 'last+=0.3')
    tl.to('.frame1.whiteblock2', { duration: 0.5, backgroundColor: 'transparent' }, 'last+=1')
}

export { endTimeline }