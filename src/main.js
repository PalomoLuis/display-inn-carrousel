(function (currentScript) {
  //currentScript: is the last script where the js will run.
  
  //MAIN VARIABLES
  const timeline = gsap.timeline()
  const assetContainer = document.querySelector(".banner");
  const htmlElements = {
    heroImage: document.querySelector('.hero-image'),
    campainClaim: document.querySelector('.campainClaim'),
    enlargedProduct: document.querySelector('.enlargedProduct'),
    focusedCopy: document.querySelector('.focusedCopy'),
    cta: document.querySelector('.cta')
  }
  const data = {}

  ///////////////// PRODUCTION MODE ///////////////////
  if (window.revjet && window.revjet.elements_api) {

    //BEFORE PERSONALIZATION
    window.revjet.elements_api.listen('before_personalization', function () {
      revjet.elements_api.updateDataFeed(currentScript, function (dataFeed) {
        const feed = JSON.parse(JSON.stringify(dataFeed)) //Complete Feed
        const newFeed = feed.filter(el => el["brand"])
        console.log('complete Feed: ', feed)
        console.log('Feed: ', newFeed)
        console.log('Data: ', data)
        data.completeFeed = feed

        dataSetter(data.completeFeed, htmlElements)
        return newFeed;
      })
    }, undefined, currentScript);

    //BEFORE SHOW
    window.revjet.elements_api.listen('before_show', function () {
      const observer = new window.IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          setTimeout(() => {
            animation(timeline);
          }, 1000);
          return
        }
      }, {
        root: null,
        threshold: 0.1, // set offset 0.1 means trigger if atleast 10% of element in viewport
      });
      observer.observe(assetContainer);

    }, undefined, currentScript)

    //SHOW
    window.revjet.elements_api.listen('show', function () {
    }, undefined, currentScript);

    //MAIN EXIT
    assetContainer.addEventListener('click', function (event) {
      revjet.elements_api.goToLP(event);
    }, false);

  } else {
    document.querySelector('.banner').style.visibility = 'visible';
    
    ///////////////// DEV MODE ///////////////////
    if(window.configurationServerMode === 'development') {
      console.log('DEVELOPMENT MODE')

      //WRITE YOUR DEV CODE HERE.
      //IF NEEDED: content should be reflect in the API production code.
      // heroImage.style.backgroundImage = `url(src/img/hero_image.jpeg)`;
      data.localData = window.localData;
      dataSetter(data.localData, htmlElements)

      document.addEventListener("DOMContentLoaded", () => {
        //ANIMATION: this animation will be use for dev and production mode
        GSDevTools.create();
        animation(timeline);
      });
      
    }
  }

})(document.currentScript ||
  document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1]);


///////////////// DATA SETTER /////////////////
function dataSetter( feed, elements ) {
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


///////////////// ANIMATION /////////////////
function animation (tl) {
  tl.add('frame1', 1)
  tl.to('.content', { duration: 0.1, opacity: 1 }, 'frame1')
  tl.to('.frame1.logo-mark', { duration: 0.4, scale:1.4 }, 'frame1+=0.3') 
  tl.to('.frame1.logo-mark', { duration: 0.4, scale: 1 }, '>')
  tl.to('.frame1.logo-mark', { duration: 0.2, scale: 1.25 }, '>')
  tl.to('.frame1.logo-mark', { duration: 0.2, scale: 0 }, '>')

  tl.from('.frame1.whiteblock2', { duration: 0.5, y: '100%', ease: Power1.easeOut }, 'frame1+=1.6')
  tl.to('.frame1.whiteblock1', { duration: 1, y: -78, ease: Power1.easeInOut }, 'frame1+=1.8')
  tl.to('.frame1.title-container', { duration: 1, y: -65, ease: Power1.easeInOut }, '<')
  tl.to('.frame1.whiteblock1', { duration: 1.2, y: -116, ease: Power1.easeInOut }, 'frame1+=2.8')
  tl.to('.frame1.title-container', { duration: 1.2, y: -107, ease: Power1.easeInOut }, '<')
  tl.from(['.frame1 .enlargedProduct', '.frame1 .focusedCopy'], { duration: 0.5, opacity:0 }, '<')
  tl.to('.hero-image', { duration: 1, y: -10, ease: Power2.easeOut }, 'frame1+=3.5')
  tl.to('.hero-image', { duration: 1, y: -250, ease: Power2.easeInOut }, 'frame1+=4.5')
  tl.to('.frame1.whiteblock1', { duration: 1, y: -260, height: 260, ease: Power1.easeOut }, 'frame1+=4.5')
  tl.to('.frame1.title-container', { duration: 1.2, y: -280, opacity: 0, ease: Power1.easeOut }, 'frame1+=4.8')

  //carrousel timeline
  tl.add('frame2', 'frame1+=5')
  tl.to('#carrousel', { duration: 1.5, y: -285, ease: Power2.easeOut }, 'frame2')

  //End timeline


  
  return tl;
}