import { View, Text, StyleSheet, Image, StatusBar } from "react-native"
import DefaultImage from "../src/components/DefaultImage"
import { useContext } from "react"
import { OnboardingContext } from "../src/components/CreateContext"
import Button from "../src/components/Button"

const Home = ({ navigation }) => {
    const { userData } =  useContext(OnboardingContext)
    
    return (
        <View style={{flex: 1}}>
            <View style={styles.header}>
                <Image source={require('../src/images/Logo.png')} style={styles.logo}/>
                
                <Button 
                    style={styles.buttonProfile}
                    onPress={() => navigation.navigate('Profile')}
                    highlightColor='#D4D4D4'
                >
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
                </Button>
            </View>
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
            <StatusBar barStyle='dark-content' backgroundColor='#EDEFEE'/>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    header: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonProfile: {
        width: 55,
        height: 55,
        borderRadius: 27,
        position: 'absolute',
        right: 10
    },
    headerPic: {
        resizeMode: 'cover',
        width: 55,
        height: 55,
        borderRadius: 27,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      },
})