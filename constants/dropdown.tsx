import { data as skills } from "./skills";

export const referanceRelations = [
  { title: "Co-Worker or Colleague", value: "Co-Worker or Colleague" },
  { title: "Director", value: "Director" },
  { title: "Lead or Supervisor", value: "Lead or Supervisor" },
  { title: "Manager", value: "Manager" }
];
export const priority = [
  { title: "Low", value: "low" },
  { title: "Normal", value: "normal" },
  { title: "High", value: "high" }
];
export const professionalExpSlider = [
  { value: 0, oValue: 0, label: "no" },
  { value: 20, oValue: 1, label: "1 yr" },
  { value: 40, oValue: 3, label: "3 yr" },
  { value: 60, oValue: 5, label: "5 yr" },
  { value: 80, oValue: 10, label: "10 yr" },
  { value: 100, oValue: 20, label: "20 yr" }
];
export const availabilitySlider = [
  { value: 0, oValue: 0, label: "now" },
  { value: 20, oValue: 1, label: "1 week" },
  { value: 40, oValue: 4, label: "1 mo" },
  { value: 60, oValue: 8, label: "2 mo" },
  { value: 80, oValue: 12, label: "3 mo" },
  { value: 100, oValue: 24, label: "6 mo" }
];
export const backSearchSlider = [
  { value: 0, oValue: 0, label: "Today", tooltip: "Today" },
  { value: 20, oValue: 1, label: "1 mo", tooltip: "1 m" },
  { value: 40, oValue: 3, label: "3 mo", tooltip: "3 m" },
  { value: 60, oValue: 6, label: "6 mo", tooltip: "6 m" },
  { value: 80, oValue: 9, label: "9 mo", tooltip: "9 m" },
  { value: 100, oValue: 12, label: "1 yr", tooltip: "1 y" }
];
export const employmentType = [
  { title: "Corp-to-Corp", value: "Corp-to-Corp" },
  { title: "W2 Non-Benefits", value: "W2 Non-Benefits" },
  { title: "W2 with Benefits", value: "W2 with Benefits" }
];

