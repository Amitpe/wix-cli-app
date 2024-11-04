import {shippingRates} from '@wix/ecom/service-plugins';

shippingRates.provideHandlers({
    getShippingRates: async ({request, metadata}) => {

        console.log('Hello from getShippingRates. Request is: ', request)

        const cost: shippingRates.ShippingPrice = {price: '5', currency: 'USD'}
        const shippingOption: shippingRates.ShippingOption = {
            code: 'customShippingCode',
            title: 'My shipping option',
            cost: cost
        }
        const shippingRates: shippingRates.ShippingOption[] = [shippingOption];
        const shippingRatesResponse: shippingRates.GetShippingRatesResponse = {shippingRates};
        return shippingRatesResponse
    },
});
