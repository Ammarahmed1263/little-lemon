import { View, Text, StyleSheet } from "react-native";


export default DefaultImage = ({firstLetter, secondLetter, viewStyle, textStyle}) => {
    firstLetter = firstLetter ? firstLetter : 'A';
    secondLetter = secondLetter ? secondLetter : 'Z';

    return (
        <View style={[styles.container, viewStyle]}>
            <Text style={[styles.letters, textStyle]}>{firstLetter + secondLetter}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    letters: {
        fontSize: 30,
        color: 'white',
        textTransform: 'uppercase'
    }
})