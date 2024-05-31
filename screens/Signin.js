import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";

const Signin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSelected, setSelection] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.signinPage}>
                <Text style={styles.signIn}>Sign IN</Text>
                <View style={styles.inputContainer}>
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
                        isChecked={isSelected}
                        onClick={() => setSelection(!isSelected)}
                        checkBoxColor="#00bfff"
                    /> */}
                    <View style={styles.checkboxTextContainer}>
                        <Text style={styles.rememberMeText}>Remember Me</Text>
                        <TouchableOpacity onPress={() => console.log("Forget Password clicked")}>
                            <Text style={styles.forgetPasswordText}>Forget Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
                        <Text style={styles.loginButton}>Login In</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signupContainer}>
                    <Text style={styles.createAccountText}>Create an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignupPage')}>
                        <Text style={styles.signupText}>Sign Up</Text>
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
    signinPage: {
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
    signIn: {
        fontSize: 28,
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
    checkboxTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    rememberMeText: {
        fontSize: 14,
        color: 'black',
    },
    forgetPasswordText: {
        right: 100,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    buttonContainer: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    loginButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        backgroundColor: 'tomato',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    createAccountText: {
        fontSize: 15,
        color: 'black',
    },
    signupText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'dodgerblue',
        marginLeft: 5,
    },
});

export default Signin;
