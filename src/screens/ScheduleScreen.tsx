import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "../theme/ThemeProvider";
import { useCallback, useState } from "react";
import { RootStackParamList, Shift } from "../types";
import BaseLayout from "../components/BaseLayout";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { calculateMonthlyHours } from "../utils/calculator";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Schedule">;

export default function ScheduleScreen() {
  const { theme, isDark } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  // const [calc, setCalc] = useState<number>();

  const [shifts, setShifts] = useState<Shift[]>([]);
  useFocusEffect(
    useCallback(() => {
      const loadShifts = async () => {
        const stored = await AsyncStorage.getItem("shifts-data");
        if (stored) {
          setShifts(JSON.parse(stored));
        }
      };

      loadShifts();
      // testCalculation();
    }, []),
  );
  // const now = new Date();

  // const testCalculation = async () => {
  //   const stored = await AsyncStorage.getItem("shifts-data");
  //   const shifts = stored ? JSON.parse(stored) : [];

  //   const result = calculateMonthlyHours(
  //     shifts,
  //     now.getMonth(),
  //     now.getFullYear(),
  //   );
  //   const result = calculateMonthlyHours(
  //     shifts,
  //     1, // февраль (0 = январь)
  //     2026,
  //   );

  //   setCalc(result.hours);
  // };
  return (
    <BaseLayout align="stretch">
      <Calendar
        key={isDark ? "dark" : "light"}
        theme={{
          calendarBackground: theme.colors.background,
          backgroundColor: theme.colors.background,
          dayTextColor: theme.colors.textPrimary,
          monthTextColor: theme.colors.textPrimary,
          arrowColor: theme.colors.primary,

          stylesheet: {
            calendar: {
              header: {
                backgroundColor: theme.colors.background,
              },
            },
          },
        }}
        dayComponent={({ date }) => {
          if (!date) return null;
          const shift = shifts.find((s) => s.date === date.dateString);

          const isToday =
            new Date().toISOString().split("T")[0] === date.dateString;

          return (
            <TouchableOpacity
              onPress={() => {
                console.log("pressed", date.dateString);
                navigation.navigate("EditShift", {
                  date: date.dateString,
                });
              }}
              activeOpacity={0.7}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 10,
                backgroundColor: theme.colors.background,
                margin: 0,
                padding: 0,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: theme.colors.background,
                  borderWidth: isToday ? 2 : 0,
                  borderColor: theme.colors.primary,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textPrimary,
                  }}
                >
                  {date.day}
                </Text>
              </View>

              {shift && (
                <View
                  style={{
                    marginTop: 4,
                    paddingHorizontal: 4,
                    paddingVertical: 1,
                    borderRadius: 6,
                    backgroundColor: theme.colors.background,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 9,
                      color: theme.colors.textPrimary,
                      fontWeight: "600",
                    }}
                  >
                    {shift.startTime}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
      {/* <Text
        style={{
          fontSize: 32,
          color: theme.colors.textPrimary,
          width: "100%",
          paddingHorizontal: "45%",
        }}
      >
        {calc}
      </Text> */}
    </BaseLayout>
  );
}
