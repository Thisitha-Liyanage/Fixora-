import {
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
    where
} from "firebase/firestore";

import { db } from "../../Firebase/Firebase";

export interface Notification {
    id?: string;
    userId: string;
    title: string;
    message: string;
    type: "SUCCESS" | "WARNING" | "ERROR" | "INFO";
    createdAt?: Date;
    isRead: boolean;
}

class NotificationService {

    private collectionName = "notifications";

    async addNotification(
        userId: string,
        title: string,
        message: string,
        type: "SUCCESS" | "WARNING" | "ERROR" | "INFO"
    ) {

        try {

            await addDoc(collection(db, this.collectionName), {
                userId,
                title,
                message,
                type,
                isRead: false,
                createdAt: new Date()
            });

            return true;

        } catch (error) {

            console.log("Notification Add Error:", error);
            return false;

        }

    }

    async getNotifications(userId: string) {

        try {

            const q = query(
                collection(db, this.collectionName),
                where("userId", "==", userId)
            );

            const snapshot = await getDocs(q);

            const notifications = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return notifications.sort((a: any, b: any) =>
                b.createdAt.seconds - a.createdAt.seconds
            );

        } catch (error) {

            console.log("Notification Get Error:", error);
            return [];

        }

    }

}

export default new NotificationService();