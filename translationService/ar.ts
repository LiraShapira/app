import { Dictionary } from "../types/translation";

const arDictionary: Dictionary = {
  welcome: 'مرحبًا بك',
  yes: 'نعم',
  no: 'لا',
  some: 'بعض',
  cancel: 'إلغاء',
  continue: 'متابعة',
  dashboard_greeting_message: 'مرحبًا {{name}}',
  // HOME
  tabs_wallet: 'محفظة',

  auth_login: 'تسجيل الدخول',
  auth_logout: 'الخروج؟',
  auth_register: 'التسجيل',
  auth_to_login: 'تسجيل الدخول',
  auth_to_register: 'التسجيل',
  auth_phone_number: 'رقم الهاتف',
  auth_first_name: 'الاسم الأول',
  auth_last_name: 'اسم العائلة',
  tabs_market: 'السوق',
  tabs_events: 'الفعاليات',
  home_lira_shapira_currency_you_have: 'كم لديك؟',
  home_lira_shapira_currency_shorthand: 'ل.ش',
  dashboard_dashboard_buttons_send: 'تحويل',
  dashboard_dashboard_buttons_request: 'طلب',
  dashboard_dashboard_buttons_scan: 'مسح',
  home_transactions_title: 'أنشطتي',
  transactions_list_no_activities: 'لا توجد أنشطة',
  transactions_list_received_from: 'تم الاستلام من',
  transactions_list_sent_to: 'تم الإرسال إلى',
  transactions_list_compost_deposit: 'إيداع السماد',
  dashboard_You_have_prevented_kilos_of_garbage:'لقد منعت حتى الآن دفن {{kilos}} كيلوغرام من القمامة في مكب النفايات',

  // DEPOSIT
  deposit: 'إيداع',
  deposit_title: 'كم ترغب في إيداعه؟',
  deposit_modal_amount: 'تم إيداع %{amount} كغ من الفضلات العضوية',
  deposit_modal_stand_manager: 'يُعطى لمسؤولك 10%',
  deposit_modal_you_earn: 'لقد كسبت %{netAmount}',
  deposit_modal_button_correct: 'تصحيح',
  deposit_modal_button_finish: 'انتهيت',
  deposit_modal_agree_checkbox: 'أقر بأن البيانات حقيقية',
  deposit_form_bin_status: 'حالة صندوق السماد',
  deposit_form_bin_status_full: 'ممتلئ',
  deposit_form_bin_status_empty: 'فارغ',
  deposit_form_dry_matter: 'مادة جافة',
  deposit_form_bin_status_smell: 'رائحة كريهة',
  deposit_form_skip: 'تخطي',
  deposit_form_send: 'إرسال',
  deposit_form_notes: 'ملاحظات / توجيهات',
  deposit_form_amount: 'الكمية',
  deposit_form_kilogram: 'كغ',

  location: 'اختر موقعًا من القائمة المنسدلة',
  deposit_compost_stand_blank: '',
  deposit_compost_stand_cafe_shapira: 'مقهى شفيرا',
  deposit_compost_stand_masalant: 'مركز المجتمع (27 إسرائيل مسالانت)',
  deposit_compost_stand_hizkiyahu_hamelech: 'حزقيا الملك',
  deposit_compost_stand_kerem_hazeitim: 'كرم الزيتون',
  deposit_compost_stand_park_sonya: 'حديقة سونيا',
  deposit_compost_stand_hakaveret: 'الخنفساء',
  deposit_compost_stand_food_forest_park_hahurshot: 'غابة الطعام - حديقة الحروشوت',
  deposit_compost_stand_tel_hubez: 'تل حوبيز',
  deposit_compost_stand_ginat_hahistadrut: 'حديقة الاستقلال',
  deposit_compost_stand_alexander_zaid: 'حديقة ألكسندر زايد',
  deposit_compost_stand_de_modina: 'حديقة دي مودينا',
  deposit_compost_stand_shiffer: 'شفيرة في شارع شيفر',
  deposit_compost_stand_burma: 'غابة بورما',

  compost_report_title: 'ما هي حالة صندوق السماد؟',
  compost_report_bin_full: 'صندوق السماد ممتلئ',
  compost_report_bin_smells: 'هل هناك رائحة كريهة؟',
  compost_report_missing_dry_matter: 'ناقص المادة الجافة',
  compost_report_missing_bad_bugs: 'وجود حشرات ضارة',
  compost_report_missing_scales: 'ناقص الموازين',
  compost_report_missing_clean_and_tidy: 'نظيف ومرتب',
  transaction_request_to: 'طلب إلى',

  // SEND
  send_search_title: 'إلى من تريد التحويل؟',
  send_search_searching_for: 'البحث عن',
  send_search_placeholder: 'أدخل الاسم أو رقم الهاتف',
  sendamount_how_much: 'كم ترغب في التحويل؟',
  sendamount_why: 'لماذا؟',
  sendamount_continue: 'متابعة',
  sendamount_back: 'العودة إلى البحث',
  send_search_no_results: 'لا توجد نتائج لـ \'%{search}\'',
  send_search_no_results_send_to_number: '، أرسل إلى \'%{number}\'',
  sendamount_validate_amount: 'الرجاء إدخال رقم بين 1 - 99',
  sendamount_not_enough_funds: 'لا يوجد أموال كافية  ',


  // EVENTS
  // TODO
  seller_options_add_item: '+ להוסיף פריט',
  seller_options_finish: 'סיימתי',

  // REQUEST
  request_how_much: 'كم تريد طلبه؟',
  request_search_title: 'من مَن تريد الطلب؟',
  request_card_request_from: '%{name} يطلب منك',
  request_card_accept: 'قم بالتحويل',
  request_card_refuse: 'رفض',

  // MONTH UTILS
  month_january: 'يناير',
  month_february: 'فبراير',
  month_march: 'مارس',
  month_april: 'أبريل',
  month_may: 'مايو',
  month_june: 'يونيو',
  month_july: 'يوليو',
  month_august: 'أغسطس',
  month_september: 'سبتمبر',
  month_october: 'أكتوبر',
  month_november: 'نوفمبر',
  month_december: 'ديسمبر',
  month_january_MMM: 'يناير',
  month_february_MMM: 'فبراير',
  month_march_MMM: 'مارس',
  month_april_MMM: 'أبريل',
  month_may_MMM: 'مايو',
  month_june_MMM: 'يونيو',
  month_july_MMM: 'يوليو',
  month_august_MMM: 'أغسطس',
  month_september_MMM: 'سبتمبر',
  month_october_MMM: 'أكتوبر',
  month_november_MMM: 'نوفمبر',
  month_december_MMM: 'ديسمبر',

  main_title: 'ليرة شفيرا - عملة محلية',
  secondary_main_title: 'قم بتحويل قمامتك إلى أموال في شفيرا',
}

export default arDictionary;
