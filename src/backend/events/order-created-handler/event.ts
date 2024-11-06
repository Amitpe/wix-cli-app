import {orders} from "@wix/ecom";
import {items} from "@wix/data";
import {auth} from "@wix/essentials";
import {MY_CLI_APP_ID, SPECIAL_ORDERS_COLLECTION_ID, SPECIAL_SHIPPING_CODE} from "../../common/constants";

// Check if the order contain my special shipping option
// If yes, insert an entry to the special order collection
orders.onOrderCreated(async (event) => {
    console.log('Hello from Order Created Event')

    const selectedShippingOptionCode = event.entity.shippingInfo?.code
    const carrierId = event.entity.shippingInfo?.carrierId

    if (carrierId === MY_CLI_APP_ID && selectedShippingOptionCode === SPECIAL_SHIPPING_CODE) {
        console.log('Found special shipping option on the order')
        const item: items.InsertDataItemOptions = {
            dataCollectionId: SPECIAL_ORDERS_COLLECTION_ID,
            dataItem: {
                data: {
                    orderId: event.entity._id,
                    shippingOptionId: 'special-orders',
                    deliveryAddress: event.entity.shippingInfo?.logistics?.shippingDestination?.address,
                    shippingRate: event.entity.shippingInfo?.cost?.price?.amount
                },
            }
        }
        await auth.elevate(items.insertDataItem)(item)
    }
});