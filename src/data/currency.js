export default function currencySetter (feed, additionFeed) {
    const currencyMap = [
        {
            "currency_text": "EUR",
            "currency_symbol": "€",
        },
        {
            "currency_text": "CZK",
            "currency_symbol": "Kč",
        },
    ]
    function formatPrice(priceWithCurrency, priceFormatMap) {

        const price = Number(priceWithCurrency.split(" ")[0]);
        const currency = priceWithCurrency.split(" ")[1] || "";
        const currencyObect = currencyMap.find(el => el.currency_text === currency) || "";
        const currenySymbol = currencyObect ? currencyObect.currency_symbol : currency;

        const priceFormatObjet = {
            "price_units": "",
            "price_cents": "",
            "price_currency": currenySymbol,
        };
        if (price % 1 === 0) {
            priceFormatObjet.price_units = price;
            priceFormatObjet.price_cents = "00";
        } else {
            const priceArray = String(price).split('.');
            const priceUnits = priceArray[0];
            const priceCents = priceArray[1].length === 1 ? priceArray[1] + "0 " : priceArray[1];

            priceFormatObjet.price_units = priceUnits;
            priceFormatObjet.price_cents = priceCents;
        }
        const { price_units, price_cents, price_currency } = priceFormatObjet;
        let priceFormated;

        if (!priceFormatMap) {
            priceFormated = `${price_currency} ${price_units},${price_cents}`
        } else {
            priceFormated = priceFormatMap.replace("%units", price_units).replace("%cents", price_cents).replace("%currency", price_currency);
        }

        return [
            priceFormated,
            price_units + "." + price_cents
        ]
    }
    function isDiscountActive(price, sale_price) {
        const priceNumber = Number(price.split(" ")[0]);
        const salePriceNumber = Number(sale_price.split(" ")[0]);
        return salePriceNumber > 0 && salePriceNumber < priceNumber;
    }

    feed.map(function (item) {
        const price = item.price ? item.price : item.sale_price;
        const sale_price = item.sale_price ? item.sale_price : item.price;
        if (additionFeed) {
            item.vat_label = additionFeed.vat_label;
            item.price_format = additionFeed.price_format || "";
            item.original_price_label = additionFeed.original_price_label;
            item.market = additionFeed.market;
        }
        const [salePriceFormated, salePriceForCompare] = formatPrice(sale_price, item.price_format);
        const [priceFormated, priceForCompare] = formatPrice(price, item.price_format);

        item.sale_price = salePriceFormated;
        item.price = priceFormated;
        item.is_discount_active = isDiscountActive(priceForCompare, salePriceForCompare);
        return item;
    })
}