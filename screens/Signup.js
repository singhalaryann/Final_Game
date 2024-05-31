import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";

const Signup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSelected, setSelection] = useState(false);

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
                    {/* <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        tintColors={{ true: '#00bfff', false: 'black' }}
                    /> */}
                    <Text style={styles.checkboxText}>
                        I agree to all statements in{" "}
                        <Text style={styles.termsOfService} onPress={() => console.log("Terms of Service clicked")}>Terms of Service</Text>
                    </Text>
                </View>

                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.signupButton} onPress={() => console.log("Sign Up")}>
                        <Text style={styles.signupButtonText}>SIGN UP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signinButton} onPress={() => navigation.navigate('HomePage')}>
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
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupPage: {
        backgroundColor: 'white',
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
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        marginBottom: 15,
        color: 'black',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxText: {
        marginLeft: 10,
        color: 'black',
    },
    termsOfService: {
        textDecorationLine: 'underline',
        color: 'blue',
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signupButton: {
        alignItems: 'center',
        backgroundColor: 'tomato',
        paddingVertical: 15,
        borderRadius: 30,
        width: '45%',
    },
    signupButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    signinButton: {
        alignItems: 'center',
        backgroundColor: 'dodgerblue',
        paddingVertical: 15,
        borderRadius: 30,
        width: '45%',
    },
    signinButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Signup;
