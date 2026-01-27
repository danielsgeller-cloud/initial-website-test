"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { faqData } from "./faq-data";

const faqDataLocal = [
  {
    question: {
      en: "What are ceramic photo medallions?",
      es: "¿Qué son los medallones fotográficos de cerámica?"
    },
    answer: {
      en: "Ceramic photo medallions are kiln-fired enamel portraits created from your photographs. They are permanent, weather-resistant memorial pieces designed for outdoor monuments and headstones. Each medallion is handcrafted and will not fade or deteriorate over time.",
      es: "Los medallones fotográficos de cerámica son retratos de esmalte cocidos en horno creados a partir de sus fotografías. Son piezas conmemorativas permanentes, resistentes a la intemperie, diseñadas para monumentos al aire libre y lápidas. Cada medallón está hecho a mano y no se desvanecerá ni deteriorará con el tiempo."
    }
  },
  {
    question: {
      en: "What sizes are available?",
      es: "¿Qué tamaños están disponibles?"
    },
    answer: {
      en: "We offer multiple shapes and sizes including oval (ranging from 2x3 inches to 8x10 inches), rectangle, heart, and round medallions. Each shape has various size options to fit your monument. Please see our order form for complete size and pricing details.",
      es: "Ofrecemos múltiples formas y tamaños que incluyen medallones ovalados (desde 2x3 pulgadas hasta 8x10 pulgadas), rectangulares, de corazón y redondos. Cada forma tiene varias opciones de tamaño para adaptarse a su monumento. Consulte nuestro formulario de pedido para obtener detalles completos de tamaño y precios."
    }
  },
  {
    question: {
      en: "Can I get color or black & white?",
      es: "¿Puedo obtenerlo a color o en blanco y negro?"
    },
    answer: {
      en: "Yes! We offer both full color and black & white options. Color medallions showcase the vibrancy of the original photograph, while black & white offers a classic, timeless appearance. Both options are equally durable and weather-resistant.",
      es: "¡Sí! Ofrecemos opciones tanto a todo color como en blanco y negro. Los medallones a color muestran la vivacidad de la fotografía original, mientras que el blanco y negro ofrece una apariencia clásica y atemporal. Ambas opciones son igualmente duraderas y resistentes a la intemperie."
    }
  },
  {
    question: {
      en: "How do I submit my photo?",
      es: "¿Cómo envío mi foto?"
    },
    answer: {
      en: "After placing your order through our online form, we will contact you with instructions for submitting your photograph. You can email us a digital copy or mail us a physical photograph. We accept most photo formats and will work with you to ensure the best possible result.",
      es: "Después de realizar su pedido a través de nuestro formulario en línea, nos comunicaremos con usted con instrucciones para enviar su fotografía. Puede enviarnos una copia digital por correo electrónico o enviarnos una fotografía física por correo. Aceptamos la mayoría de los formatos de fotos y trabajaremos con usted para garantizar el mejor resultado posible."
    }
  },
  {
    question: {
      en: "Do you retouch or enhance photos?",
      es: "¿Retocan o mejoran las fotos?"
    },
    answer: {
      en: "Yes! Every order receives careful retouching and quality control. We can remove scratches, adjust brightness and contrast, and make minor corrections to ensure your medallion looks its best. If you have specific retouching requests, please include them in the additional notes section of your order.",
      es: "¡Sí! Cada pedido recibe un cuidadoso retoque y control de calidad. Podemos eliminar rasguños, ajustar el brillo y el contraste, y hacer correcciones menores para garantizar que su medallón se vea lo mejor posible. Si tiene solicitudes específicas de retoque, inclúyalas en la sección de notas adicionales de su pedido."
    }
  },
  {
    question: {
      en: "Can I combine multiple photos into one medallion?",
      es: "¿Puedo combinar varias fotos en un medallón?"
    },
    answer: {
      en: "Yes! We can combine multiple photographs into a single medallion. This is perfect for couples or family portraits. Please select this option in the order form and provide details about how you'd like the photos arranged. Additional charges may apply depending on the complexity.",
      es: "¡Sí! Podemos combinar varias fotografías en un solo medallón. Esto es perfecto para retratos de parejas o familiares. Seleccione esta opción en el formulario de pedido y proporcione detalles sobre cómo le gustaría que se organizaran las fotos. Pueden aplicarse cargos adicionales dependiendo de la complejidad."
    }
  },
  {
    question: {
      en: "What mounting options are available?",
      es: "¿Qué opciones de montaje están disponibles?"
    },
    answer: {
      en: "We offer several mounting options including mounting tape for easy installation and fasteners/hardware for permanent mounting. If you're working with a monument dealer, they can typically handle the installation. We can also provide guidance on proper installation methods.",
      es: "Ofrecemos varias opciones de montaje que incluyen cinta de montaje para una fácil instalación y sujetadores/herrajes para montaje permanente. Si está trabajando con un distribuidor de monumentos, generalmente pueden encargarse de la instalación. También podemos proporcionar orientación sobre los métodos de instalación adecuados."
    }
  },
  {
    question: {
      en: "How long does production take?",
      es: "¿Cuánto tiempo tarda la producción?"
    },
    answer: {
      en: "Production time varies depending on our current workload and the complexity of your order. Typically, orders are completed within 2-4 weeks. If you have a specific deadline, please indicate it in the 'needed by' date field on the order form, and we will do our best to accommodate your timeline.",
      es: "El tiempo de producción varía según nuestra carga de trabajo actual y la complejidad de su pedido. Por lo general, los pedidos se completan dentro de 2-4 semanas. Si tiene una fecha límite específica, indíquela en el campo 'fecha requerida' en el formulario de pedido, y haremos todo lo posible para adaptarnos a su cronograma."
    }
  },
  {
    question: {
      en: "Can I see a proof before production?",
      es: "¿Puedo ver una prueba antes de la producción?"
    },
    answer: {
      en: "Yes! We offer both email proofs (digital preview) and printed proofs. Email proofs are included at no charge, while printed proofs incur an additional fee. Select your preferred proof option when placing your order. Once you approve the proof, we'll proceed with production.",
      es: "¡Sí! Ofrecemos tanto pruebas por correo electrónico (vista previa digital) como pruebas impresas. Las pruebas por correo electrónico están incluidas sin cargo, mientras que las pruebas impresas tienen un cargo adicional. Seleccione su opción de prueba preferida al realizar su pedido. Una vez que apruebe la prueba, procederemos con la producción."
    }
  },
  {
    question: {
      en: "Are ceramic medallions weather-resistant?",
      es: "¿Los medallones de cerámica son resistentes a la intemperie?"
    },
    answer: {
      en: "Absolutely! Our kiln-fired enamel medallions are specifically designed for outdoor use. They are completely weather-resistant and will not fade, crack, or deteriorate from exposure to sun, rain, snow, or extreme temperatures. They are built to last for generations.",
      es: "¡Absolutamente! Nuestros medallones de esmalte cocidos en horno están específicamente diseñados para uso al aire libre. Son completamente resistentes a la intemperie y no se desvanecerán, agrietarán ni deteriorarán por la exposición al sol, lluvia, nieve o temperaturas extremas. Están construidos para durar generaciones."
    }
  },
  {
    question: {
      en: "Do you work with monument dealers?",
      es: "¿Trabajan con distribuidores de monumentos?"
    },
    answer: {
      en: "Yes! We work with both monument dealers and individual families. Monument dealers appreciate our quality craftsmanship and reliable service. We can coordinate directly with dealers for bulk orders or specific project requirements. Families can also order directly from us.",
      es: "¡Sí! Trabajamos tanto con distribuidores de monumentos como con familias individuales. Los distribuidores de monumentos aprecian nuestra artesanía de calidad y servicio confiable. Podemos coordinar directamente con distribuidores para pedidos al por mayor o requisitos de proyectos específicos. Las familias también pueden ordenar directamente de nosotros."
    }
  },
  {
    question: {
      en: "What payment methods do you accept?",
      es: "¿Qué métodos de pago aceptan?"
    },
    answer: {
      en: "We accept various payment methods for your convenience. Please visit our Payment page or contact us directly for current payment options and terms. We work with both individual customers and monument dealers.",
      es: "Aceptamos varios métodos de pago para su conveniencia. Visite nuestra página de Pago o contáctenos directamente para conocer las opciones y términos de pago actuales. Trabajamos tanto con clientes individuales como con distribuidores de monumentos."
    }
  }
]; // This can be removed after verification

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
            {lang === "es" && "Preguntas Frecuentes"}
            {lang === "ru" && "Часто задаваемые вопросы"}
            {lang === "uk" && "Часті запитання"}
          </h1>
          <p className="text-lg text-neutral-600">
            {lang === "en" && "Find answers to common questions about our ceramic photo medallions"}
            {lang === "es" && "Encuentre respuestas a preguntas comunes sobre nuestros medallones fotográficos de cerámica"}
            {lang === "ru" && "Найдите ответы на часто задаваемые вопросы о наших керамических фото-медальонах"}
            {lang === "uk" && "Знайдіть відповіді на часті запитання про наші керамічні фото-медальйони"}
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
            {lang === "es" && "¿Aún tiene preguntas?"}
            {lang === "ru" && "Остались вопросы?"}
            {lang === "uk" && "Залишилися питання?"}
          </h2>
          <p className="mb-6 text-amber-50">
            {lang === "en" && "We're here to help. Contact us directly for personalized assistance."}
            {lang === "es" && "Estamos aquí para ayudar. Contáctenos directamente para asistencia personalizada."}
            {lang === "ru" && "Мы здесь, чтобы помочь. Свяжитесь с нами напрямую для персональной помощи."}
            {lang === "uk" && "Ми тут, щоб допомогти. Зв'яжіться з нами безпосередньо для персональної допомоги."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors shadow-md"
            >
              {lang === "en" && "Contact Us"}
              {lang === "es" && "Contáctenos"}
              {lang === "ru" && "Связаться с нами"}
              {lang === "uk" && "Зв'язатися з нами"}
            </Link>
            <Link
              href="/order-form"
              className="px-8 py-3 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors shadow-md"
            >
              {lang === "en" && "Place an Order"}
              {lang === "es" && "Hacer un Pedido"}
              {lang === "ru" && "Сделать заказ"}
              {lang === "uk" && "Зробити замовлення"}
            </Link>
          </div>
        </div>

        {/* Size Chart */}
        <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-amber-100">
            <h2 className="text-2xl font-bold text-neutral-900 text-center">
              {lang === "en" && "Oval Medallion Size Chart"}
              {lang === "es" && "Tabla de Tamaños de Medallones Ovalados"}
              {lang === "ru" && "Таблица размеров овальных медальонов"}
              {lang === "uk" && "Таблиця розмірів овальних медальйонів"}
            </h2>
          </div>
          <div className="p-4">
            <img
              src="/images/size-chart-oval.jpg"
              alt={
                lang === "en" ? "Exact sizes for oval medallions" :
                lang === "es" ? "Tamaños exactos para medallones ovalados" :
                lang === "ru" ? "Точные размеры для овальных медальонов" :
                "Точні розміри для овальних медальйонів"
              }
              className="w-full max-w-2xl mx-auto"
            />
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            {lang === "en" && "← Back to Home"}
            {lang === "es" && "← Volver al Inicio"}
            {lang === "ru" && "← Вернуться на главную"}
            {lang === "uk" && "← Повернутися на головну"}
          </Link>
        </div>
      </div>
    </main>
  );
}
