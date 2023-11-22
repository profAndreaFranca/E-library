import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions"


export default class Transaction extends React.Component{
    constructor(){
        super()
        this.state ={
            domState: "normal", //estado de modo
            hasCameraPermissions: null, //verifica se tem permissão para usar a camera
            scanned:false, //ja fez o scanner ou não
            scannerData:"", //receber o dado escaneado
        }
    }

    getCameraPermission = async (donState) => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)

        this.setState({
            hasCameraPermissions: status == "granted",
            donState:donState,
            scanned:false
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize:20}}>
                    Transaction
                </Text>
                <TouchableOpacity
                    onPress={()=> this.getCameraPermission("scanner")}
                >
                    <Text>Digitalizar QRCode</Text>
                </TouchableOpacity>
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