import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState<string | null>(null);
  const [building, setBuilding] = useState<string | null>(null);
  const [genderOpen, setGenderOpen] = useState(false);
  const [buildingOpen, setBuildingOpen] = useState(false);

  const genderOptions = [
    { label: "Nam", value: "male" },
    { label: "Nữ", value: "female" },
    { label: "Khác", value: "other" },
  ];

  const buildingOptions = [
    { label: "Tòa nhà A", value: "A" },
    { label: "Tòa nhà B", value: "B" },
    { label: "Tòa nhà C", value: "C" },
  ];

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthdate(selectedDate);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Ngày sinh";
    return date.toLocaleDateString("vi-VN");
  };

  const handleConfirm = () => {
    if (!username || !birthdate || !gender) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin!");
      return;
    }

    Alert.alert("Thông báo", "Thông tin đã được lưu!");
    router.push("/signUp");
  };

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <Pressable style={styles.backButton} onPress={() => router.push("/signIn")}>
        <Image
          source={require("../assets/images/back.png")}
          style={styles.backIcon}
        />
      </Pressable>

      {/* Tiêu đề */}
      <Text style={styles.title}>Thông tin</Text>
      <Text style={styles.description}>
        Thông tin này giúp mọi người có thể kết nối với bạn dễ dàng hơn.
      </Text>

      {/* Tên người dùng */}
      <View style={styles.inputWrapper}>
        <Image
          source={require("../assets/images/user.png")}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Tên người dùng"
          value={username}
          onChangeText={setUsername}
        />
      </View>

{/* Ngày sinh */}
<Pressable style={styles.inputWrapper} onPress={() => setShowDatePicker(true)}>
  <Image
    source={require("../assets/images/calendar.png")}
    style={styles.icon}
  />
  <Text style={birthdate ? styles.inputText : styles.placeholderText}>
    {birthdate ? formatDate(birthdate) : "Ngày sinh"}
  </Text>
</Pressable>

{showDatePicker && (
  <DateTimePicker
    value={birthdate || new Date()}
    mode="date"
    display={Platform.OS === "ios" ? "spinner" : "default"}
    onChange={handleDateChange}
  />
)}


<View style={[styles.dropdownWrapper, { zIndex: 2000 }]}>
  <Image
    source={require("../assets/images/gender.png")}
    style={styles.icon}
  />
  <View style={{ flex: 1 }}>
  <DropDownPicker
  open={genderOpen}
  value={gender}
  items={genderOptions}
  setOpen={setGenderOpen}
  setValue={setGender}
  placeholder="Giới tính"
  style={styles.dropdown} // Đảm bảo chiếm đủ chiều rộng
  dropDownContainerStyle={styles.dropdownContainer}
  listMode="SCROLLVIEW" // Đảm bảo hiển thị dropdown tốt trên các thiết bị
/>
  </View>


</View>

<View style={[styles.dropdownWrapper, { zIndex: 1000 }]}>
  <Image
    source={require("../assets/images/cluster.png")}
    style={styles.icon}
  />
  <View style={{ flex: 1 }}>
  <DropDownPicker
    open={buildingOpen}
    value={building}
    items={buildingOptions}
    setOpen={setBuildingOpen}
    setValue={setBuilding}
    placeholder="Tòa nhà"
    style={styles.dropdown}
    dropDownContainerStyle={styles.dropdownContainer}
  />
  </View>

</View>


      {/* Nút Xác nhận */}
      <Pressable style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Xác nhận</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  backButton: {
    marginBottom: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 50,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  placeholderText: {
    flex: 1,
    fontSize: 16,
    color: "#aaa", // Placeholder nhạt
  },
  dropdownWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  dropdown: {
    borderWidth: 0,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignUp;

