import { shippingRates } from '@wix/ecom/service-plugins';

shippingRates.provideHandlers({
  getShippingRates: async ({ request, metadata }) => {
    return {
      shippingRates: [],
    };
  },
});
