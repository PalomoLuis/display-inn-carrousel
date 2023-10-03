import { logoMarkAnimation } from "./logoMarkAnimation"

/**
 * FINAL TIMELINE ANIMATION
 * @param {string} version - Options: "outro-message", "no-outro-message"
 * @param {number} lines - Optional: Number of lines in the title
 * @param {boolean} disclaimer - Optional: Has disclaimer
 * @returns a gsap timeline with the final animation
 */
function endTimeline (version, lines = 1, disclaimer = false) {
    const tl = gsap.timeline()

    //End timeline
    switch (version) {
        case 'outro-message':
            animationWithOutroMessage(tl, disclaimer)
            break;
        case 'no-outro-message':
            animationNoOutroMessage(tl, disclaimer)
            break;
    }

    return tl;
}

/**
 * ANIMATION WITH OTRO MESSAGE
 * @param {object} tl - timeline
 * @param {boolean} disclaimer - Has disclaimer
 * @returns a gsap timeline with the final animation
 */
function animationWithOutroMessage (tl, disclaimer) {
    const titleContY = disclaimer ? -220 : -240

    tl.add('last', 0)
    tl.to('.frame1.whiteblock1', { duration: 1.2, y: 0, ease: Power2.easeIn }, 'last')
    tl.to('.frame1.whiteblock2', { duration: 0.6, backgroundColor: '#ffffff' }, 'last')
    tl.from('.frame3.title-container', { duration: 1.5, y: titleContY, ease: Power2.easeInOut }, 'last')
    tl.to('#carrousel', { duration: 1.5, y: 0, ease: Power2.easeInOut }, 'last+=0.1')
    tl.to('.hero-image', { duration: 1.5, y: -30, ease: Power2.easeOut }, 'last+=0.3')
    tl.to('.frame1.whiteblock2', { duration: 0.5, backgroundColor: 'transparent' }, 'last+=1.1')
    //pause
    tl.to('.frame1.whiteblock2', { duration: 0.6, backgroundColor: '#ffffff' }, 'last+=2.2')
    tl.to('.frame3.title-container div', { duration: 1, opacity: 0 }, 'last+=2.5')
    tl.to('.frame3.title-container', { duration: 1, y: 100, ease: Power2.easeIn }, 'last+=2.5')
    tl.to('.hero-image', { duration: 1, y: 0, ease: Power2.easeInOut }, 'last+=2.5')
    tl.from('.shadowBlock', { duration: 1, opacity: 0 }, 'last+=2.5')

    tl.add(logoMarkAnimation(), 'last+=3')
    tl.from('.frame3.logo', { duration: 0.4, scale: 0 }, '>')
}

/**
 * ANIMATION WITH NO OTRO MESSAGE
 * @param {object} tl - timeline
 * @param {boolean} disclaimer - Has disclaimer
 * @returns a gsap timeline with the final animation
 */
function animationNoOutroMessage (tl, disclaimer) {
    tl.add('last', 0)
    tl.to('.frame1.whiteblock1', { duration: 1, y: 0, ease: Power2.easeIn }, 'last')
    tl.to('.frame1.whiteblock2', { duration: 0.6, backgroundColor: '#ffffff' }, 'last')
    tl.to('#carrousel', { duration: 1.5, y: 0, ease: Power2.easeInOut }, 'last+=0')
    tl.to('.hero-image', { duration: 1.5, y: 0, ease: Power2.easeInOut }, 'last+=0')
    tl.from('.shadowBlock', { duration: 1, opacity: 0 }, 'last+=1.5')

    tl.add(logoMarkAnimation(), 'last+=1.5')
    tl.from('.frame3.logo', { duration: 0.4, scale: 0 }, '>')
}

export { endTimeline }