import { Dictionary } from "../types/translation";

const enDictionary: Dictionary = {
  welcome: 'Hello',
  yes: 'yes',
  no: 'no',
  some: 'some',
  cancel: 'Cancel',
  continue: 'Continue',
  generic_error: 'We are having problems. Please try again later',
  dashboard_greeting_message: 'hello {{name}}',
  // AUTH
  auth_login: 'Login',
  auth_logout: 'Logout?',
  auth_register: 'Register',
  auth_to_login: 'To Login',
  auth_to_register: 'To Register',
  auth_phone_number: 'Phone Number',
  auth_first_name: 'First Name',
  auth_last_name: 'Last Name',
  auth_number_error: 'Number not valid',

  // HOME
  tabs_wallet: 'wallet',
  tabs_market: 'market',
  tabs_events: 'events',
  home_lira_shapira_currency_you_have: 'You have:',
  home_lira_shapira_currency_shorthand: 'L"S',
  dashboard_dashboard_buttons_send: 'send',
  dashboard_dashboard_buttons_request: 'request',
  dashboard_dashboard_buttons_scan: 'scan',
  home_transactions_title: 'My Activities',
  transactions_list_no_activities: 'No transactions to display',
  transactions_list_received_from: 'Received from ',
  transactions_list_sent_to: 'Sent to ',
  transactions_list_compost_deposit: 'compost deposit',
  transaction_request_to: 'Request to ',
  dashboard_You_have_prevented_kilos_of_garbage:'You have prevented {{kilos}} kilos of garbage',
  // DEPOSIT
  deposit: 'Deposit',
  deposit_title: 'How much?',
  deposit_modal_amount: 'You deposited %{amount}kg of organic waste',
  deposit_modal_stand_manager: '10% goes to the stand manager.',
  deposit_modal_you_earn: 'You earned %{netAmount}',
  deposit_modal_button_correct: 'correct amount',
  deposit_modal_button_finish: 'finish',
  deposit_modal_agree_checkbox: 'I guarantee my deposit is real',
  deposit_form_bin_status: 'Bin status',
  deposit_form_bin_status_full: 'full',
  deposit_form_bin_status_empty: 'empty',
  deposit_form_bin_status_smell: 'Does the compost smell bad?',
  deposit_form_dry_matter: 'Dry matter?',
  deposit_form_skip: 'Skip',
  deposit_form_send: 'Send',
  deposit_form_notes: 'Notes',
  deposit_form_amount: 'Amount',
  deposit_form_kilogram: 'kg',

  compost_report_title: 'What\'s the status',
  compost_report_bin_full: 'compost bin full',
  compost_report_bin_smells: 'compost smells',
  compost_report_missing_dry_matter: 'missing dry matter',
  compost_report_missing_bad_bugs: 'bad bugs',
  compost_report_missing_scales: 'missing scales',
  compost_report_missing_clean_and_tidy: 'clean and tidy',

  // COMPOST STANDS
  location: 'Select location from drop down',
  deposit_compost_stand_blank: '',
  deposit_compost_stand_cafe_shapira: 'Cafe Shapira',
  deposit_compost_stand_masalant: 'Masalant 27',
  deposit_compost_stand_hizkiyahu_hamelech: 'Hizkiyahu hamelech',
  deposit_compost_stand_kerem_hazeitim: 'Kerem ha\'zeitim',
  deposit_compost_stand_park_sonya: 'Park Sonya',
  deposit_compost_stand_hakaveret: 'Ha\'kaveret',
  deposit_compost_stand_food_forest_park_hahurshot: 'Food forest park hahurshot',
  deposit_compost_stand_tel_hubez: 'Tel hubez',
  deposit_compost_stand_ginat_hahistadrut: 'Ginat Ha\'histadrut',
  deposit_compost_stand_alexander_zaid: 'Alexander zaid',
  deposit_compost_stand_shiffer: 'Shiffer st',
  deposit_compost_stand_de_modina: 'de Modina',
  deposit_compost_stand_burma: 'Burma',

  // SEND
  send_search_title: 'Who to send to?',
  send_search_searching_for: 'searching for: ',
  send_search_placeholder: 'Enter a name or phone number',
  sendamount_how_much: 'How much?',
  sendamount_why: 'why?',
  // sendamount_amount: 'amount (kg)',
  sendamount_continue: 'continue',
  sendamount_back: 'Back',
  send_search_no_results: 'No results found for \'%{search}\'',
  send_search_no_results_send_to_number: 'Send to \'%{number}\'',
  sendamount_validate_amount: 'Please input a number between 1 - 99',
  sendamount_not_enough_funds: 'Not enough funds',

  // REQUEST
  request_how_much: 'How much?',
  request_search_title: 'Who to request from?',
  request_card_request_from: 'Request from %{name}',
  request_card_accept: 'accept',
  request_card_refuse: 'refuse',

  // EVENTS
  events_list_no_events: 'no upcoming events',
  ls_event_item_people_details_attendees: ' friends joining',
  ls_event_item_people_details_vendors: ' friends selling: ',
  ls_event_item_rsvp: 'RSVP',
  ls_event_item_seller: 'seller',
  ls_event_item_attendee: 'attendee',
  ls_event_item_volunteer: 'volunteer',
  ls_event_item_not_attending: 'not attending',
  ls_event_item_joining_as: 'Joining as...',
  seller_options_add_item: '+ Add Item',
  seller_options_finish: 'Finish',

  // MONTH UTILS
  month_january: 'january',
  month_february: 'february',
  month_march: 'march',
  month_april: 'april',
  month_may: 'may',
  month_june: 'june',
  month_july: 'july',
  month_august: 'august',
  month_september: 'september',
  month_october: 'october',
  month_november: 'november',
  month_december: 'december',

  month_january_MMM: 'jan',
  month_february_MMM: 'feb',
  month_march_MMM: 'mar',
  month_april_MMM: 'apr',
  month_may_MMM: 'may',
  month_june_MMM: 'jun',
  month_july_MMM: 'jul',
  month_august_MMM: 'aug',
  month_september_MMM: 'sep',
  month_october_MMM: 'oct',
  month_november_MMM: 'nov',
  month_december_MMM: 'dec',

  // DAYS
  day_sunday: 'sunday',
  day_monday: 'monday',
  day_tuesday: 'tuesday',
  day_wednesday: 'wednesday',
  day_thursday: 'thursday',
  day_friday: 'friday',
  day_saturday: 'saturday',

  main_title: 'Lira Shapira Green Local Currency',
  secondary_main_title: 'Garbage Worth Money In Shapira',
}

export default enDictionary;
