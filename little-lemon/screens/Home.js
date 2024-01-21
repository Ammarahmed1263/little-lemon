import { View, Text, StyleSheet, Image, StatusBar, ActivityIndicator, FlatList } from "react-native"
import DefaultImage from "../src/components/DefaultImage"
import { useContext, useEffect, useState } from "react"
import { OnboardingContext } from "../src/components/CreateContext"
import * as SQLite from 'expo-sqlite';
import Button from "../src/components/Button"
import axios from "axios"

const db = SQLite.openDatabase('little_lemon');

const Home = ({ navigation }) => {
    const { userData } =  useContext(OnboardingContext)
    const [isLoading, setIsLoading] = useState(true)
    const [menu, setMenu] = useState([])

    const menuRender = ({item, index}) => {
        return (
            <View key={index + item} style={styles.menuInnerContainer}>
                <View style={{ flex: 3 }}>
                    <Text style={styles.itemHeader}>{item.name}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                </View>
                <Image source={{ uri: item.image }} style={styles.menuImage}/>
            </View>
        )
    }
    
    const ItemSeparator = () => (
        <View style={{ height: 1, width: "95%", backgroundColor: "#cacaca" }} />
    );

    const ListHeader = () => (
        <View style={{ height: 1, width: "98%", backgroundColor: "#8b8b8b" }} />
    );


    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY, 
                name TEXT, description TEXT, price INTEGER, image TEXT)`,
                [],
                () => FetchOrLoadMenu(),
                (_, error) => console.log('table creation failed:', error)
            );
        })
    }, [])

    const FetchOrLoadMenu = () => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM menu", 
                [],
                (_, { rows }) => {
                    if (rows.length === 0){
                        fetchMenu();
                    } else {
                        const menu = rows._array.map(item => ({
                            ...item,
                            price: item.price / 100,
                        }));
                        setMenu(menu);
                        setIsLoading(false);
                    }
                }
            )
        })
    }

    const fetchMenu = async () => {
        try {
            const response = await axios.get('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
            const dishes = response.data.menu.map((item) => {
                const imageURL = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`
                return {...item, image: imageURL}
            })
            setMenu(dishes);
            storeMenu(dishes);
            console.log(dishes)
        } catch (e) {
            console.log("failed to fetch menu: ", e);
        } finally {
            setIsLoading(false);
        }
    }

    const storeMenu = () => {
        db.transaction(tx => {
            menu.forEach((element) => {
                tx.executeSql('INSERT INTO menu (name, description, price, image) VALUES (?,?,?,?)',
                    [element.name, element.description, element.price * 100, element.image],
                    null,
                    (_, error) => console.log('insertion failed', error)
                )
            })
        })
    }

    return (
        <View style={{flex: 1, backgroundColor: '#EDEFEE'}}>
            <View style={styles.header}>
                <Image source={require('../src/images/Logo.png')} />
                
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
            
            <View style={{flex: 3}}></View>

            <View style={styles.menuContainer}>
                {isLoading ?
                    <ActivityIndicator size="large" color="#F4CE14" />
                :
                    menu && <FlatList 
                        data={menu}
                        renderItem={menuRender}
                        keyExtractor={item => item.name + item.price}
                        ListHeaderComponent={ListHeader}
                        ItemSeparatorComponent={ItemSeparator}
                        showsVerticalScrollIndicator={false}
                    />
                }
            </View>

            <StatusBar barStyle='dark-content' backgroundColor='#EDEFEE'/>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDEFEE'
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
    menuContainer: {
        flex: 5,
        marginHorizontal: 15,
    },
    menuInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 17,
    },
    itemHeader: {
        fontSize: 23,
        paddingBottom: 5,
        fontWeight: 'bold'
    },
    itemDescription: {
        fontSize: 16,
        color: '#495E57',
        paddingBottom: 10,
    },
    itemPrice: {
        fontSize: 19,
        color: '#495E57',
        paddingBottom: 5,
        fontWeight: '700'
    },
    menuImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '72%',
        height: '70%',
        marginLeft: 10
    }
})