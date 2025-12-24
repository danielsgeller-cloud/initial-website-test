"use client";

import { useCart } from "@/components/cart/CartProvider";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

type Lang = "en" | "ru" | "uk";
type Finish = "bw" | "color";

type PriceOption = {
  code: string;
  label: string;
  size: string;
  bw: number;
  color: number;
  mountingNote?: string;
};

type ShapeGroup = {
  id: string;
  label: string;
  description: string;
  options: PriceOption[];
};

const COPY: Record<
  Lang,
  {
    heroTitle: string;
    heroBody: string;
    bullets: [string, string, string];
    note: string;

    summaryTitle: string;
    summaryShape: string;
    summarySize: string;
    summaryFinish: string;
    summaryBase: string;
    summaryCombineHint: string;
    summaryShippingHint: string;
    summaryMountingPrefix: string;

    customerLegend: string;
    iAmA: string;
    dealer: string;
    individual: string;
    name: string;
    email: string;
    phone: string;
    cemetery: string;
    shipTo: string;
    neededBy: string;

    detailsLegend: string;
    shapeGroup: string;
    sizeCatalog: string;
    finish: string;
    finishColor: string;
    finishBW: string;

    mounting: string;
    mountingHelp: string;
    mountingNone: string;
    mountingTape: string;
    mountingFastener: string;

    combinePhotos: string;
    combineHelp: string;

    proof: string;
    proofNone: string;
    proofEmail: string;
    proofPrinted: string;

    additionalLegend: string;
    additionalHelp: string;

    estTitle: string;
    estHelp: string;

    submitSending: string;
    submit: string;
    submitHelp: string;

    success: string;
    error: string;

    bwLabel: string;
    colorLabel: string;

    notSpecified: string;
    mountingRequested: string;
    mountingNotSpecified: string;

    messageHeader: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerTypeDealer: string;
    customerTypeIndividual: string;
    customerCemetery: string;
    customerShipTo: string;
    customerDeadline: string;
    requestedConfig: string;
    configShape: string;
    configSize: string;
    configFinish: string;
    baseFromList: string;
    estimatedTotal: string;
    wholesaleMountingNote: string;
    combineYes: string;
    combineNo: string;
    proofLineEmail: string;
    proofLinePrinted: string;
    proofLineNone: string;
    customerNotes: string;
    none: string;
  }
