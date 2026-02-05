// Complete Science Learning Content

export interface ScienceTopic {
  id: string;
  title: string;
  titleEnglish: string;
  emoji: string;
  description: string;
  facts: string[];
  color: string;
  bgColor: string;
  experiment?: string;
  quiz?: {
    question: string;
    options: string[];
    correct: number;
  };
}

export const scienceTopics: ScienceTopic[] = [
  {
    id: 'science_1',
    title: 'Quyosh',
    titleEnglish: 'Sun',
    emoji: '☀️',
    description: 'Quyosh - bizning eng katta do\'stimiz! U bizga yorug\'lik va issiqlik beradi.',
    facts: [
      'Quyosh juda katta yulduz ✨',
      'U har doim porlaydi 🌟',
      'Quyosh bizni isitadi 🔥',
      'Quyoshsiz hayot bo\'lmaydi 🌱',
    ],
    color: 'from-yellow-400 to-orange-400',
    bgColor: 'from-yellow-50 to-orange-50',
    experiment: 'Quyosh nuri bilan o\'ynang: qog\'ozni quyosh nuriga qo\'ying, soyani ko\'ring!',
    quiz: {
      question: 'Quyosh bizga nima beradi?',
      options: ['Yorug\'lik va issiqlik', 'Sovuqlik', 'Yomg\'ir'],
      correct: 0,
    },
  },
  {
    id: 'science_2',
    title: 'Suv',
    titleEnglish: 'Water',
    emoji: '💧',
    description: 'Suv - hayot uchun juda muhim! Biz har kuni suv ichamiz.',
    facts: [
      'Suv shaffof va toza 💎',
      'Baliqlar suvda yashaydi 🐠',
      'Yomg\'ir ham suv 🌧️',
      'Suvda cho\'milish qiziqarli 🏊',
    ],
    color: 'from-blue-400 to-cyan-400',
    bgColor: 'from-blue-50 to-cyan-50',
    experiment: 'Suv tajribasi: muzni issiqlikda qoldiring, u suvga aylanadi!',
    quiz: {
      question: 'Baliqlar qayerda yashaydi?',
      options: ['Suvda', 'Daraxtda', 'Osmonda'],
      correct: 0,
    },
  },
  {
    id: 'science_3',
    title: 'Daraxt',
    titleEnglish: 'Tree',
    emoji: '🌳',
    description: 'Daraxtlar bizga kislorod beradi va havoni tozalaydi!',
    facts: [
      'Daraxtlar o\'sadi 🌱',
      'Ular meva beradi 🍎',
      'Qushlar uyasini quradi 🐦',
      'Daraxt soyasi salqin 🌿',
    ],
    color: 'from-green-400 to-emerald-400',
    bgColor: 'from-green-50 to-emerald-50',
    experiment: 'Daraxt tajribasi: urug\' eking va uning o\'sishini kuzating!',
    quiz: {
      question: 'Daraxtlar bizga nima beradi?',
      options: ['Kislorod', 'Sut', 'Bulut'],
      correct: 0,
    },
  },
  {
    id: 'science_4',
    title: 'Havo',
    titleEnglish: 'Air',
    emoji: '💨',
    description: 'Havo - atrofimizda har yerda! Biz havoni nafas olamiz.',
    facts: [
      'Havoni ko\'ra olmaymiz 👁️',
      'Lekin sezamiz! 🌬️',
      'Shamol - harakatlanadigan havo 🍃',
      'Havo uchun zarur 🫁',
    ],
    color: 'from-cyan-400 to-sky-400',
    bgColor: 'from-cyan-50 to-sky-50',
    experiment: 'Havo tajribasi: sharchani puflang, ichida havo bo\'ladi!',
    quiz: {
      question: 'Shamol nima?',
      options: ['Harakatlanadigan havo', 'Suv', 'Qor'],
      correct: 0,
    },
  },
  {
    id: 'science_5',
    title: 'Yer',
    titleEnglish: 'Earth',
    emoji: '🌍',
    description: 'Yer - bizning uyimiz! Bu ajoyib sayyora.',
    facts: [
      'Yer dumaloq shaklida 🔵',
      'Osmonda suzadi ✨',
      'Yerda suv va quruqlik bor 🏔️',
      'Biz Yerda yashaymiz 🏡',
    ],
    color: 'from-blue-500 to-green-500',
    bgColor: 'from-blue-50 to-green-50',
    experiment: 'Yer tajribasi: globusni aylantiring, turli mamlakatlarni ko\'ring!',
    quiz: {
      question: 'Yer qanday shaklda?',
      options: ['Dumaloq', 'Kvadrat', 'Uchburchak'],
      correct: 0,
    },
  },
  {
    id: 'science_6',
    title: 'Rang-barang',
    titleEnglish: 'Rainbow',
    emoji: '🌈',
    description: 'Kamalak - osmonda paydo bo\'ladigan rang-barang!',
    facts: [
      '7 ta rangi bor 🎨',
      'Yomg\'irdan keyin ko\'rinadi ☔',
      'Quyosh nuri va suv yaratadi 💦',
      'Juda go\'zal ko\'rinish ✨',
    ],
    color: 'from-red-400 via-yellow-400 to-purple-400',
    bgColor: 'from-pink-50 to-purple-50',
    experiment: 'Kamalak tajribasi: suvga chayqating, quyosh nuriga qo\'ying!',
    quiz: {
      question: 'Kamalakda nechta rang bor?',
      options: ['7 ta', '3 ta', '10 ta'],
      correct: 0,
    },
  },
  {
    id: 'science_7',
    title: 'Yulduzlar',
    titleEnglish: 'Stars',
    emoji: '⭐',
    description: 'Yulduzlar - osmondagi yorqin nuqtalar!',
    facts: [
      'Kechasi porlaydi ✨',
      'Juda ko\'p yulduzlar bor 🌟',
      'Har biri uzoqda 🚀',
      'Quyosh ham yulduz ☀️',
    ],
    color: 'from-yellow-300 to-amber-300',
    bgColor: 'from-yellow-50 to-amber-50',
    experiment: 'Yulduzlar tajribasi: kechasi osmonni tomosha qiling!',
    quiz: {
      question: 'Yulduzlar qachon ko\'rinadi?',
      options: ['Kechasi', 'Tushda', 'Tongda'],
      correct: 0,
    },
  },
  {
    id: 'science_8',
    title: 'Magnet',
    titleEnglish: 'Magnet',
    emoji: '🧲',
    description: 'Magnet - metalni tortadigan mo\'jizaviy narsa!',
    facts: [
      'Temir narsalarni tortadi 🔩',
      'Ikki qutbi bor: N va S 🧭',
      'Magnit kuchi bor 💪',
      'Kompasda ishlatiladi 🧭',
    ],
    color: 'from-gray-400 to-red-400',
    bgColor: 'from-gray-50 to-red-50',
    experiment: 'Magnet tajribasi: magnit bilan temir buyumlarni tortib ko\'ring!',
    quiz: {
      question: 'Magnet nimani tortadi?',
      options: ['Metalni', 'Yog\'ochni', 'Suvni'],
      correct: 0,
    },
  },
];
