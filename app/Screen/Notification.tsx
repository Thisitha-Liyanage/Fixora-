import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../(Components)/NavBar";
import NotificationService from "../Service/NotifiService";
import { useAuth } from "../Context/AuthContext";

export default function NotificationsScreen() {

    const { user } = useAuth();
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            loadNotifications();
        }
    }, [user]);

    const loadNotifications = async () => {
        try {
            if (!user) return;

            const data = await NotificationService.getNotifications(user.uid);

            setNotifications(data);

        } catch (error) {
            console.log("Notification Load Error:", error);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "WARNING":
                return "warning";
            case "ERROR":
                return "close-circle";
            case "SUCCESS":
                return "checkmark-circle";
            default:
                return "information-circle";
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case "WARNING":
                return "#F59E0B";
            case "ERROR":
                return "#DC2626";
            case "SUCCESS":
                return "#16A34A";
            default:
                return "#2563EB";
        }
    };

    return (
        <View className="flex-1 bg-slate-100">

            <View className="bg-slate-900 px-6 pt-16 pb-8 rounded-b-[30px]">
                <Text className="text-white text-3xl font-bold">
                    Notifications
                </Text>

                <Text className="text-slate-300 mt-2">
                    Recent inventory alerts
                </Text>
            </View>

            <ScrollView
                className="flex-1 px-5 mt-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 120
                }}
            >

                {
                    notifications.length === 0 ? (

                        <Text className="text-center text-slate-500 mt-10">
                            No notifications available
                        </Text>

                    ) : (

                        notifications.map((notification) => (

                            <View
                                key={notification.id}
                                className="bg-white rounded-2xl p-5 mb-4 shadow"
                            >

                                <View className="flex-row items-start">

                                    <Ionicons
                                        name={getIcon(notification.type) as any}
                                        size={32}
                                        color={getColor(notification.type)}
                                    />

                                    <View className="ml-4 flex-1">

                                        <Text className="text-lg font-bold text-slate-900">
                                            {notification.title}
                                        </Text>

                                        <Text className="text-slate-600 mt-1">
                                            {notification.message}
                                        </Text>

                                        <View className="flex-row mt-3 items-center">

                                            <Ionicons
                                                name="calendar-outline"
                                                size={16}
                                                color="#64748B"
                                            />

                                            <Text className="text-slate-500 ml-2">
                                                {
                                                    notification.createdAt?.toDate
                                                        ? notification.createdAt.toDate().toLocaleDateString()
                                                        : ""
                                                }
                                            </Text>

                                        </View>

                                    </View>

                                </View>

                            </View>

                        ))

                    )
                }

            </ScrollView>

            <Navbar />

        </View>
    );
}