export const yearOfCompletion = [];
export const referanceRelations = [
  { title: "Friend", value: "Friend" },
  { title: "Brother", value: "Brother" },
  { title: "Sister", value: "Sister" },
  { title: "Uncle", value: "Uncle" }
];

for (var i = 1947; i < new Date().getFullYear(); i++) {
  yearOfCompletion.push({ title: i, value: i });
}

