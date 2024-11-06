import {orders} from "@wix/ecom";
import {items} from "@wix/data";
import { auth } from "@wix/essentials";


// TODO refactor to Consts.ts
const MY_CLI_APP_ID = 'aa3a54aa-4433-433a-94e8-7a34053dd1c7';

orders.onOrderCreated(async (event) => {
    // Check if the order contain my special shipping option
    // If yes, add it to the special order collection

    console.log('Hello from Order Created Event')
    console.log('Event is:\n ', event)


    const selectedShippingOptionCode = event.entity.shippingInfo?.code
    const carrierId = event.entity.shippingInfo?.carrierId

    if (carrierId === MY_CLI_APP_ID && selectedShippingOptionCode === 'customShippingCode') {
        console.log('Item is:\n ', event)
        const item: items.InsertDataItemOptions = {
            dataCollectionId: 'special-orders',
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