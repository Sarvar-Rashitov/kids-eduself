import type { LanguageWord } from '../languageContent';

export const greetings: LanguageWord[] = [
  {
    id: 'lang_1', english: 'Hello', russian: 'Привет', uzbek: 'Salom',
    emoji: '👋', color: 'from-blue-400 to-cyan-400', category: 'greeting',
    pronunciationEn: 'heh-loh', pronunciationRu: 'pri-vyet',
    exampleEn: 'Hello, my friend!', exampleRu: 'Привет, мой друг!', exampleUz: "Salom, do'stim!",
  },
  {
    id: 'lang_2', english: 'Thank you', russian: 'Спасибо', uzbek: 'Rahmat',
    emoji: '🙏', color: 'from-purple-400 to-pink-400', category: 'greeting',
    pronunciationEn: 'thank yoo', pronunciationRu: 'spa-si-bo',
    exampleEn: 'Thank you very much!', exampleRu: 'Большое спасибо!', exampleUz: 'Katta rahmat!',
  },
  {
    id: 'lang_3', english: 'Good morning', russian: 'Доброе утро', uzbek: 'Xayrli tong',
    emoji: '🌅', color: 'from-orange-400 to-yellow-400', category: 'greeting',
    pronunciationEn: 'good mor-ning', pronunciationRu: 'dob-ro-ye ut-ro',
    exampleEn: 'Good morning, mom!', exampleRu: 'Доброе утро, мама!', exampleUz: 'Xayrli tong, onajon!',
  },
  {
    id: 'lang_4', english: 'Good night', russian: 'Спокойной ночи', uzbek: 'Xayrli tun',
    emoji: '🌙', color: 'from-indigo-400 to-purple-400', category: 'greeting',
    pronunciationEn: 'good nait', pronunciationRu: 'spa-koy-noy no-chi',
    exampleEn: 'Good night, sleep well!', exampleRu: 'Спокойной ночи!', exampleUz: "Xayrli tun, xo'sh uxla!",
  },
  {
    id: 'lang_5', english: 'Please', russian: 'Пожалуйста', uzbek: 'Iltimos',
    emoji: '🙋', color: 'from-green-400 to-emerald-400', category: 'greeting',
    pronunciationEn: 'pleez', pronunciationRu: 'pa-zha-luy-sta',
    exampleEn: 'Please help me!', exampleRu: 'Помогите, пожалуйста!', exampleUz: 'Iltimos, menga yordam bering!',
  },
  {
    id: 'lang_6', english: 'Yes', russian: 'Да', uzbek: 'Ha',
    emoji: '✅', color: 'from-green-500 to-lime-500', category: 'greeting',
    pronunciationEn: 'yes', pronunciationRu: 'da',
    exampleEn: 'Yes, I agree!', exampleRu: 'Да, я согласен!', exampleUz: 'Ha, roziman!',
  },
  {
    id: 'lang_7', english: 'No', russian: 'Нет', uzbek: "Yo'q",
    emoji: '❌', color: 'from-red-400 to-pink-400', category: 'greeting',
    pronunciationEn: 'noh', pronunciationRu: 'nyet',
    exampleEn: "No, I don't want!", exampleRu: 'Нет, я не хочу!', exampleUz: "Yo'q, istamayman!",
  },
  {
    id: 'lang_8', english: 'Goodbye', russian: 'До свидания', uzbek: 'Xayr',
    emoji: '👋', color: 'from-blue-500 to-indigo-500', category: 'greeting',
    pronunciationEn: 'good-bai', pronunciationRu: 'do-svi-da-ni-ya',
    exampleEn: 'Goodbye, see you!', exampleRu: 'До свидания!', exampleUz: "Xayr, ko'rishamiz!",
  },
  {
    id: 'lang_9', english: 'How are you?', russian: 'Как дела?', uzbek: 'Qalaysiz?',
    emoji: '🤗', color: 'from-cyan-400 to-blue-400', category: 'greeting',
    pronunciationEn: 'hau ar yoo', pronunciationRu: 'kak de-la',
    exampleEn: 'How are you today?', exampleRu: 'Как твои дела?', exampleUz: 'Ahvolingiz qalay?',
  },
  {
    id: 'lang_10', english: 'Sorry', russian: 'Извините', uzbek: 'Kechirasiz',
    emoji: '🙇', color: 'from-orange-400 to-red-400', category: 'greeting',
    pronunciationEn: 'sor-ee', pronunciationRu: 'iz-vi-ni-te',
    exampleEn: 'Sorry, my mistake!', exampleRu: 'Извините, моя ошибка!', exampleUz: 'Kechirasiz, mening xatom!',
  },
  {
    id: 'lang_g11', english: 'Good afternoon', russian: 'Добрый день', uzbek: 'Xayrli kun',
    emoji: '☀️', color: 'from-yellow-500 to-orange-500', category: 'greeting',
    pronunciationEn: 'good af-ter-noon', pronunciationRu: 'dob-ryy den',
    exampleEn: 'Good afternoon, teacher!', exampleRu: 'Добрый день, учитель!', exampleUz: 'Xayrli kun, muallim!',
  },
  {
    id: 'lang_g12', english: 'Welcome', russian: 'Добро пожаловать', uzbek: 'Xush kelibsiz',
    emoji: '🎉', color: 'from-pink-400 to-rose-400', category: 'greeting',
    pronunciationEn: 'wel-kum', pronunciationRu: 'dob-ro po-zha-lo-vat',
    exampleEn: 'Welcome to our school!', exampleRu: 'Добро пожаловать в нашу школу!', exampleUz: 'Maktabimizga xush kelibsiz!',
  },
  {
    id: 'lang_g13', english: 'My name is', russian: 'Меня зовут', uzbek: 'Mening ismim',
    emoji: '🏷️', color: 'from-teal-400 to-cyan-400', category: 'greeting',
    pronunciationEn: 'mai neim iz', pronunciationRu: 'me-nya zo-vut',
    exampleEn: 'My name is Ali.', exampleRu: 'Меня зовут Али.', exampleUz: 'Mening ismim Ali.',
  },
  {
    id: 'lang_g14', english: 'See you later', russian: 'До встречи', uzbek: 'Keyin ko\'rishamiz',
    emoji: '🤝', color: 'from-green-400 to-teal-400', category: 'greeting',
    pronunciationEn: 'see yoo lei-ter', pronunciationRu: 'do-vstye-chi',
    exampleEn: 'See you later, friend!', exampleRu: 'До встречи, друг!', exampleUz: "Keyin ko'rishamiz, do'stim!",
  },
  {
    id: 'lang_g15', english: 'I am fine', russian: 'Я в порядке', uzbek: 'Men yaxshiman',
    emoji: '😊', color: 'from-lime-400 to-green-400', category: 'greeting',
    pronunciationEn: 'ai em fain', pronunciationRu: 'ya v po-ryad-ke',
    exampleEn: 'I am fine, thank you!', exampleRu: 'Я в порядке, спасибо!', exampleUz: 'Men yaxshiman, rahmat!',
  },
];
