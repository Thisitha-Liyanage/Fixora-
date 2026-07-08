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
    ActivityIndicator
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);

    const validate = async () => {
        let valid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        setEmailError("");
        setPasswordError("");

        if (!email.trim()) {
            setEmailError("Email is required");
            valid = false;
        } else if (!emailRegex.test(email.trim())) {
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
                console.log("Login Success");
                // Your Firebase logic goes here:
                // await signInWithEmailAndPassword(auth, email.trim(), password);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                    className="px-8"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Logo */}
                    <View className="items-center mb-12">
                        <View className="w-28 h-28 rounded-full bg-slate-200 items-center justify-center">
                            <Text className="text-slate-500 text-base font-semibold">LOGO</Text>
                        </View>

                        <Text className="text-4xl font-extrabold text-[#0F172A] mt-6">
                            Fixora
                        </Text>

                        <Text className="text-gray-500 mt-2 text-center px-4">
                            Book trusted home service professionals
                        </Text>
                    </View>

                    {/* Email Input */}
                    <View className="mb-4">
                        <Text className="text-[#0F172A] font-semibold mb-2">
                            Email
                        </Text>
                        <TextInput
                            placeholder="Enter your email"
                            placeholderTextColor="#94A3B8"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                if (emailError) setEmailError("");
                            }}
                            className={`rounded-xl border px-4 py-4 text-base ${
                                emailError ? "border-red-500 bg-red-50/10" : "border-gray-300"
                            }`}
                        />
                        {emailError && (
                            <Text className="text-red-500 text-sm mt-1.5 ml-1">
                                {emailError}
                            </Text>
                        )}
                    </View>

                    {/* Password Input */}
                    <View className="mb-2">
                        <Text className="text-[#0F172A] font-semibold mb-2">
                            Password
                        </Text>
                        <View className="relative justify-center">
                            <TextInput
                                placeholder="Enter your password"
                                placeholderTextColor="#94A3B8"
                                secureTextEntry={secureText}
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (passwordError) setPasswordError("");
                                }}
                                className={`rounded-xl border pl-4 pr-12 py-4 text-base ${
                                    passwordError ? "border-red-500 bg-red-50/10" : "border-gray-300"
                                }`}
                            />
                            <TouchableOpacity 
                                onPress={() => setSecureText(!secureText)}
                                className="absolute right-4 p-1"
                            >
                                <Ionicons 
                                    name={secureText ? "eye-off-outline" : "eye-outline"} 
                                    size={20} 
                                    color="#64748B" 
                                />
                            </TouchableOpacity>
                        </View>
                        {passwordError && (
                            <Text className="text-red-500 text-sm mt-1.5 ml-1">
                                {passwordError}
                            </Text>
                        )}
                    </View>


                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={validate}
                        disabled={loading}
                        className={`rounded-xl py-4 mt-8 items-center justify-center flex-row ${
                            loading ? "bg-slate-400" : "bg-[#0F172A]"
                        }`}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" size="small" />
                        ) : (
                            <Text className="text-white text-center text-lg font-bold">
                                Login
                            </Text>
                        )}
                    </TouchableOpacity>

                    {/* Register Link */}
                    <View className="flex-row justify-center mt-8 mb-6">
                        <Text className="text-gray-600">
                            Don't have an account?
                        </Text>
                        <Link href="/Screen/register" asChild>
                            <TouchableOpacity>
                                <Text className="text-[#1E3A8A] font-bold ml-2">
                                    Create Account
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}