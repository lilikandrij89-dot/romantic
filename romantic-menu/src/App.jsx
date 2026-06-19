import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Bookmark, X, MapPin, 
  Phone, ChevronRight, ArrowLeft,
  Utensils, Wine, Instagram
} from 'lucide-react';

// --- ДАНІ МЕНЮ (Категорії з PDF + Коктейлі з Фото) ---
const images = {
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
  salads: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
  snacks: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80",
  soups: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
  fish: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
  sides: "https://images.unsplash.com/photo-1576107248882-ff2648419619?auto=format&fit=crop&w=600&q=80",
  meat: "https://images.unsplash.com/photo-1544025162-8311db9f0eb2?auto=format&fit=crop&w=600&q=80",
  sushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
  coffee: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80",
  alcohol: "https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=600&q=80",
  desserts: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80",
  beer: "https://images.unsplash.com/photo-1538481199005-271011d7e056?auto=format&fit=crop&w=600&q=80",
  drinks: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80"
};

const menuCategories = [
  // --- КУХНЯ ---
  { section: 'food', id: 'pizza', name: 'Піца', defaultImage: images.pizza, items: [
      { name: 'ROMANTIC', desc: 'соус, салямі, сир твердий, сир моцарела, ковбаса мисливська, яйце, пармезан', weight: '500г / 800г', price: '190 / 340 грн' },
      { name: 'Чотири сири', desc: 'соус, сир фета, сир твердий, сир моцарела, сир пармезан', weight: '500г / 800г', price: '190 / 340 грн' },
      { name: 'Квадро формаджі', desc: 'соус, дор блю, сир твердий, сир моцарела, сир пармезан', weight: '500г / 800г', price: '220 / 370 грн' },
      { name: 'Буфало', desc: 'соус, куряче філе, сир моцарела, помідори, сир твердий', weight: '500г / 800г', price: '190 / 340 грн' },
      { name: 'Цезар', desc: 'соус, шинка, салямі, маслини, сир моцарела, зелень', weight: '500г / 800г', price: '190 / 340 грн' },
      { name: 'Дольче Віта', desc: 'соус, сир твердий, курка, ананас, оливки, сир моцарела, пармезан', weight: '500г / 800г', price: '190 / 340 грн' },
      { name: 'Маргарита', desc: 'соус, сир твердий, сир моцарела, помідори, пармезан', weight: '500г / 800г', price: '170 / 300 грн' },
      { name: 'Барбекю', desc: 'соус, сир твердий, сир моцарела, мисливські ковбаси, шинка, салямі, гриби, цибуля, пармезан', weight: '500г / 800г', price: '200 / 360 грн' },
      { name: 'Пепероні', desc: 'соус, сир твердий, сир моцарела, салямі peperoні, перець болгарський, чілі, гриби', weight: '500г / 800г', price: '180 / 330 грн' },
      { name: 'Капрічоза', desc: 'соус, сир твердий, сир моцарела, шинка, помідори, салямі, гриби, яйця, маслини', weight: '500г / 800г', price: '200 / 360 грн' },
      { name: 'Овочева (без сиру)', desc: 'соус, гриби, маслини, перець, помідори', weight: '500г / 800г', price: '170 / 290 грн' },
      { name: 'Піца з Прошуто', desc: 'соус, сир твердий, сир моцарела, прошуто, руккола, пармезан', weight: '500г / 800г', price: '230 / 370 грн' },
      { name: 'Особлива', desc: 'соус білий, сир твердий, сир моцарела, мисливські ковбаси, пармезан', weight: '500г / 800г', price: '190 / 340 грн' },
      { name: 'Карбонара', desc: 'соус білий, сир твердий, сир моцарела, бекон, помідори, яйця перепелині, пармезан', weight: '500г / 800г', price: '190 / 340 грн' },
      { name: 'Пан Тунець', desc: 'соус, сир твердий, сир моцарела, цибуля, гриби, тунець консервований', weight: '500г / 800г', price: '230 / 370 грн' },
      { name: 'Салямі', desc: 'соус, салямі, сир твердий, сир моцарела, пармезан', weight: '500г / 800г', price: '170 / 320 грн' },
      { name: 'Піца з Морепродуктами', desc: 'соус, морепродукти, сир твердий, сир моцарела, сир пармезан', weight: '500г / 800г', price: '290 / 420 грн' },
      { name: 'Корнетта', desc: 'соус, шинка, курка, кукурудза, сир твердий, сир моцарела, помідори, сир пармезан', weight: '500г / 800г', price: '190 / 340 грн' }
  ]},
  { section: 'food', id: 'salads', name: 'Салати', defaultImage: images.salads, items: [
      { name: 'Цезар', desc: 'мікс салату, помідори, яйце, філе куряче, сир пармезан, соус цезар, грінки', weight: '250 г', price: '190 грн' },
      { name: 'Салат ROMANTIC', desc: 'авокадо, мікс салату, соус, креветки, помідори, кунжут', weight: '200 г', price: '200 грн' },
      { name: 'Грецький', desc: 'мікс салату, помідори, огірки, перець болгарський, маслини, сир Фета, оливкова олія', weight: '200 г', price: '160 грн' },
      { name: 'Шопський', desc: 'огірки, помідори, перець, цибуля, бринза, оливкова олія', weight: '250 г', price: '150 грн' },
      { name: 'Вітамінний', desc: 'капуста, цибуля, морква, олія', weight: '200 г', price: '110 грн' },
      { name: 'Салат з тунцем', desc: 'мікс салату, огірки, помідори, тунець, олія оливкова', weight: '200 г', price: '200 грн' },
      { name: 'Салат с лососем', desc: 'лосось, філаделфія, мікс салата, помідори, авокадо', weight: '250 г', price: '230 грн' }
  ]},
  { section: 'food', id: 'cold_snacks', name: 'Холодні закуски', defaultImage: images.snacks, items: [
      { name: 'Брускети з помідорами', desc: '', weight: '3 шт.', price: '80 грн' },
      { name: 'Брускети з лососем', desc: '', weight: '3 шт.', price: '160 грн' },
      { name: 'Брускети з прошутто', desc: '', weight: '3 шт.', price: '150 грн' },
      { name: 'Сет брускет', desc: 'з лососем, помідорами, прошутто', weight: '3 шт.', price: '380 грн' },
      { name: 'Козацька закуска', desc: 'сало, підчеревина, грінки хлібні, бринза, часник', weight: '400 г', price: '350 грн' },
      { name: "М'ясна нарізка", desc: 'proшутто, шинка, салямі 3-х видів', weight: '400 г', price: '480 грн' },
      { name: 'Сирна нарізка', desc: 'брі, дор блю, пармезан, сир з горіхами, мед', weight: '400 г', price: '500 грн' },
      { name: 'Оселедець з картоплею', desc: '', weight: '300 г', price: '280 грн' }
  ]},
  { section: 'food', id: 'soups', name: 'Перші страви', defaultImage: images.soups, items: [
      { name: 'Бульйон курячий', desc: 'з локшиною', weight: '300 г', price: '70 грн' },
      { name: 'Солянка', desc: '', weight: '300 г', price: '80 грн' }
  ]},
  { section: 'food', id: 'fish', name: 'Рибні страви', defaultImage: images.fish, items: [
      { name: 'Короп смажений у кукурудзяній муці', desc: '', weight: '100 г', price: '58 грн' },
      { name: 'Короп на мангалі', desc: '', weight: '100 г', price: '58 грн' },
      { name: 'Скумбрія на мангалі', desc: '', weight: '100 г', price: '62 грн' },
      { name: 'Дорадо на мангалі', desc: '', weight: '100 г', price: '110 грн' },
      { name: 'Лангустіни', desc: '', weight: '6 шт.', price: '350 грн' },
      { name: 'Креветка в клярі', desc: '', weight: '6 шт.', price: '350 грн' },
      { name: 'Соломаха', desc: '', weight: '50 г', price: '30 грн' }
  ]},
  { section: 'food', id: 'sides', name: 'Гарніри', defaultImage: images.sides, items: [
      { name: 'Картопля фрі', desc: '', weight: '150/50 г', price: '90 грн' },
      { name: 'Картопля пюре', desc: '', weight: '200 г', price: '70 грн' },
      { name: 'Картопля по домашньому', desc: 'з беконом та бринзою', weight: '200 г', price: '90 грн' },
      { name: 'Сирні кульки', desc: '', weight: '7 шт.', price: '250 грн' },
      { name: 'Нагетси / соус', desc: '', weight: '7 шт.', price: '180 грн' },
      { name: 'Бануш з шкварками та бринзою', desc: '', weight: '300 г', price: '140 грн' },
      { name: 'Мамалига', desc: '', weight: '350 г', price: '80 грн' },
      { name: 'Шкварки', desc: '', weight: '50 г', price: '30 грн' },
      { name: 'Бринза', desc: '', weight: '50 г', price: '30 грн' },
      { name: 'Овочі гриль', desc: 'кабачки, баклажани, гриби, перець болгарський', weight: '400 г', price: '200 грн' }
  ]},
  { section: 'food', id: 'meat', name: "М'ясні страви", defaultImage: images.meat, items: [
      { name: 'Курячий шашлик', desc: '', weight: '100 г', price: '65 грн' },
      { name: 'Шашлик свинний', desc: '', weight: '100 г', price: '80 грн' },
      { name: 'Курячі крильця', desc: '', weight: '100 г', price: '50 грн' },
      { name: 'Соус', desc: '', weight: '50 г', price: '30 грн' }
  ]},
  { section: 'food', id: 'sushi', name: 'Роли', defaultImage: images.sushi, items: [
      { name: 'Рол Преміум ROMANTIC', desc: 'Рол із лососем, крем-сиром та авокадо, доповнений хрусткою креветкою панко, ікрою тобіко та червоною ікрою.', weight: '320 г', price: '550 грн' },
      { name: 'Філадельфія', desc: 'лосось, авокадо, сир Філадельфія, огірок', weight: '', price: '250 грн' },
      { name: 'Каліфорнія', desc: 'лосось, авокадо, огірок, кунжут', weight: '', price: '185 грн' },
      { name: 'Макі з лосося', desc: 'лосось, авокадо', weight: '', price: '130 грн' },
      { name: 'Зеленний дракон', desc: 'креветка, авокадо, сир Філадельфія, огірок, соус унагі', weight: '', price: '250 грн' },
      { name: 'Червоний дракон', desc: 'огірок, авокадо, лосось, ікра Tobikko, японський майонез', weight: '', price: '250 грн' },
      { name: 'Нагасакі', desc: 'лосось, сир Філадельфія, авокадо, ікра Tobikko', weight: '', price: '250 грн' },
      { name: 'Боніто з вугрем', desc: 'вугор, сир Філадельфія, огірок, струшка тунця', weight: '', price: '250 грн' },
      { name: 'Боніто з креветкою', desc: 'креветка, сир Філадельфія, огірок, струшка тунця', weight: '', price: '250 грн' },
      { name: 'Золотий дракон', desc: 'авокадо, вугор, сир філаделфія, соус унагі', weight: '', price: '320 грн' },
      { name: 'Гарячий рол з креветкою', desc: 'філадельфія, креветка, темпура, авокадо', weight: '', price: '250 грн' },
      { name: 'Гарячий рол з лососем', desc: 'філаделфія, лосось, темпура, авокадо', weight: '', price: '250 грн' },
      { name: 'Сет драконів', desc: 'Зелен дракон, Червоний дракон, Золотий дракон, Нагасакі', weight: '', price: '950 грн' },
      { name: 'Сет Філадельфії', desc: 'Філадельфія, нагасакі, макі з лосося, Боніто з креветкою', weight: '', price: '800 грн' },
      { name: 'Сет Макі', desc: 'Макі з лососем, макі з авокадо, макі з огірком, макі з вугрем', weight: '', price: '470 грн' }
  ]},
  { section: 'food', id: 'desserts', name: 'Десерти', defaultImage: images.desserts, items: [
      { name: 'Шоколадний фондан з морозивом', desc: '', weight: '100г / 90г', price: '150 грн' },
      { name: 'Морозиво з джемом', desc: '', weight: '150 г', price: '90 грн' },
      { name: 'Морозиво з фруктами', desc: '', weight: '200 г', price: '100 грн' },
      { name: 'Млинці з шоколадом та бананом', desc: '', weight: '200 г', price: '100 грн' },
      { name: 'Млинці з маком', desc: '', weight: '200 г', price: '90 грн' },
      { name: 'Млинці з вишнями', desc: '', weight: '200 г', price: '90 грн' },
      { name: 'Сирники з джемом', desc: '', weight: '200 г', price: '120 грн' }
  ]},

  // --- БАР ---
  { section: 'bar', id: 'alc_cocktails', name: 'Алкогольні коктейлі', defaultImage: images.alcohol, items: [
      { name: 'Амазонка', desc: 'фруктова база "Манго-маракуя", сироп "Ваніль", ром Bacardi, содова', weight: '300 мл', price: '180 грн' },
      { name: 'Полуничний бум', desc: 'фруктова база "Полуниця", сироп "м\'ята", ром Bacardi, содова', weight: '300 мл', price: '180 грн' },
      { name: 'Піна Колада', desc: 'ром Bacardi, сироп "Кокосовий", сік Ананасовий', weight: '300 мл', price: '180 грн' },
      { name: 'Блакитна лагуна', desc: 'горілка, сироп "Блю Курасао", Sprite', weight: '300 мл', price: '150 грн' },
      { name: 'Апероль', desc: 'апероль, біле вино, Sprite', weight: '300 мл', price: '200 грн' },
      { name: 'Мохіто', desc: 'м\'ята, лимон, лайм, ром Bacardi, Sprite', weight: '300 мл', price: '170 грн' },
      { name: 'Сангрія', desc: 'червоне вино, ром Bacardi, Sprite', weight: '300 мл', price: '200 грн' }
  ]},
  { section: 'bar', id: 'non_alc_cocktails', name: 'Безалкогольні коктейлі', defaultImage: images.drinks, items: [
      { name: 'Лимонад «Манго-маракуя»', desc: '', weight: '300 мл', price: '90 грн' },
      { name: 'Лимонад «Ківі»', desc: '', weight: '300 мл', price: '90 грн' },
      { name: 'Лимонад «Полуниця»', desc: '', weight: '300 мл', price: '90 грн' },
      { name: 'Лимонад «Ананас»', desc: '', weight: '300 мл', price: '90 грн' },
      { name: 'Лимонад «Цитрус»', desc: '', weight: '300 мл', price: '90 грн' },
      { name: 'Мохіто безалкогольне', desc: 'м\'ята, лимон, лайм, Sprite', weight: '300 мл', price: '90 грн' }
  ]},
  { section: 'bar', id: 'coffee_tea', name: 'Кава та чай', defaultImage: images.coffee, items: [
      { name: 'Еспресо', desc: '', weight: '0.03 л', price: '35 грн' },
      { name: 'Американо', desc: '', weight: '0.12 л', price: '50 грн' },
      { name: 'Американо з молоком', desc: '', weight: '0.16 л', price: '60 грн' },
      { name: 'Латте', desc: '', weight: '0.2 л', price: '75 грн' },
      { name: 'Капучино', desc: '', weight: '0.12 л', price: '75 грн' },
      { name: 'Чай заварний', desc: 'в асортименті', weight: '0.7 л', price: '60 грн' },
      { name: 'Чай живий', desc: 'в асортименті', weight: '0.7 л', price: '90 грн' },
      { name: 'Какао з маршмелоу', desc: '', weight: '', price: '90 грн' }
  ]},
  { section: 'bar', id: 'vodka', name: 'Горілка', defaultImage: images.alcohol, items: [
      { name: 'Finlandia', desc: '', weight: '50г / 0.5л', price: '65 / 500 грн' },
      { name: 'Козацька Рада', desc: '', weight: '50г / 0.5л', price: '30 / 220 грн' },
      { name: 'Гетьман', desc: '', weight: '50г / 0.5л', price: '35 / 240 грн' },
      { name: 'Absolut', desc: '', weight: '50г / 0.5л', price: '70 / 520 грн' },
      { name: 'Львівська Преміум', desc: '', weight: '50г / 0.7л', price: '45 / 450 грн' }
  ]},
  { section: 'bar', id: 'cognac', name: 'Коньяк', defaultImage: images.alcohol, items: [
      { name: 'ΜΕТАХА 5*', desc: '', weight: '50г / 0.5л', price: '70 / 570 грн' },
      { name: 'Старий Кахеті 5*', desc: '', weight: '50г / 0.5л', price: '50 / 450 грн' },
      { name: 'Азнаурі 5*', desc: '', weight: '50г / 0.5л', price: '50 / 450 грн' },
      { name: 'Александріон 5*', desc: '', weight: '50г / 0.5л', price: '50 / 450 грн' }
  ]},
  { section: 'bar', id: 'whiskey', name: 'Віскі', defaultImage: images.alcohol, items: [
      { name: "William lawson's", desc: '', weight: '50г / 0.5л', price: '80 / 700 грн' },
      { name: 'Jack Daniels', desc: '', weight: '50г / 0.5л', price: '110 / 1000 грн' },
      { name: 'Ballantines', desc: '', weight: '50г / 0.5л', price: '100 / 900 грн' }
  ]},
  { section: 'bar', id: 'champagne', name: 'Шампанське', defaultImage: images.alcohol, items: [
      { name: 'Fragollino', desc: '', weight: '0.75 л', price: '350 грн' },
      { name: 'Martini Asti', desc: '', weight: '0.75 л', price: '600 грн' },
      { name: 'Prosseco', desc: '', weight: '0.75 л', price: '600 грн' }
  ]},
  { section: 'bar', id: 'wine', name: 'Вино', defaultImage: images.alcohol, items: [
      { name: 'Вілла Крим', desc: '', weight: '0.75 л', price: '200 грн' },
      { name: 'Kartuli Vazi', desc: '', weight: '0.75 л', price: '350 грн' }
  ]},
  { section: 'bar', id: 'beer_snacks', name: 'Закуски до пива', defaultImage: images.snacks, items: [
      { name: 'Бастурма', desc: '', weight: '100 г', price: '140 грн' },
      { name: 'Прошутто', desc: '', weight: '100 г', price: '140 грн' },
      { name: 'Фокачо', desc: '', weight: '300 г', price: '70 грн' },
      { name: 'Вушка', desc: '', weight: '100 г', price: '90 грн' },
      { name: 'Цибулеві кільця', desc: '', weight: '100 г', price: '70 грн' },
      { name: 'Кільця кальмарів', desc: '', weight: '100 г', price: '130 грн' },
      { name: 'Соус тартар', desc: '', weight: '50 г', price: '30 грн' }
  ]},
  { section: 'bar', id: 'draft_beer', name: 'Пиво на розлив', defaultImage: images.beer, items: [
      { name: 'Пшеничне нефільтроване', desc: '', weight: '0.33/0.5л', price: '60 / 75 грн' },
      { name: '«Свіжий Розлив» ППБ', desc: '', weight: '0.33/0.5л', price: '50 / 65 грн' }
  ]},
  { section: 'bar', id: 'non_alcoholic', name: 'Безалкогольні напої', defaultImage: images.drinks, items: [
      { name: 'Coca-cola', desc: '', weight: '', price: '50 грн' },
      { name: 'Fanta', desc: '', weight: '', price: '50 грн' },
      { name: 'Вода мінеральна Bonaqua', desc: '', weight: '', price: '40 грн' },
      { name: 'Сік в асортименті', desc: '', weight: '0.25/1л', price: '40 / 120 грн' },
      { name: 'Квас', desc: '', weight: '0.33/0.5л', price: '40 / 60 грн' }
  ]}
];

