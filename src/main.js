const timeline = gsap.timeline()

window.onload = () => {
  animation(timeline)
}

function animation (tl) {
  tl.add('frame1', 1)
  tl.to('.title', { duration: 1, x: 30, y: 30, ease: Power1.easeOut }, 'frame1')
  
  return tl;
}