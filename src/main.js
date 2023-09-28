import { DOMElements } from './data/domElements.js'
import dataSetter from './data/dataSetter.js'
import initialSetup from './script/initialSetup.js'
import { animationFrame1 } from './animation/animationFrame1.js'
import { endTimelineOtro } from './animation/endTimeline_outro.js'
import { endTimelineNoOtro } from './animation/endTimeline_noOutro.js'
import { carouselAmnimation } from './animation/carouselAnimation.js'

(async function (currentScript) {
  //currentScript: is the last script where the js will run.
  
  //MAIN VARIABLES
  const timeline = gsap.timeline()
  const assetContainer = document.querySelector(".banner")
  const htmlElements = {...DOMElements()}
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
            initialSetup(htmlElements)
            timeline.add(animationFrame1())
            timeline.add(carouselAmnimation(htmlElements))
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
      const DATA = await import('./data/localData.js')
      const { GSDevTools } = await import('gsap/GSDevTools')
      const devTimeline = gsap.timeline()

      //WRITE YOUR DEV CODE HERE.
      //IF NEEDED: content should be reflect in the API production code.
      data.localData = DATA.localData()
      dataSetter(data.localData, htmlElements)
      initialSetup(htmlElements)

      //ANIMATION: this animation will be use for dev and production mode
      GSDevTools.create()
      devTimeline.add(animationFrame1())
      devTimeline.add(carouselAmnimation(htmlElements))

      // document.addEventListener("DOMContentLoaded", () => {
      // });
      
    }
  }

})(document.currentScript ||
  document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1]);