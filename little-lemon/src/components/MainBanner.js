import { View, TextInput, Text, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";

const MainBanner = () => {
    const [query, setQuery] = useState('')

    const [fontsLoaded] = useFonts({
        "Markazi Text": require("../fonts/MarkaziText.ttf"),
        "Karla": require("../fonts/Karla.ttf")
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.mainBanner}>
            <View style={styles.upperBanner}>
                <Text style={styles.textHeader}>Little Lemon</Text>
                <Text style={styles.subHeader}>Chicago</Text>
                <View style={styles.imageTextContainer}>
                    <View style={{flex: 2, marginRight: 13}}>
                        <Text style={styles.description}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                    </View>
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
                {/* remember to commit then functionality of search bar  */}
                <TextInput
                    caretHidden={true}
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
    upperBanner: {
        flex: 4,
        paddingBottom: 20,
    },
    imageTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
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
        fontSize: 17,
        color: '#EDEFEE',
        marginBottom: 15
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
    },
    barImage: {
        width: 20,
        height: 20,
        marginLeft: 10
    },
    searchBar: {
        flex: 1,
        fontSize: 20
    }
})


// const SearchBar = () => {
//     const [searchQuery, setSearchQuery] = useState('');
  
//     return (
//       <View style={styles.container}>
//         <Image 
//           source={require('./path-to-your-icon.png')} // replace with your icon path
//           style={styles.icon}
//         />
//         <TextInput
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//           placeholder="Search"
//           style={styles.input}
//         />
//       </View>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       backgroundColor: '#fff',
//       borderRadius: 5,
//       padding: 10,
//       margin: 10,
//     },
//     icon: {
//       height: 20,
//       width: 20,
//       marginRight: 10,
//     },
//     input: {
//       flex: 1,
//     },
//   });