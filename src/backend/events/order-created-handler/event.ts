import { orders } from "@wix/ecom";

orders.onOrderCreated((event) => {
    console.log('Hello from order created: ', event)
});