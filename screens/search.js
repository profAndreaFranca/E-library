import React from "react";
import { Text, View, StyleSheet } from "react-native";


export default class Search extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize:20}}>
                    Search
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