import { Pressable,StyleSheet,Text } from "react-native";
import { useState } from 'react'

const Button = ({text, disabled, ...props}) => {
    const [pressed, setPressed] = useState(false);

    const handlePressIn = () => {
        setPressed(true);
    };

    const handlePressOut = () => {
        setPressed(false);
    };

    const buttonStyles = [
        styles.container,
        disabled ? styles.containerDisabled : {backgroundColor: pressed ? '#F4CE14' : '#495E57'},
        props.style
    ];

    return (
        <Pressable 
            style={buttonStyles} 
            onPressIn={handlePressIn} 
            onPressOut={handlePressOut}
            {...props}
        >
            <Text style={[styles.buttonText, disabled && styles.textDisabled]}>Next</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 8,
        borderWidth: 2,
        borderColor: '#F4CE14'
    },
    containerDisabled: {
        borderColor: '#FAE994',
        backgroundColor: '#92AAA3'
    },
    buttonText: {
        fontSize: 25,
        color: '#EDEFEE',
        fontWeight: '600',
    },
    textDisabled: {
        color: '#E6E6E6'
    }
})

export default Button;