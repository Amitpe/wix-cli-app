// specialOrdersDao.ts
import { items } from "@wix/data";
import { auth } from "@wix/essentials";
import {SPECIAL_ORDERS_COLLECTION_ID} from "../common/constants";

interface SpecialOrderData {
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

    async insert(data: SpecialOrderData): Promise<void> {
        const item: items.InsertDataItemOptions = {
            dataCollectionId: this.collectionId,
            dataItem: {
                data: {
                    orderId: data.orderId,
                    shippingOptionId: data.shippingOptionCode,
                    deliveryAddress: data.deliveryAddress,
                    shippingRate: data.shippingRate
                },
            },
        };

        // Elevate permissions
        await auth.elevate(items.insertDataItem)(item);
    }
}

export const specialOrdersDao = new SpecialOrdersDao();
