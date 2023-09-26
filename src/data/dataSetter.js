import setupFeedImages from "./setupFeedImages"
import currencySetter from "./currency"

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

    //Carousel Data
    const carouselData = feed.filter(value => value.brand).slice(0, 4);
    const additionFeed = JSON.parse(JSON.stringify(feed)).filter(el => el["original_price_label"])[0];

    if (additionFeed && additionFeed.sku_curation) setupFeedImages(carouselData, additionFeed.sku_curation)
    currencySetter(carouselData, additionFeed)

    console.log('Carrousel data: ', carouselData)
  
    //SETTING DATA
    elements.heroImage.style.backgroundImage = `url(${image1})`
    elements.campainClaim.innerText = campainClaim
    elements.enlargedProduct.innerText = enlargedProduct
    elements.focusedCopy.innerText = focusedCopy
    elements.cta.innerText = cta

    //Carousel Data setter
    let num = 0
    elements.productImages.forEach((element, i) => {
      if(num > 3) num = 0 
      element.src = `${carouselData[num].image_link}`
      num++
    });
  
  }