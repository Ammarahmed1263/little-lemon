import { Pressable,StyleSheet,Text } from "react-native";
import { useState } from 'react'

const Button = ({title, disabled, style, disabledStyle, highlightColor, ...props}) => {
    const [pressed, setPressed] = useState(false);

    const handlePressIn = () => {
        setPressed(true);
    };

    const handlePressOut = () => {
        setPressed(false);
    };

    const buttonStyles = [
        disabled ? disabledStyle : 
        {...style, backgroundColor: pressed ? highlightColor : 
            (style?.backgroundColor ? style.backgroundColor : "#495E57")}
    ];
       

    return (
        <Pressable 
            style={buttonStyles}
            onPressIn={handlePressIn} 
            onPressOut={handlePressOut}
            {...props}
        >
            <Text style={[styles.buttonText, disabled && styles.textDisabled]}>{title}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
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