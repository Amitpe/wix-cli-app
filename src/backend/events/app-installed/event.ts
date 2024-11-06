import {appInstances} from "@wix/app-management";
import {collections} from "@wix/data";
import { auth } from "@wix/essentials";
import {SPECIAL_ORDERS_COLLECTION_ID} from "../../common/constants";


appInstances.onAppInstanceInstalled(async (event) => {
    console.log('Hello from App Instance Installed Event');
    await createDataCollection();
});

async function createDataCollection() {
    const collection: collections.DataCollection = {
        _id: SPECIAL_ORDERS_COLLECTION_ID,
        displayName: 'Special Orders',
        fields: [
            {
                key: 'orderId',
                type: collections.Type.TEXT
            },
            {
                key: 'shippingOptionId',
                type: collections.Type.TEXT
            },
            {
                key: 'deliveryAddress',
                type: collections.Type.TEXT
            },
            {
                key: 'shippingRate',
                type: collections.Type.TEXT
            }
        ]
    }
    try {
        await auth.elevate(collections.createDataCollection)(collection);
    } catch (error) {
        console.log('Failed to create collection')
        console.log(error)
    }
}