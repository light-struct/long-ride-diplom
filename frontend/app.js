const $ = (id) => document.getElementById(id);
const TOKEN_KEY = "lr_token";
const TAB_KEY = "lr_tab";
const THEME_KEY = "lr_theme";
const LANG_KEY = "lr_lang";
const TABS = ["home", "bikes", "guides", "assistant", "profile", "admin"];

const I18N = {
  ru: {
    brand: "Long Ride",
    subtitle: "Учет велосипедов и обслуживания",
    login: "Войти",
    register: "Регистрация",
    forgot: "Забыл пароль",
    send_code: "Отправить код",
    reset_password: "Сбросить пароль",
    tab_home: "Главная",
    tab_bikes: "Велосипеды",
    tab_guides: "Гайды",
    tab_assistant: "Ассистент",
    tab_profile: "Профиль",
    tab_admin: "Админ",
    logout: "Выйти",
    home_title: "Главная",
    about_title: "О проекте",
    about_text: "Этот проект помогает вести учет велосипедов и обслуживания.",
    features_title: "Функционал",
    feature_1: "Учет велосипедов и пробега",
    feature_2: "Компоненты и их ресурс",
    feature_3: "Гайды по обслуживанию по языкам",
    feature_4: "Профиль, смена пароля и админ-панели",
    profile_title: "Профиль",
    admin_title: "Панель администратора",
    admin_desc: "У вас есть права администратора.",
    list: "Список",
    add: "Добавить",
    close: "Закрыть",
    save: "Сохранить",
    components: "Компоненты",
    add_component: "Добавить компонент",
    edit_component: "Редактировать компонент",
    cancel: "Отмена",
    ask: "Спросить",
    confirm: "Подтверждение",
    confirm_btn: "Подтвердить",
    change_password: "Сменить пароль",
    assistant_placeholder: "Задай вопрос по обслуживанию велосипеда",
    admin_users: "Пользователи",
    back: "Назад",
    add_user: "Добавить пользователя",
    edit_user: "Изменить",
    user_bikes: "Велосипеды",
    add_bike: "Добавить велосипед",
    edit_bike: "Изменить",
    topic_lang: "Тема (ru/en/kk)",
    add_guide: "Добавить гайд",
    edit_guide: "Изменить",
    delete: "Удалить",
    email_label: "Email",
    password_label: "Password",
    title_label: "Заголовок",
    content_label: "Содержимое",
    name_label: "Название",
    type_label: "Тип",
    mileage_label: "Пробег",
    category_label: "Категория",
    current_mileage_label: "Текущий пробег",
    max_mileage_label: "Макс.пробег",
    ride_title: "Сколько на этот раз проехали?",
    ride_km_label: "Пробег за поездку (км)",
    bike_label: "Велосипед",
    bike_entity: "Велосипед",
    open: "Открыть",
    no_bikes_option: "Нет велосипедов",
    empty_bikes: "Пока пусто.",
    no_guides: "Гайды не найдены.",
    session_ok: "OK",
    choose_user_first: "Сначала выбери пользователя",
    admin_word: "admin",
    user_word: "user",
    owner_footer: "© 2026 Long Ride. Все права защищены. Разработчик: 0.nabd@proton.me",
    home_stats: "{email} | велосипеды: {bikes} | км: {km}",
    status_ok: "норма",
    status_warning: "внимание",
    status_replace: "заменить",
    delete_bike_confirm: 'Удалить "{name}"?',
    delete_part_confirm: 'Удалить компонент "{name}"?',
    delete_user_confirm: "Удалить пользователя {email}?",
    delete_admin_bike_confirm: "Удалить велосипед {name}?",
    delete_guide_confirm: 'Удалить гайд "{title}"?',
    current_password: "Текущий пароль",
    new_password: "Новый пароль",
    add_mileage: "Добавить пробег",
    theme_dark: "Темная тема",
    theme_light: "Светлая тема",
  },
  kk: {
    brand: "Long Ride",
    subtitle: "Велосипедтер мен қызмет көрсетуді есепке алу",
    login: "Кіру",
    register: "Тіркелу",
    forgot: "Құпиясөзді ұмыттым",
    send_code: "Код жіберу",
    reset_password: "Құпиясөзді қалпына келтіру",
    tab_home: "Басты бет",
    tab_bikes: "Велосипедтер",
    tab_guides: "Нұсқаулықтар",
    tab_assistant: "Көмекші",
    tab_profile: "Профиль",
    tab_admin: "Админ",
    logout: "Шығу",
    home_title: "Басты бет",
    about_title: "Жоба туралы",
    about_text: "Бұл жоба велосипедтер мен қызмет көрсетуді есепке алуға көмектеседі.",
    features_title: "Функционал",
    feature_1: "Велосипедтер мен жүрісті есепке алу",
    feature_2: "Компоненттер және олардың ресурсы",
    feature_3: "Тілдер бойынша қызмет көрсету нұсқаулықтары",
    feature_4: "Профиль, құпиясөз ауыстыру және әкімші панельдері",
    profile_title: "Профиль",
    admin_title: "Әкімші панелі",
    admin_desc: "Сізде әкімші құқықтары бар.",
    list: "Тізім",
    add: "Қосу",
    close: "Жабу",
    save: "Сақтау",
    components: "Компоненттер",
    add_component: "Компонент қосу",
    edit_component: "Компонентті өңдеу",
    cancel: "Болдырмау",
    ask: "Сұрау",
    confirm: "Растау",
    confirm_btn: "Растау",
    change_password: "Құпиясөзді өзгерту",
    assistant_placeholder: "Велосипед қызметі бойынша сұрақ қойыңыз",
    admin_users: "Пайдаланушылар",
    back: "Артқа",
    add_user: "Пайдаланушы қосу",
    edit_user: "Өңдеу",
    user_bikes: "Велосипедтер",
    add_bike: "Велосипед қосу",
    edit_bike: "Өңдеу",
    topic_lang: "Тақырып (ru/en/kk)",
    add_guide: "Нұсқаулық қосу",
    edit_guide: "Өңдеу",
    delete: "Жою",
    email_label: "Email",
    password_label: "Password",
    title_label: "Тақырып",
    content_label: "Мазмұны",
    name_label: "Атауы",
    type_label: "Түрі",
    mileage_label: "Жүріс",
    category_label: "Санат",
    current_mileage_label: "Ағымдағы жүріс",
    max_mileage_label: "Макс.жүріс",
    ride_title: "Бұл жолы қанша жүрдіңіз?",
    ride_km_label: "Сапар жүрісі (км)",
    bike_label: "Велосипед",
    bike_entity: "Велосипед",
    open: "Ашу",
    no_bikes_option: "Велосипед жоқ",
    empty_bikes: "Әзірше бос.",
    no_guides: "Нұсқаулықтар табылмады.",
    session_ok: "OK",
    choose_user_first: "Алдымен пайдаланушыны таңдаңыз",
    admin_word: "admin",
    user_word: "user",
    owner_footer: "© 2026 Long Ride. Барлық құқықтар қорғалған. Әзірлеуші: 0.nabd@proton.me",
    home_stats: "{email} | велосипедтер: {bikes} | км: {km}",
    status_ok: "қалыпты",
    status_warning: "ескерту",
    status_replace: "ауыстыру",
    delete_bike_confirm: '"{name}" жою керек пе?',
    delete_part_confirm: '"{name}" компонентін жою керек пе?',
    delete_user_confirm: "{email} пайдаланушысын жою керек пе?",
    delete_admin_bike_confirm: "{name} велосипедін жою керек пе?",
    delete_guide_confirm: '"{title}" нұсқаулығын жою керек пе?',
    current_password: "Ағымдағы құпиясөз",
    new_password: "Жаңа құпиясөз",
    add_mileage: "Жүріс қосу",
    theme_dark: "Қара тақырып",
    theme_light: "Жарық тақырып",
  },
  en: {
    brand: "Long Ride",
    subtitle: "Bike and maintenance tracking",
    login: "Login",
    register: "Register",
    forgot: "Forgot password",
    send_code: "Send code",
    reset_password: "Reset password",
    tab_home: "Home",
    tab_bikes: "Bikes",
    tab_guides: "Guides",
    tab_assistant: "Assistant",
    tab_profile: "Profile",
    tab_admin: "Admin",
    logout: "Logout",
    home_title: "Home",
    about_title: "About",
    about_text: "This project helps you track bikes and maintenance.",
    features_title: "Features",
    feature_1: "Bike and mileage tracking",
    feature_2: "Components and wear resource",
    feature_3: "Maintenance guides by language",
    feature_4: "Profile, password change, and admin panels",
    profile_title: "Profile",
    admin_title: "Admin panel",
    admin_desc: "You have administrator rights.",
    list: "List",
    add: "Add",
    close: "Close",
    save: "Save",
    components: "Components",
    add_component: "Add component",
    edit_component: "Edit component",
    cancel: "Cancel",
    ask: "Ask",
    confirm: "Confirmation",
    confirm_btn: "Confirm",
    change_password: "Change password",
    assistant_placeholder: "Ask a bike maintenance question",
    admin_users: "Users",
    back: "Back",
    add_user: "Add user",
    edit_user: "Edit",
    user_bikes: "Bikes",
    add_bike: "Add bike",
    edit_bike: "Edit",
    topic_lang: "Topic (ru/en/kk)",
    add_guide: "Add guide",
    edit_guide: "Edit",
    delete: "Delete",
    email_label: "Email",
    password_label: "Password",
    title_label: "Title",
    content_label: "Content",
    name_label: "Name",
    type_label: "Type",
    mileage_label: "Mileage",
    category_label: "Category",
    current_mileage_label: "Current mileage",
    max_mileage_label: "Max mileage",
    ride_title: "How far did you ride this time?",
    ride_km_label: "Ride distance (km)",
    bike_label: "Bike",
    bike_entity: "Bike",
    open: "Open",
    no_bikes_option: "No bikes",
    empty_bikes: "Nothing yet.",
    no_guides: "No guides found.",
    session_ok: "OK",
    choose_user_first: "Select a user first",
    admin_word: "admin",
    user_word: "user",
    owner_footer: "© 2026 Long Ride. All rights reserved. Developer: 0.nabd@proton.me",
    home_stats: "{email} | bikes: {bikes} | km: {km}",
    status_ok: "ok",
    status_warning: "warning",
    status_replace: "replace",
    delete_bike_confirm: 'Delete "{name}"?',
    delete_part_confirm: 'Delete component "{name}"?',
    delete_user_confirm: "Delete user {email}?",
    delete_admin_bike_confirm: "Delete bike {name}?",
    delete_guide_confirm: 'Delete guide "{title}"?',
    current_password: "Current password",
    new_password: "New password",
    add_mileage: "Add mileage",
    theme_dark: "Dark theme",
    theme_light: "Light theme",
  },
};

