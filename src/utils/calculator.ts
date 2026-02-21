export const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const calculateShiftDuration = (start: string, end: string) => {
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);

  return endMinutes - startMinutes;
};

export const calculateMonthlyHours = (
  shifts: { date: string; startTime: string; endTime: string }[],
  month: number, // 0-11
  year: number,
) => {
  let totalMinutes = 0;

  shifts.forEach((shift) => {
    const shiftDate = new Date(shift.date);

    if (shiftDate.getMonth() === month && shiftDate.getFullYear() === year) {
      totalMinutes += calculateShiftDuration(shift.startTime, shift.endTime);
    }
  });

  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };
};
