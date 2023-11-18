import axios from "axios";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput,Button } from 'react-native';


const NationalizePage = () => {
    const [nationality, setNationality] = useState('BD');
    const [userName, setuserName] = useState('Siam');

    const handleSubmit = () => {
        axios.get(`https://api.nationalize.io/?name=${userName}`).then((res)=>{
            if(res.data.country.length)
            {
                setNationality(res.data.country[0]['country_id']);
            }
        }
    );
    };

    return(
        <View style={style.mainContainer}>
            <Text style={style.mainText}>
                {nationality}
            </Text>
            <View>
                <TextInput style={style.inputStyle} value={userName} onChangeText={setuserName}></TextInput>
            </View>
            <Button title='Submit' onPress={handleSubmit}></Button>
        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    mainText: {
        fontSize: 60,
        fontWeight: "500",
        color: "red"
    },
    inputStyle: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200, 
        borderRadius: 4
    }
}
)

export default NationalizePage;