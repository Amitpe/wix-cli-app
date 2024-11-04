import {appInstances} from "@wix/app-management";
import {collections} from "@wix/data";

appInstances.onAppInstanceInstalled(async (event) => {
    console.log('App Instance Installed Event');
    await createDataCollection();
});

async function createDataCollection() {
    const collection: collections.DataCollection = {
        _id: 'custom-delivery-orders',
        displayName: 'Custom Delivery Orders',
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
        await collections.createDataCollection(collection);
    } catch (error) {
        console.log('Failed to create collection')
        console.log(error)
    }
}