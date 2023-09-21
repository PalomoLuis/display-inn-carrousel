function carrouselAmnimation () {
    let tl = gsap.timeline()

    //End timeline
    tl.add('carousel', 0)

    return tl;
}

export { carrouselAmnimation }