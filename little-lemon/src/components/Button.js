import { Pressable,StyleSheet,Text } from "react-native";
import { useState } from 'react'

const Button = ({text, disabled, ...props}) => {
    const [pressed, setPressed] = useState(false);

    const handlePressIn = () => {
        console.log(pressed);
        setPressed(true);
    };

    const handlePressOut = () => {
        console.log(pressed);
        setPressed(false);
    };

    const buttonStyles = [
        styles.container,
        disabled && styles.containerDisabled,
        pressed ? '#F4CE14' : '#495E57',
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
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderWidth: 2,
        borderColor: '#F4CE14'
    },
    containerDisabled: {
        borderColor: '#F8E068',
        backgroundColor: '#67847B'
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600',
    },
    textDisabled: {
        color: '#E6E6E6'
    }
})

export default Button;