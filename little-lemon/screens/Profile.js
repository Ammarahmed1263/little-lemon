import { View, Text, StyleSheet, Image, StatusBar } from "react-native"
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from 'expo-checkbox';
import { useContext } from "react";

import { validateMail, validateName } from "../utils/validations";
import { OnboardingContext } from "../src/components/CreateContext";
import InputLabeled from "../src/components/InputLabeled";
import Button from "../src/components/Button";
import DefaultImage from "../src/components/DefaultImage";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
    const { setisOnboardingCompleted, userData, setUserData } = useContext(OnboardingContext);
    const [maskedValue, setMaskedValue] = useState('');
    console.log(userData);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            
            console.log(result);

            if (!result.canceled) {
                setUserData({...userData, image: result.assets[0].uri});
            }   
        } catch (e) {
            console.log('error with images:', e);
        }
    }

    const validateNumber = () => {
      if (maskedValue.length !== "(999) 999-9999".length) {
        alert('Number is missing');
        return false;
      }
      return true;
    };

    const handleNumberChange = (masked, unmasked) => {
        setUserData({...userData, number: masked})
        setMaskedValue(masked);
    }

    const toggleCheckbox = (key) => {
        setUserData({...userData, notification: {...userData.notification, [key]: !userData.notification[key]}});
    };

    const handleLogout = async () => {
        try {
          await AsyncStorage.clear()
          setUserData({...userData, 
            firstName: "",
            lastName: "",
            email: "",
            number: "",
            image: null,
            notification: {orders: false, password: false, offers: false, newsletter: false},
          });
          setisOnboardingCompleted(false);
        } catch(e) {
          console.log('error deleting data', e);
        }
    }

    const handleSave = async () => {
        try {
            if (validateName(userData, setUserData) && validateMail(userData, setUserData) && validateNumber()) {
                await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
                alert('Changes saved successfully');
            }
        } catch (e) {
            console.log("failed to presist from profile:", e);
        }
    };

    const handleDiscard = async () => {
        console.log('clicked');
        try {
            const userinfo = await AsyncStorage.getItem("userInfo");
            if (userinfo !== null) {
              setUserData({...userData, ...JSON.parse(userinfo)});
            } else {
                alert('user not saved');
            }
        } catch (e) {
            console.log('error discarding changes:', e);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#EDEFEE'/>

            <View style={styles.header}>
                <Button style={styles.backButton}>
                    <View style={styles.iconContainer}>
                        <Icon
                        name="ios-arrow-back"
                        size={28}
                        color='#EDEFEE'
                        />
                    </View>
                </Button>
                    <Image source={require('../src/images/Logo.png')} style={styles.logo}/>
                    {userData.image ? 
                        (<Image
                            source={{uri: userData.image}}
                            style={styles.headerPic}
                        />) : 
                        (<DefaultImage 
                            firstLetter={userData?.firstName[0]}
                            secondLetter={userData?.lastName[0]}
                            viewStyle={styles.headerPic}
                            textStyle={styles.headerLetters}
                        />)
                    }
            </View>
            
            <View style={styles.page}>

                <View>
                    <Text style={styles.heading}>Personal information</Text>
                    
                    <View style={styles.innerImage}>
                        {userData.image ? (
                            <Image
                                source={{uri: userData.image}}
                                style={styles.profilePicture}
                            />
                        ) : (
                            <DefaultImage
                                firstLetter={userData?.firstName[0]}
                                secondLetter={userData?.lastName[0]}
                                viewStyle={styles.profilePicture}
                                textStyle={styles.profileLetters}
                            />
                        )
                        } 

                        <Button 
                            title="Change"
                            style={styles.changeButton}
                            titleStyle={styles.changeTitle}
                            highlightColor="#F4CE14"
                            onPress={pickImage}
                        />
                        <Button 
                            title="Remove"
                            titleStyle={styles.removeTitle}
                            style={styles.removeButton}
                            highlightColor="#cfcfcf"
                            onPress={() => setUserData({...userData, image:  null})}
                        />
                    </View>
                
                    <View> 
                        <InputLabeled 
                            label='First Name'
                            containerStyle={styles.inputContainer}
                            labelStyle={styles.label}
                            inputStyle={styles.textInput}
                            placeholder="Leo"
                            placeholderTextColor="#B1B1B1"
                            value={userData.firstName}
                            onChangeText={(firstName) => setUserData({...userData, firstName: firstName})}
                            onBlur={() => validateName(userData, setUserData)}
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
                            onBlur={() => validateMail(userData, setUserData)}
                        />

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Phone Number</Text>
                            <MaskedTextInput
                                mask="(999) 999-9999"
                                placeholder="(217) 555-0113"
                                placeholderTextColor="#B1B1B1"
                                style={styles.textInput}
                                onChangeText={handleNumberChange}
                                value={userData.number}
                                onBlur={validateNumber}
                            />
                        </View>

                    </View>
                </View>
                <View>
                    <Text style={styles.heading}>Email notification</Text>
                    <View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox 
                                value={userData.notification.orders}
                                color={userData.notification.orders && '#495E57'}
                                onValueChange={() => toggleCheckbox('orders')}
                            />
                            <Text style={styles.checkboxText} >Orders status</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox 
                                value={userData.notification.password}
                                color={userData.notification.password && '#495E57'}
                                onValueChange={() => toggleCheckbox('password')}
                            />
                            <Text style={styles.checkboxText}>Password changes</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox 
                                    value={userData.notification.offers}
                                    color={userData.notification.offers && '#495E57'}
                                    onValueChange={() => toggleCheckbox('offers')}
                            />
                            <Text style={styles.checkboxText}>Special offers</Text>
                        </View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox 
                                    value={userData.notification.newsletter}
                                    color={userData.notification.newsletter && '#495E57'}
                                    onValueChange={() => toggleCheckbox('newsletter')}
                            />
                            <Text style={styles.checkboxText}>Newsletter</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.buttonSection}>
                    <Button
                        title="Log Out"
                        style={styles.logoutButton}
                        titleStyle={styles.logoutText}
                        onPress={handleLogout}
                    />
                    
                    <View style={styles.changesArea}>
                        <Button 
                            title="Discard changes"
                            style={[styles.removeButton, {marginLeft: 15}]}
                            titleStyle={{fontSize: 17, color: '#495E57'}}
                            highlightColor="#cfcfcf"
                            onPress={handleDiscard}
                        />
                        <Button 
                            title="Save changes"
                            style={[styles.changeButton, {marginRight: 15}]}
                            titleStyle={{fontSize: 17, fontWeight: '500'}}
                            highlightColor="#F4CE14"
                            onPress={handleSave}
                        />
                    </View>
                </View>
                
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEFEE'
    },
    header: {
        flex: 0.08,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    backButton: {
        backgroundColor: '#495E57',
        color: '#EDEFEE',
        width: 40,
        height: 40,
        borderRadius: 20
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerPic: {
        resizeMode: 'cover',
        width: 55,
        height: 55,
        borderRadius: 27,
        backgroundColor: '#495E57',
    },
    headerLetters: {
        fontSize: 25,
        fontWeight: 600,
        color: '#F4CE14'
    },
    page: {
        flex: 0.92,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#CCC',
        padding: 10,
        marginHorizontal: 5,
        marginBottom: 10
    },
    heading: {
        fontSize: 25,
        color: '#333',
        fontWeight: '800',
        marginLeft: 5,
    },
    innerImage: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    changeButton: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#495E57',
        marginLeft: 25,
    },
    changeTitle: {
        fontSize: 21,
        fontWeight: '400'
    },
    removeButton: {
        backgroundColor: '#EDEFEE',
        borderColor: '#495E57',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 4,
        marginLeft: 15,
    },
    removeTitle: {
        color: '#495E57',
        fontSize: 18,
    },
    profilePicture: {
        resizeMode: 'cover',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F4CE14',
    },
    profileLetters: {
        fontSize: 38,
        fontWeight: 600,
        color: '#495E57'
    },
    inputContainer: {
        marginHorizontal: 5,
        paddingVertical : 6
    },
    textInput: {
        color: '#5e5e5e',
        fontSize: 14,
        fontWeight: '500',
        paddingVertical: 7,
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
    checkboxContainer: {
        flexDirection: 'row' ,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 3,
        paddingHorizontal: 8
    },
    checkboxText: {
        fontSize: 18,
        paddingLeft: 10,
        fontWeight: '500',
        color: '#333'
    },
    logoutButton: {
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#F4CE14',
        borderWidth: 2,
        borderColor: '#f88f2d',
        marginTop: 10
    },
    logoutText: {
        color: '#333',
        fontWeight: '700',
        fontSize: 22,
    },
    changesArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    }
})

export default Profile;