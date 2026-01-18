"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface FAQItem {
  question: { en: string; es: string };
  answer: { en: string; es: string };
}

const faqData: FAQItem[] = [
  {
    question: {
      en: "What are ceramic photo medallions?",
      ru: "Что такое керамические фотомедальоны?",
      uk: "Що таке керамічні фотомедальйони?"
    },
    answer: {
      en: "Ceramic photo medallions are kiln-fired enamel portraits created from your photographs. They are permanent, weather-resistant memorial pieces designed for outdoor monuments and headstones. Each medallion is handcrafted and will not fade or deteriorate over time.",
      ru: "Керамические фотомедальоны — это эмалевые портреты, обожжённые в печи и созданные из ваших фотографий. Это постоянные, устойчивые к погодным условиям мемориальные изделия, предназначенные для наружных памятников и надгробий. Каждый медальон изготовлен вручную и не выцветает со временем.",
      uk: "Керамічні фотомедальйони — це емальовані портрети, випалені в печі та створені з ваших фотографій. Це постійні, стійкі до погодних умов меморіальні вироби, призначені для зовнішніх пам'ятників і надгробків. Кожен медальйон виготовлений вручну і не вицвітає з часом."
    }
  },
  {
    question: {
      en: "What sizes are available?",
      ru: "Какие размеры доступны?",
      uk: "Які розміри доступні?"
    },
    answer: {
      en: "We offer multiple shapes and sizes including oval (ranging from 2x3 inches to 8x10 inches), rectangle, heart, and round medallions. Each shape has various size options to fit your monument. Please see our order form for complete size and pricing details.",
      ru: "Мы предлагаем различные формы и размеры, включая овальные (от 2x3 до 8x10 дюймов), прямоугольные, сердцевидные и круглые медальоны. Каждая форма имеет различные варианты размеров для вашего памятника. Полную информацию о размерах и ценах смотрите в форме заказа.",
      uk: "Ми пропонуємо різні форми та розміри, включаючи овальні (від 2x3 до 8x10 дюймів), прямокутні, серцеподібні та круглі медальйони. Кожна форма має різні варіанти розмірів для вашого пам'ятника. Повну інформацію про розміри та ціни дивіться у формі замовлення."
    }
  },
  {
    question: {
      en: "Can I get color or black & white?",
      ru: "Можно ли заказать цветное или чёрно-белое изображение?",
      uk: "Чи можна замовити кольорове або чорно-біле зображення?"
    },
    answer: {
      en: "Yes! We offer both full color and black & white options. Color medallions showcase the vibrancy of the original photograph, while black & white offers a classic, timeless appearance. Both options are equally durable and weather-resistant.",
      ru: "Да! Мы предлагаем как полноцветные, так и чёрно-белые варианты. Цветные медальоны передают яркость оригинальной фотографии, в то время как чёрно-белые создают классический, вневременной вид. Оба варианта одинаково долговечны и устойчивы к погодным условиям.",
      uk: "Так! Ми пропонуємо як повнокольорові, так і чорно-білі варіанти. Кольорові медальйони передають яскравість оригінальної фотографії, тоді як чорно-білі створюють класичний, позачасовий вигляд. Обидва варіанти однаково довговічні та стійкі до погодних умов."
    }
  },
  {
    question: {
      en: "How do I submit my photo?",
      ru: "Как мне отправить фотографию?",
      uk: "Як мені надіслати фотографію?"
    },
    answer: {
      en: "After placing your order through our online form, we will contact you with instructions for submitting your photograph. You can email us a digital copy or mail us a physical photograph. We accept most photo formats and will work with you to ensure the best possible result.",
      ru: "После размещения заказа через нашу онлайн-форму мы свяжемся с вами и предоставим инструкции по отправке фотографии. Вы можете отправить нам цифровую копию по электронной почте или отправить физическую фотографию по почте. Мы принимаем большинство форматов фотографий и будем работать с вами для достижения наилучшего результата.",
      uk: "Після розміщення замовлення через нашу онлайн-форму ми зв'яжемося з вами і надамо інструкції щодо надсилання фотографії. Ви можете надіслати нам цифрову копію електронною поштою або відправити фізичну фотографію поштою. Ми приймаємо більшість форматів фотографій і працюватимемо з вами для досягнення найкращого результату."
    }
  },
  {
    question: {
      en: "Do you retouch or enhance photos?",
      ru: "Вы ретушируете или улучшаете фотографии?",
      uk: "Ви ретушуєте чи покращуєте фотографії?"
    },
    answer: {
      en: "Yes! Every order receives careful retouching and quality control. We can remove scratches, adjust brightness and contrast, and make minor corrections to ensure your medallion looks its best. If you have specific retouching requests, please include them in the additional notes section of your order.",
      ru: "Да! Каждый заказ проходит тщательную ретушь и контроль качества. Мы можем убрать царапины, отрегулировать яркость и контрастность, а также внести незначительные коррективы, чтобы ваш медальон выглядел наилучшим образом. Если у вас есть конкретные пожелания по ретуши, укажите их в разделе дополнительных примечаний вашего заказа.",
      uk: "Так! Кожне замовлення проходить ретельну ретуш і контроль якості. Ми можемо прибрати подряпини, відрегулювати яскравість і контрастність, а також внести незначні корективи, щоб ваш медальйон виглядав якнайкраще. Якщо у вас є конкретні побажання щодо ретуші, вкажіть їх у розділі додаткових приміток вашого замовлення."
    }
  },
  {
    question: {
      en: "Can I combine multiple photos into one medallion?",
      ru: "Могу ли я объединить несколько фотографий в один медальон?",
      uk: "Чи можу я об'єднати кілька фотографій в один медальйон?"
    },
    answer: {
      en: "Yes! We can combine multiple photographs into a single medallion. This is perfect for couples or family portraits. Please select this option in the order form and provide details about how you'd like the photos arranged. Additional charges may apply depending on the complexity.",
      ru: "Да! Мы можем объединить несколько фотографий в один медальон. Это отлично подходит для портретов пар или семей. Выберите эту опцию в форме заказа и укажите, как вы хотите расположить фотографии. В зависимости от сложности может взиматься дополнительная плата.",
      uk: "Так! Ми можемо об'єднати кілька фотографій в один медальйон. Це ідеально підходить для портретів пар або сімей. Виберіть цю опцію у формі замовлення та вкажіть, як ви хочете розташувати фотографії. Залежно від складності може стягуватися додаткова плата."
    }
  },
  {
    question: {
      en: "What mounting options are available?",
      ru: "Какие варианты монтажа доступны?",
      uk: "Які варіанти монтажу доступні?"
    },
    answer: {
      en: "We offer several mounting options including mounting tape for easy installation and fasteners/hardware for permanent mounting. If you're working with a monument dealer, they can typically handle the installation. We can also provide guidance on proper installation methods.",
      ru: "Мы предлагаем несколько вариантов монтажа, включая монтажную ленту для простой установки и крепёж для постоянного монтажа. Если вы работаете с мастерской памятников, они обычно могут выполнить установку. Мы также можем предоставить рекомендации по правильным методам установки.",
      uk: "Ми пропонуємо кілька варіантів монтажу, включаючи монтажну стрічку для простої установки та кріплення для постійного монтажу. Якщо ви працюєте з майстернею пам'ятників, вони зазвичай можуть виконати установку. Ми також можемо надати рекомендації щодо правильних методів установки."
    }
  },
  {
    question: {
      en: "How long does production take?",
      ru: "Сколько времени занимает изготовление?",
      uk: "Скільки часу займає виготовлення?"
    },
    answer: {
      en: "Production time varies depending on our current workload and the complexity of your order. Typically, orders are completed within 2-4 weeks. If you have a specific deadline, please indicate it in the 'needed by' date field on the order form, and we will do our best to accommodate your timeline.",
      ru: "Время изготовления зависит от нашей текущей загруженности и сложности вашего заказа. Обычно заказы выполняются в течение 2-4 недель. Если у вас есть конкретный срок, укажите его в поле «дата необходимости» в форме заказа, и мы постараемся уложиться в ваши сроки.",
      uk: "Час виготовлення залежить від нашого поточного завантаження та складності вашого замовлення. Зазвичай замовлення виконуються протягом 2-4 тижнів. Якщо у вас є конкретний термін, вкажіть його у полі «дата необхідності» у формі замовлення, і ми постараємося вкластися у ваші терміни."
    }
  },
  {
    question: {
      en: "Can I see a proof before production?",
      ru: "Могу ли я увидеть макет перед производством?",
      uk: "Чи можу я побачити макет перед виробництвом?"
    },
    answer: {
      en: "Yes! We offer both email proofs (digital preview) and printed proofs. Email proofs are included at no charge, while printed proofs incur an additional fee. Select your preferred proof option when placing your order. Once you approve the proof, we'll proceed with production.",
      ru: "Да! Мы предлагаем как электронные макеты (цифровой предпросмотр), так и печатные макеты. Электронные макеты предоставляются бесплатно, в то время как за печатные макеты взимается дополнительная плата. Выберите предпочтительный вариант макета при размещении заказа. После вашего одобрения макета мы приступим к производству.",
      uk: "Так! Ми пропонуємо як електронні макети (цифровий попередній перегляд), так і друковані макети. Електронні макети надаються безкоштовно, тоді як за друковані макети стягується додаткова плата. Виберіть бажаний варіант макета при розміщенні замовлення. Після вашого схвалення макета ми приступимо до виробництва."
    }
  },
  {
    question: {
      en: "Are ceramic medallions weather-resistant?",
      ru: "Устойчивы ли керамические медальоны к погодным условиям?",
      uk: "Чи стійкі керамічні медальйони до погодних умов?"
    },
    answer: {
      en: "Absolutely! Our kiln-fired enamel medallions are specifically designed for outdoor use. They are completely weather-resistant and will not fade, crack, or deteriorate from exposure to sun, rain, snow, or extreme temperatures. They are built to last for generations.",
      ru: "Абсолютно! Наши эмалевые медальоны, обожжённые в печи, специально разработаны для использования на открытом воздухе. Они полностью устойчивы к погодным условиям и не выцветают, не трескаются и не разрушаются от воздействия солнца, дождя, снега или экстремальных температур. Они созданы, чтобы служить поколениями.",
      uk: "Абсолютно! Наші емальовані медальйони, випалені в печі, спеціально розроблені для використання на відкритому повітрі. Вони повністю стійкі до погодних умов і не вицвітають, не тріскаються і не руйнуються від впливу сонця, дощу, снігу або екстремальних температур. Вони створені, щоб служити поколіннями."
    }
  },
  {
    question: {
      en: "Do you work with monument dealers?",
      ru: "Работаете ли вы с мастерскими памятников?",
      uk: "Чи працюєте ви з майстернями пам'ятників?"
    },
    answer: {
      en: "Yes! We work with both monument dealers and individual families. Monument dealers appreciate our quality craftsmanship and reliable service. We can coordinate directly with dealers for bulk orders or specific project requirements. Families can also order directly from us.",
      ru: "Да! Мы работаем как с мастерскими памятников, так и с отдельными семьями. Мастерские ценят наше качественное мастерство и надёжный сервис. Мы можем координировать работу непосредственно с мастерскими для крупных заказов или специфических требований проекта. Семьи также могут заказать напрямую у нас.",
      uk: "Так! Ми працюємо як з майстернями пам'ятників, так і з окремими сім'ями. Майстерні цінують нашу якісну майстерність і надійний сервіс. Ми можемо координувати роботу безпосередньо з майстернями для великих замовлень або специфічних вимог проекту. Сім'ї також можуть замовити безпосередньо у нас."
    }
  },
  {
    question: {
      en: "What payment methods do you accept?",
      ru: "Какие способы оплаты вы принимаете?",
      uk: "Які способи оплати ви приймаєте?"
    },
    answer: {
      en: "We accept various payment methods for your convenience. Please visit our Payment page or contact us directly for current payment options and terms. We work with both individual customers and monument dealers.",
      ru: "Для вашего удобства мы принимаем различные способы оплаты. Посетите нашу страницу оплаты или свяжитесь с нами напрямую для получения информации о текущих вариантах и условиях оплаты. Мы работаем как с частными клиентами, так и с мастерскими памятников.",
      uk: "Для вашої зручності ми приймаємо різні способи оплати. Відвідайте нашу сторінку оплати або зв'яжіться з нами безпосередньо для отримання інформації про поточні варіанти та умови оплати. Ми працюємо як з приватними клієнтами, так і з майстернями пам'ятників."
    }
  }
];

