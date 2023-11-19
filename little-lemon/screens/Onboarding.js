import { View, Image, TextInput, Text, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import { useState } from 'react'
import Button from "../src/components/Button";
import InputLabeled from "../src/components/InputLabeled";

const Onboarding = () => {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [fontsLoaded] = useFonts({
        'Markazi Text': require('../src/fonts/MarkaziText.ttf'),
    });
    
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    const validateName = () => {
        const validName = /^[a-zA-Z]+$/

        if(validName.test(name)) {
            setName(name);
        } else {
            alert("Please enter a name with letters only");
        }
    }

    const validateMail = () => {
        const validMail = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
        
        if(validMail.test(mail)) {
            setMail(mail);
        } else {
            alert("Please enter a valid email address");
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../src/images/Logo.png')} style={styles.logo}/>
            </View>
            
            <View style={styles.body}>
                <View>
                    <Text style={styles.headerText}>Let us get to know you</Text>
                    
                    <InputLabeled 
                        label='First Name'
                        containerStyle={styles.inputContainer}
                        labelStyle={styles.label}
                        inputStyle={styles.textInput}
                        placeholder="Lionel"
                        placeholderTextColor="#DEDEDE"
                        value={name}
                        onChangeText={setName}
                        onBlur={validateName}
                    />

                    
                    <InputLabeled
                        label='Email'
                        containerStyle={styles.inputContainer}
                        labelStyle={styles.label}
                        inputStyle={styles.textInput}
                        placeholder="example@example.com"
                        placeholderTextColor="#DEDEDE"
                        value={mail}
                        onChangeText={setMail}
                        onBlur={validateMail}
                    />

                </View>
                
                <View>
                    <Button 
                        text="Next" 
                        disabled={!(name && mail)}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#495E57'
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#EE9972',
        paddingVertical: 10,
    },
    logo: {
        width: 270,
        height: 60,
    },
    headerText: {
        fontFamily: 'Markazi Text',
        fontSize: 30,
        color: 'white'
    },
    body: {
        alignItems: 'center'
    },
    inputContainer: {
        marginVertical: 10
    },
    textInput: {
        paddingVertical: 2,
        paddingHorizontal: 7,
        backgroundColor: '#495E57',
        fontSize: 14,
        fontWeight: '500',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#F4CE14',
        color: 'white'
    },
    label: {
        fontSize: 19,
        paddingLeft: 3,
        fontWeight: '300',
        color: 'white',
    }
})
export default Onboarding;