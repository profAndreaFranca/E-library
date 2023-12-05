import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import { Image } from "react-native";
import db from "../config"

const bgImage = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");
const appName = require("../assets/appName.png");

export default class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      domState: "normal", //estado de modo
      hasCameraPermissions: null, //verifica se tem permissão para usar a camera
      scanned: false, //ja fez o scanner ou não
      scannerData: "", //receber o dado escaneado
      bookId: "",
      studentId: "",
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
    const { domState } = this.state;
    if (domState == "bookId") {
      this.setState({
        bookId: data,
        donState: "normal",
        scanned: true,
      });
    } else if (domState == "studentId") {
      this.setState({
        studentId: data,
        donState: "normal",
        scanned: true,
      });
    }
  };

  handleTransaction = ()=>{ //gerenciar as transações

  }


  render() {
    const {
      domState,
      hasCameraPermissions,
      scannerData,
      scanned,
      bookId,
      studentId,
    } = this.state;
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
        <ImageBackground style={styles.bgImage} source={bgImage}>
          <View style={styles.upperContainer}>
            <Image source={appIcon} style = {styles.appIcon}/>
            <Image source={appName} style = {styles.appName}/>
          </View>
          <View style={styles.lowerContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={"id do aluno"}
                placeholderTextColor={"#fff"}
                value={studentId}
              />
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => this.getCameraPermission("studentId")}
              >
                <Text style={styles.scanButtonText}>scan</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={"id do livro"}
                placeholderTextColor={"#fff"}
                value={bookId}
              />
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => this.getCameraPermission("bookId")}
              >
                <Text style={styles.scanButtonText}>scan</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style = {[styles.button,{marginTop:25}]}
              onPress = {()=> this.handleTransaction()}
            >
              <Text style={styles.buttonText}>Enviar</Text>
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
    backgroundColor: "#FFFFFF",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80,
  },
  appName: {
    width: 180,
    resizeMode: "contain",
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: "center",
  },
  textInputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF",
  },
  textInput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    color: "#FFFFFF",
  },
  scanButton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  scanButtonText: {
    fontSize: 20,
    color: "#0A0101",
  },
  button: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F48D20",
    borderRadius: 15
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    // fontFamily: "Rajdhani_600SemiBold"
  }
});
