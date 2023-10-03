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
    const logoZalandoBlack = 'https://cdn.revjet.com/s3/csp/1679927261226/Logo-Wordmark-noShadow.svg'
    const arrowImage = 'https://cdn.revjet.com/s3/csp/1662732236308/arrow_grey.svg'

    //Carousel Data
    const carouselData = feed.filter(value => value.brand).slice(0, 4);
    const additionFeed = JSON.parse(JSON.stringify(feed)).filter(el => el["original_price_label"])[0];

    if (additionFeed && additionFeed.sku_curation) setupFeedImages(carouselData, additionFeed.sku_curation)
    currencySetter(carouselData, additionFeed)

    console.log('Carrousel data: ', carouselData)

    //Frame3 Data
    const additionalFunctional = frame1Data.subtitle || null
    const messagingLayer = frame1Data.message || null
    const disclaimer = frame1Data.disclaimer || '*Disclaimer, Legal claim for specific markets'
  
    //SETTING DATA
    elements.heroImage.style.backgroundImage = `url(${image1})`
    elements.campainClaim.innerText = campainClaim
    elements.enlargedProduct.innerText = enlargedProduct
    elements.focusedCopy.innerText = focusedCopy
    elements.cta.innerText = cta
    elements.ctaArrow.src = arrowImage
    elements.logo.src = logoZalandoBlack

    //Carousel Data setter
    let num = 0
    elements.productImages.forEach((element, i) => {
      if(num > 3) num = 0 
      element.src = `${carouselData[num].image_link}`
      num++
    });
    elements.infoCards.forEach((element, i) => {
      if(num > 3) num = 0 
      elements.infoCardsBrands[i].innerHTML = `${carouselData[num].brand}`
      elements.infoCardsTitles[i].innerHTML = `${carouselData[num].title}`
      elements.infoCardsPrices[i].innerHTML = `${carouselData[num].sale_price}`
      elements.infoCardsVatLabel[i].innerHTML += `${carouselData[num].vat_label}`
      // elements.additionalText[i].innerHTML = 'Preț inițial:'
      // elements.originalPrice[i].innerHTML = '59,95 lei'
      // elements.discountText[i].innerHTML = '-10%'
      num++
    });

    //Frame3 Data Setter
    if(additionalFunctional) elements.additionalFunctional.innerHTML = additionalFunctional
    if(messagingLayer) elements.messagingLayer.innerHTML = messagingLayer //'Additional Functional Messaging Layer'
    if(disclaimer) elements.disclaimer.innerHTML = disclaimer
  }