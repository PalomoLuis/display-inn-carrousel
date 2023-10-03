function logoMarkAnimation () {
    const tl = gsap.timeline()

    tl.to('.frame1.logo-mark', { duration: 0.4, scale:1.4 }, '0') 
    tl.to('.frame1.logo-mark', { duration: 0.4, scale: 1 }, '>')
    tl.to('.frame1.logo-mark', { duration: 0.2, scale: 1.25 }, '>')
    tl.to('.frame1.logo-mark', { duration: 0.2, scale: 0 }, '>')

    return tl
}

export { logoMarkAnimation }