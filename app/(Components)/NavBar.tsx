import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

export default function Navbar() {

    const pathname = usePathname();

    return (
        <View
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 75,
                backgroundColor: "white",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                elevation: 20,
                zIndex: 999,
            }}
        >

            {/* Home */}

            <TouchableOpacity
                onPress={() => router.push("/Screen/HomePage")}
            >
                <Ionicons
                    name={pathname === "/Screen/HomePage" ? "home" : "home-outline"}
                    size={28}
                    color={pathname === "/Screen/HomePage" ? "#0F172A" : "#94A3B8"}
                />
            </TouchableOpacity>



            {/* Items */}

            <TouchableOpacity
                onPress={() => router.push("/Screen/ItemPage")}
            >
                <Ionicons
                    name={pathname === "/Screen/ItemPage" ? "cube" : "cube-outline"}
                    size={28}
                    color={pathname === "/Screen/ItemPage" ? "#0F172A" : "#94A3B8"}
                />
            </TouchableOpacity>



            {/* Notifications */}

            <TouchableOpacity
                onPress={() => router.push("/Screen/Notification")}
            >
                <Ionicons
                    name={
                        pathname === "/Screen/Notification"
                            ? "notifications"
                            : "notifications-outline"
                    }
                    size={28}
                    color={
                        pathname === "/Screen/Notification"
                            ? "#0F172A"
                            : "#94A3B8"
                    }
                />
            </TouchableOpacity>


        </View>
    );
}