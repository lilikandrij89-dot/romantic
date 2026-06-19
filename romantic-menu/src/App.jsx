import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Bookmark, X, MapPin, 
  Phone, ChevronDown, ArrowLeft,
  Utensils, Wine, Camera, Trash2, Heart, 
} from 'lucide-react';

// --- ДАНІ МЕНЮ (СУВОРО ЗА PDF ТА ФОТО КОКТЕЙЛІВ) ---
const defaultPlaceholder = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80";

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
  { section: 'food', id: 'salads', name: 'Салати', defaultImage: images.salads, items: [
      { name: 'Цезар', desc: 'мікс салату, помідори, яйце, філе куряче, сир пармезан, соус цезар, грінки', weight: '250 г', price: '190 грн', image: '' },
      { name: 'Салат ROMANTIC', desc: 'авокадо, мікс салату, соус, креветки, помідори, кунжут', weight: '200 г', price: '200 грн', image: '' },
      { name: 'Грецький', desc: 'мікс салату, помідори, огірки, перець болгарський, маслини, сир Фета, оливкова олія', weight: '200 г', price: '160 грн', image: '' },
      { name: 'Шопський', desc: 'огірки, помідори, перець, цибуля, бринза, оливкова олія', weight: '250 г', price: '150 грн', image: '' },
      { name: 'Вітамінний', desc: 'капуста, цибуля, морква, олія', weight: '200 г', price: '110 грн', image: '' },
      { name: 'Салат з тунцем', desc: 'мікс салату, огірки, помідори, тунець, олія оливкова', weight: '200 г', price: '200 грн', image: '' },
      { name: 'Салат с лососем', desc: 'лосось, філаделфія, мікс салата, помідори, авокадо', weight: '250 г', price: '230 грн', image: '' }
  ]},
  { section: 'food', id: 'cold_snacks', name: 'Холодні закуски', defaultImage: images.snacks, items: [
      { name: 'Брускети з помідорами', desc: '', weight: '3 шт.', price: '80 грн', image: '' },
      { name: 'Брускети з лососем', desc: '', weight: '3 шт.', price: '160 грн', image: '' },
      { name: 'Брускети з прошутто', desc: '', weight: '3 шт.', price: '150 грн', image: '' },
      { name: 'Сет брускет', desc: 'з лососем, помідорами, прошутто', weight: '3 шт.', price: '380 грн', image: '' },
      { name: 'Козацька закуска', desc: 'сало, підчеревина, грінки хлібні, бринза, часник', weight: '400 г', price: '350 грн', image: '' },
      { name: "М'ясна нарізка", desc: 'proшутто, шинка, салямі 3-х видів', weight: '400 г', price: '480 грн', image: '' },
      { name: 'Сирна нарізка', desc: 'брі, дор блю, пармезан, сир з горіхами, мед', weight: '400 г', price: '500 грн', image: '' },
      { name: 'Оселедець з картоплею', desc: '', weight: '300 г', price: '280 грн', image: '' }
  ]},
  { section: 'food', id: 'soups', name: 'Перші страви', defaultImage: images.soups, items: [
      { name: 'Бульйон курячий', desc: 'з локшиною', weight: '300 г', price: '70 грн', image: '' },
      { name: 'Солянка', desc: '', weight: '300 г', price: '80 грн', image: '' }
  ]},
  { section: 'food', id: 'fish', name: 'Рибні страви', defaultImage: images.fish, items: [
      { name: 'Короп смажений у кукурудзяній муці', desc: '', weight: '100 г', price: '58 грн', image: '' },
      { name: 'Короп на мангалі', desc: '', weight: '100 г', price: '58 грн', image: '' },
      { name: 'Скумбрія на мангалі', desc: '', weight: '100 г', price: '62 грн', image: '' },
      { name: 'Дорадо на мангалі', desc: '', weight: '100 г', price: '110 грн', image: '' },
      { name: 'Лангустіни', desc: '', weight: '6 шт.', price: '350 грн', image: '' },
      { name: 'Креветка в клярі', desc: '', weight: '6 шт.', price: '350 грн', image: '' },
      { name: 'Соломаха', desc: '', weight: '50 г', price: '30 грн', image: '' }
  ]},
  { section: 'food', id: 'sides', name: 'Гарніри', defaultImage: images.sides, items: [
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
  { section: 'food', id: 'meat', name: "М'ясні страви", defaultImage: images.meat, items: [
      { name: 'Курячий шашлик', desc: '', weight: '100 г', price: '65 грн', image: '' },
      { name: 'Шашлик свинний', desc: '', weight: '100 г', price: '80 грн', image: '' },
      { name: 'Курячі крильця', desc: '', weight: '100 г', price: '50 грн', image: '' },
      { name: 'Соус', desc: '', weight: '50 г', price: '30 грн', image: '' }
  ]},
  { section: 'food', id: 'sushi', name: 'Роли', defaultImage: images.sushi, items: [
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
  { section: 'food', id: 'desserts', name: 'Десерти', defaultImage: images.desserts, items: [
      { name: 'Шоколадний фондан з морозивом', desc: '', weight: '100г / 90г', price: '150 грн', image: '' },
      { name: 'Морозиво з джемом', desc: '', weight: '150 г', price: '90 грн', image: '' },
      { name: 'Морозиво з фруктами', desc: '', weight: '200 г', price: '100 грн', image: '' },
      { name: 'Млинці з шоколадом та бананом', desc: '', weight: '200 г', price: '100 грн', image: '' },
      { name: 'Млинці з маком', desc: '', weight: '200 г', price: '90 грн', image: '' },
      { name: 'Млинці з вишнями', desc: '', weight: '200 г', price: '90 грн', image: '' },
      { name: 'Сирники з джемом', desc: '', weight: '200 г', price: '120 грн', image: '' }
  ]},

  // --- БАР ---
  { section: 'bar', id: 'alc_cocktails', name: 'Алкогольні коктейлі', defaultImage: images.alcohol, items: [
      { name: 'Амазонка', desc: 'фруктова база "Манго-маракуя", сироп "Ваніль", ром Bacardi, содова', weight: '300 мл', price: '180 грн', image: '' },
      { name: 'Полуничний бум', desc: 'фруктова база "Полуниця", сироп "м\'ята", ром Bacardi, содова', weight: '300 мл', price: '180 грн', image: '' },
      { name: 'Піна Колада', desc: 'ром Bacardi, сироп "Кокосовий", сік Ананасовий', weight: '300 мл', price: '180 грн', image: '' },
      { name: 'Блакитна лагуна', desc: 'горілка, сироп "Блю Курасао", Sprite', weight: '300 мл', price: '150 грн', image: '' },
      { name: 'Апероль', desc: 'апероль, біле вино, Sprite', weight: '300 мл', price: '200 грн', image: '' },
      { name: 'Мохіто', desc: 'м\'ята, лимон, лайм, ром Bacardi, Sprite', weight: '300 мл', price: '170 грн', image: '' },
      { name: 'Сангрія', desc: 'червоне вино, ром Bacardi, Sprite', weight: '300 мл', price: '200 грн', image: '' }
  ]},
  { section: 'bar', id: 'non_alc_cocktails', name: 'Безалкогольні коктейлі', defaultImage: images.drinks, items: [
      { name: 'Лимонад «Манго-маракуя»', desc: '', weight: '300 мл', price: '90 грн', image: '' },
      { name: 'Лимонад «Ківі»', desc: '', weight: '300 мл', price: '90 грн', image: '' },
      { name: 'Лимонад «Полуниця»', desc: '', weight: '300 мл', price: '90 грн', image: '' },
      { name: 'Лимонад «Ананас»', desc: '', weight: '300 мл', price: '90 грн', image: '' },
      { name: 'Лимонад «Цитрус»', desc: '', weight: '300 мл', price: '90 грн', image: '' },
      { name: 'Мохіто безалкогольне', desc: 'м\'ята, лимон, лайм, Sprite', weight: '300 мл', price: '90 грн', image: '' }
  ]},
  { section: 'bar', id: 'coffee_tea', name: 'Кава та чай', defaultImage: images.coffee, items: [
      { name: 'Еспресо', desc: '', weight: '0.03 л', price: '35 грн', image: '' },
      { name: 'Американо', desc: '', weight: '0.12 л', price: '50 грн', image: '' },
      { name: 'Американо з молоком', desc: '', weight: '0.16 л', price: '60 грн', image: '' },
      { name: 'Латте', desc: '', weight: '0.2 л', price: '75 грн', image: '' },
      { name: 'Капучино', desc: '', weight: '0.12 л', price: '75 грн', image: '' },
      { name: 'Чай заварний', desc: 'в асортименті', weight: '0.7 л', price: '60 грн', image: '' },
      { name: 'Чай живий', desc: 'в асортименті', weight: '0.7 л', price: '90 грн', image: '' },
      { name: 'Какао з маршмелоу', desc: '', weight: '', price: '90 грн', image: '' }
  ]},
  { section: 'bar', id: 'vodka', name: 'Горілка', defaultImage: images.alcohol, items: [
      { name: 'Finlandia', desc: '', weight: '50г / 0.5л', price: '65 / 500 грн', image: '' },
      { name: 'Козацька Рада', desc: '', weight: '50г / 0.5л', price: '30 / 220 грн', image: '' },
      { name: 'Гетьман', desc: '', weight: '50г / 0.5л', price: '35 / 240 грн', image: '' },
      { name: 'Absolut', desc: '', weight: '50г / 0.5л', price: '70 / 520 грн', image: '' },
      { name: 'Львівська Преміум', desc: '', weight: '50г / 0.7л', price: '45 / 450 грн', image: '' }
  ]},
  { section: 'bar', id: 'cognac', name: 'Коньяк', defaultImage: images.alcohol, items: [
      { name: 'ΜΕТАХА 5*', desc: '', weight: '50г / 0.5л', price: '70 / 570 грн', image: '' },
      { name: 'Старий Кахеті 5*', desc: '', weight: '50г / 0.5л', price: '50 / 450 грн', image: '' },
      { name: 'Азнаурі 5*', desc: '', weight: '50г / 0.5л', price: '50 / 450 грн', image: '' },
      { name: 'Александріон 5*', desc: '', weight: '50г / 0.5л', price: '50 / 450 грн', image: '' }
  ]},
  { section: 'bar', id: 'whiskey', name: 'Віскі', defaultImage: images.alcohol, items: [
      { name: "William lawson's", desc: '', weight: '50г / 0.5л', price: '80 / 700 грн', image: '' },
      { name: 'Jack Daniels', desc: '', weight: '50г / 0.5л', price: '110 / 1000 грн', image: '' },
      { name: 'Ballantines', desc: '', weight: '50г / 0.5л', price: '100 / 900 грн', image: '' }
  ]},
  { section: 'bar', id: 'champagne', name: 'Шампанське', defaultImage: images.alcohol, items: [
      { name: 'Fragollino', desc: '', weight: '0.75 л', price: '350 грн', image: '' },
      { name: 'Martini Asti', desc: '', weight: '0.75 л', price: '600 грн', image: '' },
      { name: 'Prosseco', desc: '', weight: '0.75 л', price: '600 грн', image: '' }
  ]},
  { section: 'bar', id: 'wine', name: 'Вино', defaultImage: images.alcohol, items: [
      { name: 'Вілла Крим', desc: '', weight: '0.75 л', price: '200 грн', image: '' },
      { name: 'Kartuli Vazi', desc: '', weight: '0.75 л', price: '350 грн', image: '' }
  ]},
  { section: 'bar', id: 'beer_snacks', name: 'Закуски до пива', defaultImage: images.snacks, items: [
      { name: 'Бастурма', desc: '', weight: '100 г', price: '140 грн', image: '' },
      { name: 'Прошутто', desc: '', weight: '100 г', price: '140 грн', image: '' },
      { name: 'Фокачо', desc: '', weight: '300 г', price: '70 грн', image: '' },
      { name: 'Вушка', desc: '', weight: '100 г', price: '90 грн', image: '' },
      { name: 'Цибулеві кільця', desc: '', weight: '100 г', price: '70 грн', image: '' },
      { name: 'Кільця кальмарів', desc: '', weight: '100 г', price: '130 грн', image: '' },
      { name: 'Соус тартар', desc: '', weight: '50 г', price: '30 грн', image: '' }
  ]},
  { section: 'bar', id: 'draft_beer', name: 'Пиво на розлив', defaultImage: images.beer, items: [
      { name: 'Пшеничне нефільтроване', desc: '', weight: '0.33/0.5л', price: '60 / 75 грн', image: '' },
      { name: '«Свіжий Розлив» ППБ', desc: '', weight: '0.33/0.5л', price: '50 / 65 грн', image: '' }
  ]},
  { section: 'bar', id: 'non_alcoholic', name: 'Безалкогольні напої', defaultImage: images.drinks, items: [
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
  
  const [selectedItem, setSelectedItem] = useState(null); 

  const [bookmarks, setBookmarks] = useState([]);
  const [customImages, setCustomImages] = useState({});
  const isManualScrollingRef = useRef(false);

  // --- LOCAL STORAGE (Збереження закладок та кастомних фото) ---
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('romantic_expirenza_bookmarks');
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

      const savedImages = localStorage.getItem('romantic_expirenza_custom_images');
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
      localStorage.setItem('romantic_expirenza_bookmarks', JSON.stringify(updated));
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

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
        const newImages = { ...customImages, [uniqueId]: compressedDataUrl };
        setCustomImages(newImages);

        try {
          localStorage.setItem('romantic_expirenza_custom_images', JSON.stringify(newImages));
        } catch (err) {
          alert("Пам'ять переповнена. Неможливо зберегти більше фотографій.");
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
      localStorage.setItem('romantic_expirenza_custom_images', JSON.stringify(newImages));
    } catch (e) {}
  };

  // --- РОБОТА З МЕНЮ ---
  const handleOpenMenu = (section) => {
    isManualScrollingRef.current = true;
    setMenuSection(section);
    const firstCat = menuCategories.find(c => c.section === section);
    if (firstCat) setActiveCategory(firstCat.id);
    setSearchQuery('');
    setView('menu');
    window.scrollTo({top: 0, behavior: 'instant'});
    
    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 100);
  };

  const handleSectionSwitch = (section) => {
    isManualScrollingRef.current = true;
    setMenuSection(section);
    const firstCat = menuCategories.find(c => c.section === section);
    if (firstCat) setActiveCategory(firstCat.id);
    setSearchQuery('');
    window.scrollTo({top: 0, behavior: 'instant'});

    setTimeout(() => {
      const container = document.getElementById('tabs-container');
      if (container) container.scrollTo({ left: 0, behavior: 'instant' });
      isManualScrollingRef.current = false;
    }, 100);
  };

  // --- БЕЗПЕЧНИЙ SCROLL-SPY ---
  useEffect(() => {
    if (view !== 'menu' || searchQuery || isManualScrollingRef.current) return;

    const handleScroll = () => {
      if (isManualScrollingRef.current) return;

      const headerOffset = 180; // Висота липкої шапки
      const scrollY = window.scrollY;
      let newActive = activeCategory;
      const visibleCategories = menuCategories.filter(c => c.section === menuSection);

      for (let i = visibleCategories.length - 1; i >= 0; i--) {
        const cat = visibleCategories[i];
        const el = document.getElementById(`cat-${cat.id}`);
        if (el) {
          const elTop = el.getBoundingClientRect().top + scrollY;
          if (scrollY >= elTop - headerOffset - 20) {
            newActive = cat.id;
            break;
          }
        }
      }

      // Перевірка на досягнення самого низу сторінки
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom && visibleCategories.length > 0) {
        newActive = visibleCategories[visibleCategories.length - 1].id;
      }

      if (newActive !== activeCategory && newActive !== 'favorites') {
        setActiveCategory(newActive);
        
        const tab = document.getElementById(`tab-${newActive}`);
        const container = document.getElementById('tabs-container');
        if (tab && container) {
          const scrollLeft = tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
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
        const offset = 160; 
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
    
    const tab = document.getElementById(`tab-${id}`);
    const container = document.getElementById('tabs-container');
    if (tab && container) {
      const scrollLeft = tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }

    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 800);
  };

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedItem]);


  // --- ФУНКЦІЯ ВІДМАЛЬОВКИ КАРТКИ ТОВАРУ ---
  const renderItemCard = (item, idx, customCategoryId) => {
    const catId = customCategoryId || item.categoryId;
    const uniqueId = `${catId}__${item.name}`;
    const isBookmarked = bookmarks.includes(uniqueId);
    
    const imgSrc = customImages[uniqueId] || item.image || item.defaultImage || defaultPlaceholder;

    return (
      <div 
        key={uniqueId} 
        className="bg-white rounded-[1.5rem] p-3 shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-[#F0EBE1] flex gap-4 items-center cursor-pointer active:scale-[0.99] transition-transform" 
        onClick={() => setSelectedItem({ ...item, categoryId: catId })}
      >
        <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-[#F8F6F0] relative">
          <img src={imgSrc} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          <label className="absolute top-1.5 left-1.5 w-7 h-7 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center z-10 cursor-pointer shadow-sm hover:bg-gray-100" onClick={e => e.stopPropagation()}>
            <Camera className="w-3.5 h-3.5 text-[#6A1B29]" />
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, uniqueId)} />
          </label>

          <button 
            onClick={(e) => { e.stopPropagation(); toggleBookmark(catId, item.name); }}
            className="absolute bottom-1.5 right-1.5 w-7 h-7 bg-white/90 backdrop-blur-md border border-white/20 shadow-sm rounded-full flex items-center justify-center z-10 active:scale-90 transition-transform"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#6A1B29] text-[#6A1B29]' : 'text-[#8A7969]'}`} strokeWidth={isBookmarked ? 1.5 : 2} />
          </button>
        </div>

        <div className="flex-grow flex flex-col justify-center py-1 pr-2">
          <div className="mb-2">
            <h3 className="text-base font-bold text-[#2C2C2C] leading-tight mb-1 font-serif">{item.name}</h3>
            {item.desc && <p className="text-[12px] text-[#8A7969] leading-snug line-clamp-2 font-medium">{item.desc}</p>}
          </div>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#A99F93]">
              {item.weight || (menuSection === 'bar' ? 'порція' : '100 г')}
            </span>
            <span className="text-base font-bold text-[#6A1B29] bg-[#FFF5F6] px-3 py-1 rounded-full whitespace-nowrap">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>
      </div>
    );
  };


  // ==========================================
  // ЕКРАН 1: ГОЛОВНИЙ
  // ==========================================
  if (view === 'home') {
    return (
      <div className="min-h-screen w-full bg-[#FDFBF7] font-sans relative text-[#2C2C2C] shadow-2xl overflow-x-hidden selection:bg-[#E8D0C3] selection:text-[#5C3D2E]">
        
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
          .font-serif { font-family: 'Playfair Display', serif; }
          .font-sans { font-family: 'Montserrat', sans-serif; }
        `}} />

        <div className="h-[300px] w-full bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80)' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent backdrop-blur-[1px]"></div>
          
          <div className="absolute top-0 w-full p-5 flex justify-center items-start z-10">
            <div className="text-white text-center mx-auto mt-4">
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/70 font-medium">Ресторан • Піцерія • Бар</p>
              <h1 className="text-4xl font-serif italic tracking-wide mt-1 mb-1">Romantic</h1>
              <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-[1px] bg-white/50"></span>
                <p className="text-[9px] tracking-[0.2em] uppercase text-white/80">restaurant</p>
                <span className="w-4 h-[1px] bg-white/50"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative -mt-16 px-4 pb-12 max-w-md mx-auto z-20">
          
          <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6 relative pt-14 border border-[#F0EBE1]">
            <div className="absolute -top-12 left-6">
              <div className="w-24 h-24 rounded-full border-[6px] border-white bg-[#6A1B29] text-[#FDFBF7] flex items-center justify-center shadow-md overflow-hidden relative">
                <span className="text-center leading-none tracking-widest font-serif text-lg italic z-10">ROM<br/>ANTIC</span>
              </div>
            </div>

            <h2 className="text-3xl font-serif font-semibold text-[#2C2C2C] mt-1">Romantic</h2>
            <p className="text-[#8A7969] text-sm mt-1.5 font-medium flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#6A1B29]" /> с. Строїнці
            </p>
          </div>

          <div className="flex gap-3 mb-8">
            <button onClick={() => handleOpenMenu('food')} className="flex-1 bg-white rounded-[1.5rem] p-5 flex flex-col items-center justify-center gap-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#F0EBE1] active:scale-[0.98] transition-all hover:border-[#6A1B29]/30 hover:shadow-md group">
              <div className="w-12 h-12 rounded-full bg-[#FFF5F6] text-[#6A1B29] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold text-[#2C2C2C]">Кухня</span>
            </button>

            <button onClick={() => handleOpenMenu('bar')} className="flex-1 bg-white rounded-[1.5rem] p-5 flex flex-col items-center justify-center gap-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#F0EBE1] active:scale-[0.98] transition-all hover:border-[#6A1B29]/30 hover:shadow-md group">
              <div className="w-12 h-12 rounded-full bg-[#FFF5F6] text-[#6A1B29] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wine className="w-6 h-6" />
              </div>
              <span className="text-lg font-bold text-[#2C2C2C]">Бар</span>
            </button>
          </div>

          <div className="bg-white rounded-[2rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#F0EBE1]">
            <h3 className="text-xl font-serif font-bold text-[#2C2C2C] mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#6A1B29]" /> Про заклад
            </h3>
            
            <p className="text-[#2C2C2C] text-[15px] mb-4 font-semibold">Ми проведемо для Вас найкраще свято:</p>
            <ul className="text-[#5C5C5C] text-sm space-y-2.5 mb-8 font-medium">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6A1B29]"></div> Дні народження
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6A1B29]"></div> Весілля
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6A1B29]"></div> Сімейні свята
              </li>
            </ul>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#FDFBF7] flex items-center justify-center flex-shrink-0 border border-[#F0EBE1]">
                  <MapPin className="text-[#6A1B29] w-4 h-4" />
                </div>
                <div>
                  <p className="text-[#A99F93] text-[10px] uppercase tracking-widest font-bold mb-1">Адреса</p>
                  <p className="text-[#2C2C2C] font-semibold text-sm">с. Строїнці</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#FDFBF7] flex items-center justify-center flex-shrink-0 border border-[#F0EBE1]">
                  <Phone className="text-[#6A1B29] w-4 h-4" />
                </div>
                <div>
                  <p className="text-[#A99F93] text-[10px] uppercase tracking-widest font-bold mb-1">Телефон</p>
                  <a href="tel:+380997272881" className="text-[#2C2C2C] font-semibold text-sm hover:text-[#6A1B29] transition-colors">+380 99 727 28 81</a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-[#FDFBF7] flex items-center justify-center flex-shrink-0 border border-[#F0EBE1]">
                  <Phone className="text-[#6A1B29] w-4 h-4" />
                </div>
                <div>
                  <p className="text-[#A99F93] text-[10px] uppercase tracking-widest font-bold mb-1">Instagram</p>
                  <a href="https://www.instagram.com/romantic_restaurant_strointsi" target="_blank" rel="noopener noreferrer" className="text-[#2C2621] text-sm font-semibold hover:text-[#6A1B29] transition-colors block truncate">
                    @romantic_restaurant
                  </a>
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
    <div className="min-h-screen w-full bg-[#FDFBF7] text-[#2C2C2C] font-sans relative mx-auto max-w-md shadow-2xl pb-10">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
        body { background-color: #FDFBF7; margin: 0; }
      `}} />

      {/* HEADER (Sticky) */}
      <header className="bg-white sticky top-0 z-30 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border-b border-[#F0EBE1]">
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={() => setView('home')} className="w-10 h-10 rounded-full bg-[#FDFBF7] border border-[#F0EBE1] flex items-center justify-center text-[#5C5C5C] hover:text-[#2C2C2C] hover:border-[#2C2C2C] transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex bg-[#F4F4F5] p-1 rounded-full w-48 mx-4">
            <button onClick={() => handleSectionSwitch('food')} className={`flex-1 text-xs font-bold uppercase tracking-wider py-2 rounded-full transition-all duration-300 ${menuSection === 'food' ? 'bg-[#6A1B29] text-white shadow-md' : 'text-[#8A7969]'}`}>Кухня</button>
            <button onClick={() => handleSectionSwitch('bar')} className={`flex-1 text-xs font-bold uppercase tracking-wider py-2 rounded-full transition-all duration-300 ${menuSection === 'bar' ? 'bg-[#6A1B29] text-white shadow-md' : 'text-[#8A7969]'}`}>Бар</button>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Горизонтальний скрол категорій */}
        {!searchQuery && (
          <div id="tabs-container" className="overflow-x-auto no-scrollbar scroll-smooth bg-[#FDFBF7]">
            <div className="flex space-x-2 py-3 px-4 w-max">
              <button
                id="tab-favorites"
                onClick={() => scrollToCategory('favorites')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border flex items-center justify-center gap-2 ${
                  activeCategory === 'favorites' 
                    ? 'bg-[#2C2C2C] text-white border-[#2C2C2C] shadow-md' 
                    : 'bg-white text-[#5C5C5C] border-[#E8E1D5] hover:border-[#2C2C2C]'
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
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                      isActive 
                        ? 'bg-[#2C2C2C] text-white border-[#2C2C2C] shadow-md' 
                        : 'bg-white text-[#5C5C5C] border-[#E8E1D5] hover:border-[#2C2C2C]'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* ОСНОВНА ЧАСТИНА (Список страв) */}
      <main className="max-w-2xl mx-auto px-4 mt-6">
        
        <div className="relative mb-8">
          <input 
            type="text" 
            placeholder={`Пошук у розділі "${menuSection === 'food' ? 'Кухня' : 'Бар'}"...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 bg-white border border-[#E8E1D5] rounded-full text-sm font-medium focus:border-[#6A1B29] focus:ring-1 focus:ring-[#6A1B29] focus:outline-none shadow-sm transition-all"
          />
          <Search className="absolute left-4 top-3.5 text-[#A99F93] w-5 h-5" />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-3.5 text-[#A99F93] hover:text-[#2C2C2C]">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* СПИСОК */}
        {searchQuery ? (
          <div>
            <div className="flex items-center gap-3 mb-6 px-1">
              <h2 className="text-3xl font-serif font-bold text-[#2C2C2C]">Результати пошуку</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {currentSectionCategories.flatMap(cat => cat.items.map(item => ({...item, categoryId: cat.id, originalCategory: cat.name, defaultImage: cat.defaultImage})))
                .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase())))
                .map((item, idx) => renderItemCard(item, idx, item.categoryId))}
            </div>
            {currentSectionCategories.flatMap(cat => cat.items.map(item => ({...item, categoryId: cat.id, originalCategory: cat.name})))
                .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()))).length === 0 && (
              <div className="text-center py-16 bg-white rounded-[2rem] border border-[#F0EBE1]">
                  <Search className="w-12 h-12 text-[#E8E1D5] mx-auto mb-3" />
                  <p className="text-[#8A7969] font-medium">Нічого не знайдено.</p>
              </div>
            )}
          </div>
        ) : activeCategory === 'favorites' ? (
          <div>
            <div className="flex items-center gap-3 mb-6 px-1">
              <h2 className="text-3xl font-serif font-bold text-[#2C2C2C]">Збережені</h2>
              <div className="h-[1px] flex-grow bg-[#E8E1D5] mt-2"></div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {currentSectionCategories.flatMap(cat => cat.items.map(item => ({...item, categoryId: cat.id, originalCategory: cat.name, defaultImage: cat.defaultImage})))
                .filter(item => bookmarks.includes(`${item.categoryId}__${item.name}`))
                .map((item, idx) => renderItemCard(item, idx, item.categoryId))}
            </div>
            {bookmarks.length === 0 && (
              <div className="text-center py-16 bg-white rounded-[2rem] border border-[#F0EBE1]">
                <Bookmark className="w-12 h-12 text-[#E8E1D5] mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-[#8A7969] font-medium">Тут поки нічого немає.</p>
              </div>
            )}
          </div>
        ) : (
          currentSectionCategories.map((category) => (
            <div key={category.id} id={`cat-${category.id}`} className="mb-10 pt-2 scroll-mt-[160px]">
              <div className="flex items-center gap-3 mb-6 px-1">
                <h2 className="text-3xl font-serif font-bold text-[#2C2C2C]">{category.name}</h2>
                <div className="h-[1px] flex-grow bg-[#E8E1D5] mt-2"></div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {category.items.map((item, idx) => renderItemCard(item, idx, category.id))}
              </div>
            </div>
          ))
        )}
      </main>

      {/* МОДАЛЬНЕ ВІКНО: Картка Товару (Bottom Sheet) */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end justify-center animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedItem(null)}></div>
          <div className="bg-[#FDFBF7] w-full max-w-md rounded-t-[2rem] animate-in slide-in-from-bottom-full overflow-hidden flex flex-col max-h-[85vh] z-10 relative">
            
            <div className="relative w-full h-64 bg-gray-100">
              <img 
                src={customImages[`${selectedItem.categoryId}__${selectedItem.name}`] || selectedItem.image || selectedItem.defaultImage || defaultPlaceholder} 
                alt={selectedItem.name} 
                className="w-full h-full object-cover" 
              />
              
              <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#2C2C2C] shadow-sm hover:bg-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Кнопки зміни/видалення фото в модалці */}
              <div className="absolute top-4 left-4 flex gap-2">
                <label className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#2C2C2C] cursor-pointer shadow-sm hover:bg-white">
                  <Camera className="w-5 h-5" />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, `${selectedItem.categoryId}__${selectedItem.name}`)} />
                </label>
                {customImages[`${selectedItem.categoryId}__${selectedItem.name}`] && (
                  <button 
                    onClick={() => removeCustomImage(`${selectedItem.categoryId}__${selectedItem.name}`)}
                    className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#6A1B29] shadow-sm hover:bg-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="px-6 py-6 flex-1 overflow-y-auto no-scrollbar">
              <h2 className="text-[24px] font-serif font-bold text-[#2C2C2C] leading-tight mb-2">{selectedItem.name}</h2>
              <div className="text-[24px] font-bold text-[#6A1B29] mb-6">{formatPrice(selectedItem.price)}</div>
              
              {selectedItem.desc && (
                <p className="text-[#5C5C5C] text-[15px] font-medium leading-relaxed mb-6">{selectedItem.desc}</p>
              )}

              {selectedItem.weight && (
                <div className="text-[#A99F93] text-[13px] font-bold tracking-wider uppercase">{selectedItem.weight}</div>
              )}
            </div>

            <div className="p-5 bg-white border-t border-[#F0EBE1]">
              <button 
                onClick={() => {
                  toggleBookmark(selectedItem.categoryId, selectedItem.name);
                  setSelectedItem(null);
                }}
                className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-bold text-[16px] transition-colors ${
                  bookmarks.includes(`${selectedItem.categoryId}__${selectedItem.name}`)
                    ? 'bg-[#F8F6F0] text-[#8A7969] border border-[#E8E1D5]'
                    : 'bg-[#6A1B29] text-white shadow-md'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${bookmarks.includes(`${selectedItem.categoryId}__${selectedItem.name}`) ? 'fill-[#8A7969]' : ''}`} />
                {bookmarks.includes(`${selectedItem.categoryId}__${selectedItem.name}`) ? 'Видалити із закладок' : 'Додати в закладки'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}