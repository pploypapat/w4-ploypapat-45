import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [fruit, setFruit] = useState("");

  useEffect(() => {
    loadFruit();
  }, []);

  async function saveFruit() {
    if (text.trim() === "") return;
    await AsyncStorage.setItem("fruit", text);
    setFruit(text);
    setText("");
  }

  async function loadFruit() {
    const data = await AsyncStorage.getItem("fruit");
    if (data) setFruit(data);
  }

  async function removeFruit() {
    await AsyncStorage.removeItem("fruit");
    setFruit("");
  }

  return (
    <SafeAreaView style={myStyles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={myStyles.header}>
        <Text style={myStyles.headerEmoji}>🍎</Text>
        <Text style={myStyles.headerTitle}>Fruit Tracker</Text>
      </View>

      <View style={myStyles.card}>
        <Text style={myStyles.label}>ผลไม้ที่บันทึกไว้ตอนนี้:</Text>
        
        {/* ส่วนแสดงผลไม้ที่เน้นให้เหมือนป้ายชื่อ */}
        <View style={myStyles.fruitBadge}>
          <Text style={myStyles.fruitText}>
            {fruit ? fruit : "รอเพิ่มข้อมูล..."}
          </Text>
        </View>

        <View style={myStyles.inputContainer}>
          <TextInput 
            style={myStyles.input}  
            placeholderTextColor="#A0AEC0"
            value={text} 
            onChangeText={setText}
          />
        </View>

        <View style={myStyles.buttonGroup}>
          <TouchableOpacity 
            style={[myStyles.button, myStyles.saveBtn]} 
            onPress={saveFruit}
            activeOpacity={0.7}
          >
            <Text style={myStyles.buttonText}>เพิ่มผลไม้</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[myStyles.button, myStyles.removeBtn]} 
            onPress={removeFruit}
            activeOpacity={0.7}
          >
            <Text style={myStyles.buttonText}>ล้างข้อมูล</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={myStyles.footerText}>แอปบันทึกรายชื่อผลไม้ v1.0</Text>
    </SafeAreaView>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF7", // ครีมอ่อน
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerEmoji: {
    fontSize: 44,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2F855A", // เขียวผลไม้
  },

  card: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },

  label: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 8,
    textAlign: "center",
  },

  fruitBadge: {
    backgroundColor: "#F0FFF4", // เขียวอ่อน
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
  },

  fruitText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2F855A",
  },

  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    textAlign: "center",
    color: "#2D3748",
  },

  buttonGroup: {
    gap: 10,
  },

  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  saveBtn: {
    backgroundColor: "#48BB78", // เขียวสด
  },

  removeBtn: {
    backgroundColor: "#ED8936", // ส้มผลไม้
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  footerText: {
    marginTop: 16,
    fontSize: 12,
    color: "#A0AEC0",
  },
});
