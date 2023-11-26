import { View, Text, StyleSheet, Image, StatusBar } from "react-native"
import CheckBox from 'expo-checkbox';
import { useContext } from "react";

import { OnboardingContext } from "../src/components/CreateContext";
import InputLabeled from "../src/components/InputLabeled";
import Button from "../src/components/Button";

const Profile = () => {
    const { userData, setUserData } = useContext(OnboardingContext);
    console.log(userData);

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor='#EE9972'/>

            
            <View style={styles.header}>
                <Button title="←" style={styles.backButton}/>
                <Image source={require('../src/images/Logo.png')} style={styles.logo}/>
                <Image source={require('../src/images/Lemon.png')} style={styles.logo2}/>
            </View>
            
            <View style={styles.page}>

                <View style={styles.infoSection} >
                    <Text style={styles.heading}>Personal information</Text>
                    
                    <View style={styles.innerImage}>
                        <Image source={require('../src/images/Lemon.png')} style={styles.profilePicture}/>
                        <Button 
                            title="change"
                            style={styles.changeButton}
                            highlightColor="blue"
                            disabledStyle={{backgroundColor: "black"}}
                        />
                        <Button 
                            title="remove" />
                    </View>
                
                    <View  style={styles.innerInput}> 
                        <InputLabeled 
                            label='First Name'
                            containerStyle={styles.inputContainer}
                            labelStyle={styles.label}
                            inputStyle={styles.textInput}
                            placeholder="Lionel"
                            placeholderTextColor="#B1B1B1"
                            value={userData.firstName}
                            onChangeText={(firstName) => setUserData({...userData, firstName: firstName})}
                        />
                        
                        <InputLabeled
                            label='Last Name'
                            containerStyle={styles.inputContainer}
                            labelStyle={styles.label}
                            inputStyle={styles.textInput}
                            placeholder="John"
                            placeholderTextColor="#B1B1B1"
                            value={userData.lastName}
                            onChangeText={(lastName) => setUserData({...userData, lastName: lastName})}
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
                        />

                        <InputLabeled
                            label='Phone Number'
                            containerStyle={styles.inputContainer}
                            labelStyle={styles.label}
                            inputStyle={styles.textInput}
                            placeholder="(217) 555-0113"
                            placeholderTextColor="#B1B1B1"
                            value={userData.number}
                            onChangeText={(number) => setUserData({...userData, number: number})}
                        />

                    </View>
                </View>

                <View style={styles.notificationSection} >
                    <Text style={styles.heading}>Email notification</Text>
                    <View style={styles.checkBoxContainer}>
                        <CheckBox />
                        <CheckBox />
                        <CheckBox />
                        <CheckBox />
                    </View>
                </View>

                {/* <View style={styles.buttonSection}>
                    <Button title="Log out"
                    style={styles.button}
                    disabledStyle={styles.buttonDisabled}/>
                    <Button title="Discard changes"
                    style={styles.button}
                    disabledStyle={styles.buttonDisabled}/>
                    <Button title="Save changes"
                    style={styles.button}
                    disabledStyle={styles.buttonDisabled}/>
                </View> */}
                
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EE9972'
    },
    backButton: {
        backgroundColor: '#495E57',
        width: 55,
        height: 55,
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center',
    },
    page: {
        flex: 0.9,
        borderRadius: 25,
        borderWidth: 10,
        borderColor: '#CCC'
    },
    heading: {
        fontSize: 25,
        color: '#333',
        fontWeight: '800',
        marginLeft: 5,
    },
    innerImage: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 30
    },
    changeButton: {
        borderRadius: 8,
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#495E57'
    },
    profilePicture: {
        width: 55,
        height: 55,
        borderRadius: 27,
        backgroundColor: 'red',
    },
    inputContainer: {
        marginHorizontal: 10,
    },
    textInput: {
        color: '#EDEFEE',
        fontSize: 15,
        fontWeight: '500',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#AAA'
    },
    label: {
        fontSize: 15,
        paddingLeft: 3,
        fontWeight: '500',
        color: '#333',
    },
    buttonSection: {
        padding:30,
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

export default Profile;