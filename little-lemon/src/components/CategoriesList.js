import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";

const CategoriesList = ({ categories }) => {
    const [selectedCategories, setSelectedCategories] = useState([])

    const renderSelected = ({ item }) => {
        return (
            <TouchableOpacity 
                style={[styles.category, selectedCategories.includes(item) && styles.categorySelected]}
                onPress={() => handleClick(item)}
            >
                <Text style={[styles.text, selectedCategories.includes(item) && styles.textSelected]}>{item}</Text>
            </TouchableOpacity>
        )
    }

    const handleClick = (category) => {
        setSelectedCategories(prevState => {
            if (!prevState.includes(category)) {
                return [...prevState, category];
            } else {
                return prevState.filter((c) => c !== category);
            }
        })
    }

    return (
        <FlatList 
            data={categories}
            renderItem={renderSelected}
            horizontal={true}
            keyExtractor={item => Math.random()}
            showsHorizontalScrollIndicator={false}
        />
    )
}

export default CategoriesList;

const styles = StyleSheet.create({
    category: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d2d2d2',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 20,
        marginRight: 8,
    },
    categorySelected: {
        backgroundColor: '#F4CE14',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#3e514b'
    },
    textSelected: {
        color: '#EFEFEF'
    }
});