> = {
  en: {
    heroTitle: "Order an enamel photo cameo",
    heroBody:
      "Use this form to build your cameo order. After you submit, we will review your selections, confirm pricing, and contact you with next steps.",
    bullets: [
      "Enamel medallions on a metal base with durable outdoor finish.",
      "Headstones, mausoleums, home memorials, and custom projects.",
      "Trade work for monument dealers and direct orders from families.",
    ],
    note:
      "Final price depends on image quality, color or black and white, complexity of retouching, and installation details. The range below is an estimate.",

    summaryTitle: "Selected configuration",
    summaryShape: "Shape:",
    summarySize: "Size / code:",
    summaryFinish: "Finish:",
    summaryBase: "Base price:",
    summaryCombineHint:
      "Combining separate originals on one cameo may add up to 50% of the listed price.",
    summaryShippingHint:
      "Shipping and other details will be confirmed after review.",
    summaryMountingPrefix: "Mounting:",

    customerLegend: "Customer information",
    iAmA: "I am a",
    dealer: "Monument dealer / trade",
    individual: "Individual / family",
    name: "Name*",
    email: "Email*",
    phone: "Phone",
    cemetery: "Cemetery / location (optional)",
    shipTo: "Ship to address (optional)",
    neededBy: "Date needed (optional)",

    detailsLegend: "Cameo details",
    shapeGroup: "Shape group",
    sizeCatalog: "Size / catalog number",
    finish: "Finish",
    finishColor: "Color",
    finishBW: "Black & white",

    mounting: "Mounting",
    mountingHelp:
      "If you are unsure, select “Not specified.” We will confirm what is appropriate for your monument.",
    mountingNone: "Not specified",
    mountingTape: "Mounting tape",
    mountingFastener: "Fastener / hardware",

    combinePhotos: "Combine photos",
    combineHelp:
      "If you want multiple originals combined onto one cameo, we will confirm feasibility and pricing after review.",
    proof: "Proof",
    proofNone: "No proof needed",
    proofEmail: "Email proof",
    proofPrinted: "Printed proof",

    additionalLegend: "Additional information",
    additionalHelp:
      "Use this area for photo notes (for example: remove background, adjust color, combine people, or other artwork requests).",

    estTitle: "Estimated total range",
    estHelp:
      "This is a broad estimate. Final pricing is confirmed after we review your photos and any complex retouching.",

    submitSending: "Sending order request...",
    submit: "Submit order request",
    submitHelp:
      "After we receive your form, we will email you with next steps, including how to upload or mail photographs.",

    success:
      "Thank you. Your order request has been sent. You will receive a confirmation by email.",
    error: "There was a problem sending your order request.",

    bwLabel: "B/W",
    colorLabel: "Color",

    notSpecified: "Not specified",
    mountingRequested: "Mounting requested:",
    mountingNotSpecified: "Mounting: not specified",

    messageHeader: "New cameo order request from website:",
    customerName: "Customer name:",
    customerEmail: "Email:",
    customerPhone: "Phone:",
    customerTypeDealer: "Customer type: Monument dealer / trade",
    customerTypeIndividual: "Customer type: Individual / family",
    customerCemetery: "Cemetery / location:",
    customerShipTo: "Ship to address:",
    customerDeadline: "Needed by:",
    requestedConfig: "Requested configuration:",
    configShape: "Shape group:",
    configSize: "Size / code:",
    configFinish: "Finish:",
    baseFromList: "Base price from list:",
    estimatedTotal: "Estimated total range:",
    wholesaleMountingNote: "Mounting note:",
    combineYes:
      "Combine multiple originals on same medallion: YES (pricing confirmed after review).",
    combineNo: "Combine multiple originals: No.",
    proofLineEmail: "Proof requested: Email proof.",
    proofLinePrinted: "Proof requested: Printed proof.",
    proofLineNone: "Proof requested: No proof requested.",
    customerNotes: "Additional notes from customer:",
    none: "(none)",
  },

  ru: {
    heroTitle: "Заказать эмалированный фотомедальон",
    heroBody:
      "Заполните форму, чтобы собрать заказ. После отправки мы проверим выбор, подтвердим стоимость и свяжемся с вами по следующим шагам.",
    bullets: [
      "Эмалированные медальоны на металлической основе для улицы.",
      "Надгробия, мавзолеи, домашние мемориалы и индивидуальные проекты.",
      "Работа с мастерскими и дилерами памятников, а также напрямую с семьями.",
    ],
    note:
      "Итоговая цена зависит от качества фото, цветного или чёрно-белого варианта, сложности ретуши и деталей установки. Диапазон ниже является оценкой.",

    summaryTitle: "Выбранная конфигурация",
    summaryShape: "Форма:",
    summarySize: "Размер / код:",
    summaryFinish: "Исполнение:",
    summaryBase: "Базовая цена:",
    summaryCombineHint:
      "Если объединяются разные исходные фото, стоимость может увеличиться после проверки.",
    summaryShippingHint:
      "Доставка и детали будут подтверждены после проверки.",
    summaryMountingPrefix: "Крепление:",

    customerLegend: "Данные клиента",
    iAmA: "Я",
    dealer: "Дилер / мастерская памятников",
    individual: "Частный заказчик / семья",
    name: "Имя*",
    email: "Эл. почта*",
    phone: "Телефон",
    cemetery: "Кладбище / место (необязательно)",
    shipTo: "Адрес доставки (необязательно)",
    neededBy: "Нужно к дате (необязательно)",

    detailsLegend: "Параметры медальона",
    shapeGroup: "Группа формы",
    sizeCatalog: "Размер / номер",
    finish: "Исполнение",
    finishColor: "Цвет",
    finishBW: "Чёрно-белый",

    mounting: "Крепление",
    mountingHelp:
      "Если не уверены, выберите «Не указано». Мы подтвердим подходящий вариант.",
    mountingNone: "Не указано",
    mountingTape: "Монтажная лента",
    mountingFastener: "Крепёж / фурнитура",

    combinePhotos: "Объединение фото",
    combineHelp:
      "Если нужно объединить несколько исходных фото в одном медальоне, мы подтвердим возможность и стоимость после проверки.",
    proof: "Проба (proof)",
    proofNone: "Не требуется",
    proofEmail: "Проба по email",
    proofPrinted: "Печатная проба",

    additionalLegend: "Дополнительная информация",
    additionalHelp:
      "Укажите пожелания к фото (например: убрать фон, скорректировать цвет, объединить людей, другие просьбы).",

    estTitle: "Оценка диапазона",
    estHelp:
      "Это приблизительная оценка. Итоговая цена подтверждается после проверки фото и ретуши.",

    submitSending: "Отправка...",
    submit: "Отправить заказ",
    submitHelp:
      "После получения формы мы напишем вам о следующих шагах, включая способ передачи фотографий.",

    success:
      "Спасибо. Ваш запрос отправлен. Подтверждение придёт по email.",
    error: "Не удалось отправить запрос. Попробуйте позже.",

    bwLabel: "Ч/Б",
    colorLabel: "Цвет",

    notSpecified: "Не указано",
    mountingRequested: "Крепление:",
    mountingNotSpecified: "Крепление: не указано",

    messageHeader: "Заявка на медальон с сайта:",
    customerName: "Имя:",
    customerEmail: "Email:",
    customerPhone: "Телефон:",
    customerTypeDealer: "Тип клиента: дилер / мастерская памятников",
    customerTypeIndividual: "Тип клиента: частный заказчик / семья",
    customerCemetery: "Кладбище / место:",
    customerShipTo: "Адрес доставки:",
    customerDeadline: "Нужно к дате:",
    requestedConfig: "Параметры заказа:",
    configShape: "Форма:",
    configSize: "Размер / код:",
    configFinish: "Исполнение:",
    baseFromList: "Базовая цена:",
    estimatedTotal: "Оценка диапазона:",
    wholesaleMountingNote: "Примечание по креплению:",
    combineYes:
      "Объединить несколько исходных фото: ДА (стоимость подтвердим после проверки).",
    combineNo: "Объединить несколько исходных фото: НЕТ.",
    proofLineEmail: "Проба: по email.",
    proofLinePrinted: "Проба: печатная.",
    proofLineNone: "Проба: не требуется.",
    customerNotes: "Примечания клиента:",
    none: "(нет)",
  },

  uk: {
    heroTitle: "Замовити емальований фотомедальйон",
    heroBody:
      "Заповніть форму, щоб зібрати замовлення. Після відправки ми перевіримо вибір, підтвердимо вартість і зв’яжемося з вами щодо наступних кроків.",
    bullets: [
      "Емальовані медальйони на металевій основі для вулиці.",
      "Надгробки, мавзолеї, домашні меморіали та індивідуальні проєкти.",
      "Робота з дилерами пам’ятників і прямі замовлення від родин.",
    ],
    note:
      "Кінцева ціна залежить від якості фото, кольору або чорно-білого виконання, складності ретуші та деталей встановлення. Діапазон нижче є оцінкою.",

    summaryTitle: "Обрана конфігурація",
    summaryShape: "Форма:",
    summarySize: "Розмір / код:",
    summaryFinish: "Виконання:",
    summaryBase: "Базова ціна:",
    summaryCombineHint:
      "Якщо об’єднуються різні вихідні фото, вартість підтвердимо після перевірки.",
    summaryShippingHint:
      "Доставка та деталі будуть підтверджені після перевірки.",
    summaryMountingPrefix: "Кріплення:",

    customerLegend: "Інформація про клієнта",
    iAmA: "Я",
    dealer: "Дилер / майстерня пам’ятників",
    individual: "Приватний клієнт / родина",
    name: "Ім’я*",
    email: "Ел. пошта*",
    phone: "Телефон",
    cemetery: "Кладовище / місце (необов’язково)",
    shipTo: "Адреса доставки (необов’язково)",
    neededBy: "Потрібно до дати (необов’язково)",

    detailsLegend: "Параметри медальйона",
    shapeGroup: "Група форми",
    sizeCatalog: "Розмір / номер",
    finish: "Виконання",
    finishColor: "Колір",
    finishBW: "Чорно-білий",

    mounting: "Кріплення",
    mountingHelp:
      "Якщо не впевнені, оберіть «Не вказано». Ми підтвердимо потрібний варіант.",
    mountingNone: "Не вказано",
    mountingTape: "Монтажна стрічка",
    mountingFastener: "Кріплення / фурнітура",

    combinePhotos: "Об’єднати фото",
    combineHelp:
      "Якщо потрібно об’єднати кілька вихідних фото в одному медальйоні, ми підтвердимо можливість і ціну після перевірки.",
    proof: "Проба (proof)",
    proofNone: "Не потрібно",
    proofEmail: "Проба на email",
    proofPrinted: "Друкована проба",

    additionalLegend: "Додаткова інформація",
    additionalHelp:
      "Опишіть побажання до фото (наприклад: прибрати фон, скоригувати колір, об’єднати людей, інші прохання).",

    estTitle: "Оціночний діапазон",
    estHelp:
      "Це приблизна оцінка. Остаточну ціну підтверджуємо після перевірки фото та ретуші.",

    submitSending: "Надсилання...",
    submit: "Надіслати запит",
    submitHelp:
      "Після отримання форми ми напишемо вам щодо наступних кроків, включно зі способом передачі фото.",

    success:
      "Дякуємо. Ваш запит надіслано. Підтвердження прийде на email.",
    error: "Не вдалося надіслати запит. Спробуйте пізніше.",

    bwLabel: "Ч/Б",
    colorLabel: "Колір",

    notSpecified: "Не вказано",
    mountingRequested: "Кріплення:",
    mountingNotSpecified: "Кріплення: не вказано",

    messageHeader: "Запит на медальйон з сайту:",
    customerName: "Ім’я:",
    customerEmail: "Email:",
    customerPhone: "Телефон:",
    customerTypeDealer: "Тип клієнта: дилер / майстерня пам’ятників",
    customerTypeIndividual: "Тип клієнта: приватний клієнт / родина",
    customerCemetery: "Кладовище / місце:",
    customerShipTo: "Адреса доставки:",
    customerDeadline: "Потрібно до дати:",
    requestedConfig: "Параметри замовлення:",
    configShape: "Форма:",
    configSize: "Розмір / код:",
    configFinish: "Виконання:",
    baseFromList: "Базова ціна:",
    estimatedTotal: "Оціночний діапазон:",
    wholesaleMountingNote: "Примітка щодо кріплення:",
    combineYes:
      "Об’єднати кілька вихідних фото: ТАК (ціну підтвердимо після перевірки).",
    combineNo: "Об’єднати кілька вихідних фото: НІ.",
    proofLineEmail: "Проба: на email.",
    proofLinePrinted: "Проба: друкована.",
    proofLineNone: "Проба: не потрібна.",
    customerNotes: "Примітки клієнта:",
    none: "(немає)",
  },
};

