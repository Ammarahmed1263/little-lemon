import { View, TextInput, Text, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

const MainBanner = ({ onQueryChange }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [fontsLoaded] = useFonts({
        "Markazi Text": require("../fonts/MarkaziText.ttf"),
        "Karla": require("../fonts/Karla.ttf")
    });
    
    const handleDebouncedQuery = debounce(onQueryChange, 500)

    useEffect(() => {
        handleDebouncedQuery(searchQuery)

        return () => {
            handleDebouncedQuery.cancel();
        }
    }, [searchQuery])


    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.mainBanner}>
            <View>
                <Text style={styles.textHeader}>Little Lemon</Text>
                <Text style={styles.subHeader}>Chicago</Text>
                <View style={styles.imageTextContainer}>
                    <Text style={styles.description}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                    <Image
                        source={require('../images/bannerImage.jpg')}
                        style={styles.foodImage}
                    />
                </View>
            </View>

            <View style={styles.barContainer}>
                <Image
                    source={require('../images/search.png')}
                    style={styles.barImage}
                />
                <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.searchBar}
                />
            </View>
        </View>
    )
}

export default MainBanner;

const styles = StyleSheet.create({
    mainBanner: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    imageTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 10
    },
    textHeader:{
        fontSize: 55,
        fontFamily: 'Markazi Text',
        color: '#F4CE14',
    },
    subHeader:{
        fontSize: 30,
        fontFamily: 'Karla',
        color: '#EDEFEE',
        position: 'absolute',
        top: 53
    },
    description:{
        flex: 2,
        fontSize: 18,
        marginBottom: 3,
        color: '#EDEFEE',
        marginRight: 30
    },
    foodImage:{
        flex: 1,
        resizeMode: 'cover',
        width: 130,
        height: 145,
        borderRadius: 20,
        paddingHorizontal: 10
    },
    barContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        marginVertical: 20,
    },
    barImage: {
        width: 20,
        height: 20,
        marginLeft: 10
    },
    searchBar: {
        flex: 1,
        fontSize: 20,
        marginLeft: 10
    }
})