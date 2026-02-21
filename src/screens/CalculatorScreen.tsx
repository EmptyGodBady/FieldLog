import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import BaseLayout from "../components/BaseLayout";
import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { useTheme } from "../theme/ThemeProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Shift } from "../types";

export default function CalculatorScreen() {
  const { theme } = useTheme();
  const today = new Date();

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const [openMonthPicker, setOpenMonthPicker] = useState(false);
  const [pickedMonth, setPickedMonth] = useState<number | null>(currentMonth);
  const [month, setMonth] = useState(
    Array.from({ length: 12 }).map((_, i) => ({
      label: new Date(0, i).toLocaleString("en", { month: "long" }),
      value: i,
    })),
  );

  const [openYearPicker, setOpenYearPicker] = useState(false);
  const [pickedYear, setPickedYear] = useState<number | null>(currentYear);
  const [year, setYear] = useState([
    { label: "2025", value: 2025 },
    { label: "2026", value: 2026 },
  ]);

  const [extraHours, setExtraHours] = useState("0");
  const [extraMinutes, setExtraMinutes] = useState("0");
  const [rate, setRate] = useState("31.4");

  const [totalHours, setTotalHours] = useState(0);
  const [earnings, setEarnings] = useState(0);

  const calculate = async () => {
    if (pickedMonth === null || pickedYear === null) return;

    const stored = await AsyncStorage.getItem("shifts-data");
    const shifts: Shift[] = stored ? JSON.parse(stored) : [];

    let hours = 0;

    shifts.forEach((shift) => {
      const d = new Date(shift.date);
      if (
        d.getMonth() === Number(pickedMonth) &&
        d.getFullYear() === Number(pickedYear)
      ) {
        const [startH, startM] = shift.startTime.split(":").map(Number);
        const [endH, endM] = shift.endTime.split(":").map(Number);

        let shiftHours = endH - startH;

        hours += shiftHours;
      }
    });

    const extraH = Number(extraHours) || 0;
    const extraM = Number(extraMinutes) || 0;
    if (extraM === 30) hours += 0.5;
    hours += extraH;

    setTotalHours(hours);

    const rateNum = Number(rate) || 0;
    setEarnings(hours * rateNum);
  };

  useEffect(() => {
    calculate();
  }, [pickedMonth, pickedYear, extraHours, extraMinutes, rate]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <BaseLayout align="stretch">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 32,
              marginTop: 16,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: theme.colors.primary,
                borderRadius: 16,
                backgroundColor: theme.colors.background,
              }}
              open={openMonthPicker}
              value={pickedMonth}
              items={month}
              setOpen={setOpenMonthPicker}
              setValue={setPickedMonth}
              setItems={setMonth}
              placeholder="Month"
              containerStyle={{ width: "40%" }}
              dropDownContainerStyle={{
                borderColor: theme.colors.primary,
                borderRadius: 16,
                backgroundColor: theme.colors.background,
              }}
              textStyle={{ fontSize: 24, color: theme.colors.textPrimary }}
            />
            <DropDownPicker
              style={{
                borderColor: theme.colors.primary,
                borderRadius: 16,
                backgroundColor: theme.colors.background,
              }}
              open={openYearPicker}
              value={pickedYear}
              items={year}
              setOpen={setOpenYearPicker}
              setValue={setPickedYear}
              setItems={setYear}
              placeholder="Year"
              containerStyle={{ width: "40%" }}
              dropDownContainerStyle={{
                borderColor: theme.colors.primary,
                borderRadius: 16,
                backgroundColor: theme.colors.background,
              }}
              textStyle={{ fontSize: 24, color: theme.colors.textPrimary }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              columnGap: 32,
            }}
          >
            <View style={{ height: 50, width: "40%" }}>
              <Text
                style={{
                  marginTop: 16,
                  color: theme.colors.textPrimary,
                }}
              >
                Extra hours
              </Text>
              <TextInput
                placeholder="Extra Hours"
                keyboardType="numeric"
                value={extraHours}
                onChangeText={setExtraHours}
                style={{
                  color: theme.colors.textPrimary,
                  height: 50,
                  paddingHorizontal: 12,
                  borderWidth: 1,
                  borderRadius: 16,
                  borderColor: theme.colors.primary,
                  fontSize: 24,
                }}
              />
            </View>
            <View style={{ height: 50, width: "40%" }}>
              <Text
                style={{
                  marginTop: 16,
                  color: theme.colors.textPrimary,
                }}
              >
                Extra minutes
              </Text>
              <TextInput
                placeholder="Extra Minutes"
                keyboardType="numeric"
                value={extraMinutes}
                onChangeText={(v) => {
                  setExtraMinutes(v);
                }}
                style={{
                  color: theme.colors.textPrimary,
                  height: 50,
                  paddingHorizontal: 12,
                  borderWidth: 1,
                  borderRadius: 16,
                  borderColor: theme.colors.primary,
                  fontSize: 24,
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 32,
            }}
          >
            <View style={{ height: 50, width: "40%" }}>
              <Text
                style={{
                  marginTop: 16,
                  color: theme.colors.textPrimary,
                }}
              >
                Rate
              </Text>
              <TextInput
                placeholder="Rate"
                value={rate}
                onChangeText={setRate}
                style={{
                  color: theme.colors.textPrimary,
                  height: 50,
                  paddingHorizontal: 12,
                  borderWidth: 1,
                  borderRadius: 16,
                  borderColor: theme.colors.primary,
                  fontSize: 24,
                }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 32,
              marginTop: 32,
            }}
          >
            <View
              style={{
                height: 50,
                paddingHorizontal: 12,
                width: "40%",
                borderWidth: 1,
                borderRadius: 16,
                borderColor: theme.colors.primary,
                marginTop: 16,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 24, color: theme.colors.textPrimary }}>
                Total Hours: {totalHours}
              </Text>
            </View>
            <View
              style={{
                height: 50,
                width: "45%",
                borderWidth: 1,
                borderRadius: 16,
                borderColor: theme.colors.primary,
                marginTop: 16,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 24, color: theme.colors.textPrimary }}>
                Earnings: {earnings.toFixed(2)}zł
              </Text>
            </View>
          </View>
          {/* Result */}
          <View style={{ marginTop: 32, alignItems: "center" }}>
            <Text
              style={{ fontSize: 24, color: theme.colors.textPrimary }}
            ></Text>
          </View>
        </BaseLayout>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
