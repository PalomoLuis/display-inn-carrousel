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
    tl.to('.frame1.whiteblock2', { duration: 0.6, backgroundColor: '#ffffff' }, 'last')
    tl.to('#carrousel', { duration: 1.5, y: 300, ease: Power2.easeIn }, 'last+=0.3')
}

export { endTimeline }