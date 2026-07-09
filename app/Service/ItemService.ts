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


export interface Item {
    id?: string;
    itemId: string;
    name: string;
    quantity: number;
    expiry: string;
}


class ItemService {

    private collectionName = "items";


    async addItem(item: Item) {

        try {

            const itemRef = collection(db, this.collectionName);

            const result = await addDoc(itemRef, {
                itemId: item.itemId,
                name: item.name,
                quantity: item.quantity,
                expiry: item.expiry,
                createdAt: new Date()
            });

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


    async getAllItems() {

        try {

            const itemRef = collection(db, this.collectionName);

            const snapshot = await getDocs(itemRef);

            return snapshot.docs.map(
                (doc) => ({
                    id: doc.id,
                    ...doc.data()
                } as Item)
            );

        } catch (error) {

            console.log("Get Items Error:", error);

            return [];

        }

    }


    async getItemById(id: string) {

        try {

            const itemRef = doc(db, this.collectionName, id);

            const snapshot = await getDoc(itemRef);

            if (snapshot.exists()) {

                return {
                    id: snapshot.id,
                    ...snapshot.data()
                } as Item;

            }

            return null;

        } catch (error) {

            console.log("Get Item Error:", error);

            return null;

        }

    }


    async getItemByName(name: string) {

        try {

            const itemRef = collection(db, this.collectionName);

            const q = query(
                itemRef,
                where("name", "==", name)
            );

            const snapshot = await getDocs(q);

            return snapshot.docs.map(
                (doc) => ({
                    id: doc.id,
                    ...doc.data()
                } as Item)
            );

        } catch (error) {

            console.log("Search Item Error:", error);

            return [];

        }

    }


    async updateItem(id: string, item: Item) {

        try {

            const itemRef = doc(
                db,
                this.collectionName,
                id
            );

            await updateDoc(itemRef, {
                itemId: item.itemId,
                name: item.name,
                quantity: item.quantity,
                expiry: item.expiry
            });

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


    async deleteItem(id: string) {

        try {

            const itemRef = doc(
                db,
                this.collectionName,
                id
            );

            await deleteDoc(itemRef);

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

}


export default new ItemService();