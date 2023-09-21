/**
 * @param {Array} feed - Data feed.
 * @param { Object } elements - An object with all the HTML elements.
 * 
 * Description: it set the data into the HTML DOM structure.
 */

export default function dataSetter( feed, elements ) {
    console.log('Complete data: ', feed)
  
    //DEFINNING DATA
    const frame1Data = feed.filter(value => value.cta)[0]
    let frame1DataValues = Object.keys(frame1Data)
      .filter(value => value.includes('doa'))
      .map(value => frame1Data[value])
      .filter(value => value.includes('http://cdn'))
    const image1 = String(frame1DataValues[0])
    const campainClaim = frame1Data.headline
    const enlargedProduct = frame1Data.subline
    const focusedCopy = frame1Data.tagline
    const cta = frame1Data.cta
  
    const frame2Data = feed.filter(value => value.brand)
    console.log('frame 2 Data for Carrousel: ', frame2Data)
  
    //SET DATA
    elements.heroImage.style.backgroundImage = `url(${image1})`
    elements.campainClaim.innerText = campainClaim
    elements.enlargedProduct.innerText = enlargedProduct
    elements.focusedCopy.innerText = focusedCopy
    elements.cta.innerText = cta
  
  }