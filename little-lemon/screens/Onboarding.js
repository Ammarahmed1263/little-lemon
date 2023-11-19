import { View, Image, TextInput, Text, StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import Button from "../src/components/Button";
import InputLabeled from "../src/components/InputLabeled";

const Onboarding = () => {
    const [fontsLoaded] = useFonts({
        'Markazi Text': require('../src/fonts/MarkaziText.ttf'),
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../src/images/Logo.png')} style={styles.logo}/>
            </View>
            
            <View style={styles.body}>
                <View>
                    <Text style={{fontFamily: 'Markazi Text', fontSize: 30}}>Let us get to know you</Text>
                    
                    <InputLabeled 
                    label='First Name:'
                    containerStyle={styles.inputContainer}
                    labelStyle={styles.label}
                    inputStyle={styles.textInput}/>
                    
                    <InputLabeled
                    label='Email:'
                    containerStyle={styles.inputContainer}
                    labelStyle={styles.label}
                    inputStyle={styles.textInput}
                    placeholder="example@example.com"/>

                </View>
                
                <View>
                    <Button text="Let's go"/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBDABB'
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
    body: {
        alignItems: 'center'
    },
    inputContainer: {
        marginVertical: 10
    },
    textInput: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 20,
        borderRadius: 8,
        borderWidth: 4,
        borderColor: '#F4CE14'
    },
    label: {
        fontSize: 18,
        paddingLeft: 6,
        fontWeight: '800'
    }
})
export default Onboarding;