import { View, Text, TextInput, useColorScheme } from "react-native";
import Colors from "../constants/Colors";
import CustomButton from "../components/utils/CustomButton";
import i18n from "../translationService";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  saveTransaction,
  selectAmount,
  selectChosenContact,
  selectReason,
  setAmount,
  setReason,
  unsetChosenContact,
} from "../store/sendFormSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Category, Transaction } from "../types/Transaction";
import {
  addUserTransaction,
  getUserIdByNumber,
  selectUser,
  selectUserId,
  setIsUserLoading,
  setUserBalance,
} from "../store/userSlice";
import { setIsModalVisible, setModalText } from "../store/appStateSlice";
import { CustomModal } from "../components/utils/CustomModal";
import { parsePhoneNumber } from "libphonenumber-js";
import { Contact } from "expo-contacts";
import { User } from "../types/User";

export default function SendAmount() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const chosenContact = useAppSelector<Contact>(selectChosenContact);
  const amount = useAppSelector<number>(selectAmount);
  const reason = useAppSelector<string>(selectReason);
  const currentUser = useAppSelector<User>(selectUser);
  const router = useRouter();
  const [amountError, setAmountError] = useState<boolean>(false);
  const [reasonError, setReasonError] = useState<boolean>(false);
  const currentUserId = useAppSelector<string>(selectUserId);
  const params = useLocalSearchParams();
  const { isRequest } = params;

  const onPressSend = async () => {
    dispatch(setIsUserLoading(true));
    if (!chosenContact?.phoneNumbers) return;

    // phone number for recipient in send flow and 'purchaser' (aka person receiving) in request flow
    const phoneNumber = chosenContact?.phoneNumbers[0].number;

    if (!phoneNumber) return;

    // verify that the user has sufficient balance to send the amount
    if (currentUser.accountBalance <= 0) {
      alert("Insufficient balance");
      dispatch(setIsUserLoading(false));
      return;
    } else if (amount > currentUser.accountBalance) {
      dispatch(setIsUserLoading(false));
      alert("Amount greater than available balance");
      return;
    }
    try {
      const parsedPhoneNumber = parsePhoneNumber(phoneNumber, "US")
        .nationalNumber as string;
      if (parsedPhoneNumber === currentUser.phoneNumber) {
        throw new Error("Cannot send or make request to yourself");
      }
      const { data: getUserIdByNumberData } = await dispatch(
        getUserIdByNumber(parsedPhoneNumber)
      ).unwrap();
      const requesteeId = getUserIdByNumberData.userId;
      const newTransaction = {
        recipientPhoneNumber: isRequest
          ? currentUser.phoneNumber
          : parsedPhoneNumber,
        amount: amount,
        category: Category.MISC,
        reason: reason,
        // in a request the purchaserid is the id of person the request is sent to and is therefore not known
        purchaserId: isRequest ? requesteeId : currentUserId,
        ...(isRequest && { isRequest: true }),
      };

      const { data: transaction } = await dispatch(
        saveTransaction(newTransaction)
      ).unwrap();
      dispatch(addUserTransaction(transaction));
      if (!isRequest) {
        const updatedBalance = currentUser.accountBalance - amount;
        dispatch(setUserBalance(updatedBalance));
      }
      dispatch(setAmount(0));
      dispatch(setReason(""));
      dispatch(setIsUserLoading(false));
      router.push("/Home");
    } catch (e) {
      dispatch(setModalText(e.message));
      dispatch(setIsUserLoading(false));
      dispatch(setIsModalVisible(true));
    }
  };

  const onChangeAmount = (amount: string) => {
    if (!amount) {
      setAmountError(true);
      return;
    }
    if (!parseInt(amount)) {
      setAmountError(true);
      return;
    }

    if (Number.isNaN(parseInt(amount))) {
      setAmountError(true);
      return;
    }
    setAmountError(false);
    dispatch(setAmount(parseInt(amount)));
  };

  const onChangeReason = (reason: string) => {
    if (!reason) {
      setReasonError(true);
      return;
    }
    setReasonError(false);
    dispatch(setReason(reason));
  };

  const onModalCancel = () => {
    dispatch(setAmount(0));
    dispatch(setReason(""));
    dispatch(setIsModalVisible(false));
    router.push("/Home");
  };
  const onModalChangeContact = () => {
    dispatch(setIsModalVisible(false));
    dispatch(unsetChosenContact());
    router.back();
  };

  return (
    <View style={{ padding: 8, gap: 8, alignItems: "center" }}>
      <CustomModal
        type="error"
        buttons={[
          { text: i18n.t("cancel"), onPress: onModalCancel },
          { text: i18n.t("sendamount_back"), onPress: onModalChangeContact },
        ]}
      />
      <View>
        <Text
          style={{ fontSize: 24, color: Colors[colorScheme ?? "light"].text }}
        >
          {isRequest
            ? i18n.t("request_how_much")
            : i18n.t("sendamount_how_much")}
        </Text>
        {amountError ? (
          <Text
            style={{ fontSize: 10, color: Colors[colorScheme ?? "light"].tint }}
          >
            {i18n.t("sendamount_validate_amount")}
          </Text>
        ) : null}
        <TextInput
          autoFocus
          maxLength={2}
          style={{
            fontSize: 44,
            textAlign: "center",
            color: Colors[colorScheme ?? "light"].text,
            borderBottomWidth: 1,
            width: "60%",
            ...(amountError && { borderColor: "red" }),
          }}
          onChangeText={onChangeAmount}
          inputMode="numeric"
        />
      </View>
      <View>
        <Text
          style={{ fontSize: 24, color: Colors[colorScheme ?? "light"].text }}
        >
          {i18n.t("sendamount_why")}
        </Text>
        <TextInput
          maxLength={15}
          style={{
            fontSize: 44,
            textAlign: "center",
            color: Colors[colorScheme ?? "light"].text,
            borderBottomColor: Colors[colorScheme ?? "light"].text,
            borderBottomWidth: 1,
            width: "60%",
          }}
          onChangeText={onChangeReason}
          inputMode="text"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          padding: 8,
          alignSelf: "center",
        }}
      >
        <CustomButton
          disabled={!reason || !amount || amountError || reasonError}
          onPress={onPressSend}
          text={i18n.t("sendamount_continue")}
        />
        <CustomButton
          onPress={() => router.back()}
          text={i18n.t("sendamount_back")}
        />
      </View>
    </View>
  );
}
