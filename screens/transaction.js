import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import { Image } from "react-native";
import db from "../config";
import firebase from "firebase";

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
      bookName: "",
      studentName: "",
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

  //Iago - 4
  handleTransaction = async () => {
    //gerenciar as transações
    var { bookId, studentId } = this.state;
    await this.getBookDatails(bookId);
    await this.getStudentDatails(studentId);

    var { studentName, bookName } = this.state;

    db.collection("books")
      .doc(bookId)
      .get()
      .then((doc) => {
        var book = doc.data();
        if (book.is_book_available) {
          this.initiateBookIssue(bookId,studentId,bookName,studentName);
          Alert.alert("Voce retirou o livro com sucesso!")
        } else {
          this.initiateBookReturn(bookId,studentId,bookName,studentName);
          Alert.alert("O livro foi devolvido com sucesso!");
        }
      });
  };

  getBookDatails = (bookId) => {
    bookId = bookId.trim().toLowerCase();
    db.collection("books")
      .where("book_id", "==", bookId)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({ bookName: doc.data().book_name });
        });
      });
  };

  getStudentDatails = (studentId) => {
    studentId = studentId.trim().toLowerCase();
    db.collection("students")
      .where("student_id", "==", studentId)
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          this.setState({ studentName: doc.data().student_name });
        });
      });
  };

  //criar função para retirada - Francesco - 1
  initiateBookIssue = (bookId, studentId, bookName, studentName) => {
    //adicionar nova transação
    db.collection("transactions").add({
      student_id: studentId,
      student_name: studentName,
      book_id: bookId,
      book_name: bookName,
      date: firebase.firestore.Timestamp.now().toDate(),
      transaction_type: "issue",
    });

    //alterar o status do livro
    db.collection("books").doc(bookId).update({
      is_book_available: false,
    });

    //alterar quantidade de livos no aluno
    db.collection("students")
      .doc(studentId)
      .update({
        number_of_books_issued: firebase.firestore.FieldValue.increment(1),
      });

    //atualizar os estados para vazio
    this.setState({
      bookId: "",
      studentId: "",
    });
  };

  //criar função para devolução - Alexandre - 2

  initiateBookReturn = (bookId, studentId, bookName, studentName) => {
    //adicionar nova transação
    db.collection("transactions").add({
      student_id: studentId,
      student_name: studentName,
      book_id: bookId,
      book_name: bookName,
      date: firebase.firestore.Timestamp.now().toDate(),
      transaction_type: "return",
    });

    //alterar o status do livro
    db.collection("books").doc(bookId).update({
      is_book_available: true,
    });

    //alterar quantidade de livos no aluno
    db.collection("students")
      .doc(studentId)
      .update({
        number_of_books_issued: firebase.firestore.FieldValue.increment(-1),
      });

    //João Pedro editar os textImput - 3
    this.setState({
      bookId: "",
      studentId: "",
    });
  };
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
            <Image source={appIcon} style={styles.appIcon} />
            <Image source={appName} style={styles.appName} />
          </View>
          <View style={styles.lowerContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={"id do Livro"}
                placeholderTextColor={"#fff"}
                onChangeText={(text) =>
                  this.setState({
                    bookId: text,
                  })
                }
                value={bookId}
              />
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => this.getCameraPermission("bookId")}
              >
                <Text style={styles.scanButtonText}>scan</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder={"id do Aluno"}
                placeholderTextColor={"#fff"}
                onChangeText={(text) =>
                  this.setState({
                    studentId: text,
                  })
                }
                value={studentId}
              />
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => this.getCameraPermission("studentId")}
              >
                <Text style={styles.scanButtonText}>scan</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.button, { marginTop: 25 }]}
              onPress={() => this.handleTransaction()}
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
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    // fontFamily: "Rajdhani_600SemiBold"
  },
});