const formatPrice = (priceStr) => {
  return priceStr.replace(/грн\.?/g, '₴').trim();
};

export default function App() {
  const [view, setView] = useState('home'); 
  const [menuSection, setMenuSection] = useState('food'); 
  
  const currentSectionCategories = menuCategories.filter(c => c.section === menuSection);
  const initialCategory = currentSectionCategories[0]?.id || 'pizza';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); 

  const [bookmarks, setBookmarks] = useState([]);
  
  // Ref для блокування автоматичного ScrollSpy при ручному кліку
  const isManualScrollingRef = useRef(false);

  // Завантаження закладок
  useEffect(() => {
    try {
      const saved = localStorage.getItem('romantic_light_fixed');
      if (saved) setBookmarks(JSON.parse(saved));
    } catch (e) {}
  }, []);

  // Додавання у закладки
  const toggleBookmark = (categoryId, itemName) => {
    const uniqueId = `${categoryId}__${itemName}`;
    let updated;
    if (bookmarks.includes(uniqueId)) {
      updated = bookmarks.filter(id => id !== uniqueId);
    } else {
      updated = [...bookmarks, uniqueId];
    }
    setBookmarks(updated);
    try {
      localStorage.setItem('romantic_light_fixed', JSON.stringify(updated));
    } catch (e) {}
  };

  // Робота з перемиканням розділів меню (З головної)
  const handleOpenMenu = (section) => {
    isManualScrollingRef.current = true;
    setMenuSection(section);
    const firstCat = menuCategories.find(c => c.section === section);
    if (firstCat) setActiveCategory(firstCat.id);
    setSearchQuery('');
    setView('menu');
    
    setTimeout(() => {
      window.scrollTo({top: 0, behavior: 'instant'});
      isManualScrollingRef.current = false;
    }, 10);
  };

  // Перемикання Кухня/Бар всередині меню
  const handleSectionSwitch = (section) => {
    isManualScrollingRef.current = true;
    setMenuSection(section);
    const firstCat = menuCategories.find(c => c.section === section);
    if (firstCat) setActiveCategory(firstCat.id);
    setSearchQuery('');
    setShowSectionModal(false);
    
    setTimeout(() => {
      window.scrollTo({top: 0, behavior: 'instant'});
      const container = document.getElementById('tabs-container');
      if (container) container.scrollTo({ left: 0, behavior: 'instant' });
      isManualScrollingRef.current = false;
    }, 10);
  };

  // --- БЕЗПЕЧНИЙ SCROLL-SPY (Підсвічування категорії під час гортання) ---
  useEffect(() => {
    // ВАЖЛИВО: Ми не блокуємо створення EventListener'а рефом.
    if (view !== 'menu' || searchQuery) return;

    const handleScroll = () => {
      // Блокуємо виконання логіки скролу лише під час ручного кліку по вкладці
      if (isManualScrollingRef.current) return;

      const headerOffset = window.innerWidth >= 1024 ? 120 : 180;
      const scrollY = window.scrollY;
      let newActive = activeCategory;

      // Беремо актуальні категорії для поточного розділу
      const categories = menuCategories.filter(c => c.section === menuSection);

      for (let i = categories.length - 1; i >= 0; i--) {
        const cat = categories[i];
        const el = document.getElementById(`cat-${cat.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset + 40) {
            newActive = cat.id;
            break;
          }
        }
      }

      // Перевірка на досягнення низу сторінки
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom && categories.length > 0) {
        newActive = categories[categories.length - 1].id;
      }

      if (newActive !== activeCategory && newActive !== 'favorites') {
        setActiveCategory(newActive);
        
        // Авто-скрол вкладок для мобільних
        if (window.innerWidth < 1024) {
          const tab = document.getElementById(`tab-${newActive}`);
          const container = document.getElementById('tabs-container');
          if (tab && container) {
            const scrollLeft = tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view, searchQuery, activeCategory, menuSection]);

  // --- РУЧНИЙ СКРОЛ ДО КАТЕГОРІЇ ---
  const scrollToCategory = (id) => {
    isManualScrollingRef.current = true;
    setActiveCategory(id);
    setSearchQuery('');
    
    if (id === 'favorites') {
      window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
      const el = document.getElementById(`cat-${id}`);
      if (el) {
        const offset = window.innerWidth >= 1024 ? 100 : 160; 
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
    
    // Підскролюємо вкладку по центру для мобілок
    if (window.innerWidth < 1024) {
      const tab = document.getElementById(`tab-${id}`);
      const container = document.getElementById('tabs-container');
      if (tab && container) {
        const scrollLeft = tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }

    // Розблокувати ScrollSpy після завершення анімації
    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 800);
  };

  // Блокування фонового скролу при відкритих модальних вікнах
  useEffect(() => {
    if (selectedItem || showSectionModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedItem, showSectionModal]);


  // ==========================================
  // ЕКРАН 1: ГОЛОВНИЙ
  // ==========================================
  if (view === 'home') {
    return (
      <div className="min-h-screen w-full bg-[#FDFBF7] font-sans relative text-[#2C2621] shadow-2xl overflow-x-hidden selection:bg-[#E8DCC4] selection:text-[#2C2621]">
        
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
          .font-handwriting { font-family: 'Dancing Script', cursive; }
          .font-sans { font-family: 'Montserrat', sans-serif; }
        `}} />

        <div className="h-[50vh] lg:h-[60vh] w-full bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1920&q=80)' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#FDFBF7]"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10 p-6">
            <h1 className="text-6xl lg:text-8xl font-handwriting font-bold tracking-wide text-white drop-shadow-lg mb-2">Romantic</h1>
            <div className="flex items-center justify-center gap-4 opacity-90">
              <span className="w-12 h-[1px] bg-white/60"></span>
              <p className="text-xs lg:text-sm tracking-[0.3em] uppercase text-white font-medium">Ресторан • Бар</p>
              <span className="w-12 h-[1px] bg-white/60"></span>
            </div>
          </div>
        </div>

        <div className="relative -mt-16 lg:-mt-24 px-4 pb-20 z-20 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-[#E8DCC4]/40 flex flex-col justify-center items-center text-center lg:col-span-1">
            <div className="w-24 h-24 rounded-full border-[4px] border-white bg-[#FCFAF8] text-[#967259] flex items-center justify-center shadow-md mb-4">
              <span className="font-handwriting text-5xl font-bold leading-none pt-2">R</span>
            </div>
            <h2 className="text-3xl font-bold text-[#2C2621] mb-2">Romantic</h2>
            <p className="text-[#8A7969] font-medium flex items-center gap-1.5 mt-2">
              <MapPin className="w-4 h-4 text-[#967259]" />
              с. Строїнці
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button onClick={() => handleOpenMenu('food')} className="bg-white rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 shadow-lg border border-[#E8DCC4]/40 hover:border-[#967259]/40 hover:-translate-y-1 transition-all group">
              <div className="w-16 h-16 rounded-full bg-[#FCFAF8] text-[#967259] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner text-3xl">
                <Utensils className="w-8 h-8" />
              </div>
              <span className="text-lg font-bold tracking-widest uppercase text-[#2C2621]">Меню Кухні</span>
            </button>

            <button onClick={() => handleOpenMenu('bar')} className="bg-white rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 shadow-lg border border-[#E8DCC4]/40 hover:border-[#967259]/40 hover:-translate-y-1 transition-all group">
              <div className="w-16 h-16 rounded-full bg-[#FCFAF8] text-[#967259] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner text-3xl">
                <Wine className="w-8 h-8" />
              </div>
              <span className="text-lg font-bold tracking-widest uppercase text-[#2C2621]">Барне Меню</span>
            </button>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-[#E8DCC4]/40 lg:col-span-3 mt-4">
            <div className="lg:flex lg:justify-between lg:items-center">
              <div className="lg:w-1/2">
                <h3 className="text-3xl font-handwriting font-bold text-[#967259] mb-4">Ваше свято</h3>
                <p className="text-[#5C5146] text-base mb-6 font-medium leading-relaxed max-w-md">
                  Ми з радістю організуємо та проведемо для Вас найкращі події: <br/>
                  <span className="font-semibold text-[#2C2621]">Дні народження, Весілля, Сімейні свята.</span>
                </p>
              </div>

              <div className="space-y-6 pt-6 lg:pt-0 lg:w-1/2 border-t lg:border-t-0 lg:border-l border-[#F3EFEA] lg:pl-12">
                <div className="flex gap-5 items-center">
                  <div className="w-12 h-12 rounded-full bg-[#FCFAF8] flex items-center justify-center border border-[#F3EFEA]">
                    <Phone className="text-[#967259] w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[#A99F93] text-xs uppercase tracking-widest font-bold mb-1">Телефон</p>
                    <a href="tel:+380997272881" className="text-[#2C2621] text-lg font-bold hover:text-[#967259] transition-colors">+380 99 727 28 81</a>
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="w-12 h-12 rounded-full bg-[#FCFAF8] flex items-center justify-center border border-[#F3EFEA]">
                    <Instagram className="text-[#967259] w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[#A99F93] text-xs uppercase tracking-widest font-bold mb-1">Instagram</p>
                    <a href="https://www.instagram.com/romantic_restaurant_strointsi" target="_blank" rel="noopener noreferrer" className="text-[#2C2621] text-lg font-bold hover:text-[#967259] transition-colors line-clamp-1">
                      @romantic_restaurant_strointsi
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ЕКРАН 2: МЕНЮ (НАСТІЛЬНА ТА МОБІЛЬНА ВЕРСІЯ)
  // ==========================================
  return (
    <div className="min-h-screen w-full bg-[#FDFBF7] text-[#2C2621] font-sans flex flex-col lg:flex-row relative selection:bg-[#E8DCC4] selection:text-[#2C2621]">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
        .font-handwriting { font-family: 'Dancing Script', cursive; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
        body { background-color: #E8DCC4; }
      `}} />

      {/* --- СТАЦІОНАРНА БІЧНА ПАНЕЛЬ ДЛЯ ПК (Sidebar) --- */}
      <aside className="hidden lg:flex w-80 h-screen sticky top-0 bg-white border-r border-[#E8DCC4]/50 flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30">
        <div className="p-8 border-b border-[#F3EFEA] flex flex-col items-center">
          <div className="w-16 h-16 rounded-full border-[3px] border-[#F3EFEA] bg-[#FCFAF8] text-[#967259] flex items-center justify-center mb-3">
             <span className="font-handwriting text-3xl font-bold leading-none pt-1">R</span>
          </div>
          <h2 className="text-2xl font-bold text-[#2C2621]">Romantic</h2>
          <button onClick={() => setView('home')} className="mt-4 text-[11px] uppercase tracking-widest font-bold text-[#8A7969] hover:text-[#967259] flex items-center gap-1">
            <ArrowLeft className="w-3 h-3"/> На головну
          </button>
        </div>

        <div className="p-6">
          <div className="flex bg-[#FCFAF8] p-1.5 rounded-full border border-[#E8DCC4]/50 mb-6">
            <button onClick={() => handleSectionSwitch('food')} className={`flex-1 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${menuSection === 'food' ? 'bg-white shadow-sm text-[#967259]' : 'text-[#8A7969] hover:text-[#2C2621]'}`}>Кухня</button>
            <button onClick={() => handleSectionSwitch('bar')} className={`flex-1 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${menuSection === 'bar' ? 'bg-white shadow-sm text-[#967259]' : 'text-[#8A7969] hover:text-[#2C2621]'}`}>Бар</button>
          </div>

          <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-320px)] no-scrollbar pr-2">
            <button
              onClick={() => scrollToCategory('favorites')}
              className={`text-left px-5 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-3 ${activeCategory === 'favorites' ? 'bg-[#967259] text-white shadow-md' : 'text-[#5C5146] hover:bg-[#FCFAF8]'}`}
            >
              <Bookmark className={`w-4 h-4 ${activeCategory === 'favorites' ? 'fill-white' : ''}`} /> 
              Збережені
            </button>
            <div className="h-px bg-[#F3EFEA] my-2 mx-4"></div>
            {currentSectionCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`text-left px-5 py-3 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat.id ? 'bg-[#FCFAF8] text-[#967259] shadow-sm border border-[#E8DCC4]/50' : 'text-[#5C5146] border border-transparent hover:bg-gray-50'}`}
              >
                {cat.name}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* --- ОСНОВНИЙ КОНТЕНТ --- */}
      <div className="flex-1 flex flex-col w-full">
        
        {/* МОБІЛЬНА ШАПКА (Тільки для мобільних) */}
        <header className="lg:hidden sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-xl pt-4 pb-3 border-b border-[#F3EFEA] shadow-sm px-4">
          <div className="flex gap-3 mb-4 items-center">
            <button onClick={() => setView('home')} className="w-11 h-11 rounded-full border border-[#F3EFEA] bg-white text-[#967259] flex-shrink-0 flex items-center justify-center shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Пошук..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 bg-white border border-[#E8DCC4]/50 rounded-full text-sm outline-none focus:border-[#967259] pl-11 pr-8 shadow-sm"
              />
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-[#967259]/60" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-3.5 text-gray-400"><X className="w-4 h-4" /></button>
              )}
            </div>
          </div>

          <div className="flex bg-[#FCFAF8] p-1 rounded-full border border-[#E8DCC4]/50 mb-3">
            <button onClick={() => handleSectionSwitch('food')} className={`flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${menuSection === 'food' ? 'bg-white shadow-sm text-[#967259]' : 'text-[#8A7969]'}`}>Кухня</button>
            <button onClick={() => handleSectionSwitch('bar')} className={`flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${menuSection === 'bar' ? 'bg-white shadow-sm text-[#967259]' : 'text-[#8A7969]'}`}>Бар</button>
          </div>

          {/* Горизонтальні вкладки на мобілці */}
          {!searchQuery && (
            <div id="tabs-container" className="flex overflow-x-auto gap-2 no-scrollbar pb-1 pt-1">
              <button
                id="tab-favorites"
                onClick={() => scrollToCategory('favorites')}
                className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all whitespace-nowrap flex items-center gap-2 border shadow-sm ${activeCategory === 'favorites' ? 'bg-[#967259] text-white border-[#967259]' : 'bg-white text-[#5C5146] border-[#E8DCC4]/50'}`}
              >
                <Bookmark className={`w-4 h-4 ${activeCategory === 'favorites' ? 'fill-white' : ''}`} strokeWidth={2.5}/>
              </button>
              {currentSectionCategories.map((cat) => (
                <button
                  key={cat.id}
                  id={`tab-${cat.id}`}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`px-6 py-2 rounded-full text-[13px] font-bold transition-all whitespace-nowrap border shadow-sm ${activeCategory === cat.id ? 'bg-[#967259] text-white border-[#967259]' : 'bg-white text-[#5C5146] border-[#E8DCC4]/50'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* ШАПКА ДЛЯ ПК (Пошук) */}
        <header className="hidden lg:flex sticky top-0 z-20 bg-[#FDFBF7]/90 backdrop-blur-md px-8 py-5 border-b border-[#F3EFEA] justify-end">
          <div className="relative w-80">
            <input 
              type="text" 
              placeholder="Пошук страв..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-white border border-[#E8DCC4]/50 rounded-full text-sm outline-none focus:border-[#967259] pl-11 pr-8 shadow-sm transition-all"
            />
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-[#967259]/60" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-3.5 text-gray-400 hover:text-[#2C2621]"><X className="w-4 h-4" /></button>
            )}
          </div>
        </header>

        {/* ОСНОВНА ОБЛАСТЬ ЗІ СПИСКОМ */}
        <main className="px-4 lg:px-8 pt-6 lg:pt-10 pb-24 max-w-5xl mx-auto w-full">
          
          {/* Банер (Жива музика) */}
          {activeCategory !== 'favorites' && !searchQuery && (
            <div className="w-full h-48 lg:h-64 bg-[#FCFAF8] rounded-[2rem] mb-12 overflow-hidden relative shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#E8DCC4]/40 group">
              <img 
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80" 
                alt="Live Music Banner" 
                className="w-full h-full object-cover opacity-20 sepia group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/50 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center lg:items-start justify-center text-center lg:text-left p-8 lg:p-16">
                <h3 className="text-4xl lg:text-6xl font-handwriting font-bold text-[#967259] mb-2 drop-shadow-sm">Жива музика</h3>
                <div className="flex gap-3 text-xs lg:text-sm font-bold text-[#5C5146] uppercase tracking-wider pt-2">
                  <span className="bg-white/60 px-3 py-1 rounded backdrop-blur-sm">Субота - Неділя</span>
                  <span className="bg-white/60 px-3 py-1 rounded backdrop-blur-sm">з 18:00</span>
                </div>
              </div>
            </div>
          )}

          {/* КОНТЕНТ */}
          {searchQuery ? (
            <div>
              <h2 className="text-3xl font-handwriting font-bold text-[#967259] mb-8">Результати пошуку</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {currentSectionCategories.flatMap(cat => cat.items.map(item => ({...item, categoryId: cat.id, originalCategory: cat.name, defaultImage: cat.defaultImage})))
                  .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase())))
                  .map((item, idx) => {
                    const uniqueId = `${item.categoryId}__${item.name}`;
                    const isBookmarked = bookmarks.includes(uniqueId);
                    return (
                      <div key={idx} className="bg-white rounded-[1.5rem] flex flex-col overflow-hidden shadow-sm border border-[#E8DCC4]/50 hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer" onClick={() => setSelectedItem(item)}>
                        <div className="h-48 w-full relative bg-[#FCFAF8] overflow-hidden">
                          <img src={item.image || item.defaultImage} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleBookmark(item.categoryId, item.name); }}
                            className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center z-10 shadow-sm hover:bg-white"
                          >
                            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-[#967259] text-[#967259]' : 'text-[#8A7969]'}`} strokeWidth={isBookmarked ? 1 : 2} />
                          </button>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-[17px] font-bold text-[#2C2621] leading-tight mb-2">{item.name}</h3>
                          {item.desc && <p className="text-[13px] text-[#8A7969] leading-relaxed line-clamp-2 font-medium mb-4">{item.desc}</p>}
                          <div className="mt-auto pt-4 border-t border-[#F3EFEA] flex items-center justify-between">
                            <span className="text-[12px] text-[#A99F93] font-semibold bg-[#FCFAF8] px-2 py-1 rounded border border-[#E8DCC4]/30">{item.weight || (menuSection === 'bar' ? 'порція' : '100 г')}</span>
                            <span className="text-[18px] font-bold text-[#967259]">{formatPrice(item.price)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : activeCategory === 'favorites' ? (
            <div>
              <h2 className="text-4xl font-handwriting font-bold text-[#967259] mb-8">Збережені страви</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {currentSectionCategories.flatMap(cat => cat.items.map(item => ({...item, categoryId: cat.id, originalCategory: cat.name, defaultImage: cat.defaultImage})))
                  .filter(item => bookmarks.includes(`${item.categoryId}__${item.name}`))
                  .map((item, idx) => (
                    <div key={idx} className="bg-white rounded-[1.5rem] flex flex-col overflow-hidden shadow-md border border-[#967259]/30 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group" onClick={() => setSelectedItem(item)}>
                      <div className="h-48 w-full relative bg-[#FCFAF8] overflow-hidden">
                        <img src={item.image || item.defaultImage} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleBookmark(item.categoryId, item.name); }}
                          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center z-10 shadow-sm"
                        >
                          <Bookmark className="w-5 h-5 fill-[#967259] text-[#967259]" strokeWidth={1} />
                        </button>
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full font-sans">
                          {item.originalCategory}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-[17px] font-bold text-[#2C2621] leading-tight mb-2">{item.name}</h3>
                        {item.desc && <p className="text-[13px] text-[#8A7969] leading-relaxed line-clamp-2 font-medium mb-4">{item.desc}</p>}
                        <div className="mt-auto pt-4 border-t border-[#F3EFEA] flex items-center justify-between">
                          <span className="text-[12px] text-[#A99F93] font-semibold">{item.weight || (menuSection === 'bar' ? 'порція' : '100 г')}</span>
                          <span className="text-[18px] font-bold text-[#967259]">{formatPrice(item.price)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {bookmarks.length === 0 && (
                <div className="text-center py-32 bg-white rounded-[2rem] border border-[#E8DCC4]/50 shadow-sm mt-4">
                  <Bookmark className="w-12 h-12 text-[#E8DCC4] mx-auto mb-4" strokeWidth={1.5} />
                  <p className="text-[#8A7969] font-medium text-lg">Тут поки нічого немає.</p>
                </div>
              )}
            </div>
          ) : (
            currentSectionCategories.map((category) => (
              <div key={category.id} id={`cat-${category.id}`} className="mb-14 lg:pt-8 scroll-mt-[180px] lg:scroll-mt-[100px]">
                <div className="flex items-center gap-6 mb-8">
                  <h2 className="text-4xl lg:text-5xl font-handwriting font-bold text-[#967259]">{category.name}</h2>
                  <div className="h-[1px] flex-grow bg-gradient-to-r from-[#967259]/30 to-transparent mt-2"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {category.items.map((item, idx) => {
                    const uniqueId = `${category.id}__${item.name}`;
                    const isBookmarked = bookmarks.includes(uniqueId);

                    return (
                      <div 
                        key={idx} 
                        className={`bg-white rounded-[1.5rem] flex flex-col overflow-hidden shadow-sm border cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group ${isBookmarked ? 'border-[#967259]/40' : 'border-[#E8DCC4]/50'}`}
                        onClick={() => setSelectedItem({ ...item, categoryId: category.id, defaultImage: category.defaultImage })}
                      >
                        <div className="h-48 lg:h-56 w-full relative bg-[#FCFAF8] overflow-hidden">
                          <img src={item.image || category.defaultImage} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleBookmark(category.id, item.name); }}
                            className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center z-10 shadow-sm hover:bg-white"
                          >
                            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-[#967259] text-[#967259]' : 'text-[#8A7969]'}`} strokeWidth={isBookmarked ? 1 : 2} />
                          </button>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-[17px] font-bold text-[#2C2621] leading-tight mb-2">{item.name}</h3>
                          {item.desc && <p className="text-[13px] text-[#8A7969] leading-relaxed line-clamp-2 font-medium mb-4">{item.desc}</p>}
                          
                          <div className="mt-auto pt-4 border-t border-[#F3EFEA] flex items-center justify-between">
                            <span className="text-[12px] text-[#A99F93] font-semibold bg-[#FCFAF8] px-2 py-1 rounded border border-[#E8DCC4]/30">{item.weight || (menuSection === 'bar' ? 'порція' : '100 г')}</span>
                            <span className="text-[18px] font-bold text-[#967259]">{formatPrice(item.price)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </main>
      </div>

      {/* МОДАЛЬНЕ ВІКНО: Картка Товару (Центрована для ПК, Bottom Sheet для мобільних) */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-[#2C2621]/60 backdrop-blur-sm flex items-end lg:items-center justify-center animate-in fade-in duration-300" onClick={() => setSelectedItem(null)}>
          <div className="bg-white w-full max-w-md lg:max-w-4xl rounded-t-[2.5rem] lg:rounded-[2rem] animate-in slide-in-from-bottom-full lg:zoom-in-95 overflow-hidden flex flex-col lg:flex-row max-h-[85vh] lg:max-h-[70vh] shadow-2xl" onClick={e => e.stopPropagation()}>
            
            <div className="relative w-full lg:w-1/2 h-72 lg:h-auto bg-[#FCFAF8]">
              <img src={selectedItem.image || selectedItem.defaultImage} alt={selectedItem.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-5 right-5 lg:left-5 lg:right-auto w-10 h-10 bg-white/90 backdrop-blur-md border border-[#E8DCC4]/50 rounded-full flex items-center justify-center text-[#2C2621] shadow-sm hover:bg-white animate-in duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col lg:w-1/2 h-full">
              <div className="px-7 pt-8 pb-6 flex-1 overflow-y-auto no-scrollbar">
                <h2 className="text-2xl font-bold text-[#2C2621] leading-tight mb-4">{selectedItem.name}</h2>
                <div className="text-3xl font-bold text-[#967259] mb-6">{formatPrice(selectedItem.price)}</div>
                
                {selectedItem.weight && <span className="inline-block bg-[#FCFAF8] border border-[#F3EFEA] text-[#8A7969] px-4 py-2 rounded-xl text-xs font-bold mb-6 tracking-wide">{selectedItem.weight}</span>}
                
                {selectedItem.desc && (
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#A99F93] mb-2 font-sans">Опис</h4>
                    <p className="text-[#5C5146] font-medium leading-relaxed text-[15px]">{selectedItem.desc}</p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-[#F3EFEA] bg-[#FCFAF8]">
                <button 
                  onClick={() => {
                    toggleBookmark(selectedItem.categoryId, selectedItem.name);
                    setSelectedItem(null);
                  }}
                  className={`w-full py-4 rounded-[1.2rem] flex items-center justify-center gap-3 font-bold text-[15px] tracking-wide uppercase transition-all shadow-sm hover:shadow-md ${
                    bookmarks.includes(`${selectedItem.categoryId}__${selectedItem.name}`)
                      ? 'bg-white text-[#8A7969] border border-[#E8DCC4]'
                      : 'bg-[#967259] text-white border border-[#967259]'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${bookmarks.includes(`${selectedItem.categoryId}__${selectedItem.name}`) ? 'fill-current' : 'fill-white'}`} strokeWidth={2}/>
                  {bookmarks.includes(`${selectedItem.categoryId}__${selectedItem.name}`) ? 'Видалити із закладок' : 'Додати в закладки'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}