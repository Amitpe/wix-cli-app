// orderHandler.ts
import {orders} from "@wix/ecom";
import {MY_CLI_APP_ID, SPECIAL_SHIPPING_CODE} from "../../common/constants";
import {specialOrdersDao} from "../../dao/SpecialOrdersDao";

// Event handler to check if an order contains the special shipping option
orders.onOrderCreated(async (event) => {
    console.log('Hello from Order Created Event');

    const shippingCarrierId = event.entity.shippingInfo?.carrierId;
    const selectedShippingOptionCode = event.entity.shippingInfo?.code;

    if (shippingCarrierId === MY_CLI_APP_ID && selectedShippingOptionCode === SPECIAL_SHIPPING_CODE) {
        console.log('Found special shipping option on the order');

        await specialOrdersDao.insert({
            orderId: event.entity._id!,
            shippingOptionCode: SPECIAL_SHIPPING_CODE,
            deliveryAddress: JSON.stringify(event.entity.shippingInfo?.logistics?.shippingDestination?.address),
            shippingRate: event.entity.shippingInfo?.cost?.price?.amount
        });
    }
});
