// import { Contact } from 'expo-contacts';
// import { useAppDispatch, useAppSelector } from '../../hooks';
// import {
//   saveTransaction,
//   selectAmount,
//   selectChosenContact,
//   selectReason,
//   setReason,
// } from '../../store/sendFormSlice';
// import {
//   addUserTransaction,
//   getUserIdByNumber,
//   selectUser,
//   selectUserId,
//   setIsUserLoading,
//   setUserBalance,
// } from '../../store/userSlice';
// import { User } from '../../types/User';
// import { setIsModalVisible, setModalText } from '../../store/appStateSlice';
// import i18n from '../../translationService';
// import { parsePhoneNumber } from 'libphonenumber-js';
// import { router, useLocalSearchParams } from 'expo-router';
// import { Category } from '../../types/Transaction';
// import { setAmount } from '../../store/sendFormSlice';

// export const onPressSend = async () => {
//   const currentUser = useAppSelector<User>(selectUser);
//   const chosenContact = useAppSelector<Contact>(selectChosenContact);
//   const amount = useAppSelector<number>(selectAmount);
//   const reason = useAppSelector<string>(selectReason);
//   const currentUserId = useAppSelector<string>(selectUserId);
//   const dispatch = useAppDispatch();
//   const params = useLocalSearchParams();
//   const { isRequest } = params;

//   if (!chosenContact?.phoneNumbers) return;

//   // phone number for recipient in send flow and 'purchaser' (aka requestee) in request flow
//   const phoneNumber = chosenContact?.phoneNumbers[0].number;

//   if (!phoneNumber) return;

//   if (
//     currentUser?.accountBalance <= 0 ||
//     amount > currentUser?.accountBalance
//   ) {
//     dispatch(setModalText(i18n.t('sendamount_not_enough_funds')));
//     dispatch(setIsModalVisible(true));

//     return;
//   }
//   dispatch(setIsUserLoading(true));

//   try {
//     const parsedPhoneNumber = parsePhoneNumber(phoneNumber, 'US')
//       .nationalNumber as string;
//     if (parsedPhoneNumber === currentUser.phoneNumber) {
//       throw new Error('Cannot send or make request to yourself');
//     }
//     const { data: getUserIdByNumberData } = await dispatch(
//       getUserIdByNumber(parsedPhoneNumber)
//     ).unwrap();
//     const requesteeId = getUserIdByNumberData.userId;
//     const newTransaction = {
//       recipientPhoneNumber: isRequest
//         ? currentUser.phoneNumber
//         : parsedPhoneNumber,
//       amount: amount,
//       category: Category.MISC,
//       reason: reason,
//       // in a request the purchaserid is the id of person the request is sent to and is therefore not known
//       purchaserId: isRequest ? requesteeId : currentUserId,
//       ...(isRequest && { isRequest: true }),
//     };

//     const { data: transaction } = await dispatch(
//       saveTransaction(newTransaction)
//     ).unwrap();
//     dispatch(addUserTransaction(transaction));
//     if (!isRequest) {
//       const updatedBalance = currentUser.accountBalance - amount;
//       dispatch(setUserBalance(updatedBalance));
//     }
//     dispatch(setAmount(0));
//     dispatch(setReason(''));
//     dispatch(setIsUserLoading(false));
//     router.push('/Home');
//   } catch (e) {
//     console.error('Transaction error:', e); 
//     const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
//     dispatch(setModalText(errorMessage));
//     dispatch(setIsUserLoading(false));
//     dispatch(setIsModalVisible(true));
//   }
//   console.log('test');
  
// };
