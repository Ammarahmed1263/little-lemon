import axios from "axios"
import { View, Text, StyleSheet, Image, StatusBar, ActivityIndicator, FlatList, TouchableWithoutFeedback, Keyboard} from "react-native"
import { useContext, useEffect, useState } from "react"
import { OnboardingContext } from "../src/components/CreateContext"
import { createTable, getMenuItems, storeMenu, filterByQueryAndCategories } from '../utils/database';
import DefaultImage from "../src/components/DefaultImage"
import Button from "../src/components/Button"
import CategoriesList from "../src/components/CategoriesList";
import useUpdateEffect from "../utils/useUpdateEffect";
import MainBanner from "../src/components/MainBanner";

const categories = ['starters', 'mains', 'desserts', 'drinks'];

const Home = ({ navigation }) => {
    const { userData } =  useContext(OnboardingContext)
    const [isLoading, setIsLoading] = useState(true)
    const [menu, setMenu] = useState([])
    const [onSelection, setOnSelection] = useState([]);
    const [deboucedText, setDeboucedText] = useState('')

    const menuRender = ({item, index}) => {
        return (
            <View key={index + item} style={styles.menuInnerContainer}>
                <View style={{ flex: 2 }}>
                    <Text style={styles.itemHeader}>{item.name}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                </View>
                <Image source={{ uri: item.image }} style={styles.menuImage}/>
            </View>
        )
    }
    
    const ListHeader = () => (
        <View style={{ height: 1, width: "100%", backgroundColor: "#8b8b8b" }} />
    );

    const fetchOrLoadMenu = async () => {
        const menuItems = await getMenuItems()

        if (menuItems.length === 0){
            fetchMenu();
        } else {
            const menu = menuItems.map(item => ({
                ...item,
                price: item.price / 100,
            }));
            setMenu(menu);
            setIsLoading(false);
        }
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
        } catch (e) {
            console.log("failed to fetch menu: ", e);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSelectedCategories = (selectedCategory) => {
        setOnSelection(selectedCategory)
    }

    const handleSearchQuery = (query) => {
        setDeboucedText(query)
    }

    useEffect(() => {
        createTable(fetchOrLoadMenu)
    }, [])


    useUpdateEffect(() => {
        (async () => {
            const filteredOutput = await filterByQueryAndCategories(onSelection, deboucedText)
            const categorizedMenu = filteredOutput.map(item => ({
                ...item,
                price: item.price / 100,
            }));
            setMenu(categorizedMenu);
        })()
    }, [onSelection, deboucedText])

    return (
        <View style={styles.Container}>
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
            
            <View style={styles.bannerContainer}>
                <MainBanner 
                    onQueryChange={handleSearchQuery}
                />
            </View>

            <View style={styles.categoriesContainer}>
                <View>
                    <Text style={styles.orderText}>order for delivery!</Text>
                    <CategoriesList
                        categories={categories}
                        onCategoriesSelect={handleSelectedCategories}
                    />
                </View>
            </View>

            <View style={styles.menuContainer}>
                {isLoading ?
                    <ActivityIndicator size="large" color="#F4CE14" />
                :
                    menu && <FlatList 
                        data={menu}
                        renderItem={menuRender}
                        keyExtractor={item => item.name + item.price}
                        ListHeaderComponent={ListHeader}
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
    Container: {
        flex: 1,
        backgroundColor: '#EDEFEE'
    },
    header: {
        flex: 0.9,
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
    bannerContainer: {
        flex: 5.1,
        backgroundColor: '#495E57',
        marginBottom: 35,
        marginTop: 5
    },
    categoriesContainer: {
        flex: 1.2,
        paddingBottom: 25,
        marginLeft: 15
    },
    orderText: {
        fontSize: 25,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        paddingBottom: 5,
    },
    menuContainer: {
        flex: 4,
        marginHorizontal: 15,
        marginTop: 10
    },
    menuInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 17,
        borderBottomColor: '#CECECE',
        borderBottomWidth: 1
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
    }
})