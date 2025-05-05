import { GameContent } from "@/components/game-content/columns"
import { RouteContent } from "@/components/route-content/columns"

export const sampleGameContent: GameContent[] = [
  {
    id: "1",
    question: "What is the name of the famous Byzantine church in Istanbul that was later converted to a mosque?",
    language: "English",
    category: "History",
    level: "Beginner",
    gameType: "Individual",
    relatedItem: "Hagia Sophia",
    author: "tst creator",
    lastEditor: "CULTURATI E.U",
    status: "Pending",
    creationDate: "2025-04-29T14:00:00Z"
  },
  {
    id: "2",
    question: "¿El oso calioso?",
    language: "English",
    category: "Test-category",
    level: "Test-Level",
    gameType: "Individual",
    relatedItem: "Arnoldo",
    author: "tst creator",
    lastEditor: "CULTURATI E.U",
    status: "Pending",
    creationDate: "2025-04-29T13:50:00Z"
  },
  {
    id: "3",
    question: "Hello?",
    language: "English",
    category: "History",
    level: "Professional",
    gameType: "Individual",
    relatedItem: "testItem",
    author: "tst creator",
    lastEditor: "tst creator",
    status: "Pending",
    creationDate: "2025-04-29T13:40:00Z"
  },
  {
    id: "4",
    question: "Is that a TV show from Nickelodeon?",
    language: "English",
    category: "Test-category",
    level: "Test-Level",
    gameType: "Group",
    relatedItem: "Arnoldo",
    author: "tst creator",
    lastEditor: "tst editor",
    status: "Pending",
    creationDate: "2025-04-29T13:30:00Z"
  },
  {
    id: "5",
    question: "Is this yours?",
    language: "English",
    category: "Test-category",
    level: "Test-Level",
    gameType: "Individual",
    relatedItem: "Arnoldo",
    author: "tst creator",
    lastEditor: "tst creator",
    status: "Pending",
    creationDate: "2025-04-29T13:20:00Z"
  },
  {
    id: "6",
    question: "Kenu, cool?",
    language: "English",
    category: "Test-category",
    level: "kolay",
    gameType: "Family",
    relatedItem: "Arnoldo",
    author: "tst creator",
    lastEditor: "CULTURATI E.U",
    status: "Pending",
    creationDate: "2025-04-29T13:10:00Z"
  },
  {
    id: "7",
    question: "Question test 01",
    language: "English",
    category: "Tarih",
    level: "Beginner",
    gameType: "Individual",
    relatedItem: "ArcadeTriumph",
    author: "tst creator",
    lastEditor: "tst creator",
    status: "Pending",
    creationDate: "2025-04-29T13:00:00Z"
  },
  {
    id: "8",
    question: "Question test 02",
    language: "English",
    category: "History",
    level: "Professional",
    gameType: "Individual",
    relatedItem: "Arnoldo",
    author: "tst creator",
    lastEditor: "CULTURATI E.U",
    status: "Pending",
    creationDate: "2025-04-29T12:50:00Z"
  },
  {
    id: "9",
    question: "Quest Test 04",
    language: "English",
    category: "Arts",
    level: "Professional",
    gameType: "Individual",
    relatedItem: "Arnoldo",
    author: "tst creator",
    lastEditor: "CULTURATI E.U",
    status: "Pending",
    creationDate: "2025-04-29T12:40:00Z"
  },
  {
    id: "10",
    question: "Where do you live?",
    language: "English",
    category: "Locations",
    level: "Strange",
    gameType: "Individual",
    relatedItem: "Demo-Item",
    author: "tst creator",
    lastEditor: "CULTURATI E.U",
    status: "Pending",
    creationDate: "2025-04-29T12:30:00Z"
  },
  {
    id: "11",
    question: "Would you like to hang out with me?",
    language: "English",
    category: "Test-category",
    level: "Test-Level",
    gameType: "Group",
    relatedItem: "ArcadeTriumph",
    author: "tst creator",
    lastEditor: "CULTURATI E.U",
    status: "Pending",
    creationDate: "2025-04-29T12:20:00Z"
  }
]

