import { View, Text, useColorScheme } from "react-native";
import i18n from "../../translationService";
import CustomButton from "../utils/CustomButton";
import { isPossiblePhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ContactTypes } from "expo-contacts";
import { setChosenContact } from "../../store/sendFormSlice";
import { useAppDispatch } from "../../hooks";
import Colors from "../../constants/Colors";

interface SearchResultsInfoProps {
  debouncedFilterTerms: string;
  noContacts: boolean;
}

export default function SearchResultsInfo({
  debouncedFilterTerms,
  noContacts,
}: SearchResultsInfoProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams();
  const { isRequest } = params;

  const onSendToPhoneNumber = () => {
    const fakeContact = {
      id: "1",
      contactType: ContactTypes.Person,
      name: "fake contact",
      phoneNumbers: [
        {
          label: "fake",
          id: "1",
          number: parsePhoneNumber(debouncedFilterTerms, "IL").nationalNumber,
        },
      ],
    };
    console.log(fakeContact);
    dispatch(setChosenContact(fakeContact));
    if (isRequest) {
      router.push({ pathname: "/SendAmount", params: { isRequest: true } });
    } else {
      router.push("/SendAmount");
    }
  };

  return (
    <View>
      {noContacts ? (
        <View style={{ alignContent: "center" }}>
          <Text
            style={{
              color: Colors[colorScheme ?? "light"].text,
            }}
          >
            {i18n.t("send_search_no_results", { search: debouncedFilterTerms })}
          </Text>
          {/* if search is done for valid number, allow user to send directly to this number */}
          {isPossiblePhoneNumber(debouncedFilterTerms, "IL") === true && (
            <View>
              <CustomButton
                text={i18n.t("send_search_no_results_send_to_number", {
                  number: debouncedFilterTerms,
                })}
                onPress={onSendToPhoneNumber}
              />
            </View>
          )}
        </View>
      ) : (
        <Text
          style={{
            color: Colors[colorScheme ?? "light"].text,
          }}
        >
          {i18n.t("send_search_searching_for")} {debouncedFilterTerms}
        </Text>
      )}
    </View>
  );
}