const SHAPES: ShapeGroup[] = [
  {
    id: "oval",
    label: "Oval",
    description: "Classic oval medallions for most headstones and mausoleums.",
    options: [
      { code: "1L", label: '#1L – 8" x 10"', size: "8 x 10", bw: 220, color: 420 },
      { code: "1a", label: '#1a – 5" x 7"', size: "5 x 7", bw: 125, color: 220 },
      { code: "1", label: '#1 – 6 1/8" x 4 3/8"', size: '6 1/8 x 4 3/8', bw: 104, color: 197 },
      { code: "2", label: '#2 – 5 1/8" x 3 7/8"', size: '5 1/8 x 3 7/8', bw: 90, color: 155 },
      { code: "3", label: '#3 – 4 1/4" x 3 3/8"', size: '4 1/4 x 3 3/8', bw: 71, color: 115 },
      { code: "4", label: '#4 – 3 1/2" x 2 3/4"', size: '3 1/2 x 2 3/4', bw: 63, color: 107 },
      { code: "5", label: '#5 – 2 7/8" x 2 3/8"', size: '2 7/8 x 2 3/8', bw: 60, color: 102 },
    ],
  },
  {
    id: "rectangle",
    label: "Rectangle",
    description: "Rectangular medallions for larger photos or inscriptions.",
    options: [
      {
        code: "6L",
        label: '#6L – 8" x 10" (tape only)',
        size: "8 x 10",
        bw: 220,
        color: 420,
        mountingNote: "Tape only. Mounting tape add $18.00.",
      },
      { code: "6a", label: '#6a – 5" x 7"', size: "5 x 7", bw: 125, color: 220 },
      { code: "6", label: '#6 – 6 1/8" x 4 3/8"', size: '6 1/8 x 4 3/8', bw: 104, color: 197 },
      { code: "7", label: '#7 – 5 1/8" x 3 7/8"', size: '5 1/8 x 3 7/8', bw: 90, color: 155 },
      { code: "8", label: '#8 – 4 1/4" x 3 3/8"', size: '4 1/4 x 3 3/8', bw: 71, color: 115 },
      { code: "9", label: '#9 – 3 1/2" x 2 3/4"', size: '3 1/2 x 2 3/4', bw: 63, color: 107 },
      { code: "9a", label: '#9a – 2 7/8" x 2 3/8"', size: '2 7/8 x 2 3/8', bw: 60, color: 102 },
    ],
  },
  {
    id: "heart",
    label: "Heart",
    description: "Heart-shaped medallion for especially personal memorials.",
    options: [
      {
        code: "10",
        label: '#10 – 3 1/2" x 3 3/4"',
        size: '3 1/2 x 3 3/4',
        bw: 71,
        color: 120,
        mountingNote: "Fastener or tape add $18.00.",
      },
    ],
  },
  {
    id: "round",
    label: "Round",
    description: "Round medallions suited for certain monuments and plaques.",
    options: [
      {
        code: "R1",
        label: '#R1 – 2 1/2"',
        size: "2 1/2",
        bw: 63,
        color: 107,
        mountingNote: "Tape only. Mounting tape add $18.00.",
      },
      {
        code: "R2",
        label: '#R2 – 2"',
        size: "2",
        bw: 60,
        color: 102,
        mountingNote: "Tape only. Mounting tape add $18.00.",
      },
    ],
  },
  {
    id: "additional-oval",
    label: "Additional oval sizes",
    description: "Additional oval sizes from the wholesale list.",
    options: [
      {
        code: "M2",
        label: 'M2 – 3 1/2" x 3 3/4"',
        size: '3 1/2 x 3 3/4',
        bw: 115,
        color: 155,
        mountingNote: "Tape only. Mounting tape add $18.00.",
      },
      {
        code: "M3",
        label: 'M3 – 3 3/4" x 3 1/8"',
        size: '3 3/4 x 3 1/8',
        bw: 71,
        color: 115,
        mountingNote: "Tape only. Mounting tape add $18.00.",
      },
      {
        code: "M5",
        label: 'M5 – 2 3/8" x 3 1/4"',
        size: '2 3/8 x 3 1/4',
        bw: 63,
        color: 107,
        mountingNote: "Tape only. Mounting tape add $18.00.",
      },
    ],
  },
];

