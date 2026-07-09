import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../(Components)/NavBar";

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-slate-100">

            {/* Header */}
            <View className="bg-slate-900 px-6 pt-16 pb-8 rounded-b-[30px]">

                <Text className="text-white text-3xl font-bold">
                    Invento
                </Text>

                <Text className="text-slate-300 mt-2 text-base">
                    Welcome back 👋
                </Text>

            </View>


            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 140
                }}
            >

                {/* Summary Cards */}
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
                            245
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
                            12
                        </Text>

                    </View>

                </View>


                {/* Statistics */}

                <Text className="text-xl font-bold text-slate-900 mt-8 mb-4">
                    Inventory Overview
                </Text>


                <View className="bg-white rounded-2xl p-5 shadow">


                    <View className="flex-row justify-between py-3 border-b border-slate-200">

                        <Text className="text-slate-600">
                            Categories
                        </Text>

                        <Text className="font-bold text-slate-900">
                            8
                        </Text>

                    </View>



                    <View className="flex-row justify-between py-3 border-b border-slate-200">

                        <Text className="text-slate-600">
                            Out of Stock
                        </Text>

                        <Text className="font-bold text-red-600">
                            3
                        </Text>

                    </View>



                    <View className="flex-row justify-between py-3">

                        <Text className="text-slate-600">
                            Recently Added
                        </Text>

                        <Text className="font-bold text-green-600">
                            15
                        </Text>

                    </View>


                </View>



                {/* Low Stock Alerts */}

                <Text className="text-xl font-bold text-slate-900 mt-8 mb-4">
                    Low Stock Alerts
                </Text>



                <View className="bg-white rounded-2xl p-5 shadow">

                    <View className="flex-row items-center">

                        <Ionicons
                            name="alert-circle"
                            size={24}
                            color="#F59E0B"
                        />


                        <View className="ml-3 flex-1">

                            <Text className="font-bold text-slate-900">
                                Printer Paper
                            </Text>


                            <Text className="text-slate-500">
                                Only 4 items remaining
                            </Text>


                        </View>


                    </View>


                </View>


            </ScrollView>



            {/* Floating Add Button */}

            <TouchableOpacity
                className="absolute bottom-24 right-6 bg-slate-900 w-16 h-16 rounded-full items-center justify-center shadow-lg"
            >

                <Ionicons
                    name="add"
                    size={32}
                    color="white"
                />

            </TouchableOpacity>





            <Navbar />


        </View>
    );
}