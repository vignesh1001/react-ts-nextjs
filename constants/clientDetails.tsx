const clientMap = {
  "Allstate Insurance": [
    "Amol Kashikar",
    "Daniel Melendez",
    "Daniel Jarvis",
    "Duane Wittler",
    "Dustin Jansen",
    "Emily Kraft",
    "Emily Ringgold",
    "Jason Lynch",
    "John Eggenberger",
    "John Niles",
    "Meredith Laxamana",
    "Michael Raiser",
    "Raghavendra Subramanya",
    "Sanjay Gogula",
    "William Wen",
    "Yogeshwari Raju"
  ],
  "Arx Nimbus": ["Arx Nimbus"],
  "Banco Popular": [
    "Ajongba Longkumer",
    "Amar Meka",
    "Priya Rao",
    "Sanjay Shitole",
    "Teresa Schmidt"
  ],
  CDW: [
    "Andre Coetzee",
    "Billyana Arif",
    "Dennis T Squirewell ",
    "Jeff Ding",
    "Leo Garcia",
    "Li Yang",
    "Lilia Chevsky",
    "Rob Hoglund",
    "Sangeeta Vermani",
    "Shubbu Hariharan"
  ],
  "Central States Funds": ["Mark Hoppe", "Michail Gorelov", "Walt Sterrenberg"],
  Essendant: ["Dave Rudo"],
  "W.W. Grainger": [
    "Antony Caldaroni",
    "Chris Sienkiewicz",
    "Jin Nayyar",
    "Joe Cohen",
    "Jonna Bieber",
    "Keith Levy",
    "Mark Cocharane",
    "Martin McHugh",
    "Matt Menzies",
    "Patrick Szczypinsky",
    "Paul Neal",
    "Shagun Mehndiratta",
    "Scott Davies",
    "Scott Johnson",
    "Srini Yermati",
    "Venkata Thota",
    "Yasser Fayad",
    "William Gillespie"
  ],
  "Holland LP": ["Joe Cohen"],
  "Hyatt Global": [
    "Carl Schumaier",
    "Cesar Mendoza",
    "Eric Thorsen",
    "Heather Riddle",
    "Kim Krause",
    "Sanjeevkumar Tarnal"
  ],
  ISACA: ["Lily Galindo"],
  Kemper: [
    "Cyndi Berger",
    "Julian Hirjoi ",
    "Leonid Kosoglaz",
    "Paris Freeman",
    "Pete Bond",
    "Richard Lescarini"
  ],
  "Millenium Trust": ["Linda O'Boyle"],
  Novoscale: ["Mike Depolis"],
  "Peterson Technology Partners": ["Nirav Shah"],
  "RR Donnelley": ["RR Donnelley"],
  "Sysmex America": [
    "Ali Amini",
    "Anne Broederdorf",
    "Ed Bravo",
    "Jordan Maijala",
    "Karen Davis",
    "Mathy Sales",
    "Robert Diemeke",
    "Steve Haworth",
    "Tonia Richter"
  ],
  "Transform Holdings": [
    "Ashish Dharia",
    "Sheryl Hayes",
    "Teresa Chavez",
    "Timothy Richmond",
    "Tushar Tanna"
  ],
  "The Washington Post": [
    "Andrew Schoenfeld",
    "Brian Paik",
    "David Ness",
    "David Zayas",
    "Hardip Singh",
    "Jason Bartz",
    "Luke Mason",
    "Marco Heuer",
    "Michael Holm",
    "Zach Perry"
  ],
  Univar: ["Graham Thorsen"],
  Zoro: ["Andy Goodfellow", "Bernard Estanislao", "Damian Ng"]
};

export const clientNames = Object.keys(clientMap)
  .map(i => ({
    title: i,
    value: i
  }))
  .sort((a, b) => {
    if (a.title < b.title) return -1;
    else if (a.title > b.title) return 1;
    return 0;
  });

export const getClientContact = clientNames => {
  if (clientNames && clientMap[clientNames]) {
    return clientMap[clientNames]
      .map(i => ({ title: i, value: i }))
      .sort((a, b) => {
        if (a.title < b.title) return -1;
        else if (a.title > b.title) return 1;
        return 0;
      });
  } else {
    /*let clientContacts = [];
        Object.keys(clientMap).forEach(i=> 
            clientContacts = clientContacts.concat(clientMap[i].map(i=> ({title: i, value: i})))
        );*/
    return [];
  }
};
