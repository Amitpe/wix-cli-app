import {shippingRates} from '@wix/ecom/service-plugins';

shippingRates.provideHandlers({
    getShippingRates: async ({request, metadata}) => {
        console.log('Hello from getShippingRates')

        const cost: shippingRates.ShippingPrice = {price: '10', currency: 'USD'}
        const shippingOption: shippingRates.ShippingOption = {
            code: 'shippingCode',
            title: 'My custom shipping option',
            cost: cost
        }
        const shippingRates: shippingRates.ShippingOption[] = [shippingOption];
        const shippingRatesResponse: shippingRates.GetShippingRatesResponse = {shippingRates};

        return shippingRatesResponse;
    },
});
