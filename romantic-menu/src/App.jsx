import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Bookmark, X, MapPin, 
  Phone, ChevronRight, ArrowLeft,
  Utensils, Wine, Camera, Trash2
} from 'lucide-react';

// --- ДАНІ МЕНЮ (СУВОРО ЗА PDF ТА ФОТО КОКТЕЙЛІВ) ---
const defaultPlaceholder = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";

const menuCategories = [
  // --- КУХНЯ ---
  { section: 'food', id: 'pizza', name: 'Піца', items: [
      { name: 'ROMANTIC', desc: 'соус, салямі, сир твердий, сир моцарела, ковбаса мисливська, яйце, пармезан', weight: '500г / 800г', price: '190 / 340 грн', image: '' },
      { name: 'Чотири сири', desc: 'соус, сир фета, сир твердий, сир моцарела, сир пармезан', weight: '500г / 800г', price: '190 / 340 грн', image: '' },
      { name: 'Квадро формаджі', desc: 'соус, дор блю, сир твердий, сир моцарела, сир пармезан', weight: '500г / 800г', price: '220 / 370 грн', image: '' },
      { name: 'Буфало', desc: 'соус, куряче філе, сир моцарела, помідори, сир твердий', weight: '500г / 800г', price: '190 / 340 грн', image: '' },
      { name: 'Цезар', desc: 'соус, шинка, салямі, маслини, сир моцарела, зелень', weight: '500г / 800г', price: '190 / 340 грн', image: '' },
      { name: 'Дольче Віта', desc: 'соус, сир твердий, курка, ананас, оливки, сир моцарела, пармезан', weight: '500г / 800г', price: '190 / 340 грн', image: '' },
      { name: 'Маргарита', desc: 'соус, сир твердий, сир моцарела, помідори, пармезан', weight: '500г / 800г', price: '170 / 300 грн', image: '' },
      { name: 'Барбекю', desc: 'соус, сир твердий, сир моцарела, мисливські ковбаси, шинка, салямі, гриби, цибуля, пармезан', weight: '500г / 800г', price: '200 / 360 грн', image: '' },
      { name: 'Пепероні', desc: 'соус, сир твердий, сир моцарела, салямі peperoні, перець болгарський, чілі, гриби', weight: '500г / 800г', price: '180 / 330 грн', image: '' },
      { name: 'Капрічоза', desc: 'соус, сир твердий, сир моцарела, шинка, помідори, салямі, гриби, яйця, маслини', weight: '500г / 800г', price: '200 / 360 грн', image: '' },
      { name: 'Овочева (без сиру)', desc: 'соус, гриби, маслини, перець, помідори', weight: '500г / 800г', price: '170 / 290 грн', image: '' },
      { name: 'Піца з Прошуто', desc: 'соус, сир твердий, сир моцарела, прошуто, руккола, пармезан', weight: '500г / 800г', price: '230 / 370 грн', image: '' },
      { name: 'Особлива', desc: 'соус білий, сир твердий, сир моцарела, мисливські ковбаси, пармезан', weight: '500г / 800г', price: '190 / 340 грн', image: '' },
      { name: 'Карбонара', desc: 'соус білий, сир твердий, сир моцарела, бекон, помідори, яйця перепелині, пармезан', weight: '500г / 800г', price: '190 / 340 грн', image: '' },
      { name: 'Пан Тунець', desc: 'соус, сир твердий, сир моцарела, цибуля, гриби, тунець консервований', weight: '500г / 800г', price: '230 / 370 грн', image: '' },
      { name: 'Салямі', desc: 'соус, салямі, сир твердий, сир моцарела, пармезан', weight: '500г / 800г', price: '170 / 320 грн', image: '' },
      { name: 'Піца з Морепродуктами', desc: 'соус, морепродукти, сир твердий, сир моцарела, сир пармезан', weight: '500г / 800г', price: '290 / 420 грн', image: '' },
      { name: 'Корнетта', desc: 'соус, шинка, курка, кукурудза, сир твердий, сир моцарела, помідори, сир пармезан', weight: '500г / 800г', price: '190 / 340 грн', image: '' }
  ]},
  { section: 'food', id: 'salads', name: 'Салати', items: [
      { name: 'Цезар', desc: 'мікс салату, помідори, яйце, філе куряче, сир пармезан, соус цезар, грінки', weight: '250 г', price: '190 грн', image: '' },
      { name: 'Салат ROMANTIC', desc: 'авокадо, мікс салату, соус, креветки, помідори, кунжут', weight: '200 г', price: '200 грн', image: '' },
      { name: 'Грецький', desc: 'мікс салату, помідори, огірки, перець болгарський, маслини, сир Фета, оливкова олія', weight: '200 г', price: '160 грн', image: '' },
      { name: 'Шопський', desc: 'огірки, помідори, перець, цибуля, бринза, оливкова олія', weight: '250 г', price: '150 грн', image: '' },
      { name: 'Вітамінний', desc: 'капуста, цибуля, морква, олія', weight: '200 г', price: '110 грн', image: '' },
      { name: 'Салат з тунцем', desc: 'мікс салату, огірки, помідори, тунець, олія оливкова', weight: '200 г', price: '200 грн', image: '' },
      { name: 'Салат с лососем', desc: 'лосось, філаделфія, мікс салата, помідори, авокадо', weight: '250 г', price: '230 грн', image: '' }
  ]},
  { section: 'food', id: 'cold_snacks', name: 'Холодні закуски', items: [
      { name: 'Брускети з помідорами', desc: '', weight: '3 шт.', price: '80 грн', image: '' },
      { name: 'Брускети з лососем', desc: '', weight: '3 шт.', price: '160 грн', image: '' },
      { name: 'Брускети з прошутто', desc: '', weight: '3 шт.', price: '150 грн', image: '' },
      { name: 'Сет брускет', desc: 'з лососем, помідорами, прошутто', weight: '3 шт.', price: '380 грн', image: '' },
      { name: 'Козацька закуска', desc: 'сало, підчеревина, грінки хлібні, бринза, часник', weight: '400 г', price: '350 грн', image: '' },
      { name: "М'ясна нарізка", desc: 'proшутто, шинка, салямі 3-х видів', weight: '400 г', price: '480 грн', image: '' },
      { name: 'Сирна нарізка', desc: 'брі, дор блю, пармезан, сир з горіхами, мед', weight: '400 г', price: '500 грн', image: '' },
      { name: 'Оселедець з картоплею', desc: '', weight: '300 г', price: '280 грн', image: '' }
  ]},
  { section: 'food', id: 'soups', name: 'Перші страви', items: [
      { name: 'Бульйон курячий', desc: 'з локшиною', weight: '300 г', price: '70 грн', image: '' },
      { name: 'Солянка', desc: '', weight: '300 г', price: '80 грн', image: '' }
  ]},
  { section: 'food', id: 'fish', name: 'Рибні страви', items: [
      { name: 'Короп смажений у кукурудзяній муці', desc: '', weight: '100 г', price: '58 грн', image: '' },
      { name: 'Короп на мангалі', desc: '', weight: '100 г', price: '58 грн', image: '' },
      { name: 'Скумбрія на мангалі', desc: '', weight: '100 г', price: '62 грн', image: '' },
      { name: 'Дорадо на мангалі', desc: '', weight: '100 г', price: '110 грн', image: '' },
      { name: 'Лангустіни', desc: '', weight: '6 шт.', price: '350 грн', image: '' },
      { name: 'Креветка в клярі', desc: '', weight: '6 шт.', price: '350 грн', image: '' },
      { name: 'Соломаха', desc: '', weight: '50 г', price: '30 грн', image: '' }
  ]},
  { section: 'food', id: 'sides', name: 'Гарніри', items: [
      { name: 'Картопля фрі', desc: '', weight: '150/50 г', price: '90 грн', image: '' },
      { name: 'Картопля пюре', desc: '', weight: '200 г', price: '70 грн', image: '' },
      { name: 'Картопля по домашньому', desc: 'з беконом та бринзою', weight: '200 г', price: '90 грн', image: '' },
      { name: 'Сирні кульки', desc: '', weight: '7 шт.', price: '250 грн', image: '' },
      { name: 'Нагетси / соус', desc: '', weight: '7 шт.', price: '180 грн', image: '' },
      { name: 'Бануш з шкварками та бринзою', desc: '', weight: '300 г', price: '140 грн', image: '' },
      { name: 'Мамалига', desc: '', weight: '350 г', price: '80 грн', image: '' },
      { name: 'Шкварки', desc: '', weight: '50 г', price: '30 грн', image: '' },
      { name: 'Бринза', desc: '', weight: '50 г', price: '30 грн', image: '' },
      { name: 'Овочі гриль', desc: 'кабачки, баклажани, гриби, перець болгарський', weight: '400 г', price: '200 грн', image: '' }
  ]},
  { section: 'food', id: 'meat', name: "М'ясні страви", items: [
      { name: 'Курячий шашлик', desc: '', weight: '100 г', price: '65 грн', image: '' },
      { name: 'Шашлик свинний', desc: '', weight: '100 г', price: '80 грн', image: '' },
      { name: 'Курячі крильця', desc: '', weight: '100 г', price: '50 грн', image: '' },
      { name: 'Соус', desc: '', weight: '50 г', price: '30 грн', image: '' }
  ]},
  { section: 'food', id: 'sushi', name: 'Роли', items: [
      { name: 'Рол Преміум ROMANTIC', desc: 'Рол із лососем, крем-сиром та авокадо, доповнений хрусткою креветкою панко, ікрою тобіко та червоною ікрою.', weight: '320 г', price: '550 грн', image: '' },
      { name: 'Філадельфія', desc: 'лосось, авокадо, сир Філадельфія, огірок', weight: '', price: '250 грн', image: '' },
      { name: 'Каліфорнія', desc: 'лосось, авокадо, огірок, кунжут', weight: '', price: '185 грн', image: '' },
      { name: 'Макі з лосося', desc: 'лосось, авокадо', weight: '', price: '130 грн', image: '' },
      { name: 'Зеленний дракон', desc: 'креветка, авокадо, сир Філадельфія, огірок, соус унагі', weight: '', price: '250 грн', image: '' },
      { name: 'Червоний дракон', desc: 'огірок, авокадо, лосось, ікра Tobikko, японський майонез', weight: '', price: '250 грн', image: '' },
      { name: 'Нагасакі', desc: 'лосось, сир Філадельфія, авокадо, ікра Tobikko', weight: '', price: '250 грн', image: '' },
      { name: 'Боніто з вугрем', desc: 'вугор, сир Філадельфія, огірок, струшка тунця', weight: '', price: '250 грн', image: '' },
      { name: 'Боніто з креветкою', desc: 'креветка, сир Філадельфія, огірок, струшка тунця', weight: '', price: '250 грн', image: '' },
      { name: 'Золотий дракон', desc: 'авокадо, вугор, сир філаделфія, соус унагі', weight: '', price: '320 грн', image: '' },
      { name: 'Гарячий рол з креветкою', desc: 'філадельфія, креветка, темпура, авокадо', weight: '', price: '250 грн', image: '' },
      { name: 'Гарячий рол з лососем', desc: 'філаделфія, лосось, темпура, авокадо', weight: '', price: '250 грн', image: '' },
      { name: 'Сет драконів', desc: 'Зелен дракон, Червоний дракон, Золотий дракон, Нагасакі', weight: '', price: '950 грн', image: '' },
      { name: 'Сет Філадельфії', desc: 'Філадельфія, нагасакі, макі з лосося, Боніто з креветкою', weight: '', price: '800 грн', image: '' },
      { name: 'Сет Макі', desc: 'Макі з лососем, макі з авокадо, макі з огірком, макі з вугрем', weight: '', price: '470 грн', image: '' }
  ]},
  { section: 'food', id: 'desserts', name: 'Десерти', items: [
      { name: 'Шоколадний фондан з морозивом', desc: '', weight: '100г / 90г', price: '150 грн', image: '' },
      { name: 'Морозиво з джемом', desc: '', weight: '150 г', price: '90 грн', image: '' },
      { name: 'Морозиво з фруктами', desc: '', weight: '200 г', price: '100 грн', image: '' },
      { name: 'Млинці з шоколадом та бананом', desc: '', weight: '200 г', price: '100 грн', image: '' },
      { name: 'Млинці з маком', desc: '', weight: '200 г', price: '90 грн', image: '' },
      { name: 'Млинці з вишнями', desc: '', weight: '200 г', price: '90 грн', image: '' },
      { name: 'Сирники з джемом', desc: '', weight: '200 г', price: '120 грн', image: '' }
  ]},

  // --- БАР ---
  { section: 'bar', id: 'alc_cocktails', name: 'Алкогольні коктейлі', items: [
      { name: 'Амазонка', desc: 'фруктова база "Манго-маракуя", сироп "Ваніль", ром Bacardi, содова', weight: '300 мл', price: '180 грн', image: '' },
      { name: 'Полуничний бум', desc: 'фруктова база "Полуниця", сироп "м\'ята", ром Bacardi, содова', weight: '300 мл', price: '180 грн', image: '' },
      { name: 'Піна Колада', desc: 'ром Bacardi, сироп "Кокосовий", сік Ананасовий', weight: '300 мл', price: '180 грн', image: '' },
      { name: 'Блакитна лагуна', desc: 'горілка, сироп "Блю Курасао", Sprite', weight: '300 мл', price: '150 грн', image: '' },
      { name: 'Апероль', desc: 'апероль, біле вино, Sprite', weight: '300 мл', price: '200 грн', image: '' },
      { name: 'Мохіто', desc: 'м\'ята, лимон, лайм, ром Bacardi, Sprite', weight: '300 мл', price: '170 грн', image: '' },
      { name: 'Сангрія', desc: 'червоне вино, ром Bacardi, Sprite', weight: '300 мл', price: '200 грн', image: '' }
  ]},
  { section: 'bar', id: 'non_alc_cocktails', name: 'Безалкогольні коктейлі', items: [
      { name: 'Лимонад «Манго-маракуя»', desc: '', weight: '300 мл', price: '90 грн', image: '' },
      { name: 'Лимонад «Ківі»', desc: '', weight: '300 мл', price: '90 грн', image: '' },
      { name: 'Лимонад «Полуниця»', desc: '', weight: '300 мл', price: '90 грн', image: '' },
      { name: 'Лимонад «Ананас»', desc: '', weight: '300 мл', price: '90 грн', image: '' },
      { name: 'Лимонад «Цитрус»', desc: '', weight: '300 мл', price: '90 грн', image: '' },
      { name: 'Мохіто безалкогольне', desc: 'м\'ята, лимон, лайм, Sprite', weight: '300 мл', price: '90 грн', image: '' }
  ]},
  { section: 'bar', id: 'coffee_tea', name: 'Кава та чай', items: [
      { name: 'Еспресо', desc: '', weight: '0.03 л', price: '35 грн', image: '' },
      { name: 'Американо', desc: '', weight: '0.12 л', price: '50 грн', image: '' },
      { name: 'Американо з молоком', desc: '', weight: '0.16 л', price: '60 грн', image: '' },
      { name: 'Латте', desc: '', weight: '0.2 л', price: '75 грн', image: '' },
      { name: 'Капучино', desc: '', weight: '0.12 л', price: '75 грн', image: '' },
      { name: 'Чай заварний', desc: 'в асортименті', weight: '0.7 л', price: '60 грн', image: '' },
      { name: 'Чай живий', desc: 'в асортименті', weight: '0.7 л', price: '90 грн', image: '' },
      { name: 'Какао з маршмелоу', desc: '', weight: '', price: '90 грн', image: '' }
  ]},
  { section: 'bar', id: 'vodka', name: 'Горілка', items: [
      { name: 'Finlandia', desc: '', weight: '50г / 0.5л', price: '65 / 500 грн', image: '' },
      { name: 'Козацька Рада', desc: '', weight: '50г / 0.5л', price: '30 / 220 грн', image: '' },
      { name: 'Гетьман', desc: '', weight: '50г / 0.5л', price: '35 / 240 грн', image: '' },
      { name: 'Absolut', desc: '', weight: '50г / 0.5л', price: '70 / 520 грн', image: '' },
      { name: 'Львівська Преміум', desc: '', weight: '50г / 0.7л', price: '45 / 450 грн', image: '' }
  ]},
  { section: 'bar', id: 'cognac', name: 'Коньяк', items: [
      { name: 'ΜΕТАХА 5*', desc: '', weight: '50г / 0.5л', price: '70 / 570 грн', image: '' },
      { name: 'Старий Кахеті 5*', desc: '', weight: '50г / 0.5л', price: '50 / 450 грн', image: '' },
      { name: 'Азнаурі 5*', desc: '', weight: '50г / 0.5л', price: '50 / 450 грн', image: '' },
      { name: 'Александріон 5*', desc: '', weight: '50г / 0.5л', price: '50 / 450 грн', image: '' }
  ]},
  { section: 'bar', id: 'whiskey', name: 'Віскі', items: [
      { name: "William lawson's", desc: '', weight: '50г / 0.5л', price: '80 / 700 грн', image: '' },
      { name: 'Jack Daniels', desc: '', weight: '50г / 0.5л', price: '110 / 1000 грн', image: '' },
      { name: 'Ballantines', desc: '', weight: '50г / 0.5л', price: '100 / 900 грн', image: '' }
  ]},
  { section: 'bar', id: 'champagne', name: 'Шампанське', items: [
      { name: 'Fragollino', desc: '', weight: '0.75 л', price: '350 грн', image: '' },
      { name: 'Martini Asti', desc: '', weight: '0.75 л', price: '600 грн', image: '' },
      { name: 'Prosseco', desc: '', weight: '0.75 л', price: '600 грн', image: '' }
  ]},
  { section: 'bar', id: 'wine', name: 'Вино', items: [
      { name: 'Вілла Крим', desc: '', weight: '0.75 л', price: '200 грн', image: '' },
      { name: 'Kartuli Vazi', desc: '', weight: '0.75 л', price: '350 грн', image: '' }
  ]},
  { section: 'bar', id: 'beer_snacks', name: 'Закуски до пива', items: [
      { name: 'Бастурма', desc: '', weight: '100 г', price: '140 грн', image: '' },
      { name: 'Прошутто', desc: '', weight: '100 г', price: '140 грн', image: '' },
      { name: 'Фокачо', desc: '', weight: '300 г', price: '70 грн', image: '' },
      { name: 'Вушка', desc: '', weight: '100 г', price: '90 грн', image: '' },
      { name: 'Цибулеві кільця', desc: '', weight: '100 г', price: '70 грн', image: '' },
      { name: 'Кільця кальмарів', desc: '', weight: '100 г', price: '130 грн', image: '' },
      { name: 'Соус тартар', desc: '', weight: '50 г', price: '30 грн', image: '' }
  ]},
  { section: 'bar', id: 'draft_beer', name: 'Пиво на розлив', items: [
      { name: 'Пшеничне нефільтроване', desc: '', weight: '0.33/0.5л', price: '60 / 75 грн', image: '' },
      { name: '«Свіжий Розлив» ППБ', desc: '', weight: '0.33/0.5л', price: '50 / 65 грн', image: '' }
  ]},
  { section: 'bar', id: 'non_alcoholic', name: 'Безалкогольні напої', items: [
      { name: 'Coca-cola', desc: '', weight: '', price: '50 грн', image: '' },
      { name: 'Fanta', desc: '', weight: '', price: '50 грн', image: '' },
      { name: 'Вода мінеральна Bonaqua', desc: '', weight: '', price: '40 грн', image: '' },
      { name: 'Сік в асортименті', desc: '', weight: '0.25/1л', price: '40 / 120 грн', image: '' },
      { name: 'Квас', desc: '', weight: '0.33/0.5л', price: '40 / 60 грн', image: '' }
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
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); 

  const [bookmarks, setBookmarks] = useState([]);
  const [customImages, setCustomImages] = useState({});
  const isManualScrollingRef = useRef(false);

  // --- LOCAL STORAGE (Збереження закладок та кастомних фото) ---
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('romantic_light_fixed_v2');
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

      const savedImages = localStorage.getItem('romantic_custom_images');
      if (savedImages) setCustomImages(JSON.parse(savedImages));
    } catch (e) {
      console.error(e);
    }
  }, []);

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
      localStorage.setItem('romantic_light_fixed_v2', JSON.stringify(updated));
    } catch (e) {}
  };

  // --- ЗАВАНТАЖЕННЯ КАСТОМНОГО ФОТО ---
  const handleImageUpload = (e, uniqueId) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 500;
        const MAX_HEIGHT = 500;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Стискаємо зображення до JPEG з якістю 60% щоб не переповнити localStorage
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);

        const newImages = { ...customImages, [uniqueId]: compressedDataUrl };
        setCustomImages(newImages);

        try {
          localStorage.setItem('romantic_custom_images', JSON.stringify(newImages));
        } catch (err) {
          alert("Пам'ять переповнена. Неможливо зберегти більше фотографій, спробуйте завантажити менше зображення.");
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const removeCustomImage = (uniqueId) => {
    const newImages = { ...customImages };
    delete newImages[uniqueId];
    setCustomImages(newImages);
    try {
      localStorage.setItem('romantic_custom_images', JSON.stringify(newImages));
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

  // --- БЕЗПЕЧНИЙ SCROLL-SPY ---
  useEffect(() => {
    if (view !== 'menu' || searchQuery) return;

    const handleScroll = () => {
      if (isManualScrollingRef.current) return;

      const headerOffset = window.innerWidth >= 1024 ? 120 : 180;
      const scrollY = window.scrollY;
      let newActive = activeCategory;

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

      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom && categories.length > 0) {
        newActive = categories[categories.length - 1].id;
      }

      if (newActive !== activeCategory && newActive !== 'favorites') {
        setActiveCategory(newActive);
        
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
    
    if (window.innerWidth < 1024) {
      const tab = document.getElementById(`tab-${id}`);
      const container = document.getElementById('tabs-container');
      if (tab && container) {
        const scrollLeft = tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }

    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 800);
  };

  useEffect(() => {
    if (selectedItem || showSectionModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedItem, showSectionModal]);


  // --- ФУНКЦІЯ ВІДМАЛЬОВКИ КАРТКИ ТОВАРУ ---
  const renderItemCard = (item, idx, customCategoryId) => {
    const catId = customCategoryId || item.categoryId;
    const uniqueId = `${catId}__${item.name}`;
    const isBookmarked = bookmarks.includes(uniqueId);
    
    // Пріоритет: Кастомне фото -> Фото з коду -> Дефолтний плейсхолдер
    const imgSrc = customImages[uniqueId] || item.image || defaultPlaceholder;

    return (
      <div 
        key={uniqueId} 
        className="bg-white rounded-[1.2rem] p-4 mb-3 flex gap-4 cursor-pointer shadow-sm active:bg-gray-50 transition-colors" 
        onClick={() => setSelectedItem({ ...item, categoryId: catId })}
      >
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-[16px] font-bold text-[#111827] leading-snug mb-1">{item.name}</h3>
          <div className="text-[16px] font-bold text-[#111827] mb-1.5">{formatPrice(item.price)}</div>
          {item.desc && <p className="text-[13px] text-[#6B7280] leading-snug line-clamp-2 mb-2">{item.desc}</p>}
          <div className="mt-auto">
            <span className="text-[12px] text-[#9CA3AF] font-medium">{item.weight || (menuSection === 'bar' ? 'порція' : '100 г')}</span>
          </div>
        </div>

        <div className="w-[100px] flex-shrink-0 relative h-[100px]">
          <img src={imgSrc} alt={item.name} className="w-full h-full rounded-[1rem] object-cover bg-gray-100"/>
          
          {/* Кнопка зміни фото (Камера) */}
          <label className="absolute top-1 left-1 w-7 h-7 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center z-10 cursor-pointer shadow-sm hover:bg-gray-100" onClick={e => e.stopPropagation()}>
            <Camera className="w-3.5 h-3.5 text-gray-700" />
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, uniqueId)} />
          </label>

          <button 
            onClick={(e) => { e.stopPropagation(); toggleBookmark(catId, item.name); }}
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center z-10 active:scale-90"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#111827] text-[#111827]' : 'text-[#6B7280]'}`} strokeWidth={isBookmarked ? 1.5 : 2} />
          </button>
        </div>
      </div>
    );
  };


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
              <span className="text-sm font-bold tracking-wider uppercase text-[#2C2621]">Кухня</span>
            </button>

            <button onClick={() => handleOpenMenu('bar')} className="bg-white rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 shadow-lg border border-[#E8DCC4]/40 hover:border-[#967259]/40 hover:-translate-y-1 transition-all group">
              <div className="w-16 h-16 rounded-full bg-[#FCFAF8] text-[#967259] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner text-3xl">
                <Wine className="w-8 h-8" />
              </div>
              <span className="text-sm font-bold tracking-wider uppercase text-[#2C2621]">Бар</span>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#967259] w-5 h-5">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
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
  // ЕКРАН 2: МЕНЮ
  // ==========================================
  return (
    <div className="min-h-screen w-full bg-[#F3F4F6] text-[#111827] font-sans relative mx-auto max-w-md shadow-2xl">
      
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        body { background-color: #F3F4F6; margin: 0; }
      `}} />

      {/* HEADER (Sticky) */}
      <div className="sticky top-0 z-40 bg-[#F3F4F6] pt-4 pb-2 w-full">
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            
            <button 
              onClick={() => setView('home')} 
              className="w-10 h-10 rounded-full bg-[#8B4513] text-white flex-shrink-0 flex items-center justify-center font-serif text-[9px] shadow-sm leading-tight text-center active:scale-95 transition-transform"
            >
              ROM<br/>ANTIC
            </button>
            
            <div className="flex items-center gap-2 justify-end flex-grow ml-2">
              {isSearchActive ? (
                <div className="relative w-full max-w-[200px] animate-in fade-in zoom-in-95 duration-200">
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Пошук..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 bg-white border border-gray-200 rounded-full text-[15px] outline-none pl-10 pr-10 shadow-sm"
                  />
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#9CA3AF]" />
                  <button 
                    onClick={() => { setIsSearchActive(false); setSearchQuery(''); }} 
                    className="absolute right-3.5 top-3 text-[#9CA3AF] hover:text-[#111827]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSearchActive(true)}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#4B5563] shadow-sm active:bg-gray-50 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <button 
            onClick={() => setShowSectionModal(true)}
            className="w-full bg-[#E5E7EB] border border-transparent hover:bg-[#D1D5DB] rounded-xl py-3 px-4 flex items-center justify-between mb-3 active:scale-[0.99] transition-all"
          >
            <span className="font-semibold text-[16px] text-[#111827]">{menuSection === 'food' ? 'Кухня' : 'Бар'}</span>
            <ChevronRight className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Горизонтальний скрол категорій */}
        {!searchQuery && (
          <div id="tabs-container" className="flex overflow-x-auto gap-2 px-4 no-scrollbar pb-2 pt-1">
            <button
              id="tab-favorites"
              onClick={() => scrollToCategory('favorites')}
              className={`px-4 py-2 rounded-full text-[14px] font-semibold transition-colors flex items-center justify-center flex-shrink-0 border ${
                activeCategory === 'favorites' 
                  ? 'bg-[#5B3BA8] text-white border-[#5B3BA8]' 
                  : 'bg-[#F3F4F6] text-[#4B5563] border-transparent hover:bg-gray-200'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${activeCategory === 'favorites' ? 'fill-white' : ''}`} strokeWidth={activeCategory === 'favorites' ? 1.5 : 2}/>
            </button>
            
            {currentSectionCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`tab-${cat.id}`}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`px-5 py-2 rounded-full text-[14px] font-semibold transition-colors flex-shrink-0 border ${
                    isActive 
                      ? 'bg-[#5B3BA8] text-white border-[#5B3BA8]' 
                      : 'bg-[#F3F4F6] text-[#4B5563] border-transparent hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ОСНОВНА ЧАСТИНА (Список страв) */}
      <div className="px-4 pt-4 pb-24 bg-white rounded-t-3xl min-h-screen">
        
        {/* Банер (лише коли не пошук і не вибране) */}
        {activeCategory !== 'favorites' && !searchQuery && (
          <div className="w-full bg-[#111827] rounded-[1.2rem] mb-8 overflow-hidden relative shadow-md mt-4">
            <div className="relative h-32 w-full">
              <img 
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80" 
                alt="Live Music" 
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-center p-5 text-white">
                <p className="text-[9px] tracking-[0.2em] uppercase font-semibold text-gray-300 mb-1">Ресторан Romantic</p>
                <h3 className="text-2xl font-serif italic mb-2">Live Music Night</h3>
                <div className="flex gap-4 text-xs font-semibold text-gray-400">
                  <span>Субота - Неділя</span>
                  <span>18:00</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* СПИСОК */}
        {searchQuery ? (
          <div>
            <h2 className="text-[26px] font-bold text-[#111827] mb-6 mt-4">Результати пошуку</h2>
            <div className="flex flex-col">
              {currentSectionCategories.flatMap(cat => cat.items.map(item => ({...item, categoryId: cat.id, originalCategory: cat.name})))
                .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase())))
                .map((item, idx) => renderItemCard(item, idx, item.categoryId))}
            </div>
          </div>
        ) : activeCategory === 'favorites' ? (
          <div>
            <h2 className="text-[26px] font-bold text-[#111827] mb-6 mt-4">Збережені</h2>
            <div className="flex flex-col">
              {currentSectionCategories.flatMap(cat => cat.items.map(item => ({...item, categoryId: cat.id, originalCategory: cat.name})))
                .filter(item => bookmarks.includes(`${item.categoryId}__${item.name}`))
                .map((item, idx) => renderItemCard(item, idx, item.categoryId))}
            </div>
            {bookmarks.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[1.2rem] border border-transparent shadow-sm mt-2">
                <Bookmark className="w-8 h-8 text-gray-300 mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-[#6B7280] text-sm">Тут поки нічого немає.</p>
              </div>
            )}
          </div>
        ) : (
          currentSectionCategories.map((category) => (
            <div key={category.id} id={`cat-${category.id}`} className="mb-10 pt-2 scroll-mt-[180px]">
              <h2 className="text-[26px] font-bold text-[#111827] mb-5">{category.name}</h2>
              <div className="flex flex-col">
                {category.items.map((item, idx) => renderItemCard(item, idx, category.id))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* МОДАЛЬНЕ ВІКНО: Картка Товару (Bottom Sheet) */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedItem(null)}></div>
          <div className="bg-white w-full max-w-md rounded-t-[1.5rem] animate-in slide-in-from-bottom-full overflow-hidden flex flex-col max-h-[85vh] z-10 relative">
            
            <div className="relative w-full h-64 bg-gray-100">
              <img 
                src={customImages[`${selectedItem.categoryId}__${selectedItem.name}`] || selectedItem.image || defaultPlaceholder} 
                alt={selectedItem.name} 
                className="w-full h-full object-cover" 
              />
              
              <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#111827] shadow-sm hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Кнопки зміни/видалення фото в модалці */}
              <div className="absolute top-4 left-4 flex gap-2">
                <label className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#111827] cursor-pointer shadow-sm hover:bg-white">
                  <Camera className="w-5 h-5" />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, `${selectedItem.categoryId}__${selectedItem.name}`)} />
                </label>
                {customImages[`${selectedItem.categoryId}__${selectedItem.name}`] && (
                  <button 
                    onClick={() => removeCustomImage(`${selectedItem.categoryId}__${selectedItem.name}`)}
                    className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 shadow-sm hover:bg-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="px-6 py-6 flex-1 overflow-y-auto no-scrollbar">
              <h2 className="text-[22px] font-bold text-[#111827] leading-tight mb-2">{selectedItem.name}</h2>
              <div className="text-[22px] font-bold text-[#111827] mb-6">{formatPrice(selectedItem.price)}</div>
              
              {selectedItem.desc && (
                <p className="text-[#4B5563] text-[15px] leading-relaxed mb-6">{selectedItem.desc}</p>
              )}

              {selectedItem.weight && (
                <div className="text-[#9CA3AF] text-[14px] font-medium">{selectedItem.weight}</div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
              <button 
                onClick={() => {
                  toggleBookmark(selectedItem.categoryId, selectedItem.name);
                  setSelectedItem(null);
                }}
                className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold text-[16px] transition-colors ${
                  bookmarks.includes(`${selectedItem.categoryId}__${selectedItem.name}`)
                    ? 'bg-gray-100 text-[#111827]'
                    : 'bg-[#5B3BA8] text-white'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${bookmarks.includes(`${selectedItem.categoryId}__${selectedItem.name}`) ? 'fill-[#111827]' : ''}`} />
                {bookmarks.includes(`${selectedItem.categoryId}__${selectedItem.name}`) ? 'Видалити із закладок' : 'Додати в закладки'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* МОДАЛЬНЕ ВІКНО: Вибір розділу (Кухня / Бар) */}
      {showSectionModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowSectionModal(false)}></div>
          <div className="bg-[#F3F4F6] w-full max-w-md rounded-t-[1.5rem] p-4 pb-8 animate-in slide-in-from-bottom-10 z-10 relative">
            <div className="flex items-center justify-between mb-4 px-2 pt-2">
              <h3 className="text-[20px] font-bold text-[#111827]">Розділи меню</h3>
              <button onClick={() => setShowSectionModal(false)} className="p-1 rounded-full text-gray-500 hover:bg-gray-200"><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-2.5">
              <button onClick={() => handleSectionSwitch('food')} className={`w-full p-4 rounded-[1.2rem] flex items-center justify-between transition-all bg-white shadow-sm active:bg-gray-50`}>
                <span className="font-bold text-[17px] text-[#111827]">Кухня</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button onClick={() => handleSectionSwitch('bar')} className={`w-full p-4 rounded-[1.2rem] flex items-center justify-between transition-all bg-white shadow-sm active:bg-gray-50`}>
                <span className="font-bold text-[17px] text-[#111827]">Бар</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}