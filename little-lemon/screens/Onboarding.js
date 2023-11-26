import { View, Image, StatusBar, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useFonts } from 'expo-font';
import { useContext } from 'react'
import { OnboardingContext } from "../src/components/CreateContext";

import Button from "../src/components/Button";
import InputLabeled from "../src/components/InputLabeled";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = () => {
    const { setisOnboardingCompleted, userData, setUserData } = useContext(OnboardingContext);

    const [fontsLoaded] = useFonts({
        'Markazi Text': require('../src/fonts/MarkaziText.ttf'),
    });
    
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    const validateName = () => {
        const validName = /^[a-zA-Z]+$/

        if(validName.test(userData.firstName)) {
            setUserData({...userData, firstName: userData.firstName})
            return true;
        } else {
            alert("Please enter a name with letters only");
            return false;
        }
    }

    const validateMail = () => {
        const validMail = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
        
        if(validMail.test(userData.email)) {
            setUserData({...userData, email: userData.email});         
            return true;
        } else {
            alert("Please enter a valid email address");
            return false;
        }
    }

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('completed', JSON.stringify(value));
            console.log(userData);
            setisOnboardingCompleted(value);
        } catch (e) {
            console.log('failed to presist', e);
        }
    }

    const handlePress = () => {
        if (validateMail() && validateName()) {
            storeData(true);
            return true;
        }
        return false;
    }


    return (
        
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor='#EE9972'/>

            <View style={styles.header}>
                <Image source={require('../src/images/Logo.png')} style={styles.logo}/>
            </View>
            
            <View style={styles.body}>
                <Text style={styles.headerText}>Let us get to know you</Text>

                <View  style={styles.bodyInput}>
                    
                    <InputLabeled 
                        label='First Name'
                        containerStyle={styles.inputContainer}
                        labelStyle={styles.label}
                        inputStyle={styles.textInput}
                        placeholder="Lionel"
                        placeholderTextColor="#B1B1B1"
                        value={userData.name}
                        onChangeText={(firstName) => setUserData({...userData, firstName: firstName})}
                        onBlur={validateName}
                    />
                    
                    <InputLabeled
                        label='Email'
                        containerStyle={styles.inputContainer}
                        labelStyle={styles.label}
                        inputStyle={styles.textInput}
                        placeholder="example@example.com"
                        placeholderTextColor="#B1B1B1"
                        value={userData.email}
                        onChangeText={(email) => setUserData({...userData, email: email})}
                        onBlur={validateMail}
                    />

                </View>
                
                <View style={styles.bodyNext}>
                    <Button 
                        title="Next" 
                        disabled={!(userData.firstName && userData.email)}
                        highlightcolor='#F4CE14'
                        onPress={handlePress}
                        style={styles.button}
                        disabledStyle={styles.buttonDisabled}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#495E57'
    },
    header: {
        flex: 0.1,
        alignItems: 'center',
        backgroundColor: '#EE9972',
        paddingVertical: 10,
    },
    logo: {
        width: 260,
        height: 55,
    },
    headerText: {
        flex: 0.15,
        fontFamily: 'Markazi Text',
        fontSize: 45,
        color: '#EDEFEE',
        alignSelf: 'center'
    },
    body: {
        flex: 0.9,
    },
    bodyInput: {
        flex: 0.65,
        alignItems: 'center',
    },
    bodyNext: {
        flex: 0.22,
        backgroundColor: '#333333',
        alignItems: 'flex-end',
        paddingRight: 15,
        paddingTop: 50,
        marginTop: 20
    },
    inputContainer: {
        marginVertical: 15
    },
    textInput: {
        width: 310,
        backgroundColor: '#495E57',
        borderColor: '#F4CE14',
        color: '#EDEFEE',
        fontSize: 22,
        fontWeight: '500',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 2,
    },
    label: {
        fontSize: 27,
        paddingLeft: 3,
        paddingBottom: 6,
        fontWeight: '300',
        color: '#EDEFEE',
    },
    button: {
        borderRadius: 8,
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 8,
        borderWidth: 2,
        borderColor: '#F4CE14'
    },
    buttonDisabled: {
        borderColor: '#FAE994',
        backgroundColor: '#92AAA3'
    }
})
export default Onboarding;