import {shippingRates} from '@wix/ecom/service-plugins';
import {SPECIAL_SHIPPING_CODE} from "../../../common/constants";

shippingRates.provideHandlers({
    getShippingRates: async ({request, metadata}) => {
        console.log('Hello from getShippingRates. Request is: ', request)

        const cost: shippingRates.ShippingPrice = {price: '5', currency: 'USD'}
        const shippingOption: shippingRates.ShippingOption = {
            code: SPECIAL_SHIPPING_CODE,
            title: 'Special Shipping Option',
            cost: cost
        }
        const shippingRates: shippingRates.ShippingOption[] = [shippingOption];
        const shippingRatesResponse: shippingRates.GetShippingRatesResponse = {shippingRates};
        return shippingRatesResponse
    },
});
