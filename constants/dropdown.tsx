
export const referanceRelations = [
  { title: "Friend", value: "Friend" },
  { title: "Brother", value: "Brother" },
  { title: "Sister", value: "Sister" },
  { title: "Uncle", value: "Uncle" }
];
export const employmentType = [
  { title: "W2 with Benefits", value: "W2 with Benefits" },
  { title: "W2 Non-Benefits", value: "W2 Non-Benefits" },
  { title: "Corp-to-Corp", value: "Corp-to-Corp" }
];
export const workType = [
  { title: "Hourly", value: "Hourly" },
  { title: "Yearly", value: "Yearly" }
];
export const availabilityType = [
  { title: "Immediate", value: "Immediate" },
  { title: "One-week notice", value: "One-week notice" },
  { title: "Two weeks’ notice", value: "Two weeks’ notice" },
  { title: "Three-weeks’ notice", value: "Three-weeks’ notice" },
  { title: "One-month notice", value: "One-month notice" }
];
export const scType = [
  { title: "Yes", value: "Yes" },
  { title: "No", value: "No" }
];
export const tpType = [
  { title: "Yes", value: "Yes" },
  { title: "No", value: "No" },
  { title: "Partial", value: "Partial" }
];
export const openToRelocate = [
  { title: "Yes", value: "Yes" },
  { title: "No", value: "No" }
];
export const yearOfCompletion = [];
for (var i = 1947; i < new Date().getFullYear(); i++) {
  yearOfCompletion.push({ title: i, value: i });
}
