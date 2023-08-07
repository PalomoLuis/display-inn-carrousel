console.log(gsap)
const tl = gsap.timeline()

window.onload = () => {
  gsap.to('.title', { duration: 1, x: 30, y: 30, ease: Power1.easeOut })
}