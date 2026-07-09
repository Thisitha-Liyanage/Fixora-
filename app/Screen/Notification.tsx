import React from "react";
import {
    View,
    Text,
    ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../(Components)/NavBar";


export default function NotificationsScreen() {


    const notifications = [
        {
            id: "1",
            item: "Printer Paper",
            quantity: 4,
            message: "Stock is running low",
            date: "2026-07-09",
            time: "10:30 AM",
            type: "warning"
        },
        {
            id: "2",
            item: "Wireless Keyboard",
            quantity: 25,
            message: "New items added successfully",
            date: "2026-07-08",
            time: "03:15 PM",
            type: "success"
        },
        {
            id: "3",
            item: "USB Cable",
            quantity: 0,
            message: "Item is out of stock",
            date: "2026-07-07",
            time: "09:45 AM",
            type: "danger"
        },
        {
            id: "4",
            item: "Mouse",
            quantity: 12,
            message: "Inventory updated",
            date: "2026-07-06",
            time: "06:20 PM",
            type: "info"
        }
    ];



    const getIcon = (type: string) => {

        if (type === "warning")
            return "warning";

        if (type === "danger")
            return "close-circle";

        if (type === "success")
            return "checkmark-circle";


        return "information-circle";
    }



    const getColor = (type: string) => {

        if (type === "warning")
            return "#F59E0B";

        if (type === "danger")
            return "#DC2626";

        if (type === "success")
            return "#16A34A";


        return "#2563EB";
    }



    return (

        <View className="flex-1 bg-slate-100">


            {/* Header */}

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
                                        {notification.item}
                                    </Text>



                                    <Text className="text-slate-600 mt-1">
                                        {notification.message}
                                    </Text>



                                    <Text className="text-slate-500 mt-2">
                                        Quantity: {notification.quantity}
                                    </Text>



                                    <View className="flex-row mt-3">


                                        <View className="flex-row items-center mr-5">

                                            <Ionicons
                                                name="calendar-outline"
                                                size={16}
                                                color="#64748B"
                                            />

                                            <Text className="text-slate-500 ml-1">
                                                {notification.date}
                                            </Text>

                                        </View>




                                        <View className="flex-row items-center">


                                            <Ionicons
                                                name="time-outline"
                                                size={16}
                                                color="#64748B"
                                            />


                                            <Text className="text-slate-500 ml-1">
                                                {notification.time}
                                            </Text>


                                        </View>


                                    </View>



                                </View>



                            </View>



                        </View>


                    ))
                }



            </ScrollView>




            {/* Bottom Navbar */}

            <Navbar />


        </View>

    );
}