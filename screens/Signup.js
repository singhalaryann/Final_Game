import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CheckBox from 'expo-checkbox';
import { Audio } from 'expo-av';

const Signup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSelected, setSelection] = useState(false);
    const soundRef = useRef(null);

    useEffect(() => {
        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(require('../assets/click-button.mp3'));
            soundRef.current = sound;
        };

        loadSound();

        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    const playSound = async () => {
        if (soundRef.current) {
            await soundRef.current.replayAsync();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.signupPage}>
                <Text style={styles.signUp}>Sign up</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Name'
                        placeholderTextColor="grey"
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor="grey"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        placeholderTextColor="grey"
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={isSelected}
                        onValueChange={(value) => { setSelection(value); playSound(); }}
                        color={isSelected ? '#FF6F61' : undefined}
                    />
                    <Text style={styles.checkboxText}>
                        I agree to all statements in{" "}
                        <Text style={styles.termsOfService} onPress={() => console.log("Terms of Service clicked")}>Terms of Service</Text>
                    </Text>
                </View>

                <View style={styles.buttonWrapper}>
                    <TouchableOpacity 
                        style={styles.signupButton} 
                        onPress={async () => { await playSound(); console.log("Sign Up"); }}
                    >
                        <Text style={styles.signupButtonText}>SIGN UP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.signinButton} 
                        onPress={async () => { await playSound(); navigation.navigate('HomePage'); }}
                    >
                        <Text style={styles.signinButtonText}>SIGN IN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupPage: {
        backgroundColor: '#1E1E1E',
        padding: 20,
        borderRadius: 20,
        width: "85%",
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 15,
    },
    signUp: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Michroma-Regular',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#333',
        marginBottom: 15,
        color: 'white',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxText: {
        marginLeft: 10,
        color: 'white',
        fontFamily: 'Michroma-Regular',
    },
    termsOfService: {
        textDecorationLine: 'underline',
        color: '#FF6F61',
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signupButton: {
        alignItems: 'center',
        backgroundColor: '#FF6F61',
        paddingVertical: 15,
        borderRadius: 30,
        width: '45%',
    },
    signupButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Michroma-Regular',
    },
    signinButton: {
        alignItems: 'center',
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        borderRadius: 30,
        width: '45%',
    },
    signinButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Michroma-Regular',
    },
});

export default Signup;
