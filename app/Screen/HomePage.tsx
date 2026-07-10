import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../(Components)/NavBar";
import ItemService, { Item } from "../Service/ItemService";
import { useAuth } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { router } from "expo-router";

export default function HomeScreen() {
    const { user } = useAuth();
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        loadItems();
    }, [user]);

    const loadItems = async () => {
        if (!user) return;
        const data = await ItemService.getAllItems(user.uid);
        setItems(data);
    };

    const totalItems = items.length;

    const lowStock = items.filter(
        item => item.quantity < 20 && item.quantity > 0
    ).length;

    const outOfStock = items.filter(
        item => item.quantity <= 0
    ).length;

    const recentlyUpdated = [...items].reverse().slice(0, 5);

    const logout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    onPress: async () => {
                        await signOut(auth);
                        router.replace("/Screen/login");
                    }
                }
            ]
        );
    };

    return (
        <View className="flex-1 bg-slate-100">

            <View className="bg-slate-900 px-6 pt-16 pb-8 rounded-b-[30px]">

                <View className="flex-row justify-between items-center">

                    <View>
                        <Text className="text-white text-3xl font-bold">
                            Invento
                        </Text>

                        <Text className="text-slate-300 mt-2">
                            Welcome {user?.email}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={logout}
                        className="bg-red-600 p-3 rounded-xl"
                    >
                        <Ionicons
                            name="log-out-outline"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>

                </View>

            </View>

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom:140
                }}
            >

                <View className="flex-row justify-between mt-6">

                    <View className="bg-white rounded-2xl p-5 w-[48%] shadow">

                        <Ionicons
                            name="cube"
                            size={32}
                            color="#0F172A"
                        />

                        <Text className="text-slate-500 mt-4">
                            Total Items
                        </Text>

                        <Text className="text-3xl font-bold text-slate-900 mt-1">
                            {totalItems}
                        </Text>

                    </View>

                    <View className="bg-white rounded-2xl p-5 w-[48%] shadow">

                        <Ionicons
                            name="warning"
                            size={32}
                            color="#DC2626"
                        />

                        <Text className="text-slate-500 mt-4">
                            Low Stock
                        </Text>

                        <Text className="text-3xl font-bold text-red-600 mt-1">
                            {lowStock}
                        </Text>

                    </View>

                </View>

                <Text className="text-xl font-bold text-slate-900 mt-8 mb-4">
                    Inventory Overview
                </Text>

                <View className="bg-white rounded-2xl p-5 shadow">

                    <View className="flex-row justify-between py-3 border-b border-slate-200">

                        <Text className="text-slate-600">
                            Out of Stock
                        </Text>

                        <Text className="font-bold text-red-600">
                            {outOfStock}
                        </Text>

                    </View>

                    <View className="flex-row justify-between py-3">

                        <Text className="text-slate-600">
                            Recently Updated
                        </Text>

                        <Text className="font-bold text-green-600">
                            {recentlyUpdated.length}
                        </Text>

                    </View>

                </View>

                <Text className="text-xl font-bold text-slate-900 mt-8 mb-4">
                    Recently Updated
                </Text>

                {
                    recentlyUpdated.length === 0 ? (

                        <Text className="text-slate-500">
                            No items available
                        </Text>

                    ) : (

                        recentlyUpdated.map(item => (

                            <View
                                key={item.id}
                                className="bg-white rounded-2xl p-5 mb-4 shadow"
                            >

                                <View className="flex-row justify-between">

                                    <View>

                                        <Text className="text-lg font-bold text-slate-900">
                                            {item.name}
                                        </Text>

                                        <Text className="text-slate-500 mt-1">
                                            ID: {item.itemId}
                                        </Text>

                                    </View>

                                    <Text className="font-bold text-slate-900">
                                        Qty: {item.quantity}
                                    </Text>

                                </View>

                                <Text className="text-slate-500 mt-2">
                                    Expiry: {item.expiry}
                                </Text>

                            </View>

                        ))

                    )
                }

                <Text className="text-xl font-bold text-slate-900 mt-8 mb-4">
                    Low Stock Alerts
                </Text>

                {
                    items.filter(item => item.quantity < 20).length === 0 ? (

                        <Text className="text-slate-500">
                            No low stock items
                        </Text>

                    ) : (

                        items.filter(item => item.quantity < 20).map(item => (

                            <View
                                key={item.id}
                                className="bg-white rounded-2xl p-5 mb-4 shadow"
                            >

                                <View className="flex-row items-center">

                                    <Ionicons
                                        name="alert-circle"
                                        size={28}
                                        color="#F59E0B"
                                    />

                                    <View className="ml-3">

                                        <Text className="font-bold text-slate-900">
                                            {item.name}
                                        </Text>

                                        <Text className="text-slate-500">
                                            Only {item.quantity} remaining
                                        </Text>

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