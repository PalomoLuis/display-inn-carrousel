(function (currentScript) {
  //currentScript: is the last script where the js will run.
  if (window.revjet && window.revjet.elements_api) {
    const timeline = gsap.timeline()
    const assetContainer = document.querySelector(".banner");
    const heroImage = document.querySelector('.hero-image');
    const data = {}

    //BEFORE PERSONALIZATION
    window.revjet.elements_api.listen('before_personalization', function () {
      revjet.elements_api.updateDataFeed(currentScript, function (dataFeed) {
        const feed = JSON.parse(JSON.stringify(dataFeed))
        const newFeed = feed.filter(el => el["brand"])
        data.heroImage = feed.filter(el => el["featured_image_link"])[0].doa13554
        data.title = newFeed.filter(el => el["title"])
        data.subtitle = newFeed.filter(el => el["subtitle"])
        data.subline = newFeed.filter(el => el["subline"])
        data.message = newFeed.filter(el => el["message"])
        console.log('complete Feed: ', feed)
        console.log('Feed: ', newFeed)
        console.log('Data: ', data)

        heroImage.style.backgroundImage = `url('${data.heroImage}')`;
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
  }

})(document.currentScript ||
  document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1]);

//ANIMATION
function animation (tl) {
  tl.add('frame1', 1)
  tl.from('.hero-image', { duration: 1, y: -300, ease: Power2.easeOut }, 'frame1')
  
  return tl;
}