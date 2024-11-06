// specialOrdersDao.ts
import { items, collections } from "@wix/data";
import { auth } from "@wix/essentials";
import {SPECIAL_ORDERS_COLLECTION_ID} from "../common/constants";

interface SpecialOrder {
    orderId: string;
    shippingOptionCode: string;
    deliveryAddress?: string;
    shippingRate?: string;
}

class SpecialOrdersDao {
    private readonly collectionId: string;

    constructor(collectionId: string = SPECIAL_ORDERS_COLLECTION_ID) {
        this.collectionId = collectionId;
    }

    async insert(specialOrder: SpecialOrder): Promise<void> {
        const item: items.InsertDataItemOptions = {
            dataCollectionId: this.collectionId,
            dataItem: {
                data: {
                    orderId: specialOrder.orderId,
                    shippingOptionCode: specialOrder.shippingOptionCode,
                    deliveryAddress: specialOrder.deliveryAddress,
                    shippingRate: specialOrder.shippingRate
                },
            },
        };
        await auth.elevate(items.insertDataItem)(item);
    }

    async createCollection(): Promise<void> {
        const collection: collections.DataCollection = {
            _id: this.collectionId,
            displayName: 'Special Orders',
            fields: [
                {
                    key: 'orderId',
                    displayName: 'Order ID',
                    type: collections.Type.TEXT
                },
                {
                    key: 'shippingOptionCode',
                    displayName: 'Shipping Option Code',
                    type: collections.Type.TEXT
                },
                {
                    key: 'deliveryAddress',
                    displayName: 'Delivery Address',
                    type: collections.Type.TEXT
                },
                {
                    key: 'shippingRate',
                    displayName: 'Shipping Rate',
                    type: collections.Type.TEXT
                }
            ]
        };

        try {
            await auth.elevate(collections.createDataCollection)(collection);
            console.log(`Collection ${this.collectionId} created successfully.`);
        } catch (error) {
            console.error('Failed to create collection:', error);
        }
    }
}

export const specialOrdersDao = new SpecialOrdersDao();
