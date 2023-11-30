import React from "react";
import { Text, View, StyleSheet, TouchableOpacity,TextInput,ImageBackground } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";

const bgimage =require("../assets/background2.png")

export default class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      domState: "normal", //estado de modo
      hasCameraPermissions: null, //verifica se tem permissão para usar a camera
      scanned: false, //ja fez o scanner ou não
      scannerData: "", //receber o dado escaneado
      bookId:"",
      studentId:"",


    };
  }

  getCameraPermission = async (donState) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions: status == "granted",
      donState: donState,
      scanned: false,
    });
  };
  handlebarCodeScanner = async ({ type, data }) => {
    const {domState} = this.state
    if(domState == 'bookId'){  
      this.setState({
        bookId: data,
        donState: "normal",
        scanned: true,
    });
  } else if (domState == 'studentId'){
    this.setState({
      studentId: data,
      donState: "normal",
      scanned: true,
    });
  }
  };
  render() {
    const { domState, hasCameraPermissions, scannerData, scanned, bookId, studentId } = this.state;
    if (domState == "scanner") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handlebarCodeScanner}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground style = {styles.bgImage} source = {bgimage}>
<View style = {styles.textinputContainer}>
<TextInput
style = {styles.textinput}
placeholder = {"id do aluno"}
placeholderTextColor = {"#fff"}
value = {studentId}
/>
<TouchableOpacity style={styles.scanButton} onPress = {()=>this.getCameraPermission("studentId")}>
<Text style = {styles.scanbuttonText}>
  scan
</Text>
</TouchableOpacity>
<TextInput
style = {styles.textinput}
placeholder = {"id do livro"}
placeholderTextColor = {"#fff"}
value = {bookId}
/>
<TouchableOpacity style={styles.scanButton} onPress = {()=>this.getCameraPermission("bookId")}>
<Text style = {styles.scanbuttonText}>
  scan
</Text>
</TouchableOpacity>
</View>
</ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF"
    },
    lowerContainer: {
      flex: 0.5,
      alignItems: "center"
    },
    textinputContainer: {
      borderWidth: 2,
      borderRadius: 10,
      flexDirection: "row",
      backgroundColor: "#9DFD24",
      borderColor: "#FFFFFF"
    },
    textinput: {
      width: "57%",
      height: 50,
      padding: 10,
      borderColor: "#FFFFFF",
      borderRadius: 10,
      borderWidth: 3,
      fontSize: 18,
      backgroundColor: "#5653D4",
      color: "#FFFFFF"
    },
    scanbutton: {
      width: 100,
      height: 50,
      backgroundColor: "#9DFD24",
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      justifyContent: "center",
      alignItems: "center"
    },
    scanbuttonText: {
      fontSize: 24,
      color: "#0A0101",
    }
   
     
   });