export const getSkillData = title => {
  var list = [],
    fList = [];

  if (title) {
    list = skills[title.value || title] || [];
  } else {
    for (const item in skills) {
      list = list.concat(skills[item]);
    }
  }
  list.forEach(item => {
    if (item && fList.indexOf(item) === -1) {
      fList.push(item);
    }
  });
  return fList.map(item => ({ title: item, value: item }));
};
export const workType = [
  { title: "Hourly", value: "hourly" },
  { title: "Yearly", value: "yearly" }
];
export const workLocation = [
  { title: "on site", value: "onsite" },
  { title: "remote", value: "remote" }
];
export const employmentWorkingType = [
  { title: "Contract", value: "contract" },
  { title: "Contract to Hire", value: "contract_to_hire" },
  { title: "Fulltime", value: "fulltime" }
];
export const jobListingBoardList = [
  { title: "Carrer Builder", value: "careerbuilder" },
  { title: "Dice", value: "dice" },
  { title: "Glass Door", value: "glassdoor" },
  { title: "Indeed", value: "indeed" },
  { title: "Linkedin", value: "linkedin" },
  { title: "Monster", value: "monster" },
  { title: "Stack Overflow", value: "stackoverflow" },
  { title: "Ziprecruiter", value: "ziprecruiter" }
];
export const availabilityType = [
  { title: "Immediate", value: "Immediate" },
  { title: "One-week notice", value: "One-week notice" },
  { title: "Two weeks’ notice", value: "Two weeks’ notice" },
  { title: "Three-weeks’ notice", value: "Three-weeks’ notice" },
  { title: "One-month notice", value: "One-month notice" }
];
export const scType = [
  { title: "Yes", value: "yes" },
  { title: "No", value: "no" }
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

export const immiStatus = [
  { title: "Green Card", value: "greencard" },
  { title: "H1B", value: "h1b" },
  { title: "H4 EAD", value: "h4ead" },
  { title: "L2 EAD", value: "l2ead" },
  { title: "OPT EAD", value: "optead" },
  { title: "TN Visa", value: "tnvisa" },
  { title: "US Citizen", value: "uscitizen" }
];
export const yearOfCompletion = [];
for (var i = new Date().getFullYear(); i >= 1947; i--) {
  yearOfCompletion.push({ title: i, value: i });
}

export const countries = [
  { title: "USA", value: "USA" },
  { title: "India", value: "IND" }
];

export const USA_STATE = [
  {
    title: "Alabama",
    value: "AL"
  },
  {
    title: "Alaska",
    value: "AK"
  },
  {
    title: "American Samoa",
    value: "AS"
  },
  {
    title: "Arizona",
    value: "AZ"
  },
  {
    title: "Arkansas",
    value: "AR"
  },
  {
    title: "California",
    value: "CA"
  },
  {
    title: "Colorado",
    value: "CO"
  },
  {
    title: "Connecticut",
    value: "CT"
  },
  {
    title: "Delaware",
    value: "DE"
  },
  {
    title: "District Of Columbia",
    value: "DC"
  },
  {
    title: "Federated States Of Micronesia",
    value: "FM"
  },
  {
    title: "Florida",
    value: "FL"
  },
  {
    title: "Georgia",
    value: "GA"
  },
  {
    title: "Guam Gu",
    value: "GU"
  },
  {
    title: "Hawaii",
    value: "HI"
  },
  {
    title: "Idaho",
    value: "ID"
  },
  {
    title: "Illinois",
    value: "IL"
  },
  {
    title: "Indiana",
    value: "IN"
  },
  {
    title: "Iowa",
    value: "IA"
  },
  {
    title: "Kansas",
    value: "KS"
  },
  {
    title: "Kentucky",
    value: "KY"
  },
  {
    title: "Louisiana",
    value: "LA"
  },
  {
    title: "Maine",
    value: "ME"
  },
  {
    title: "Marshall Islands",
    value: "MH"
  },
  {
    title: "Maryland",
    value: "MD"
  },
  {
    title: "Massachusetts",
    value: "MA"
  },
  {
    title: "Michigan",
    value: "MI"
  },
  {
    title: "Minnesota",
    value: "MN"
  },
  {
    title: "Mississippi",
    value: "MS"
  },
  {
    title: "Missouri",
    value: "MO"
  },
  {
    title: "Montana",
    value: "MT"
  },
  {
    title: "Nebraska",
    value: "NE"
  },
  {
    title: "Nevada",
    value: "NV"
  },
  {
    title: "New Hampshire",
    value: "NH"
  },
  {
    title: "New Jersey",
    value: "NJ"
  },
  {
    title: "New Mexico",
    value: "NM"
  },
  {
    title: "New York",
    value: "NY"
  },
  {
    title: "North Carolina",
    value: "NC"
  },
  {
    title: "North Dakota",
    value: "ND"
  },
  {
    title: "Northern Mariana Islands",
    value: "MP"
  },
  {
    title: "Ohio",
    value: "OH"
  },
  {
    title: "Oklahoma",
    value: "OK"
  },
  {
    title: "Oregon",
    value: "OR"
  },
  {
    title: "Palau",
    value: "PW"
  },
  {
    title: "Pennsylvania",
    value: "PA"
  },
  {
    title: "Puerto Rico",
    value: "PR"
  },
  {
    title: "Rhode Island",
    value: "RI"
  },
  {
    title: "South Carolina",
    value: "SC"
  },
  {
    title: "South Dakota",
    value: "SD"
  },
  {
    title: "Tennessee",
    value: "TN"
  },
  {
    title: "Texas",
    value: "TX"
  },
  {
    title: "Utah",
    value: "UT"
  },
  {
    title: "Vermont",
    value: "VT"
  },
  {
    title: "Virgin Islands",
    value: "VI"
  },
  {
    title: "Virginia",
    value: "VA"
  },
  {
    title: "Washington",
    value: "WA"
  },
  {
    title: "West Virginia",
    value: "WV"
  },
  {
    title: "Wisconsin",
    value: "WI"
  },
  {
    title: "Wyoming",
    value: "WY"
  }
];

export const INDIA_STATE = [
  {
    value: "AN",
    title: "Andaman and Nicobar Islands"
  },
  {
    value: "AP",
    title: "Andhra Pradesh"
  },
  {
    value: "AR",
    title: "Arunachal Pradesh"
  },
  {
    value: "AS",
    title: "Assam"
  },
  {
    value: "BR",
    title: "Bihar"
  },
  {
    value: "CG",
    title: "Chandigarh"
  },
  {
    value: "CH",
    title: "Chhattisgarh"
  },
  {
    value: "DH",
    title: "Dadra and Nagar Haveli"
  },
  {
    value: "DD",
    title: "Daman and Diu"
  },
  {
    value: "DL",
    title: "Delhi"
  },
  {
    value: "GA",
    title: "Goa"
  },
  {
    value: "GJ",
    title: "Gujarat"
  },
  {
    value: "HR",
    title: "Haryana"
  },
  {
    value: "HP",
    title: "Himachal Pradesh"
  },
  {
    value: "JK",
    title: "Jammu and Kashmir"
  },
  {
    value: "JH",
    title: "Jharkhand"
  },
  {
    value: "KA",
    title: "Karnataka"
  },
  {
    value: "KL",
    title: "Kerala"
  },
  {
    value: "LD",
    title: "Lakshadweep"
  },
  {
    value: "MP",
    title: "Madhya Pradesh"
  },
  {
    value: "MH",
    title: "Maharashtra"
  },
  {
    value: "MN",
    title: "Manipur"
  },
  {
    value: "ML",
    title: "Meghalaya"
  },
  {
    value: "MZ",
    title: "Mizoram"
  },
  {
    value: "NL",
    title: "Nagaland"
  },
  {
    value: "OR",
    title: "Odisha"
  },
  {
    value: "PY",
    title: "Puducherry"
  },
  {
    value: "PB",
    title: "Punjab"
  },
  {
    value: "RJ",
    title: "Rajasthan"
  },
  {
    value: "SK",
    title: "Sikkim"
  },
  {
    value: "TN",
    title: "Tamil Nadu"
  },
  {
    value: "TS",
    title: "Telangana"
  },
  {
    value: "TR",
    title: "Tripura"
  },
  {
    value: "UK",
    title: "Uttar Pradesh"
  },
  {
    value: "UP",
    title: "Uttarakhand"
  },
  {
    value: "WB",
    title: "West Bengal"
  }
];

export const getStateList = country => {
  switch (country) {
    case "IND": {
      return INDIA_STATE;
    }
    case "USA": {
      return USA_STATE;
    }
    default:
      return [];
  }
};
