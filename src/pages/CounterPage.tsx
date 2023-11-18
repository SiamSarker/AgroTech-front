import React, { useState } from "react";
import { Button, Text, View, StyleSheet, Vibration } from "react-native";

const CounterPage = (props: any) => {
    let [counter, setCounter] = useState(0);

    console.log("Current Value: ", counter)

    const increaseHandler = () => {
        Vibration.vibrate(100);
        setCounter(counter + 1)
    }

    const decreaseHandler = () => {
        Vibration.vibrate(100);
        setCounter(counter - 1)
    }
    const resetHandler = () => {
        Vibration.vibrate(100);
        setCounter(0)
    }

    const navHandler = () => {
        props.navigation.navigate("Login");
    }

    return (
        <View style={style.mainContainer}>
            <Text style={style.counterContainer}>{counter}</Text>
            <View style={style.buttonContainer}>
                <Button title='Increase' onPress={increaseHandler}></Button>
                <Button title='Decrease' onPress={decreaseHandler}></Button>
                <Button title='Reset' onPress={resetHandler}></Button>
            </View>
            <View>
                <Button title='LOGIN' onPress={navHandler}></Button>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    counterContainer: {
        fontWeight: "700",
        color: "red",
        height: 40,
        margin: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonLeft: {
        height: 30,
        width: 60,
    },
    buttonRight: {
        height: 30,
        width: 60,
    }

})


export default CounterPage;