const state = {
  user: null,
  tab: localStorage.getItem(TAB_KEY) || "home",
  bikes: [],
  selectedBike: null,
  partEditId: null,
  theme: localStorage.getItem(THEME_KEY) || "light",
  lang: localStorage.getItem(LANG_KEY) || "ru",
  adminUsers: [],
  adminSelectedUserId: null,
  adminSelectedUserEmail: "",
  adminBikes: [],
  adminGuides: [],
  activeAdminPage: null,
};

const App = {
  get token() {
    return localStorage.getItem(TOKEN_KEY);
  },
  set token(value) {
    if (value) localStorage.setItem(TOKEN_KEY, value);
    else localStorage.removeItem(TOKEN_KEY);
  },
  async api(path, method = "GET", body = null) {
    const res = await fetch(path, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(App.token ? { Authorization: `Bearer ${App.token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const detail = typeof data?.detail === "string" ? data.detail : `Ошибка ${res.status}`;
      throw new Error(detail);
    }
    return data;
  },
};

const show = (id, visible) => { const el = $(id); if (el) el.classList[visible ? "remove" : "add"]("hidden"); };
const out = (id, message = "") => {
  const el = $(id);
  if (el) el.textContent = message;
};
const t = (key) => I18N[state.lang]?.[key] || I18N.ru[key] || key;
const tf = (key, vars = {}) => {
  let s = t(key);
  Object.entries(vars).forEach(([k, v]) => {
    s = s.replaceAll(`{${k}}`, String(v));
  });
  return s;
};

const applyLang = () => {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val) el.textContent = val;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    const val = t(key);
    if (val) el.placeholder = val;
  });
  ["langSelect", "adminLangSelect", "adminGuidesLangSelect", "authLangSelect"].forEach((id) => {
    const el = $(id);
    if (el) el.value = state.lang;
  });
  ["themeBtn", "adminThemeBtn", "adminGuidesThemeBtn", "authThemeBtn"].forEach((id) => {
    const el = $(id);
    if (!el) return;
    const isDark = state.theme === "dark";
    el.innerHTML = isDark
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
  });
};

const applyTheme = () => {
  document.documentElement.setAttribute("data-theme", state.theme);
  localStorage.setItem(THEME_KEY, state.theme);
  applyLang();
};

const setTab = (tab) => {
  const next = TABS.includes(tab) ? tab : "home";
  if (next === "admin" && !state.user?.is_admin) return;
  state.tab = next;
  localStorage.setItem(TAB_KEY, next);
  TABS.forEach((name) => show(`tab-${name}`, name === next));
  document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.tab === next));
};

const authPayload = () => ({ email: $("email").value.trim(), password: $("password").value });
const bikePayload = () => ({
  name: $("bikeName").value.trim(),
  bike_type: $("bikeType").value.trim(),
  total_mileage_km: Number($("bikeKm").value || 0),
});

const statusMeta = (status) => {
  if (status === "replace") return { icon: "✖", label: t("status_replace") };
  if (status === "warning") return { icon: "!", label: t("status_warning") };
  return { icon: "●", label: t("status_ok") };
};

let confirmResolve = null;
const openConfirm = (text) => {
  $("confirmText").textContent = text;
  show("confirmModal", true);
  return new Promise((resolve) => {
    confirmResolve = resolve;
  });
};
const closeConfirm = (value) => {
  show("confirmModal", false);
  if (!confirmResolve) return;
  const resolve = confirmResolve;
  confirmResolve = null;
  resolve(value);
};

const closePartEdit = () => {
  state.partEditId = null;
  show("partEditPanel", false);
  out("partEditOut");
};

const parseNumberOr = (raw, fallback) => {
  const value = String(raw ?? "").trim();
  if (!value) return fallback;
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

const renderHome = () => {
  const totalKm = state.bikes.reduce((sum, bike) => sum + Number(bike.total_mileage_km || 0), 0);
  $("homeSummary").textContent = tf("home_stats", {
    email: state.user?.email || "",
    bikes: state.bikes.length,
    km: totalKm.toFixed(1),
  });
};

const renderProfile = () => {
  $("profileEmail").textContent = state.user?.email || "";
};

const renderAdminHeader = () => {
  $("adminInfo").textContent = state.user?.is_admin ? state.user.email : "";
  show("adminTabBtn", !!state.user?.is_admin);
};

const renderMileageSelect = () => {
  const select = $("mileageBikeId");
  select.innerHTML = state.bikes.length
    ? state.bikes.map((b) => `<option value="${b.id}">${b.name} (${b.total_mileage_km} км)</option>`).join("")
    : `<option value="">${t("no_bikes_option")}</option>`;
};

const renderBikeList = () => {
  const list = $("bikesList");
  list.innerHTML = state.bikes.length
    ? state.bikes
        .map(
          (b) => `<div class="row"><div><b>${b.name}</b> <span class="muted">${b.bike_type} | ${b.total_mileage_km} км</span></div><div class="actions"><button class="btn btn-primary btn-sm" data-open-bike="${b.id}">${t("open")}</button><button data-del-bike="${b.id}" class="btn btn-danger btn-sm">${t("delete")}</button></div></div>`,
        )
        .join("")
    : `<p class="muted">${t("empty_bikes")}</p>`;
  state.bikes.forEach((bike) => {
    const openBtn = document.querySelector(`[data-open-bike="${bike.id}"]`);
    const delBtn = document.querySelector(`[data-del-bike="${bike.id}"]`);
    if (openBtn) openBtn.onclick = () => openBike(bike.id);
    if (delBtn) {
      delBtn.onclick = async () => {
        const approved = await openConfirm(tf("delete_bike_confirm", { name: bike.name }));
        if (!approved) return;
        await App.api(`/bikes/${bike.id}`, "DELETE");
        if (state.selectedBike?.id === bike.id) closeBike();
        await loadBikes();
      };
    }
  });
};

const renderSelectedBike = async () => {
  if (!state.selectedBike) return show("bikeDetail", false);
  show("bikeDetail", true);
  $("bikeTitle").textContent = `${state.selectedBike.name} (${state.selectedBike.bike_type})`;
  $("bikeMileageInfo").textContent = `${state.selectedBike.total_mileage_km} км`;
  $("editBikeName").value = state.selectedBike.name;
  $("editBikeType").value = state.selectedBike.bike_type;
  $("editBikeKm").value = state.selectedBike.total_mileage_km;
  await loadParts(state.selectedBike.id);
};

const loadBikes = async () => {
  state.bikes = await App.api("/bikes");
  renderBikeList();
  renderMileageSelect();
  renderHome();
};

const openBike = async (bikeId) => {
  state.selectedBike = await App.api(`/bikes/${bikeId}`);
  await renderSelectedBike();
};
const closeBike = () => {
  state.selectedBike = null;
  closePartEdit();
  show("bikeDetail", false);
};

const loadParts = async (bikeId) => {
  const parts = await App.api(`/bikes/${bikeId}/parts`);
  $("partsList").innerHTML = parts
    .map((p) => `<div class="list-item"><div class="list-item-body"><span class="list-item-name">${p.name}${p.category ? ` <span class="text-small" style="font-weight:400">${p.category}</span>` : ''}</span><span class="list-item-meta">${p.current_mileage_km} / ${p.resource_km} км &nbsp;<span class="badge badge-${p.status}">${statusMeta(p.status).icon} ${statusMeta(p.status).label}</span></span></div><div class="list-item-actions"><button class="btn-icon" data-edit-part="${p.id}" title="${t('edit_component')}"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button><button class="btn-icon btn-icon-danger" data-del-part="${p.id}" title="${t('delete')}"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg></button></div></div>`)
    .join("");
  parts.forEach((part) => {
    const editBtn = document.querySelector(`[data-edit-part="${part.id}"]`);
    const delBtn = document.querySelector(`[data-del-part="${part.id}"]`);
    if (editBtn) editBtn.onclick = () => {
      state.partEditId = part.id;
      $("partEditName").value = part.name;
      $("partEditCategory").value = part.category ?? "";
      $("partEditCurrent").value = part.current_mileage_km;
      $("partEditResource").value = part.resource_km;
      show("partEditPanel", true);
      out("partEditOut");
    };
    if (delBtn) delBtn.onclick = async () => {
      const ok = await openConfirm(tf("delete_part_confirm", { name: part.name }));
      if (!ok) return;
      await App.api(`/parts/${part.id}`, "DELETE");
      await openBike(state.selectedBike.id);
    };
  });
};

const loadGuides = async () => {
  const guides = await App.api("/guides");
  const filtered = guides.filter((g) => (g.topic || "").trim().toLowerCase() === state.lang);
  $("guidesList").innerHTML = filtered.length
    ? `<div class="guides-list">${filtered.map((g) => `<div class="card"><b class="guide-title">${g.title}</b><p class="text-muted guide-content">${g.content}</p></div>`).join("")}</div>`
    : `<p class="muted">${t("no_guides")}</p>`;
};

const renderAdminUsers = () => {
  $("adminUsersList").innerHTML = state.adminUsers
    .map((u) => `<div class="row"><div><b>#${u.id} ${u.email}</b> <span class="muted">${u.is_admin ? t("admin_word") : t("user_word")}</span></div><div class="actions"><button class="btn btn-primary btn-sm" data-admin-bikes="${u.id}">${t("user_bikes")}</button><button class="btn btn-outline btn-sm" data-admin-edit-user="${u.id}">${t("edit_user")}</button><button class="btn btn-danger btn-sm" data-admin-del-user="${u.id}">${t("delete")}</button></div></div>`)
    .join("");
  state.adminUsers.forEach((u) => {
    const bikesBtn = document.querySelector(`[data-admin-bikes="${u.id}"]`);
    const editBtn = document.querySelector(`[data-admin-edit-user="${u.id}"]`);
    const delBtn = document.querySelector(`[data-admin-del-user="${u.id}"]`);
    if (bikesBtn) bikesBtn.onclick = async () => {
      state.adminSelectedUserId = u.id;
      state.adminSelectedUserEmail = u.email;
      await loadAdminBikes();
    };
    if (editBtn) editBtn.onclick = () => {
      $("adminEditUserId").value = String(u.id);
      $("adminEditUserEmail").value = u.email;
      $("adminEditUserPassword").value = "";
      show("adminUserEditPanel", true);
    };
    if (delBtn) delBtn.onclick = async () => {
      const ok = await openConfirm(tf("delete_user_confirm", { email: u.email }));
      if (!ok) return;
      await App.api(`/auth/admin/users/${u.id}`, "DELETE");
      await loadAdminUsers();
      if (state.adminSelectedUserId === u.id) {
        state.adminSelectedUserId = null;
        state.adminSelectedUserEmail = "";
        state.adminBikes = [];
        renderAdminBikes();
      }
    };
  });
};

const renderAdminBikes = () => {
  $("adminBikesTitle").textContent = state.adminSelectedUserEmail ? `${state.adminSelectedUserEmail} (#${state.adminSelectedUserId})` : "";
  $("adminBikesList").innerHTML = state.adminBikes
    .map((b) => `<div class="row"><div><b>#${b.id} ${b.name}</b><span class="muted">${b.bike_type} | ${b.total_mileage_km} км</span></div><div class="actions"><button class="btn btn-outline btn-sm" data-admin-edit-bike="${b.id}">${t("edit_bike")}</button><button class="btn btn-danger btn-sm" data-admin-del-bike="${b.id}">${t("delete")}</button></div></div>`)
    .join("");
  state.adminBikes.forEach((b) => {
    const editBtn = document.querySelector(`[data-admin-edit-bike="${b.id}"]`);
    const delBtn = document.querySelector(`[data-admin-del-bike="${b.id}"]`);
    if (editBtn) editBtn.onclick = () => {
      $("adminEditBikeId").value = String(b.id);
      $("adminEditBikeName").value = b.name;
      $("adminEditBikeType").value = b.bike_type;
      $("adminEditBikeKm").value = b.total_mileage_km;
      show("adminBikeEditPanel", true);
    };
    if (delBtn) delBtn.onclick = async () => {
      const ok = await openConfirm(tf("delete_admin_bike_confirm", { name: b.name }));
      if (!ok) return;
      await App.api(`/auth/admin/bikes/${b.id}`, "DELETE");
      await loadAdminBikes();
    };
  });
};

const renderAdminGuides = () => {
  const guides = state.adminGuides.filter((g) => (g.topic || "").trim().toLowerCase() === state.lang);
  $("adminGuidesList").innerHTML = guides
    .map((g) => `<div class="row"><div><b>${g.title}</b><span class="muted">${g.topic}</span><div>${g.content}</div></div><div class="actions"><button class="btn btn-outline btn-sm" data-admin-edit-guide="${g.id}">${t("edit_guide")}</button><button class="btn btn-danger btn-sm" data-admin-del-guide="${g.id}">${t("delete")}</button></div></div>`)
    .join("");
  guides.forEach((g) => {
    const editBtn = document.querySelector(`[data-admin-edit-guide="${g.id}"]`);
    const delBtn = document.querySelector(`[data-admin-del-guide="${g.id}"]`);
    if (editBtn) editBtn.onclick = () => {
      $("adminEditGuideId").value = String(g.id);
      $("adminEditGuideTitle").value = g.title;
      $("adminEditGuideTopic").value = g.topic;
      $("adminEditGuideContent").value = g.content;
      show("adminGuideEditPanel", true);
    };
    if (delBtn) delBtn.onclick = async () => {
      const ok = await openConfirm(tf("delete_guide_confirm", { title: g.title }));
      if (!ok) return;
      await App.api(`/guides/admin/${g.id}`, "DELETE");
      await loadAdminGuides();
      await loadGuides();
    };
  });
};

const loadAdminUsers = async () => {
  state.adminUsers = await App.api("/auth/admin/users");
  renderAdminUsers();
};
const loadAdminBikes = async () => {
  if (!state.adminSelectedUserId) {
    state.adminBikes = [];
    return renderAdminBikes();
  }
  state.adminBikes = await App.api(`/auth/admin/users/${state.adminSelectedUserId}/bikes`);
  renderAdminBikes();
};
const loadAdminGuides = async () => {
  state.adminGuides = await App.api("/guides/admin");
  renderAdminGuides();
};

const renderAppShell = async () => {
  if (!App.token) {
    state.user = null;
    show("authView", true);
    show("appView", false);
    show("adminUsersPage", false);
    show("adminGuidesPage", false);
    show("mainFooter", true);
    out("authOut");
    return;
  }
  try {
    state.user = await App.api("/auth/me");
  } catch {
    App.token = null;
    state.user = null;
    show("authView", true);
    show("appView", false);
    show("adminUsersPage", false);
    show("adminGuidesPage", false);
    show("mainFooter", true);
    return;
  }
  $("userInfo").textContent = state.user.email;
  show("authView", false);
  show("appView", true);
  show("mainFooter", true);
  renderAdminHeader();
  renderProfile();
  setTab(state.user.is_admin ? state.tab : state.tab === "admin" ? "home" : state.tab);
  await Promise.all([loadBikes(), loadGuides()]);
};

$("loginBtn").onclick = async () => {
  try {
    const result = await App.api("/auth/login", "POST", authPayload());
    App.token = result.token;
    out("authOut");
    await renderAppShell();
  } catch (e) {
    out("authOut", String(e.message || e));
  }
};
$("registerBtn").onclick = async () => {
  try {
    const result = await App.api("/auth/register", "POST", authPayload());
    App.token = result.token;
    out("authOut");
    await renderAppShell();
  } catch (e) {
    out("authOut", String(e.message || e));
  }
};
$("forgotBtn").onclick = () => show("forgotPanel", $("forgotPanel").classList.contains("hidden"));
$("requestCodeBtn").onclick = async () => {
  try {
    const email = $("forgotEmail").value.trim() || $("email").value.trim();
    const result = await App.api("/auth/forgot-password/request", "POST", { email });
    out("forgotOut", result.code ? `code: ${result.code}` : "OK");
  } catch (e) {
    out("forgotOut", String(e.message || e));
  }
};
$("resetPasswordBtn").onclick = async () => {
  try {
    await App.api("/auth/forgot-password/confirm", "POST", {
      email: $("forgotEmail").value.trim() || $("email").value.trim(),
      code: $("resetCode").value.trim(),
      new_password: $("newPassword").value,
    });
    out("forgotOut", t("session_ok"));
  } catch (e) {
    out("forgotOut", String(e.message || e));
  }
};

$("logoutBtn").onclick = async () => {
  App.token = null;
  closeBike();
  $("chatArea").innerHTML = "";
  await renderAppShell();
};

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.onclick = async () => {
    const nextTab = btn.dataset.tab || "home";
    setTab(nextTab);
    if (nextTab === "guides") await loadGuides();
    if (nextTab === "bikes") await loadBikes();
    if (nextTab === "profile") renderProfile();
  };
});

$("toggleCreateBikeBtn").onclick = () => show("createBikePanel", $("createBikePanel").classList.contains("hidden"));
$("closeCreateBikeBtn").onclick = () => show("createBikePanel", false);

$("openAdminUsersPageBtn").onclick = async () => {
  if (!state.user?.is_admin) return;
  state.activeAdminPage = "users";
  show("appView", false);
  show("adminGuidesPage", false);
  show("adminUsersPage", true);
  show("mainFooter", false);
  await loadAdminUsers();
};
$("closeAdminUsersPageBtn").onclick = () => {
  state.activeAdminPage = null;
  show("adminUsersPage", false);
  show("appView", true);
  show("mainFooter", true);
};

$("openAdminGuidesPageBtn").onclick = async () => {
  if (!state.user?.is_admin) return;
  state.activeAdminPage = "guides";
  show("appView", false);
  show("adminUsersPage", false);
  show("adminGuidesPage", true);
  show("mainFooter", false);
  await loadAdminGuides();
};
$("closeAdminGuidesPageBtn").onclick = () => {
  state.activeAdminPage = null;
  show("adminGuidesPage", false);
  show("appView", true);
  show("mainFooter", true);
};

$("addRideBtn").onclick = async () => {
  try {
    const bikeId = Number($("mileageBikeId").value || 0);
    const km = Number($("rideKm").value || 0);
    if (!bikeId || km <= 0) return;
    await App.api(`/bikes/${bikeId}/add-mileage`, "POST", { km });
    $("rideKm").value = "";
    await loadBikes();
    if (state.selectedBike?.id === bikeId) await openBike(bikeId);
  } catch (e) {
    out("bikeOut", String(e.message || e));
  }
};

$("createBikeBtn").onclick = async () => {
  try {
    const payload = bikePayload();
    if (!payload.name || !payload.bike_type) return;
    await App.api("/bikes", "POST", payload);
    $("bikeName").value = "";
    $("bikeType").value = "";
    $("bikeKm").value = "0";
    show("createBikePanel", false);
    await loadBikes();
  } catch (e) {
    out("bikeOut", String(e.message || e));
  }
};
$("saveBikeBtn").onclick = async () => {
  if (!state.selectedBike) return;
  try {
    const payload = {
      name: $("editBikeName").value.trim(),
      bike_type: $("editBikeType").value.trim(),
      total_mileage_km: Number($("editBikeKm").value || 0),
    };
    if (!payload.name || !payload.bike_type || payload.total_mileage_km < 0) return;
    state.selectedBike = await App.api(`/bikes/${state.selectedBike.id}`, "PATCH", payload);
    await loadBikes();
    await renderSelectedBike();
  } catch (e) {
    out("bikeOut", String(e.message || e));
  }
};

$("createPartBtn").onclick = async () => {
  if (!state.selectedBike) return;
  try {
    const payload = {
      name: $("partName").value.trim(),
      category: $("partCategory").value.trim() || null,
      current_mileage_km: parseNumberOr($("partCurrent").value, 0),
      resource_km: parseNumberOr($("partResource").value, 1000),
    };
    if (!payload.name || payload.resource_km <= 0) return;
    await App.api(`/bikes/${state.selectedBike.id}/parts`, "POST", payload);
    $("partName").value = "";
    $("partCategory").value = "";
    $("partCurrent").value = "0";
    $("partResource").value = "";
    await renderSelectedBike();
  } catch (e) {
    out("partOut", String(e.message || e));
  }
};

$("closeBikeBtn").onclick = closeBike;
$("savePartBtn").onclick = async () => {
  if (!state.selectedBike || !state.partEditId) return;
  try {
    const payload = {
      name: $("partEditName").value.trim(),
      category: $("partEditCategory").value.trim() || null,
      current_mileage_km: Number($("partEditCurrent").value || 0),
      resource_km: Number($("partEditResource").value || 0),
    };
    if (!payload.name || payload.resource_km <= 0) return;
    await App.api(`/parts/${state.partEditId}`, "PATCH", payload);
    closePartEdit();
    await openBike(state.selectedBike.id);
  } catch (e) {
    out("partEditOut", String(e.message || e));
  }
};
$("cancelPartEditBtn").onclick = closePartEdit;

$("askBtn").onclick = async () => {
  try {
    const question = $("question").value.trim();
    if (!question) return;
    const chatArea = $("chatArea");
    const qDiv = document.createElement("div");
    qDiv.className = "chat-msg chat-msg-user";
    qDiv.innerHTML = `<div class="chat-bubble">${question}</div>`;
    chatArea.appendChild(qDiv);
    $("question").value = "";
    const data = await App.api("/assistant/ask", "POST", { question });
    const aDiv = document.createElement("div");
    aDiv.className = "chat-msg chat-msg-ai";
    aDiv.innerHTML = `<div class="chat-bubble">${data.answer}</div>`;
    chatArea.appendChild(aDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
  } catch (e) {
    const chatArea = $("chatArea");
    const eDiv = document.createElement("div");
    eDiv.className = "chat-msg chat-msg-ai";
    eDiv.innerHTML = `<div class="chat-bubble">${String(e.message || e)}</div>`;
    chatArea.appendChild(eDiv);
  }
};

$("changePasswordBtn").onclick = async () => {
  try {
    await App.api("/auth/change-password", "POST", {
      current_password: $("currentPassword").value,
      new_password: $("profileNewPassword").value,
    });
    $("currentPassword").value = "";
    $("profileNewPassword").value = "";
    out("profileOut", "OK");
  } catch (e) {
    out("profileOut", String(e.message || e));
  }
};

$("adminCreateUserBtn").onclick = async () => {
  try {
    await App.api("/auth/admin/users", "POST", {
      email: $("adminUserEmail").value.trim(),
      password: $("adminUserPassword").value,
    });
    $("adminUserEmail").value = "";
    $("adminUserPassword").value = "";
    await loadAdminUsers();
  } catch (e) {
    out("adminOut", String(e.message || e));
  }
};
$("adminSaveUserBtn").onclick = async () => {
  try {
    const id = Number($("adminEditUserId").value || 0);
    if (!id) return;
    await App.api(`/auth/admin/users/${id}`, "PATCH", {
      email: $("adminEditUserEmail").value.trim(),
      password: $("adminEditUserPassword").value,
    });
    show("adminUserEditPanel", false);
    await loadAdminUsers();
  } catch (e) {
    out("adminOut", String(e.message || e));
  }
};
$("adminCreateBikeBtn").onclick = async () => {
  try {
    if (!state.adminSelectedUserId) return out("adminOut", t("choose_user_first"));
    await App.api(`/auth/admin/users/${state.adminSelectedUserId}/bikes`, "POST", {
      name: $("adminBikeName").value.trim(),
      bike_type: $("adminBikeType").value.trim(),
      total_mileage_km: Number($("adminBikeKm").value || 0),
    });
    $("adminBikeName").value = "";
    $("adminBikeType").value = "";
    $("adminBikeKm").value = "";
    await loadAdminBikes();
  } catch (e) {
    out("adminOut", String(e.message || e));
  }
};
$("adminSaveBikeBtn").onclick = async () => {
  try {
    const id = Number($("adminEditBikeId").value || 0);
    if (!id) return;
    await App.api(`/auth/admin/bikes/${id}`, "PATCH", {
      name: $("adminEditBikeName").value.trim(),
      bike_type: $("adminEditBikeType").value.trim(),
      total_mileage_km: Number($("adminEditBikeKm").value || 0),
    });
    show("adminBikeEditPanel", false);
    await loadAdminBikes();
  } catch (e) {
    out("adminOut", String(e.message || e));
  }
};

$("adminCreateGuideBtn").onclick = async () => {
  try {
    const payload = {
      title: $("adminGuideTitle").value.trim(),
      topic: $("adminGuideTopic").value.trim().toLowerCase(),
      content: $("adminGuideContent").value.trim(),
    };
    if (!payload.title || !payload.topic || !payload.content) return;
    await App.api("/guides/admin", "POST", payload);
    $("adminGuideTitle").value = "";
    $("adminGuideTopic").value = "";
    $("adminGuideContent").value = "";
    await loadAdminGuides();
    await loadGuides();
  } catch (e) {
    out("adminOut", String(e.message || e));
  }
};
$("adminSaveGuideBtn").onclick = async () => {
  try {
    const id = Number($("adminEditGuideId").value || 0);
    if (!id) return;
    await App.api(`/guides/admin/${id}`, "PATCH", {
      title: $("adminEditGuideTitle").value.trim(),
      topic: $("adminEditGuideTopic").value.trim().toLowerCase(),
      content: $("adminEditGuideContent").value.trim(),
    });
    show("adminGuideEditPanel", false);
    await loadAdminGuides();
    await loadGuides();
  } catch (e) {
    out("adminOut", String(e.message || e));
  }
};

$("confirmOkBtn").onclick = () => closeConfirm(true);
$("confirmCancelBtn").onclick = () => closeConfirm(false);
$("confirmModal").onclick = (e) => {
  if (e.target.id === "confirmModal") closeConfirm(false);
};

["themeBtn", "adminThemeBtn", "adminGuidesThemeBtn", "authThemeBtn"].forEach((id) => {
  const el = $(id);
  if (el) el.onclick = () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    applyTheme();
  };
});
["langSelect", "adminLangSelect", "adminGuidesLangSelect", "authLangSelect"].forEach((id) => {
  const el = $(id);
  if (el) el.onchange = async (e) => {
    state.lang = e.target.value;
    localStorage.setItem(LANG_KEY, state.lang);
    applyLang();
    await loadGuides();
    if (state.activeAdminPage === "guides") renderAdminGuides();
  };
});

applyTheme();
applyLang();
renderAppShell();
