export type DictionaryKey =
  'welcome' |
  'yes' |
  'no' |
  'some' |
  'cancel' |
  'continue' |
  'generic_error' |

  // AUTH
  'auth_login' |
  'auth_logout' |
  'auth_register' |
  'auth_to_login' |
  'auth_to_register' |
  'auth_phone_number' |
  'auth_first_name' |
  'auth_last_name' |
  'auth_number_error' |

  // HOME
  'tabs_wallet' |
  'tabs_market' |
  'tabs_events' |
  'home_lira_shapira_currency_you_have' |
  'home_lira_shapira_currency_shorthand' |
  'dashboard_dashboard_buttons_send' |
  'dashboard_dashboard_buttons_request' |
  'dashboard_dashboard_buttons_scan' |
  'home_transactions_title' |
  'transactions_list_no_activities' |
  'transactions_list_received_from' |
  'transactions_list_sent_to' |
  'transactions_list_compost_deposit' |
  'transaction_request_to' |
  'dashboard_You_have_prevented_kilos_of_garbage'|

  // DEPOSIT
  'deposit' |
  'deposit_title' |
  'deposit_modal_amount' |
  'deposit_modal_stand_manager' |
  'deposit_modal_you_earn' |
  'deposit_modal_agree_checkbox' |
  'deposit_modal_button_finish' |
  'deposit_modal_button_correct' |
  'deposit_form_bin_status' |
  'deposit_form_bin_status_full' |
  'deposit_form_bin_status_empty' |
  'deposit_form_bin_status_smell' |
  'deposit_form_dry_matter' |
  'deposit_form_skip' |
  'deposit_form_send' |
  'deposit_form_notes' |
  'deposit_form_amount' |
  'deposit_form_kilogram' |

  // COMPOST STANDS
  'location' |
  'deposit_compost_stand_blank' |
  'deposit_compost_stand_cafe_shapira' |
  'deposit_compost_stand_masalant' |
  'deposit_compost_stand_hizkiyahu_hamelech' |
  'deposit_compost_stand_kerem_hazeitim' |
  'deposit_compost_stand_park_sonya' |
  'deposit_compost_stand_hakaveret' |
  'deposit_compost_stand_food_forest_park_hahurshot' |
  'deposit_compost_stand_tel_hubez' |
  'deposit_compost_stand_ginat_hahistadrut' |
  'deposit_compost_stand_alexander_zaid' |
  'deposit_compost_stand_shiffer' |
  'deposit_compost_stand_de_modina' |
  'deposit_compost_stand_burma' |

  'compost_report_title' |
  'compost_report_bin_full' |
  'compost_report_bin_smells' |
  'compost_report_missing_dry_matter' |
  'compost_report_missing_bad_bugs' |
  'compost_report_missing_scales' |
  'compost_report_missing_clean_and_tidy' |

  // SEND
  'send_search_title' |
  'send_search_searching_for' |
  'send_search_placeholder' |
  'sendamount_how_much' |
  'sendamount_why' |
  'sendamount_continue' |
  'sendamount_back' |
  'send_search_no_results' |
  'send_search_no_results_send_to_number' |
  'sendamount_validate_amount' |
  'sendamount_not_enough_funds'

  // REQUEST
  'request_search_title' |
  'request_card_request_from' |
  'request_card_accept' |
  'request_card_refuse' |
  'request_how_much' |

  // EVENTS
  'events_list_no_events' |
  'ls_event_item_joining_as' |
  'ls_event_item_people_details_attendees' |
  'ls_event_item_people_details_vendors' |
  'ls_event_item_rsvp' |
  'ls_event_item_seller' |
  'ls_event_item_attendee' |
  'ls_event_item_volunteer' |
  'ls_event_item_not_attending' |
  'seller_options_add_item' |
  'seller_options_finish' |

  'month_january' |
  'month_february' |
  'month_march' |
  'month_april' |
  'month_may' |
  'month_june' |
  'month_july' |
  'month_august' |
  'month_september' |
  'month_october' |
  'month_november' |
  'month_december' |
  'month_january_MMM' |
  'month_february_MMM' |
  'month_march_MMM' |
  'month_april_MMM' |
  'month_may_MMM' |
  'month_june_MMM' |
  'month_july_MMM' |
  'month_august_MMM' |
  'month_september_MMM' |
  'month_october_MMM' |
  'month_november_MMM' |
  'month_december_MMM' |
  'day_sunday' |
  'day_monday' |
  'day_tuesday' |
  'day_wednesday' |
  'day_thursday' |
  'day_friday' |
  'day_saturday' |
  'main_title' |
  'secondary_main_title'


export type Dictionary = Record<DictionaryKey, string>

export type DictionaryWord = keyof Dictionary;
