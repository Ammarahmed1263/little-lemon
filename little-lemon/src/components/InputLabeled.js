import { View, Text, TextInput } from "react-native";

const InputLabeled = ({label, containerStyle, labelStyle, inputStyle, ...props}) => {

    return(
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                style={inputStyle}
                {...props}
            />
        </View>
    )
}


export default InputLabeled;