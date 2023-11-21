import { View, Image, Text, StyleSheet } from 'react-native'

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../src/images/Lemon.png')} style={styles.image}/>
            <Text style={styles.text}>Please wait, working on it...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#495E57'
    },
    image: {
        resizeMode: 'stretch',
        width: 235,
        height: 220,
        transform: [{ rotate: '-20deg' }],
    },
    text: {
        fontSize: 30,
        marginTop: 20,
        marginHorizontal: 8,
        fontWeight: 'bold',
        color: '#EDEFEE',
        textAlign: 'center'
    }
})

export default SplashScreen;