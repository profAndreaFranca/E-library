import React from "react";
import { Text, View, StyleSheet } from "react-native";


export default class Transaction extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize:20}}>
                    Transaction
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#5654d9"
    }
})