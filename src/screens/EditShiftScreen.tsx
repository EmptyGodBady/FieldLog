import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeProvider";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList, Shift } from "../types";
import { v4 as uuidv4 } from "uuid";
import { TimerPickerModal } from "react-native-timer-picker";

type RouteProps = RouteProp<RootStackParamList, "EditShift">;

export default function EditShiftScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();

  const { date } = route.params;

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [coworker, setCoworker] = useState("");

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    const loadExistingShift = async () => {
      const stored = await AsyncStorage.getItem("shifts-data");
      if (!stored) return;

      const shifts: Shift[] = JSON.parse(stored);
      const existing = shifts.find((s) => s.date === date);

      if (existing) {
        setStartTime(existing.startTime);
        setEndTime(existing.endTime);
        setCoworker(existing.coworker!);
      }
    };

    loadExistingShift();
  }, [date]);

  const saveShift = async () => {
    const newShift: Shift = {
      id: uuidv4(),
      date,
      startTime,
      endTime,
      coworker,
    };

    const stored = await AsyncStorage.getItem("shifts-data");
    const shifts: Shift[] = stored ? JSON.parse(stored) : [];

    const updated = [...shifts.filter((s) => s.date !== date), newShift];

    await AsyncStorage.setItem("shifts-data", JSON.stringify(updated));

    navigation.goBack();
  };
  const formatTime = ({
    hours,
    minutes,
  }: {
    hours?: number;
    minutes?: number;
  }) => {
    const timeParts = [];

    if (hours !== undefined) {
      timeParts.push(hours.toString().padStart(2, "0"));
    }
    if (minutes !== undefined) {
      timeParts.push(minutes.toString().padStart(2, "0"));
    }

    return timeParts.join(":");
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          marginBottom: 20,
          color: theme.colors.textPrimary,
        }}
      >
        {date}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowStartPicker(true)}
        >
          <View style={{ alignItems: "center" }}>
            {startTime !== "" ? (
              <Text style={{ color: theme.colors.textPrimary, fontSize: 32 }}>
                {startTime}
              </Text>
            ) : (
              <Text style={{ color: theme.colors.textPrimary, fontSize: 32 }}>
                00:00
              </Text>
            )}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowStartPicker(true)}
            >
              <View style={{ marginTop: 30 }}>
                {startTime === "" ? (
                  <Text
                    style={{
                      padding: 12,
                      marginBottom: 12,
                      borderWidth: 1,
                      borderRadius: 12,
                      fontSize: 16,
                      overflow: "hidden",
                      borderColor: theme.colors.primary,
                      color: theme.colors.textPrimary,
                    }}
                  >
                    Start time
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TimerPickerModal
          closeOnOverlayPress
          modalTitle="Set Start"
          hideSeconds
          onCancel={() => setShowStartPicker(false)}
          onConfirm={(pickedDuration) => {
            setStartTime(formatTime(pickedDuration));
            setShowStartPicker(false);
          }}
          setIsVisible={setShowStartPicker}
          styles={{
            backgroundColor: theme.colors.background,
            text: { color: theme.colors.textPrimary },
          }}
          visible={showStartPicker}
        />

        <Text style={{ color: theme.colors.textPrimary, fontSize: 32 }}>-</Text>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowEndPicker(true)}
        >
          <View style={{ alignItems: "center" }}>
            {endTime !== "" ? (
              <Text style={{ color: theme.colors.textPrimary, fontSize: 32 }}>
                {endTime}
              </Text>
            ) : (
              <Text style={{ color: theme.colors.textPrimary, fontSize: 32 }}>
                00:00
              </Text>
            )}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowEndPicker(true)}
            >
              <View style={{ marginTop: 30 }}>
                {endTime === "" ? (
                  <Text
                    style={{
                      padding: 12,
                      marginBottom: 12,
                      borderWidth: 1,
                      borderRadius: 12,
                      fontSize: 16,
                      overflow: "hidden",
                      borderColor: theme.colors.primary,
                      color: theme.colors.textPrimary,
                    }}
                  >
                    End time
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TimerPickerModal
          closeOnOverlayPress
          modalTitle="Set End"
          hideSeconds
          onCancel={() => setShowEndPicker(false)}
          onConfirm={(pickedDuration) => {
            setEndTime(formatTime(pickedDuration));
            setShowEndPicker(false);
          }}
          setIsVisible={setShowEndPicker}
          styles={{
            backgroundColor: theme.colors.background,
            text: { color: theme.colors.textPrimary },
          }}
          visible={showEndPicker}
        />
      </View>

      <TextInput
        placeholder="Coworker"
        value={coworker}
        onChangeText={setCoworker}
        style={{
          borderWidth: 1,
          borderRadius: 12,
          padding: 12,
          marginBottom: 20,
          borderColor: theme.colors.primary,
          color: theme.colors.textPrimary,
        }}
        placeholderTextColor={theme.colors.textSecondary}
      />

      <TouchableOpacity
        onPress={saveShift}
        style={{
          backgroundColor: theme.colors.primary,
          padding: 16,
          borderRadius: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.colors.background, fontWeight: "600" }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
}
