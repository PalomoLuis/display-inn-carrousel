export default function setupFeedImages(feed, skuCuration) {
    feed.forEach(function (item) {
        switch (skuCuration) {
            case "PDP":
                if (item.image_link_pdp) {
                    item.image_link = item.image_link_pdp;
                }
                break;
            case "ePDPS":
                if (item.image_link_epdp) {
                    item.image_link = item.image_link_epdp;
                } else if (item.image_link_pdp) {
                    item.image_link = item.image_link_pdp;
                }
                break;
            case "Mix":
                const randomNum = Math.random();
                const imageLinkPDP = item.image_link_pdp;
                const imageLinkEPDP = item.image_link_epdp;
                if (imageLinkPDP || imageLinkEPDP) {
                    item.image_link = randomNum >= 0.5 ? (imageLinkEPDP || imageLinkPDP) : (imageLinkPDP || imageLinkEPDP);
                }
                break;
        }
    }
  );

  if (feed.length) {
    let feedIndex = 0;
    while (feed.length < 4 || feedIndex > 10) {
        const clonedFeedItem = JSON.parse(JSON.stringify(feed[feedIndex]))
        feed.push(clonedFeedItem);
        feedIndex++;
    }
  }
}