import { Pressable,StyleSheet,Text } from "react-native";

const Button = ({text}) => {
    return (
        <Pressable style={styles.container}>
            <Text style={styles.ButtonText}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#495E57'
    },
    ButtonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600',
    }
})

export default Button;