export const sampleRouteContent: RouteContent[] = [
  {
    id: "1",
    contentName: "Historical tour of Istanbul's most iconic landmarks",
    language: "English",
    category: "History",
    level: "Beginner",
    type: "Walking Tour",
    relatedItem: "Hagia Sophia",
    author: "tst creator",
    lastEditor: "CULTURATI E.U",
    description: "Explore the rich history of Istanbul through its most iconic landmarks. This walking tour takes you through centuries of Byzantine and Ottoman heritage.",
    routePoints: [
      {
        name: "Hagia Sophia",
        latitude: "41.008587",
        longitude: "28.980175", 
        description: "Byzantine church turned mosque, famous for its massive dome"
      },
      {
        name: "Blue Mosque",
        latitude: "41.005270",
        longitude: "28.976960",
        description: "Stunning Ottoman-era mosque with blue tile interior"
      },
      {
        name: "Topkapi Palace",
        latitude: "41.011667",
        longitude: "28.983333",
        description: "Former residence of Ottoman sultans for nearly 400 years"
      }
    ],
    multimediaContent: [
      "https://example.com/istanbul-tour-image1.jpg",
      "https://example.com/istanbul-tour-image2.jpg"
    ],
    websiteURL: [
      "https://example.com/istanbul-history"
    ],
    additionalInfo: "Comfortable walking shoes recommended. Tour duration: approximately 4 hours."
  },
  {
    id: "2",
    contentName: "Modern art exploration in Barcelona",
    language: "Spanish",
    category: "Arts",
    level: "Intermediate",
    type: "Museum Tour",
    relatedItem: "Picasso Museum",
    author: "tst creator",
    lastEditor: "CULTURATI E.U",
    description: "Discover the vibrant modern art scene of Barcelona through its world-class museums and galleries.",
    routePoints: [
      {
        name: "Picasso Museum",
        latitude: "41.385417",
        longitude: "2.180519",
        description: "Houses one of the most extensive collections of Picasso's work"
      },
      {
        name: "MACBA",
        latitude: "41.383095",
        longitude: "2.166853",
        description: "Museum of Contemporary Art of Barcelona"
      }
    ],
    multimediaContent: [
      "https://example.com/barcelona-art-tour1.jpg"
    ],
    websiteURL: [
      "https://example.com/barcelona-art"
    ],
    additionalInfo: "Audio guides available in multiple languages."
  },
  {
    id: "3",
    contentName: "Ancient Roman architecture discovery",
    language: "Italian",
    category: "Architecture",
    level: "Professional",
    type: "Educational",
    relatedItem: "Roman Forum",
    author: "tst creator",
    lastEditor: "tst creator",
    description: "An in-depth exploration of ancient Roman architectural achievements and innovations.",
    routePoints: [
      {
        name: "Roman Forum",
        latitude: "41.892373",
        longitude: "12.485338",
        description: "Center of ancient Roman public life"
      },
      {
        name: "Colosseum",
        latitude: "41.890251",
        longitude: "12.492373",
        description: "Iconic amphitheater of ancient Rome"
      },
      {
        name: "Pantheon",
        latitude: "41.898762",
        longitude: "12.476904",
        description: "Temple to all the gods with remarkable dome"
      }
    ],
    multimediaContent: [
      "https://example.com/roman-architecture1.jpg",
      "https://example.com/roman-architecture2.jpg"
    ],
    websiteURL: [
      "https://example.com/roman-architecture"
    ],
    additionalInfo: "Expert guide specializing in Roman architectural history."
  },
  {
    id: "4",
    contentName: "Culinary journey through Paris",
    language: "French",
    category: "Gastronomy",
    level: "Beginner",
    type: "Food Tour",
    relatedItem: "French Cuisine",
    author: "tst creator",
    lastEditor: "tst editor",
    description: "Experience the exquisite tastes of Parisian cuisine through this guided culinary tour.",
    routePoints: [
      {
        name: "Le Marais Bakery",
        latitude: "48.856578",
        longitude: "2.354611",
        description: "Famous for traditional French pastries"
      },
      {
        name: "Marché des Enfants Rouges",
        latitude: "48.862773",
        longitude: "2.362836",
        description: "Oldest covered market in Paris"
      }
    ],
    multimediaContent: [
      "https://example.com/paris-food-tour.jpg"
    ],
    websiteURL: [],
    additionalInfo: "Includes tastings at 5 different locations."
  },
  {
    id: "5",
    contentName: "Traditional music of Andalusia",
    language: "Spanish",
    category: "Music",
    level: "Intermediate",
    type: "Cultural Experience",
    relatedItem: "Flamenco",
    author: "tst creator",
    lastEditor: "tst creator",
    description: "Immerse yourself in the passionate sounds of Andalusian music, with a focus on flamenco.",
    routePoints: [
      {
        name: "Museo del Baile Flamenco",
        latitude: "37.387245",
        longitude: "-5.991225",
        description: "Museum dedicated to flamenco dance"
      },
      {
        name: "Tablao El Arenal",
        latitude: "37.386856",
        longitude: "-5.997472",
        description: "Authentic flamenco show venue"
      }
    ],
    multimediaContent: [
      "https://example.com/flamenco-tour.jpg"
    ],
    websiteURL: [
      "https://example.com/andalusian-music"
    ],
    additionalInfo: "Evening performance included in tour price."
  },
  {
    id: "6",
    contentName: "Islamic art and architecture in Granada",
    language: "English",
    category: "Arts",
    level: "Professional",
    type: "Guided Tour",
    relatedItem: "Alhambra",
    author: "tst creator",
    lastEditor: "CULTURATI E.U",
    description: "Explore the exquisite Islamic art and architectural masterpieces of Granada.",
    routePoints: [
      {
        name: "Alhambra",
        latitude: "37.176086",
        longitude: "-3.588020",
        description: "Palatial complex with stunning Islamic design"
      },
      {
        name: "Generalife Gardens",
        latitude: "37.177300",
        longitude: "-3.584871",
        description: "Beautiful gardens adjacent to the Alhambra"
      }
    ],
    multimediaContent: [],
    websiteURL: [],
    additionalInfo: "Pre-booking required for Alhambra entrance."
  },
  {
    id: "7",
    contentName: "Ottoman Empire historical sites tour",
    language: "Turkish",
    category: "History",
    level: "Advanced",
    type: "Historical Tour",
    relatedItem: "Topkapi Palace",
    author: "tst creator",
    lastEditor: "tst creator",
    description: "Discover the imperial history of the Ottoman Empire through its most significant sites in Istanbul.",
    routePoints: [
      {
        name: "Topkapi Palace",
        latitude: "41.011667",
        longitude: "28.983333",
        description: "Former residence of Ottoman sultans"
      },
      {
        name: "Suleymaniye Mosque",
        latitude: "41.016389",
        longitude: "28.964167",
        description: "Ottoman imperial mosque designed by Sinan"
      }
    ],
    multimediaContent: [
      "https://example.com/ottoman-tour.jpg"
    ],
    websiteURL: [
      "https://example.com/ottoman-history"
    ],
    additionalInfo: "Expert guide with Ottoman history specialization."
  },
  {
    id: "8",
    contentName: "Renaissance art exploration in Florence",
    language: "English",
    category: "Arts",
    level: "Intermediate",
    type: "Museum Tour",
    relatedItem: "Uffizi Gallery",
    author: "tst creator",
    lastEditor: "CULTURATI E.U",
    description: "Journey through the birthplace of the Renaissance with a focus on its artistic masterpieces.",
    routePoints: [
      {
        name: "Uffizi Gallery",
        latitude: "43.768056",
        longitude: "11.255833",
        description: "World-famous art museum with Renaissance masterpieces"
      },
      {
        name: "Accademia Gallery",
        latitude: "43.776944",
        longitude: "11.258889",
        description: "Home to Michelangelo's David"
      }
    ],
    multimediaContent: [],
    websiteURL: [],
    additionalInfo: "Priority access tickets included."
  },
  {
    id: "9",
    contentName: "Ancient Greek mythology route",
    language: "Greek",
    category: "Mythology",
    level: "Beginner",
    type: "Educational",
    relatedItem: "Acropolis",
    author: "tst creator",
    lastEditor: "CULTURATI E.U",
    description: "Explore Greek mythology through the ancient sites where the stories originated.",
    routePoints: [
      {
        name: "Acropolis",
        latitude: "37.971389",
        longitude: "23.726111",
        description: "Sacred hill with temples dedicated to Athena"
      },
      {
        name: "Temple of Zeus",
        latitude: "37.969444",
        longitude: "23.733056",
        description: "Ancient temple dedicated to Zeus"
      }
    ],
    multimediaContent: [
      "https://example.com/greek-mythology-tour.jpg"
    ],
    websiteURL: [],
    additionalInfo: "Family-friendly tour with interactive storytelling."
  },
  {
    id: "10",
    contentName: "Viking history exploration in Scandinavia",
    language: "English",
    category: "History",
    level: "Intermediate",
    type: "Historical Tour",
    relatedItem: "Viking Ship Museum",
    author: "tst creator",
    lastEditor: "CULTURATI E.U",
    description: "Voyage through Viking history and culture across Scandinavia's most significant sites.",
    routePoints: [
      {
        name: "Viking Ship Museum",
        latitude: "59.904722",
        longitude: "10.684722",
        description: "Houses preserved Viking ships"
      },
      {
        name: "Roskilde Fjord",
        latitude: "55.651389",
        longitude: "12.079722",
        description: "Site of Viking ship excavations"
      }
    ],
    multimediaContent: [],
    websiteURL: [
      "https://example.com/viking-history"
    ],
    additionalInfo: "Optional boat tour weather permitting."
  },
  {
    id: "11",
    contentName: "Modern architecture in Rotterdam",
    language: "Dutch",
    category: "Architecture",
    level: "Professional",
    type: "Walking Tour",
    relatedItem: "Cube Houses",
    author: "tst creator",
    lastEditor: "CULTURATI E.U",
    description: "Discover the bold, innovative modern architecture that makes Rotterdam unique in Europe.",
    routePoints: [
      {
        name: "Cube Houses",
        latitude: "51.920556",
        longitude: "4.490833",
        description: "Iconic tilted cubic houses"
      },
      {
        name: "Markthal",
        latitude: "51.919722",
        longitude: "4.487500",
        description: "Modern market hall with spectacular ceiling art"
      },
      {
        name: "Erasmus Bridge",
        latitude: "51.908889",
        longitude: "4.488611",
        description: "Striking modern bridge across the Nieuwe Maas"
      }
    ],
    multimediaContent: [
      "https://example.com/rotterdam-architecture.jpg"
    ],
    websiteURL: [
      "https://example.com/rotterdam-architecture"
    ],
    additionalInfo: "Includes interior visit to a Cube House."
  }
] 