function endTimelineNoOtro () {
    let tl = gsap.timeline()

    //End timeline
    tl.add('last', 0)

    return tl;
}

export { endTimelineNoOtro }