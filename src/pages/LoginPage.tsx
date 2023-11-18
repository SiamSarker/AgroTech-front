import { Button, Text, View, StyleSheet } from "react-native";

const LoginPage = (props: any) => {
    
    const navHandler = () => {
        props.navigation.navigate("Counter");
    }

    return (
        <View style={style.mainContainer}>
            <Text>Hello TO THE NEW PAGE</Text>
            <View>
                <Button title='BACK' onPress={navHandler}></Button>
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


export default LoginPage;