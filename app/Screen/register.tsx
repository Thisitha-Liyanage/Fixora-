import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    Image
} from "react-native";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { registerUser } from "../Service/AuthService";

export default function RegisterScreen() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validate = async () => {
        let valid = true;

        setUsernameError("");
        setEmailError("");
        setPasswordError("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!username.trim()) {
            setUsernameError("Username is required");
            valid = false;
        } else if (username.trim().length < 3) {
            setUsernameError("Username must be at least 3 characters");
            valid = false;
        }

        if (!email.trim()) {
            setEmailError("Email is required");
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            valid = false;
        }

        if (!password) {
            setPasswordError("Password is required");
            valid = false;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            valid = false;
        }

        if (valid) {
            try {
                setLoading(true);

                await registerUser(
                    username.trim(),
                    email.trim(),
                    password
                );

                alert("Account created successfully!");

                router.replace("/Screen/login");

            } catch (error: any) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={20}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 justify-center px-8 py-10">

                        {/* Logo */}
                        <View className="items-center mb-10">
                            <View className="w-28 h-28 rounded-full bg-slate-200 items-center justify-center overflow-hidden">
                                <Image
                                    source={require("../../assets/images/Invento_Logo.png")}
                                    className="w-full h-full"
                                    resizeMode="contain"
                                />
                            </View>

                            <Text className="text-4xl font-extrabold text-slate-900 mt-6">
                                Invento
                            </Text>

                            <Text className="text-gray-500 mt-2">
                                Create your account
                            </Text>
                        </View>

                        {/* Username */}
                        <Text className="font-semibold text-slate-900 mb-2">
                            Username
                        </Text>

                        <TextInput
                            placeholder="Enter username"
                            value={username}
                            onChangeText={(text) => {
                                setUsername(text);
                                setUsernameError("");
                            }}
                            className={`border rounded-xl px-4 py-4 ${usernameError ? "border-red-500" : "border-gray-300"
                                }`}
                        />

                        {usernameError ? (
                            <Text className="text-red-500 mt-2 mb-4">
                                {usernameError}
                            </Text>
                        ) : (
                            <View className="mb-4" />
                        )}

                        {/* Email */}
                        <Text className="font-semibold text-slate-900 mb-2">
                            Email
                        </Text>

                        <TextInput
                            placeholder="Enter email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailError("");
                            }}
                            className={`border rounded-xl px-4 py-4 ${emailError ? "border-red-500" : "border-gray-300"
                                }`}
                        />

                        {emailError ? (
                            <Text className="text-red-500 mt-2 mb-4">
                                {emailError}
                            </Text>
                        ) : (
                            <View className="mb-4" />
                        )}

                        {/* Password */}
                        <Text className="font-semibold text-slate-900 mb-2">
                            Password
                        </Text>

                        <TextInput
                            placeholder="Enter password"
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                setPasswordError("");
                            }}
                            className={`border rounded-xl px-4 py-4 ${passwordError ? "border-red-500" : "border-gray-300"
                                }`}
                        />

                        {passwordError ? (
                            <Text className="text-red-500 mt-2">
                                {passwordError}
                            </Text>
                        ) : (
                            <View className="mb-4" />
                        )}

                        {/* Register Button */}
                        <TouchableOpacity
                            onPress={validate}
                            disabled={loading}
                            className={`rounded-xl py-4 mt-6 items-center ${loading ? "bg-slate-400" : "bg-slate-900"
                                }`}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text className="text-white text-center text-lg font-bold">
                                    Create Account
                                </Text>
                            )}
                        </TouchableOpacity>

                        {/* Login Link */}
                        <View className="flex-row justify-center mt-8">
                            <Text className="text-gray-600">
                                Already have an account?
                            </Text>

                            <Link href="/Screen/login" asChild>
                                <TouchableOpacity>
                                    <Text className="text-blue-800 font-bold ml-2">
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </Link>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}