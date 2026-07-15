import anjaliImage from "../assets/Anjali.jpeg";
import rohanImage from "../assets/Rohan.jpeg";
import priyaImage from "../assets/Priya.jpeg";
import karanImage from "../assets/Karan.jpeg";

const doctors = [
  {
    id: 1,
    name: "Dr. Anjali Sharma",
    specialty: "Cardiologist",
    experience: "12 years experience",
    image: anjaliImage,
    available: true,
    description:
      "Experienced in heart health, blood pressure and cardiovascular care.",
    illnesses: [
      "heart",
      "heart problem",
      "heart disease",
      "chest pain",
      "high blood pressure",
      "low blood pressure",
      "blood pressure",
      "cardiovascular disease",
      "irregular heartbeat",
      "palpitations",
    ],
  },
  {
    id: 2,
    name: "Dr. Rohan Mehta",
    specialty: "Dermatologist",
    experience: "8 years experience",
    image: rohanImage,
    available: true,
    description:
      "Provides treatment for skin, hair and nail health conditions.",
    illnesses: [
      "skin",
      "skin problem",
      "skin allergy",
      "acne",
      "rash",
      "eczema",
      "hair loss",
      "itching",
      "dry skin",
      "nail problem",
    ],
  },
  {
    id: 3,
    name: "Dr. Priya Nair",
    specialty: "Pediatrician",
    experience: "10 years experience",
    image: priyaImage,
    available: true,
    description:
      "Compassionate medical care for babies, children and teenagers.",
    illnesses: [
      "child",
      "children",
      "child health",
      "baby",
      "baby care",
      "vaccination",
      "child fever",
      "child cold",
      "child cough",
      "growth problem",
    ],
  },
  {
    id: 4,
    name: "Dr. Karan Verma",
    specialty: "Orthopedic",
    experience: "15 years experience",
    image: karanImage,
    available: true,
    description:
      "Specialises in bone, joint, muscle and injury-related conditions.",
    illnesses: [
      "bone",
      "bone pain",
      "joint",
      "joint pain",
      "back pain",
      "neck pain",
      "arthritis",
      "fracture",
      "sports injury",
      "muscle pain",
      "knee pain",
      "shoulder pain",
    ],
  },
  {
    id: 5,
    name: "Dr. Emily Wilson",
    specialty: "General Practitioner",
    experience: "9 years experience",
    image: priyaImage,
    available: true,
    description:
      "Provides general consultations, health assessments and preventive healthcare for all ages.",
    illnesses: [
      "fever",
      "cold",
      "flu",
      "cough",
      "headache",
      "infection",
      "stomach pain",
      "general check-up",
      "general health",
      "tiredness",
      "sore throat",
    ],
  },
];

export default doctors;