export default function FAQPage() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-amber-50 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            {lang === "en" && "Frequently Asked Questions"}
            {lang === "ru" && "Часто задаваемые вопросы"}
            {lang === "uk" && "Поширені запитання"}
          </h1>
          <p className="text-lg text-neutral-600">
            {lang === "en" && "Find answers to common questions about our ceramic photo medallions"}
            {lang === "ru" && "Найдите ответы на распространённые вопросы о наших керамических фотомедальонах"}
            {lang === "uk" && "Знайдіть відповіді на поширені запитання про наші керамічні фотомедальйони"}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-amber-50 transition-colors"
              >
                <span className="text-lg font-semibold text-neutral-900 pr-8">
                  {faq.question[lang]}
                </span>
                <svg
                  className={`w-6 h-6 text-amber-600 flex-shrink-0 transition-transform ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 pt-2 border-t border-neutral-100">
                  <p className="text-neutral-700 leading-relaxed">
                    {faq.answer[lang]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 text-center text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-3">
            {lang === "en" && "Still have questions?"}
            {lang === "ru" && "Остались вопросы?"}
            {lang === "uk" && "Залишились питання?"}
          </h2>
          <p className="mb-6 text-amber-50">
            {lang === "en" && "We're here to help. Contact us directly for personalized assistance."}
            {lang === "ru" && "Мы здесь, чтобы помочь. Свяжитесь с нами напрямую для персональной помощи."}
            {lang === "uk" && "Ми тут, щоб допомогти. Зв'яжіться з нами безпосередньо для персональної допомоги."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors shadow-md"
            >
              {lang === "en" && "Contact Us"}
              {lang === "ru" && "Связаться с нами"}
              {lang === "uk" && "Зв'язатися з нами"}
            </Link>
            <Link
              href="/order-form"
              className="px-8 py-3 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors shadow-md"
            >
              {lang === "en" && "Place an Order"}
              {lang === "ru" && "Сделать заказ"}
              {lang === "uk" && "Зробити замовлення"}
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            {lang === "en" && "← Back to Home"}
            {lang === "ru" && "← Вернуться на главную"}
            {lang === "uk" && "← Повернутися на головну"}
          </Link>
        </div>
      </div>
    </main>
  );
}
