// appEventHandlers.ts
import { appInstances } from "@wix/app-management";
import {specialOrdersDao} from "../../dao/SpecialOrdersDao";

appInstances.onAppInstanceInstalled(async () => {
    console.log('Hello from App Instance Installed Event');
    await specialOrdersDao.createCollection();
});
