"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "en" | "es" | "ru" | "uk";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  forLang: (valueByLang: Partial<Record<Lang, string>> & { en: string }) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "pic_lang";

const DICT: Record<string, Partial<Record<Lang, string>>> = {
  topbar_service: {
    en: "Service available in English and Spanish",
    es: "Servicio disponible en inglés y español",
    ru: "Сервис доступен на английском и испанском языках",
    uk: "Сервіс доступний англійською та іспанською мовами",
  },
  phone_display: { en: "(732) 297-6008", es: "(732) 297-6008", ru: "(732) 297-6008", uk: "(732) 297-6008" },
  email_display: { en: "info@picturesinceramic.com", es: "info@picturesinceramic.com", ru: "info@picturesinceramic.com", uk: "info@picturesinceramic.com" },
  brand_tagline: { en: "Enamel memorial medallions", es: "Medallones conmemorativos de esmalte", ru: "Эмалевые мемориальные медальоны", uk: "Емалеві меморіальні медальйони" },
  nav_order: { en: "Order Form", es: "Formulario de Pedido", ru: "Форма заказа", uk: "Форма замовлення" },
  // Header / top bar
  top_language_label: { en: "Language", es: "Idioma", ru: "Язык", uk: "Мова" },
  top_service_line: {
    en: "Service available in English and Spanish",
    es: "Servicio disponible en inglés y español",
    ru: "Сервис доступен на английском и испанском языках",
    uk: "Сервіс доступний англійською та іспанською мовами",
  },
  nav_home: { en: "Home", es: "Inicio", ru: "Главная", uk: "Головна" },
  nav_about: { en: "About", es: "Nosotros", ru: "О нас", uk: "Про нас" },
  nav_faq: { en: "FAQ", es: "Preguntas", ru: "Вопросы", uk: "Питання" },
  nav_why: { en: "Payment", es: "Pago", ru: "Оплата", uk: "Оплата" },
  nav_pricing: { en: "Medallion Pricing", es: "Precios de Medallones", ru: "Цены на медальоны", uk: "Ціни на медальйони" },
  nav_contact: { en: "Contact", es: "Contacto", ru: "Контакты", uk: "Контакти" },
  nav_order_form: { en: "Order Form", es: "Formulario de Pedido", ru: "Форма заказа", uk: "Форма замовлення" },
  nav_cta: { en: "Order a cameo", es: "Ordenar un camafeo", ru: "Заказать камею", uk: "Замовити камею" },
  nav_account: { en: "Account", es: "Cuenta", ru: "Аккаунт", uk: "Акаунт" },
  nav_signout: { en: "Sign out", es: "Cerrar sesión", ru: "Выйти", uk: "Вийти" },

  // Home page keys used by app/page.tsx
  home_hero_image_alt: {
    en: "Soft focus field with warm light",
    es: "Campo de enfoque suave con luz cálida",
    ru: "Поле с мягким фокусом и теплым светом",
    uk: "Поле з м'яким фокусом і теплим світлом",
  },
  home_hero_title: {
    en: "Elegant enamel photo cameos that honor a life forever",
    es: "Elegantes camafeos fotográficos de esmalte que honran una vida para siempre",
    ru: "Элегантные эмалевые фото-камеи, которые навсегда почитают жизнь",
    uk: "Елегантні емалеві фото-камеї, що шанують життя назавжди",
  },
  home_hero_subtitle: {
    en: "Custom kiln fired enamel photo medallions created for outdoor monuments and private homes. Each piece is built to stay clear and bright in every season.",
    es: "Medallones fotográficos de esmalte horneado personalizados para monumentos al aire libre y hogares privados. Cada pieza está diseñada para mantenerse clara y brillante en todas las estaciones.",
    ru: "Индивидуальные эмалевые фото-медальоны для уличных памятников и частных домов. Каждое изделие создано, чтобы оставаться ясным и ярким в любое время года.",
    uk: "Індивідуальні емалеві фото-медальйони для вуличних пам'ятників та приватних будинків. Кожен виріб створено, щоб залишатися чітким і яскравим у будь-яку пору року.",
  },
  home_intro_bg_alt: {
    en: "Soft field texture",
    es: "Textura suave de campo",
    ru: "Мягкая текстура поля",
    uk: "М'яка текстура поля",
  },
  home_intro_title: {
    en: "Custom enamel photo memorial cameos for headstones and mausoleums",
    es: "Camafeos fotográficos conmemorativos de esmalte personalizados para lápidas y mausoleos",
    ru: "Индивидуальные эмалевые мемориальные фото-камеи для надгробий и мавзолеев",
    uk: "Індивідуальні емалеві меморіальні фото-камеї для надгробків та мавзолеїв",
  },
  home_intro_body: {
    en: "We transform your favorite photograph into a kiln fired enamel portrait on a metal medallion for outdoor monuments and home memorials. We work with monument dealers and individual families, and every order receives careful retouching and inspection.",
    es: "Transformamos su fotografía favorita en un retrato de esmalte horneado sobre un medallón de metal para monumentos al aire libre y memoriales en el hogar. Trabajamos con distribuidores de monumentos y familias individuales, y cada pedido recibe un cuidadoso retoque e inspección.",
    ru: "Мы превращаем вашу любимую фотографию в обожженный эмалевый портрет на металлическом медальоне для уличных памятников и домашних мемориалов. Мы работаем с дилерами памятников и отдельными семьями, и каждый заказ получает тщательную ретушь и проверку.",
    uk: "Ми перетворюємо вашу улюблену фотографію на обпалений емалевий портрет на металевому медальйоні для вуличних пам'ятників та домашніх меморіалів. Ми працюємо з дилерами пам'ятників та окремими сім'ями, і кожне замовлення отримує ретельну ретуш та перевірку.",
  },
  home_tile_about: { en: "About us", es: "Nosotros", ru: "О нас", uk: "Про нас" },
  home_tile_why: { en: "Payment", es: "Pago", ru: "Оплата", uk: "Оплата" },
  home_tile_contact: { en: "Contact us", es: "Contáctanos", ru: "Свяжитесь с нами", uk: "Зв'яжіться з нами" },
  home_tile_about_alt: {
    en: "About our studio",
    es: "Sobre nuestro estudio",
    ru: "О нашей студии",
    uk: "Про нашу студію",
  },
  home_tile_why_alt: {
    en: "Closeup of an enamel cameo",
    es: "Primer plano de un camafeo de esmalte",
    ru: "Крупный план эмалевой камеи",
    uk: "Крупний план емалевої камеї",
  },
  home_tile_contact_alt: {
    en: "Headstone flowers at a memorial",
    es: "Flores en lápida en un memorial",
    ru: "Цветы на надгробии в мемориале",
    uk: "Квіти на надгробку в меморіалі",
  },
  home_cta_bg_alt: {
    en: "Field at sunset with soft light",
    es: "Campo al atardecer con luz suave",
    ru: "Поле на закате с мягким светом",
    uk: "Поле на заході з м'яким світлом",
  },
  home_cta_title: {
    en: "Ready to order a cameo or request more information",
    es: "¿Listo para ordenar un camafeo o solicitar más información?",
    ru: "Готовы заказать камею или запросить дополнительную информацию",
    uk: "Готові замовити камею або запитати додаткову інформацію",
  },
  home_cta_body: {
    en: "Share your photo, stone details, and any questions. We reply personally with options, pricing, and a clear next step.",
    es: "Comparta su foto, detalles de la lápida y cualquier pregunta. Responderemos personalmente con opciones, precios y el siguiente paso claro.",
    ru: "Поделитесь своей фотографией, деталями камня и любыми вопросами. Мы ответим лично с вариантами, ценами и четким следующим шагом.",
    uk: "Поділіться своєю фотографією, деталями каменю та будь-якими питаннями. Ми відповімо особисто з варіантами, цінами та чітким наступним кроком.",
  },

  // Generic CTA label used across pages
  cta_order: { en: "Order a cameo", es: "Ordenar un camafeo", ru: "Заказать камею", uk: "Замовити камею" },
  cart_label: { en: "Cart", es: "Carrito", ru: "Корзина", uk: "Кошик" },
  search_label: { en: "Search", es: "Buscar", ru: "Поиск", uk: "Пошук" },

  // Account pages
  account_title: { en: "My Account", es: "Mi Cuenta", ru: "Мой аккаунт", uk: "Мій акаунт" },
  account_profile: { en: "Profile Information", es: "Información del Perfil", ru: "Информация профиля", uk: "Інформація профілю" },
  account_email: { en: "Email", es: "Correo Electrónico", ru: "Электронная почта", uk: "Електронна пошта" },
  account_name: { en: "Name", es: "Nombre", ru: "Имя", uk: "Ім'я" },
  account_edit_profile: { en: "Edit Profile", es: "Editar Perfil", ru: "Редактировать профиль", uk: "Редагувати профіль" },
  account_orders: { en: "Order History", es: "Historial de Pedidos", ru: "История заказов", uk: "Історія замовлень" },
  account_orders_desc: { en: "View all your past orders and reorder easily", es: "Ver todos sus pedidos anteriores y volver a ordenar fácilmente", ru: "Просмотрите все прошлые заказы и легко заказывайте снова", uk: "Переглядайте всі минулі замовлення та легко замовляйте знову" },
  account_view_orders: { en: "View Orders", es: "Ver Pedidos", ru: "Просмотр заказов", uk: "Переглянути замовлення" },
  account_quick_actions: { en: "Quick Actions", es: "Acciones Rápidas", ru: "Быстрые действия", uk: "Швидкі дії" },
  account_new_order: { en: "New Order", es: "Nuevo Pedido", ru: "Новый заказ", uk: "Нове замовлення" },

  // Account Edit page
  account_back: { en: "← Back to account", es: "← Volver a cuenta", ru: "← Вернуться к аккаунту", uk: "← Повернутися до акаунту" },
  account_edit_title: { en: "Edit Profile", es: "Editar Perfil", ru: "Редактировать профиль", uk: "Редагувати профіль" },
  account_personal_info: { en: "Personal Information", es: "Información Personal", ru: "Личная информация", uk: "Особиста інформація" },
  account_update_name_desc: { en: "Update your name", es: "Actualice su nombre", ru: "Обновите свое имя", uk: "Оновіть своє ім'я" },
  account_name_updated: { en: "Name updated successfully", es: "Nombre actualizado correctamente", ru: "Имя успешно обновлено", uk: "Ім'я успішно оновлено" },
  account_name_failed: { en: "Failed to update name", es: "Error al actualizar nombre", ru: "Не удалось обновить имя", uk: "Не вдалося оновити ім'я" },
  account_error: { en: "Something went wrong", es: "Algo salió mal", ru: "Что-то пошло не так", uk: "Щось пішло не так" },
  account_name_label: { en: "Name", es: "Nombre", ru: "Имя", uk: "Ім'я" },
  account_name_placeholder: { en: "Your name", es: "Tu nombre", ru: "Ваше имя", uk: "Ваше ім'я" },
  account_updating: { en: "Updating...", es: "Actualizando...", ru: "Обновление...", uk: "Оновлення..." },
  account_update_name: { en: "Update name", es: "Actualizar nombre", ru: "Обновить имя", uk: "Оновити ім'я" },
  account_change_password: { en: "Change Password", es: "Cambiar Contraseña", ru: "Изменить пароль", uk: "Змінити пароль" },
  account_update_password_desc: { en: "Update your password", es: "Actualice su contraseña", ru: "Обновите свой пароль", uk: "Оновіть свій пароль" },
  account_password_updated: { en: "Password updated successfully", es: "Contraseña actualizada correctamente", ru: "Пароль успешно обновлен", uk: "Пароль успішно оновлено" },
  account_passwords_no_match: { en: "Passwords do not match", es: "Las contraseñas no coinciden", ru: "Пароли не совпадают", uk: "Паролі не збігаються" },
  account_password_failed: { en: "Failed to update password", es: "Error al actualizar contraseña", ru: "Не удалось обновить пароль", uk: "Не вдалося оновити пароль" },
  account_current_password: { en: "Current password", es: "Contraseña actual", ru: "Текущий пароль", uk: "Поточний пароль" },
  account_new_password: { en: "New password", es: "Nueva contraseña", ru: "Новый пароль", uk: "Новий пароль" },
  account_password_min: { en: "At least 8 characters", es: "Al menos 8 caracteres", ru: "Минимум 8 символов", uk: "Мінімум 8 символів" },
  account_confirm_new_password: { en: "Confirm new password", es: "Confirmar nueva contraseña", ru: "Подтвердите новый пароль", uk: "Підтвердіть новий пароль" },
  account_update_password: { en: "Update password", es: "Actualizar contraseña", ru: "Обновить пароль", uk: "Оновити пароль" },
  account_change_email: { en: "Change Email", es: "Cambiar Correo", ru: "Изменить email", uk: "Змінити email" },
  account_email_verification_desc: { en: "We'll send a verification link to your new email address", es: "Enviaremos un enlace de verificación a su nueva dirección de correo", ru: "Мы отправим ссылку для подтверждения на ваш новый адрес электронной почты", uk: "Ми надішлемо посилання для підтвердження на вашу нову адресу електронної пошти" },
  account_email_sent: { en: "Verification email sent to new address", es: "Correo de verificación enviado a nueva dirección", ru: "Письмо с подтверждением отправлено на новый адрес", uk: "Лист з підтвердженням надіслано на нову адресу" },
  account_email_failed: { en: "Failed to change email", es: "Error al cambiar correo", ru: "Не удалось изменить email", uk: "Не вдалося змінити email" },
  account_new_email: { en: "New email", es: "Nuevo correo", ru: "Новый email", uk: "Новий email" },
  account_new_email_placeholder: { en: "newemail@example.com", es: "nuevocorreo@ejemplo.com", ru: "newemail@example.com", uk: "newemail@example.com" },
  account_confirm_password_label: { en: "Confirm password", es: "Confirmar contraseña", ru: "Подтвердите пароль", uk: "Підтвердіть пароль" },
  account_enter_password: { en: "Enter your password", es: "Ingrese su contraseña", ru: "Введите свой пароль", uk: "Введіть свій пароль" },
  account_sending: { en: "Sending...", es: "Enviando...", ru: "Отправка...", uk: "Відправка..." },
  account_change_email_btn: { en: "Change email", es: "Cambiar correo", ru: "Изменить email", uk: "Змінити email" },

  // Account Orders page
  order_history: { en: "Order History", es: "Historial de Pedidos", ru: "История заказов", uk: "Історія замовлень" },
  order_history_desc: { en: "View and track all your orders", es: "Ver y rastrear todos sus pedidos", ru: "Просматривайте и отслеживайте все свои заказы", uk: "Переглядайте та відстежуйте всі свої замовлення" },
  order_no_orders: { en: "No orders yet", es: "Aún no hay pedidos", ru: "Пока нет заказов", uk: "Поки немає замовлень" },
  order_first_order_desc: { en: "Start by creating your first order", es: "Comience creando su primer pedido", ru: "Начните с создания вашего первого заказа", uk: "Почніть зі створення вашого першого замовлення" },
  order_create_first: { en: "Create Your First Order", es: "Crear Su Primer Pedido", ru: "Создать первый заказ", uk: "Створити перше замовлення" },
  order_number: { en: "Order #", es: "Pedido #", ru: "Заказ #", uk: "Замовлення #" },
  order_shape: { en: "Shape:", es: "Forma:", ru: "Форма:", uk: "Форма:" },
  order_size: { en: "Size:", es: "Tamaño:", ru: "Размер:", uk: "Розмір:" },
  order_finish: { en: "Finish:", es: "Acabado:", ru: "Отделка:", uk: "Оздоблення:" },
  order_finish_color: { en: "Color", es: "Color", ru: "Цветной", uk: "Кольоровий" },
  order_finish_bw: { en: "Black & White", es: "Blanco y Negro", ru: "Черно-белый", uk: "Чорно-білий" },
  order_mounting: { en: "Mounting:", es: "Montaje:", ru: "Монтаж:", uk: "Монтаж:" },
  order_date: { en: "Date:", es: "Fecha:", ru: "Дата:", uk: "Дата:" },
  order_total: { en: "Total:", es: "Total:", ru: "Итого:", uk: "Всього:" },
  order_needed_by: { en: "Needed by:", es: "Requerido para:", ru: "Требуется к:", uk: "Потрібно до:" },
  order_hide_details: { en: "Hide Details", es: "Ocultar Detalles", ru: "Скрыть детали", uk: "Сховати деталі" },
  order_view_details: { en: "View Details", es: "Ver Detalles", ru: "Показать детали", uk: "Показати деталі" },
  order_details: { en: "Order Details", es: "Detalles del Pedido", ru: "Детали заказа", uk: "Деталі замовлення" },
  order_customer_name: { en: "Customer Name:", es: "Nombre del Cliente:", ru: "Имя клиента:", uk: "Ім'я клієнта:" },
  order_email: { en: "Email:", es: "Correo:", ru: "Email:", uk: "Email:" },
  order_phone: { en: "Phone:", es: "Teléfono:", ru: "Телефон:", uk: "Телефон:" },
  order_cemetery: { en: "Cemetery:", es: "Cementerio:", ru: "Кладбище:", uk: "Кладовище:" },
  order_ship_to: { en: "Ship to:", es: "Enviar a:", ru: "Отправить в:", uk: "Надіслати до:" },
  order_combining_photos: { en: "Combining photos:", es: "Combinando fotos:", ru: "Объединение фотографий:", uk: "Об'єднання фотографій:" },
  order_proof_option: { en: "Proof option:", es: "Opción de prueba:", ru: "Вариант пробы:", uk: "Варіант проби:" },
  order_additional_notes: { en: "Additional Notes:", es: "Notas Adicionales:", ru: "Дополнительные заметки:", uk: "Додаткові примітки:" },
  order_uploaded_images: { en: "Uploaded Images", es: "Imágenes Subidas", ru: "Загруженные изображения", uk: "Завантажені зображення" },
  order_image: { en: "Image", es: "Imagen", ru: "Изображение", uk: "Зображення" },
  order_price_breakdown: { en: "Price Breakdown", es: "Desglose de Precios", ru: "Разбивка цен", uk: "Розбивка цін" },
  order_base_price: { en: "Base Price:", es: "Precio Base:", ru: "Базовая цена:", uk: "Базова ціна:" },
  order_proof: { en: "Proof:", es: "Prueba:", ru: "Проба:", uk: "Проба:" },
  order_combine_adjust: { en: "Combine Photos Adjustment:", es: "Ajuste por Combinar Fotos:", ru: "Корректировка объединения фотографий:", uk: "Коригування об'єднання фотографій:" },
  order_base_fee: { en: "Base Fee:", es: "Tarifa Base:", ru: "Базовая плата:", uk: "Базова плата:" },
  order_processing: { en: "Processing...", es: "Procesando...", ru: "Обработка...", uk: "Обробка..." },
  order_pay_now: { en: "Pay Now", es: "Pagar Ahora", ru: "Оплатить сейчас", uk: "Оплатити зараз" },
  order_reorder: { en: "Reorder", es: "Reordenar", ru: "Повторить заказ", uk: "Повторити замовлення" },
  order_back_account: { en: "← Back to Account", es: "← Volver a Cuenta", ru: "← Вернуться к аккаунту", uk: "← Повернутися до акаунту" },
  order_status_pending: { en: "Pending", es: "Pendiente", ru: "В ожидании", uk: "Очікування" },
  order_status_processing: { en: "Processing", es: "Procesando", ru: "Обработка", uk: "Обробка" },
  order_status_completed: { en: "Completed", es: "Completado", ru: "Завершено", uk: "Завершено" },
  order_status_cancelled: { en: "Cancelled", es: "Cancelado", ru: "Отменено", uk: "Скасовано" },
  order_yes: { en: "Yes", es: "Sí", ru: "Да", uk: "Так" },
  loading: { en: "Loading...", es: "Cargando...", ru: "Загрузка...", uk: "Завантаження..." },

  // Login page
  login_title: { en: "Sign in", es: "Iniciar Sesión", ru: "Войти", uk: "Увійти" },
  login_email: { en: "Email", es: "Correo Electrónico", ru: "Email", uk: "Email" },
  login_password: { en: "Password", es: "Contraseña", ru: "Пароль", uk: "Пароль" },
  login_forgot_password: { en: "Forgot password?", es: "¿Olvidó su contraseña?", ru: "Забыли пароль?", uk: "Забули пароль?" },
  login_sign_in: { en: "Sign in", es: "Iniciar Sesión", ru: "Войти", uk: "Увійти" },
  login_signing_in: { en: "Signing in...", es: "Iniciando sesión...", ru: "Вход...", uk: "Вхід..." },
  login_no_account: { en: "Don't have an account? Register", es: "¿No tiene cuenta? Registrarse", ru: "Нет аккаунта? Зарегистрироваться", uk: "Немає акаунту? Зареєструватися" },
  login_return_home: { en: "Return home", es: "Volver al inicio", ru: "Вернуться на главную", uk: "Повернутися на головну" },
  login_error: { en: "Invalid email or password. Please verify your email before signing in.", es: "Correo o contraseña inválidos. Por favor verifique su correo antes de iniciar sesión.", ru: "Неверный email или пароль. Пожалуйста, подтвердите свой email перед входом.", uk: "Невірний email або пароль. Будь ласка, підтвердіть свій email перед входом." },

  // Register page
  register_title: { en: "Create Account", es: "Crear Cuenta", ru: "Создать аккаунт", uk: "Створити акаунт" },
  register_subtitle: { en: "Join Pictures in Ceramic to start ordering custom memorial portraits", es: "Únase a Pictures in Ceramic para comenzar a ordenar retratos conmemorativos personalizados", ru: "Присоединяйтесь к Pictures in Ceramic, чтобы начать заказывать индивидуальные памятные портреты", uk: "Приєднуйтесь до Pictures in Ceramic, щоб почати замовляти індивідуальні пам'ятні портрети" },
  register_name: { en: "Full Name", es: "Nombre Completo", ru: "Полное имя", uk: "Повне ім'я" },
  register_name_optional: { en: "optional", es: "opcional", ru: "необязательно", uk: "необов'язково" },
  register_name_placeholder: { en: "Enter your full name", es: "Ingrese su nombre completo", ru: "Введите ваше полное имя", uk: "Введіть ваше повне ім'я" },
  register_email: { en: "Email Address", es: "Dirección de Correo", ru: "Адрес электронной почты", uk: "Адреса електронної пошти" },
  register_email_placeholder: { en: "your.email@example.com", es: "su.correo@ejemplo.com", ru: "ваш.email@example.com", uk: "ваш.email@example.com" },
  register_phone: { en: "Phone Number", es: "Número de Teléfono", ru: "Номер телефона", uk: "Номер телефону" },
  register_phone_placeholder: { en: "(123) 456-7890", es: "(123) 456-7890", ru: "(123) 456-7890", uk: "(123) 456-7890" },
  register_password: { en: "Password", es: "Contraseña", ru: "Пароль", uk: "Пароль" },
  register_password_placeholder: { en: "Create a strong password", es: "Cree una contraseña segura", ru: "Создайте надежный пароль", uk: "Створіть надійний пароль" },
  register_password_min: { en: "Must be at least 8 characters long", es: "Debe tener al menos 8 caracteres", ru: "Должно быть не менее 8 символов", uk: "Повинно бути не менше 8 символів" },
  register_confirm_password: { en: "Confirm Password", es: "Confirmar Contraseña", ru: "Подтвердите пароль", uk: "Підтвердіть пароль" },
  register_confirm_password_placeholder: { en: "Re-enter your password", es: "Vuelva a ingresar su contraseña", ru: "Введите пароль еще раз", uk: "Введіть пароль ще раз" },
  register_passwords_no_match: { en: "Passwords do not match", es: "Las contraseñas no coinciden", ru: "Пароли не совпадают", uk: "Паролі не збігаються" },
  register_passwords_match: { en: "Passwords match ✓", es: "Las contraseñas coinciden ✓", ru: "Пароли совпадают ✓", uk: "Паролі збігаються ✓" },
  register_submit: { en: "Create Account", es: "Crear Cuenta", ru: "Создать аккаунт", uk: "Створити акаунт" },
  register_submitting: { en: "Creating Account...", es: "Creando Cuenta...", ru: "Создание аккаунта...", uk: "Створення акаунту..." },
  register_success: { en: "Account created successfully! Check your email to verify your account before signing in.", es: "¡Cuenta creada con éxito! Revise su correo para verificar su cuenta antes de iniciar sesión.", ru: "Аккаунт успешно создан! Проверьте свою почту, чтобы подтвердить аккаунт перед входом.", uk: "Акаунт успішно створено! Перевірте свою пошту, щоб підтвердити акаунт перед входом." },
  register_failed: { en: "Registration failed", es: "Error al registrarse", ru: "Ошибка регистрации", uk: "Помилка реєстрації" },
  register_password_length_error: { en: "Password must be at least 8 characters long", es: "La contraseña debe tener al menos 8 caracteres", ru: "Пароль должен содержать не менее 8 символов", uk: "Пароль повинен містити не менше 8 символів" },
  register_already_have_account: { en: "Already have an account? Sign in", es: "¿Ya tiene una cuenta? Iniciar sesión", ru: "Уже есть аккаунт? Войти", uk: "Вже є акаунт? Увійти" },
  register_return_home: { en: "← Return to home", es: "← Volver al inicio", ru: "← Вернуться на главную", uk: "← Повернутися на головну" },
  register_privacy_note: { en: "By creating an account, you agree to receive order updates and account notifications via email.", es: "Al crear una cuenta, acepta recibir actualizaciones de pedidos y notificaciones de cuenta por correo electrónico.", ru: "Создавая аккаунт, вы соглашаетесь получать обновления заказов и уведомления аккаунта по электронной почте.", uk: "Створюючи акаунт, ви погоджуєтесь отримувати оновлення замовлень та сповіщення акаунту електронною поштою." },
  register_required: { en: "*", es: "*", ru: "*", uk: "*" },

  // Cart page
  cart_title: { en: "Cart", es: "Carrito", ru: "Корзина", uk: "Кошик" },
  cart_items: { en: "items", es: "artículos", ru: "товаров", uk: "товарів" },
  cart_item: { en: "item", es: "artículo", ru: "товар", uk: "товар" },
  cart_success_title: { en: "Order submitted successfully!", es: "¡Pedido enviado exitosamente!", ru: "Заказ успешно отправлен!", uk: "Замовлення успішно надіслано!" },
  cart_success_message: { en: "We'll review your request and contact you with next steps.", es: "Revisaremos su solicitud y nos pondremos en contacto con los próximos pasos.", ru: "Мы рассмотрим ваш запрос и свяжемся с вами о следующих шагах.", uk: "Ми розглянемо ваш запит і зв'яжемося з вами щодо наступних кроків." },
  cart_error_message: { en: "Please provide your name and email address", es: "Por favor proporcione su nombre y dirección de correo electrónico", ru: "Пожалуйста, укажите ваше имя и адрес электронной почты", uk: "Будь ласка, вкажіть ваше ім'я та адресу електронної пошти" },
  cart_empty: { en: "Your cart is empty", es: "Su carrito está vacío", ru: "Ваша корзина пуста", uk: "Ваш кошик порожній" },
  cart_continue_shopping: { en: "Continue shopping", es: "Continuar comprando", ru: "Продолжить покупки", uk: "Продовжити покупки" },
  cart_customer_info: { en: "Customer Information", es: "Información del Cliente", ru: "Информация о клиенте", uk: "Інформація про клієнта" },
  cart_name: { en: "Name", es: "Nombre", ru: "Имя", uk: "Ім'я" },
  cart_name_placeholder: { en: "Your name", es: "Su nombre", ru: "Ваше имя", uk: "Ваше ім'я" },
  cart_email: { en: "Email", es: "Correo Electrónico", ru: "Email", uk: "Email" },
  cart_email_placeholder: { en: "your@email.com", es: "su@correo.com", ru: "ваш@email.com", uk: "ваш@email.com" },
  cart_phone: { en: "Phone (optional)", es: "Teléfono (opcional)", ru: "Телефон (необязательно)", uk: "Телефон (необов'язково)" },
  cart_phone_placeholder: { en: "(123) 456-7890", es: "(123) 456-7890", ru: "(123) 456-7890", uk: "(123) 456-7890" },
  cart_notes: { en: "Additional notes (optional)", es: "Notas adicionales (opcional)", ru: "Дополнительные заметки (необязательно)", uk: "Додаткові примітки (необов'язково)" },
  cart_notes_placeholder: { en: "Any special instructions or requests", es: "Cualquier instrucción o solicitud especial", ru: "Любые особые инструкции или запросы", uk: "Будь-які особливі інструкції або запити" },
  cart_quantity: { en: "Quantity", es: "Cantidad", ru: "Количество", uk: "Кількість" },
  cart_price: { en: "Price", es: "Precio", ru: "Цена", uk: "Ціна" },
  cart_subtotal: { en: "Subtotal", es: "Subtotal", ru: "Промежуточный итог", uk: "Проміжний підсумок" },
  cart_clear: { en: "Clear cart", es: "Vaciar carrito", ru: "Очистить корзину", uk: "Очистити кошик" },
  cart_place_order: { en: "Place Order", es: "Realizar Pedido", ru: "Оформить заказ", uk: "Оформити замовлення" },
  cart_placing_order: { en: "Placing order...", es: "Realizando pedido...", ru: "Оформление заказа...", uk: "Оформлення замовлення..." },
  cart_remove: { en: "Remove", es: "Eliminar", ru: "Удалить", uk: "Видалити" },

  // Payment page
  payment_title: { en: "Payment", es: "Pago", ru: "Оплата", uk: "Оплата" },
  payment_subtitle: { en: "We collect a deposit after we accept your artwork for production, then we charge the remaining balance when your cameo ships.", es: "Cobramos un depósito después de aceptar su obra de arte para producción, luego cobramos el saldo restante cuando su camafeo se envía.", ru: "Мы собираем депозит после принятия вашей работы для производства, затем взимаем оставшийся баланс при отправке вашей камеи.", uk: "Ми збираємо депозит після прийняття вашої роботи для виробництва, потім стягуємо залишковий баланс при відправці вашої камеї." },
  payment_warning: { en: "If you have not received an approval email from us yet, do not pay here.", es: "Si aún no ha recibido un correo electrónico de aprobación de nuestra parte, no pague aquí.", ru: "Если вы еще не получили письмо с подтверждением от нас, не платите здесь.", uk: "Якщо ви ще не отримали лист з підтвердженням від нас, не платіть тут." },
  payment_deposit_title: { en: "Pay your deposit", es: "Pague su depósito", ru: "Оплатите ваш депозит", uk: "Оплатіть ваш депозит" },
  payment_order_ref: { en: "Order reference (from our email)", es: "Referencia del pedido (de nuestro correo)", ru: "Ссылка на заказ (из нашего письма)", uk: "Посилання на замовлення (з нашого листа)" },
  payment_order_ref_placeholder: { en: "For example: PIC-2025-00123", es: "Por ejemplo: PIC-2025-00123", ru: "Например: PIC-2025-00123", uk: "Наприклад: PIC-2025-00123" },
  payment_email: { en: "Email", es: "Correo Electrónico", ru: "Email", uk: "Email" },
  payment_email_placeholder: { en: "you@example.com", es: "usted@ejemplo.com", ru: "вы@example.com", uk: "ви@example.com" },
  payment_amount: { en: "Deposit amount (USD)", es: "Monto del depósito (USD)", ru: "Сумма депозита (USD)", uk: "Сума депозиту (USD)" },
  payment_amount_placeholder: { en: "100", es: "100", ru: "100", uk: "100" },
  payment_amount_note: { en: "Enter the deposit amount you were approved for. We will confirm the final total before shipping.", es: "Ingrese el monto del depósito para el que fue aprobado. Confirmaremos el total final antes del envío.", ru: "Введите сумму депозита, которую вы получили. Мы подтвердим окончательную сумму перед отправкой.", uk: "Введіть суму депозиту, яку ви отримали. Ми підтвердимо остаточну суму перед відправкою." },
  payment_next_title: { en: "What happens next", es: "Qué sucede a continuación", ru: "Что происходит дальше", uk: "Що відбувається далі" },
  payment_next_step1: { en: "You pay the deposit through Stripe Checkout.", es: "Usted paga el depósito a través de Stripe Checkout.", ru: "Вы оплачиваете депозит через Stripe Checkout.", uk: "Ви оплачуєте депозит через Stripe Checkout." },
  payment_next_step2: { en: "We begin production and keep you updated if we need clarification.", es: "Comenzamos la producción y lo mantenemos actualizado si necesitamos aclaraciones.", ru: "Мы начинаем производство и держим вас в курсе, если нужны разъяснения.", uk: "Ми починаємо виробництво і тримаємо вас в курсі, якщо потрібні роз'яснення." },
  payment_next_step3: { en: "When your cameo ships, we charge the remaining balance using the payment method saved with your deposit.", es: "Cuando su camafeo se envíe, cobraremos el saldo restante utilizando el método de pago guardado con su depósito.", ru: "Когда ваша камея отправится, мы взимаем оставшийся баланс, используя метод оплаты, сохраненный с вашим депозитом.", uk: "Коли ваша камея відправиться, ми стягуємо залишковий баланс, використовуючи метод оплати, збережений з вашим депозитом." },
  payment_pay_button: { en: "Pay deposit", es: "Pagar depósito", ru: "Оплатить депозит", uk: "Оплатити депозит" },
  payment_redirecting: { en: "Redirecting to Stripe...", es: "Redirigiendo a Stripe...", ru: "Перенаправление на Stripe...", uk: "Перенаправлення на Stripe..." },
  payment_admin_login: { en: "Admin Login →", es: "Inicio Admin →", ru: "Вход для администратора →", uk: "Вхід для адміністратора →" },

  // Shop page
  shop_title: { en: "Shop", es: "Tienda", ru: "Магазин", uk: "Магазин" },
  shop_placeholder_message: { en: "This is a placeholder shop page. For now, please use the Order Form to request pricing for specific sizes and quantities.", es: "Esta es una página de tienda de marcador de posición. Por ahora, utilice el Formulario de Pedido para solicitar precios para tamaños y cantidades específicos.", ru: "Это страница-заполнитель магазина. Пока что, пожалуйста, используйте Форму заказа для запроса цен на конкретные размеры и количества.", uk: "Це сторінка-заповнювач магазину. Поки що, будь ласка, використовуйте Форму замовлення для запиту цін на конкретні розміри та кількості." },
  shop_typical_options: { en: "Typical options", es: "Opciones típicas", ru: "Типичные варианты", uk: "Типові варіанти" },
  shop_option1: { en: "Oval cameos in several standard sizes", es: "Camafeos ovalados en varios tamaños estándar", ru: "Овальные камеи в нескольких стандартных размерах", uk: "Овальні камеї в кількох стандартних розмірах" },
  shop_option2: { en: "Rectangular and custom shapes on request", es: "Formas rectangulares y personalizadas a solicitud", ru: "Прямоугольные и нестандартные формы по запросу", uk: "Прямокутні та нестандартні форми на запит" },
  shop_option3: { en: "Black and white or full color finishes", es: "Acabados en blanco y negro o a todo color", ru: "Черно-белые или полноцветные отделки", uk: "Чорно-білі або повнокольорові оздоблення" },
  shop_option4: { en: "Volume pricing for monument shops", es: "Precios por volumen para tiendas de monumentos", ru: "Оптовые цены для магазинов памятников", uk: "Оптові ціни для магазинів пам'ятників" },
  shop_order_instructions: { en: "To begin an order, go to the Order Form page and describe what you need. We will reply with a quote and timeline.", es: "Para comenzar un pedido, vaya a la página Formulario de Pedido y describa lo que necesita. Responderemos con una cotización y un cronograma.", ru: "Чтобы начать заказ, перейдите на страницу Форма заказа и опишите, что вам нужно. Мы ответим с предложением и графиком.", uk: "Щоб почати замовлення, перейдіть на сторінку Форма замовлення та опишіть, що вам потрібно. Ми відповімо з пропозицією та графіком." },

  // Forgot Password page
  forgot_password_title: { en: "Reset password", es: "Restablecer contraseña", ru: "Сбросить пароль", uk: "Скинути пароль" },
  forgot_password_subtitle: { en: "Enter your email address and we'll send you a link to reset your password.", es: "Ingrese su dirección de correo electrónico y le enviaremos un enlace para restablecer su contraseña.", ru: "Введите свой адрес электронной почты, и мы отправим вам ссылку для сброса пароля.", uk: "Введіть свою адресу електронної пошти, і ми надішлемо вам посилання для скидання пароля." },
  forgot_password_email: { en: "Email", es: "Correo Electrónico", ru: "Email", uk: "Email" },
  forgot_password_email_placeholder: { en: "your.email@example.com", es: "su.correo@ejemplo.com", ru: "ваш.email@example.com", uk: "ваш.email@example.com" },
  forgot_password_send: { en: "Send reset link", es: "Enviar enlace de restablecimiento", ru: "Отправить ссылку для сброса", uk: "Надіслати посилання для скидання" },
  forgot_password_sending: { en: "Sending...", es: "Enviando...", ru: "Отправка...", uk: "Відправка..." },
  forgot_password_success: { en: "If that email exists, we sent a reset link", es: "Si ese correo existe, enviamos un enlace de restablecimiento", ru: "Если этот email существует, мы отправили ссылку для сброса", uk: "Якщо цей email існує, ми надіслали посилання для скидання" },
  forgot_password_error: { en: "Something went wrong", es: "Algo salió mal", ru: "Что-то пошло не так", uk: "Щось пішло не так" },
  forgot_password_back: { en: "Back to login", es: "Volver a inicio de sesión", ru: "Вернуться к входу", uk: "Повернутися до входу" },

  // Verify Email page
  verify_email_title: { en: "Verify email", es: "Verificar correo electrónico", ru: "Подтвердить email", uk: "Підтвердити email" },
  verify_email_missing: { en: "Missing token or email. Please use the link from your email.", es: "Falta token o correo electrónico. Por favor use el enlace de su correo.", ru: "Отсутствует токен или email. Пожалуйста, используйте ссылку из вашего письма.", uk: "Відсутній токен або email. Будь ласка, використовуйте посилання з вашого листа." },
  verify_email_verifying: { en: "Verifying...", es: "Verificando...", ru: "Проверка...", uk: "Перевірка..." },
  verify_email_success: { en: "Email verified. You can sign in now.", es: "Correo verificado. Ahora puede iniciar sesión.", ru: "Email подтвержден. Теперь вы можете войти.", uk: "Email підтверджено. Тепер ви можете увійти." },
  verify_email_failed: { en: "Verification failed", es: "Verificación fallida", ru: "Проверка не удалась", uk: "Перевірка не вдалася" },
  verify_email_login: { en: "Go to login", es: "Ir a inicio de sesión", ru: "Перейти ко входу", uk: "Перейти до входу" },

  // Reset Password page
  reset_password_title: { en: "Reset your password", es: "Restablecer su contraseña", ru: "Сбросить пароль", uk: "Скинути пароль" },
  reset_password_subtitle: { en: "Enter your new password below", es: "Ingrese su nueva contraseña a continuación", ru: "Введите новый пароль ниже", uk: "Введіть новий пароль нижче" },
  reset_password_new: { en: "New password", es: "Nueva contraseña", ru: "Новый пароль", uk: "Новий пароль" },
  reset_password_new_placeholder: { en: "At least 8 characters", es: "Al menos 8 caracteres", ru: "Минимум 8 символов", uk: "Мінімум 8 символів" },
  reset_password_confirm: { en: "Confirm password", es: "Confirmar contraseña", ru: "Подтвердите пароль", uk: "Підтвердіть пароль" },
  reset_password_confirm_placeholder: { en: "Re-enter your password", es: "Vuelva a ingresar su contraseña", ru: "Введите пароль еще раз", uk: "Введіть пароль ще раз" },
  reset_password_submit: { en: "Reset password", es: "Restablecer contraseña", ru: "Сбросить пароль", uk: "Скинути пароль" },
  reset_password_submitting: { en: "Resetting...", es: "Restableciendo...", ru: "Сброс...", uk: "Скидання..." },
  reset_password_success: { en: "Password reset successfully. You can now sign in.", es: "Contraseña restablecida con éxito. Ahora puede iniciar sesión.", ru: "Пароль успешно сброшен. Теперь вы можете войти.", uk: "Пароль успішно скинуто. Тепер ви можете увійти." },
  reset_password_failed: { en: "Password reset failed. Link may be expired.", es: "El restablecimiento de contraseña falló. El enlace puede haber caducado.", ru: "Сброс пароля не удался. Ссылка может быть истекшей.", uk: "Скидання пароля не вдалося. Посилання може бути прострочене." },
  reset_password_mismatch: { en: "Passwords do not match", es: "Las contraseñas no coinciden", ru: "Пароли не совпадают", uk: "Паролі не збігаються" },
  reset_password_invalid_token: { en: "Invalid or expired reset link", es: "Enlace de restablecimiento inválido o caducado", ru: "Неверная или истекшая ссылка для сброса", uk: "Невірне або прострочене посилання для скидання" },

  // Confirm Email Change page
  confirm_email_title: { en: "Confirm email change", es: "Confirmar cambio de correo", ru: "Подтвердить изменение email", uk: "Підтвердити зміну email" },
  confirm_email_verifying: { en: "Verifying email change...", es: "Verificando cambio de correo...", ru: "Проверка изменения email...", uk: "Перевірка зміни email..." },
  confirm_email_success: { en: "Email updated successfully", es: "Correo actualizado exitosamente", ru: "Email успешно обновлен", uk: "Email успішно оновлено" },
  confirm_email_failed: { en: "Email change verification failed", es: "La verificación del cambio de correo falló", ru: "Проверка изменения email не удалась", uk: "Перевірка зміни email не вдалася" },
  confirm_email_login: { en: "Go to account", es: "Ir a cuenta", ru: "Перейти в аккаунт", uk: "Перейти до акаунту" },
};

function safeT(key: string, lang: Lang): string {
  const entry = DICT[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en ?? key;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "en" || saved === "es" || saved === "ru" || saved === "uk") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  const value = useMemo<LanguageContextValue>(() => {
    return {
      lang,
      setLang,
      t: (key: string) => safeT(key, lang),
      forLang: (valueByLang) => valueByLang[lang] ?? valueByLang.en,
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: "en",
      setLang: () => {},
      t: (key: string) => key,
      forLang: (valueByLang) => valueByLang.en,
    };
  }
  return ctx;
}
