import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Navbar from "../(Components)/NavBar";
import ItemService, { Item } from "../Service/ItemService";


export default function ItemsScreen() {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [showModal, setShowModal] = useState(false);


    const [items, setItems] = useState<Item[]>([]);


    const [search, setSearch] = useState("");



    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expiry, setExpiry] = useState("");

    const [errors, setErrors] = useState({
        id: "",
        name: "",
        quantity: "",
        expiry: ""
    });




    // Load items

    const loadItems = async () => {

        const data = await ItemService.getAllItems();

        setItems(data);

    };



    useEffect(() => {

        loadItems();

    }, []);






    // Add Item

    const addItem = async () => {


        let newErrors = {
            id: "",
            name: "",
            quantity: "",
            expiry: ""
        };


        let valid = true;



        if (!id.trim()) {

            newErrors.id = "Item ID is required";
            valid = false;

        }


        if (!name.trim()) {

            newErrors.name = "Item name is required";
            valid = false;

        }


        if (!quantity.trim()) {

            newErrors.quantity = "Quantity is required";
            valid = false;

        }


        if (!expiry.trim()) {

            newErrors.expiry = "Expiry date is required";
            valid = false;

        }



        setErrors(newErrors);



        if (!valid) {
            return;
        }




        await ItemService.addItem({

            itemId: id,
            name: name,
            quantity: Number(quantity),
            expiry: expiry

        });



        setId("");
        setName("");
        setQuantity("");
        setExpiry("");

        setErrors({
            id: "",
            name: "",
            quantity: "",
            expiry: ""
        });


        setShowModal(false);


        loadItems();

    };


    const openUpdateModal = (item: Item) => {

        setSelectedItem(item);

        setId(item.itemId);
        setName(item.name);
        setQuantity(item.quantity.toString());
        setExpiry(item.expiry);

        setIsUpdateMode(true);

        setShowModal(true);

    };



    const updateItem = async () => {

        let newErrors = {
            id: "",
            name: "",
            quantity: "",
            expiry: ""
        };

        let valid = true;


        if (!id.trim()) {
            newErrors.id = "Item ID is required";
            valid = false;
        }


        if (!name.trim()) {
            newErrors.name = "Item name is required";
            valid = false;
        }


        if (!quantity.trim()) {
            newErrors.quantity = "Quantity is required";
            valid = false;
        }


        if (!expiry.trim()) {
            newErrors.expiry = "Expiry date is required";
            valid = false;
        }


        setErrors(newErrors);


        if (!valid) return;


        if (!selectedItem?.id) return;


        await ItemService.updateItem(
            selectedItem.id,
            {
                itemId: id,
                name,
                quantity: Number(quantity),
                expiry
            }
        );


        setShowModal(false);

        setIsUpdateMode(false);

        setSelectedItem(null);


        setId("");
        setName("");
        setQuantity("");
        setExpiry("");


        setErrors({
            id: "",
            name: "",
            quantity: "",
            expiry: ""
        });


        loadItems();

    };

    const deleteItem = (id: string) => {


        Alert.alert(
            "Delete Item",
            "Are you sure you want to delete this item?",
            [
                {
                    text: "No",
                    style: "cancel"
                },

                {
                    text: "Yes",
                    style: "destructive",

                    onPress: async () => {


                        await ItemService.deleteItem(id);


                        loadItems();


                    }
                }
            ]
        );


    };


    // Search filter

    const filteredItems = items.filter((item) =>


        item.name
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )


    );



    return (

        <View className="flex-1 bg-slate-100">



            {/* Header */}

            <View className="bg-slate-900 px-6 pt-16 pb-8 rounded-b-[30px]">


                <Text className="text-white text-3xl font-bold">
                    Items
                </Text>


                <Text className="text-slate-300 mt-2">
                    Manage your inventory
                </Text>


            </View>


            {/* Search Bar */}


            <View className="mx-5 mt-5 bg-white rounded-xl flex-row items-center px-4">


                <Ionicons
                    name="search"
                    size={22}
                    color="#64748B"
                />


                <TextInput

                    placeholder="Search item..."

                    value={search}

                    onChangeText={setSearch}

                    className="flex-1 px-3 py-3"

                />


            </View>

            <ScrollView

                className="flex-1 px-5 mt-5"

                contentContainerStyle={{
                    paddingBottom: 120
                }}

            >




                {
                    filteredItems.map((item) => (


                        <View
                            key={item.id}
                            className="bg-white rounded-2xl p-5 mb-4 shadow"
                        >


                            <View className="flex-row justify-between">


                                <View>

                                    <Text className="text-slate-500">
                                        ID
                                    </Text>

                                    <Text className="font-bold">
                                        {item.itemId}
                                    </Text>

                                </View>



                                <View>

                                    <Text className="text-slate-500">
                                        Quantity
                                    </Text>

                                    <Text className="font-bold">
                                        {item.quantity}
                                    </Text>

                                </View>


                            </View>




                            <Text className="text-xl font-bold mt-4">
                                {item.name}
                            </Text>



                            <Text className="text-slate-500 mt-2">
                                Exp: {item.expiry}
                            </Text>




                            <View className="flex-row gap-3 mt-5">


                                <TouchableOpacity

                                    onPress={() => openUpdateModal(item)}

                                    className="flex-1 bg-slate-900 py-3 rounded-xl items-center"

                                >

                                    <Text className="text-white font-bold">
                                        Update
                                    </Text>

                                </TouchableOpacity>





                                <TouchableOpacity

                                    onPress={() => item.id && deleteItem(item.id)}

                                    className="flex-1 bg-red-600 py-3 rounded-xl items-center"

                                >

                                    <Text className="text-white font-bold">
                                        Delete
                                    </Text>

                                </TouchableOpacity>


                            </View>


                        </View>


                    ))
                }



            </ScrollView>



            {/* Add Button */}


            <TouchableOpacity

                onPress={() => {

                    setIsUpdateMode(false);
                    setSelectedItem(null);

                    setId("");
                    setName("");
                    setQuantity("");
                    setExpiry("");

                    setErrors({
                        id: "",
                        name: "",
                        quantity: "",
                        expiry: ""
                    });

                    setShowModal(true);

                }}

                className="absolute bottom-24 right-6 bg-slate-900 w-16 h-16 rounded-full items-center justify-center"

            >

                <Ionicons
                    name="add"
                    size={32}
                    color="white"
                />

            </TouchableOpacity>

            {/* Add Modal */}

            <Modal
                visible={showModal}
                transparent
                animationType="slide"
            >

                <View className="flex-1 bg-black/40 justify-end">

                    <View className="bg-white rounded-t-3xl p-6">


                        {/* Modal Header */}

                        <View className="flex-row justify-between items-center mb-5">

                            <Text className="text-2xl font-bold text-slate-900">
                                {isUpdateMode ? "Update Item" : "Add Item"}
                            </Text>


                            <TouchableOpacity
                                onPress={() => setShowModal(false)}
                                className="bg-slate-100 w-10 h-10 rounded-full items-center justify-center"
                            >

                                <Ionicons
                                    name="close"
                                    size={24}
                                    color="#0F172A"
                                />

                            </TouchableOpacity>


                        </View>





                        <TextInput
                            placeholder="Item ID"
                            value={id}
                            onChangeText={setId}
                            className={`bg-slate-100 rounded-xl p-3 mb-1 ${errors.id ? "border border-red-500" : ""
                                }`}
                        />

                        {
                            errors.id &&
                            <Text className="text-red-500 mb-2">
                                {errors.id}
                            </Text>
                        }





                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            className={`bg-slate-100 rounded-xl p-3 mb-1 ${errors.name ? "border border-red-500" : ""
                                }`}
                        />

                        {
                            errors.name &&
                            <Text className="text-red-500 mb-2">
                                {errors.name}
                            </Text>
                        }






                        <TextInput
                            placeholder="Quantity"
                            value={quantity}
                            onChangeText={setQuantity}
                            keyboardType="numeric"
                            className={`bg-slate-100 rounded-xl p-3 mb-1 ${errors.quantity ? "border border-red-500" : ""
                                }`}
                        />

                        {
                            errors.quantity &&
                            <Text className="text-red-500 mb-2">
                                {errors.quantity}
                            </Text>
                        }







                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            className={`bg-slate-100 rounded-xl p-3 mb-1 ${errors.expiry ? "border border-red-500" : ""
                                }`}
                        >

                            <Text className={
                                expiry
                                    ? "text-slate-900"
                                    : "text-slate-400"
                            }>
                                {expiry || "Select Expiry Date"}
                            </Text>

                        </TouchableOpacity>


                        {
                            errors.expiry &&
                            <Text className="text-red-500 mb-2">
                                {errors.expiry}
                            </Text>
                        }




                        {
                            showDatePicker && (

                                <DateTimePicker

                                    value={selectedDate}

                                    mode="date"

                                    onChange={(event, date) => {

                                        setShowDatePicker(false);

                                        if (date) {

                                            setSelectedDate(date);

                                            setExpiry(
                                                date.toISOString().split("T")[0]
                                            );

                                        }

                                    }}

                                />

                            )
                        }





                        <TouchableOpacity
                            onPress={isUpdateMode ? updateItem : addItem}
                            className="bg-slate-900 rounded-xl p-4 items-center mt-4"
                        >
                            <Text className="text-white font-bold text-lg">
                                {isUpdateMode ? "Update Item" : "Add Item"}
                            </Text>
                        </TouchableOpacity>




                    </View>

                </View>


            </Modal>




            <Navbar />


        </View>

    );

}