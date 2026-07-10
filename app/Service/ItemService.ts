import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

import { db } from "../../Firebase/Firebase";
import NotificationService from "./NotifiService";

export interface Item {
    id?: string;
    userId?: string;
    itemId:string;
    name:string;
    quantity:number;
    expiry:string;
}

class ItemService {
    private collectionName = "items";

    async addItem(item: Item, userId: string) {
        try {
            const result = await addDoc(collection(db, this.collectionName), {
                userId,
                itemId: item.itemId,
                name: item.name,
                quantity: item.quantity,
                expiry: item.expiry,
                createdAt: new Date()
            });

            await NotificationService.addNotification(
                userId,
                "Item Added",
                `${item.name} was added successfully.`,
                "SUCCESS"
            );

            await this.checkStockNotification(item, userId);

            return {
                success: true,
                id: result.id
            };

        } catch (error) {
            console.log("Add Item Error:", error);
            return {
                success: false,
                error
            };
        }
    }

    async getAllItems(userId: string) {
        try {
            const q = query(
                collection(db, this.collectionName),
                where("userId", "==", userId)
            );

            const snapshot = await getDocs(q);

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Item));

        } catch (error) {
            console.log("Get Items Error:", error);
            return [];
        }
    }

    async getItemById(id: string, userId: string) {
        try {
            const snapshot = await getDoc(
                doc(db, this.collectionName, id)
            );

            if (snapshot.exists()) {
                const data = snapshot.data();

                if (data.userId !== userId) {
                    return null;
                }

                return {
                    id: snapshot.id,
                    ...data
                } as Item;
            }

            return null;

        } catch (error) {
            console.log("Get Item Error:", error);
            return null;
        }
    }

    async updateItem(id: string, item: Item, userId: string) {
        try {
            const itemRef = doc(
                db,
                this.collectionName,
                id
            );

            const existing = await getDoc(itemRef);

            if (!existing.exists() || existing.data().userId !== userId) {
                return {
                    success: false
                };
            }

            await updateDoc(itemRef, {
                itemId: item.itemId,
                name: item.name,
                quantity: item.quantity,
                expiry: item.expiry
            });

            await NotificationService.addNotification(
                userId,
                "Item Updated",
                `${item.name} was updated successfully.`,
                "SUCCESS"
            );

            await this.checkStockNotification(item, userId);

            return {
                success: true
            };

        } catch (error) {
            console.log("Update Item Error:", error);

            return {
                success: false,
                error
            };
        }
    }

    async deleteItem(id: string, userId: string) {
        try {
            const itemRef = doc(
                db,
                this.collectionName,
                id
            );

            const snapshot = await getDoc(itemRef);

            if (!snapshot.exists() || snapshot.data().userId !== userId) {
                return {
                    success: false
                };
            }

            const itemName = snapshot.data().name;

            await deleteDoc(itemRef);

            await NotificationService.addNotification(
                userId,
                "Item Deleted",
                `${itemName} was deleted successfully.`,
                "ERROR"
            );

            return {
                success: true
            };

        } catch (error) {
            console.log("Delete Item Error:", error);

            return {
                success: false,
                error
            };
        }
    }

    private async checkStockNotification(item: Item, userId: string) {

        if (item.quantity <= 0) {

            await NotificationService.addNotification(
                userId,
                "Out of Stock",
                `${item.name} is out of stock.`,
                "ERROR"
            );

        } else if (item.quantity < 20) {

            await NotificationService.addNotification(
                userId,
                "Low Stock",
                `${item.name} has only ${item.quantity} items remaining.`,
                "WARNING"
            );
        }
    }
}

export default new ItemService();