function formatCurrency(value: number): string {
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function shapeLabelForLang(shape: ShapeGroup, lang: Lang): string {
  const map: Record<string, { ru: string; uk: string }> = {
    oval: { ru: "Овал", uk: "Овал" },
    rectangle: { ru: "Прямоугольник", uk: "Прямокутник" },
    heart: { ru: "Сердце", uk: "Серце" },
    round: { ru: "Круг", uk: "Коло" },
    "additional-oval": { ru: "Дополнительные овальные размеры", uk: "Додаткові овальні розміри" },
  };
  if (lang === "en") return shape.label;
  const t = map[shape.id];
  if (!t) return shape.label;
  return lang === "ru" ? t.ru : t.uk;
}

function shapeDescriptionForLang(shape: ShapeGroup, lang: Lang): string {
  const map: Record<string, { ru: string; uk: string }> = {
    oval: {
      ru: "Классические овальные медальоны для большинства памятников и мавзолеев.",
      uk: "Класичні овальні медальйони для більшості пам’ятників і мавзолеїв.",
    },
    rectangle: {
      ru: "Прямоугольные медальоны для больших фото или надписей.",
      uk: "Прямокутні медальйони для більших фото або написів.",
    },
    heart: {
      ru: "Медальон в форме сердца для особенно личной памяти.",
      uk: "Медальйон у формі серця для особливо особистої пам’яті.",
    },
    round: {
      ru: "Круглые медальоны для некоторых типов памятников и табличек.",
      uk: "Круглі медальйони для певних типів пам’ятників і табличок.",
    },
    "additional-oval": {
      ru: "Дополнительные овальные размеры из списка.",
      uk: "Додаткові овальні розміри зі списку.",
    },
  };
  if (lang === "en") return shape.description;
  const t = map[shape.id];
  if (!t) return shape.description;
  return lang === "ru" ? t.ru : t.uk;
}

function finishLabel(lang: Lang, finish: Finish): string {
  if (lang === "en") return finish === "color" ? "Color" : "Black & white";
  if (lang === "ru") return finish === "color" ? "Цвет" : "Чёрно-белый";
  return finish === "color" ? "Колір" : "Чорно-білий";
}

function dealerLabel(lang: Lang, dealerType: "dealer" | "individual"): string {
  if (lang === "en") return dealerType === "dealer" ? COPY.en.dealer : COPY.en.individual;
  if (lang === "ru") return dealerType === "dealer" ? COPY.ru.dealer : COPY.ru.individual;
  return dealerType === "dealer" ? COPY.uk.dealer : COPY.uk.individual;
}

export default function OrderFormPage() {
  const { itemCount, addItem } = useCart();
  const [qty, setQty] = useState(1);

  const { lang } = useLanguage();
  const L = (lang as Lang) || "en";
  const t = COPY[L] ?? COPY.en;

  const [shapeId, setShapeId] = useState<string>("oval");
  const [sizeCode, setSizeCode] = useState<string>("1");
  const [finish, setFinish] = useState<Finish>("color");
  const [mounting, setMounting] = useState<string>("none");
  const [combinePhotos, setCombinePhotos] = useState<boolean>(false);
  const [proof, setProof] = useState<string>("none");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dealerType, setDealerType] = useState<"dealer" | "individual">("dealer");
  const [cemetery, setCemetery] = useState<string>("");
  const [shipTo, setShipTo] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const selectedShape = useMemo(
    () => SHAPES.find((s) => s.id === shapeId) ?? SHAPES[0],
    [shapeId],
  );

  const selectedOption = useMemo(() => {
    return (
      <div className="mx-auto flex max-w-6xl items-center justify-end px-4 pt-6 md:px-6">
        <Link
          href="/cart"
          className="relative inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-800 hover:border-amber-500 hover:text-amber-600"
        >
          Cart
          {itemCount > 0 ? (
            <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold leading-none text-black">
              {itemCount}
            </span>
          ) : null}
        </Link>
      </div>
      selectedShape.options.find((o) => o.code === sizeCode) ??
      selectedShape.options[0]
    );
  }, [selectedShape, sizeCode]);

  const basePrice = finish === "color" ? selectedOption.color : selectedOption.bw;

  const totalRange = useMemo<{ min: number; max: number }>(() => {
    let min = basePrice;
    let max = basePrice;

    if (mounting === "tape" || mounting === "fastener") {
      min += 18;
      max += 18;
    }

    if (proof === "printed") {
      min += 20;
      max += 20;
    }

    min += 9;
    max += 9;

    if (combinePhotos) {
      max += basePrice * 0.5;
    }

    max += basePrice * 0.25;

    return {
      min: Math.round(min),
      max: Math.round(max),
    };
  }, [basePrice, mounting, combinePhotos, proof]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    setStatusMessage("");

    try {
      const shapeLabel = shapeLabelForLang(selectedShape, L);
      const shapeDesc = shapeDescriptionForLang(selectedShape, L);

      const messageLines = [
        t.messageHeader,
        "",
        `${t.customerName} ${name}`,
        `${t.customerEmail} ${email}`,
        phone ? `${t.customerPhone} ${phone}` : "",
        dealerType === "dealer" ? t.customerTypeDealer : t.customerTypeIndividual,
        cemetery ? `${t.customerCemetery} ${cemetery}` : "",
        shipTo ? `${t.customerShipTo} ${shipTo}` : "",
        deadline ? `${t.customerDeadline} ${deadline}` : "",
        "",
        t.requestedConfig,
        `${t.configShape} ${shapeLabel}`,
        `${t.configSize} ${selectedOption.label}`,
        `${t.configFinish} ${finishLabel(L, finish)}`,
        `${t.baseFromList} ${formatCurrency(basePrice)}`,
        `${t.estimatedTotal} ${formatCurrency(totalRange.min)} – ${formatCurrency(totalRange.max)}`,
        mounting !== "none"
          ? `${t.mountingRequested} ${mounting}`
          : t.mountingNotSpecified,
        selectedOption.mountingNote
          ? `${t.wholesaleMountingNote} ${selectedOption.mountingNote}`
          : "",
        combinePhotos ? t.combineYes : t.combineNo,
        proof === "email"
          ? t.proofLineEmail
          : proof === "printed"
            ? t.proofLinePrinted
            : t.proofLineNone,
        "",
        `${t.shapeGroup} ${shapeDesc}`,
        "",
        `${t.customerNotes}`,
        notes || t.none,
      ].filter(Boolean);

      const body = {
        name,
        email,
        message: messageLines.join("\n"),
      };

      const res = await fetch("/api/contact-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Server error");
      }

      setStatus("success");
      setStatusMessage(t.success);
    } catch (err: any) {
      setStatus("error");
      setStatusMessage(err?.message || t.error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-neutral-50 pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <section className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-neutral-900 md:text-4xl">
              {t.heroTitle}
            </h1>
            <p className="mt-4 text-sm text-neutral-600 md:text-base">
              {t.heroBody}
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-600">
              <li>{t.bullets[0]}</li>
              <li>{t.bullets[1]}</li>
              <li>{t.bullets[2]}</li>
            </ul>
            <p className="mt-4 text-xs text-neutral-500">{t.note}</p>
          </div>

          <aside className="rounded-2xl bg-white p-5 shadow-sm shadow-neutral-200">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
              {t.summaryTitle}
            </h2>
            <div className="mt-4 space-y-2 text-sm text-neutral-700">
              <p>
                <span className="font-medium">{t.summaryShape}</span>{" "}
                {shapeLabelForLang(selectedShape, L)}
              </p>
              <p>
                <span className="font-medium">{t.summarySize}</span>{" "}
                {selectedOption.label}
              </p>
              <p>
                <span className="font-medium">{t.summaryFinish}</span>{" "}
                {finishLabel(L, finish)}
              </p>
              <p>
                <span className="font-medium">{t.summaryBase}</span>{" "}
                <span className="font-semibold text-amber-700">
                  {formatCurrency(basePrice)}
                </span>
              </p>
              {combinePhotos && (
                <p className="text-xs text-neutral-600">{t.summaryCombineHint}</p>
              )}
              {selectedOption.mountingNote && (
                <p className="text-xs text-neutral-600">
                  {t.summaryMountingPrefix} {selectedOption.mountingNote}
                </p>
              )}
              <p className="mt-2 text-xs text-neutral-500">{t.summaryShippingHint}</p>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm shadow-neutral-200 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            <fieldset className="grid gap-6 md:grid-cols-2">
              <legend className="mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                {t.customerLegend}
              </legend>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-medium text-neutral-700">
                  {t.iAmA}
                </label>
                <div className="mt-1 flex flex-wrap gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => setDealerType("dealer")}
                    className={`rounded-full border px-3 py-1 ${
                      dealerType === "dealer"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-neutral-300 text-neutral-700"
                    }`}
                  >
                    {t.dealer}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDealerType("individual")}
                    className={`rounded-full border px-3 py-1 ${
                      dealerType === "individual"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-neutral-300 text-neutral-700"
                    }`}
                  >
                    {t.individual}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">
                  {t.name}
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">
                  {t.email}
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">
                  {t.phone}
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">
                  {t.cemetery}
                </label>
                <input
                  value={cemetery}
                  onChange={(e) => setCemetery(e.target.value)}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-medium text-neutral-700">
                  {t.shipTo}
                </label>
                <textarea
                  value={shipTo}
                  onChange={(e) => setShipTo(e.target.value)}
                  rows={2}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-700">
                  {t.neededBy}
                </label>
                <input
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder={L === "en" ? "For example: three weeks from now" : ""}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </fieldset>

            <fieldset className="space-y-6">
              <legend className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                {t.detailsLegend}
              </legend>

              <div className="space-y-2">
                <p className="text-xs font-medium text-neutral-700">{t.shapeGroup}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  {SHAPES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setShapeId(s.id);
                        setSizeCode(s.options[0].code);
                      }}
                      className={`rounded-full border px-3 py-1 ${
                        s.id === shapeId
                          ? "border-amber-500 bg-amber-50 text-amber-700"
                          : "border-neutral-300 text-neutral-700"
                      }`}
                    >
                      {shapeLabelForLang(s, L)}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-neutral-500">
                  {shapeDescriptionForLang(selectedShape, L)}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-neutral-700">{t.sizeCatalog}</p>
                <div className="grid gap-3 md:grid-cols-2">
                  {selectedShape.options.map((o) => (
                    <label
                      key={o.code}
                      className={`cursor-pointer rounded-md border px-3 py-2 text-sm shadow-sm ${
                        o.code === sizeCode
                          ? "border-amber-500 bg-amber-50"
                          : "border-neutral-200 bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="sizeCode"
                        value={o.code}
                        checked={sizeCode === o.code}
                        onChange={() => setSizeCode(o.code)}
                        className="mr-2 align-middle"
                      />
                      <span className="font-medium">{o.label}</span>
                      <span className="mt-1 block text-xs text-neutral-500">
                        {t.bwLabel} {formatCurrency(o.bw)} · {t.colorLabel}{" "}
                        {formatCurrency(o.color)}
                      </span>
                      {o.mountingNote && (
                        <span className="mt-1 block text-[11px] text-neutral-500">
                          {o.mountingNote}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-neutral-700">{t.finish}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => setFinish("color")}
                    className={`rounded-full border px-3 py-1 ${
                      finish === "color"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-neutral-300 text-neutral-700"
                    }`}
                  >
                    {t.finishColor}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFinish("bw")}
                    className={`rounded-full border px-3 py-1 ${
                      finish === "bw"
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-neutral-300 text-neutral-700"
                    }`}
                  >
                    {t.finishBW}
                  </button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-neutral-700">{t.mounting}</p>
                  <select
                    value={mounting}
                    onChange={(e) => setMounting(e.target.value)}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="none">{t.mountingNone}</option>
                    <option value="tape">{t.mountingTape}</option>
                    <option value="fastener">{t.mountingFastener}</option>
                  </select>
                  <p className="text-[11px] text-neutral-500">{t.mountingHelp}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-neutral-700">{t.combinePhotos}</p>
                  <label className="flex items-center gap-2 text-sm text-neutral-700">
                    <input
                      type="checkbox"
                      checked={combinePhotos}
                      onChange={(e) => setCombinePhotos(e.target.checked)}
                    />
                    {L === "en"
                      ? "Combine two or more originals on the same cameo"
                      : L === "ru"
                        ? "Объединить два или больше исходных фото в одном медальоне"
                        : "Об’єднати два або більше вихідних фото в одному медальйоні"}
                  </label>
                  <p className="text-[11px] text-neutral-500">{t.combineHelp}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-neutral-700">{t.proof}</p>
                  <select
                    value={proof}
                    onChange={(e) => setProof(e.target.value)}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="none">{t.proofNone}</option>
                    <option value="email">{t.proofEmail}</option>
                    <option value="printed">{t.proofPrinted}</option>
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">
                {t.additionalLegend}
              </legend>
              <p className="text-xs text-neutral-600">{t.additionalHelp}</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </fieldset>

            <div className="rounded-md border border-dashed border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-800">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                {t.estTitle}
              </p>
              <p className="mt-1 text-lg font-semibold text-amber-700">
                {formatCurrency(totalRange.min)} – {formatCurrency(totalRange.max)}
              </p>
              <p className="mt-1 text-xs text-neutral-600">{t.estHelp}</p>
            </div>

            <div className="flex flex-col gap-3 border-t border-neutral-200 pt-4 md:flex-row md:items-center md:justify-between">
              
          <div className="mt-6 flex flex-wrap items-end gap-4">
            <label className="grid gap-2 text-sm text-neutral-700">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Quantity</span>
              <input
                name="quantity"
                type="number"
                min={1}
                max={999}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(999, Math.floor(Number(e.target.value) || 1))))}
                className="w-28 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"
              />
            </label>

            <button
              type="button"
              onClick={() => addItem({ id: "order-form-request", name: "Order Form Request", priceCents: 0, quantity: qty })}
              className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-800 shadow-sm hover:border-amber-500 hover:text-amber-600"
            >
              Add to cart
            </button>
          </div>

<button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-8 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-md hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? t.submitSending : t.submit}
              </button>
              <p className="text-xs text-neutral-500">{t.submitHelp}</p>
            </div>

            {status && (
              <div
                className={`rounded-md border px-3 py-2 text-sm ${
                  status === "success"
                    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                    : "border-red-300 bg-red-50 text-red-800"
                }`}
              >
                {statusMessage}
              </div>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
