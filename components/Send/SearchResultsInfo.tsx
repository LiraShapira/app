import { View, Text, useColorScheme } from "react-native";
import i18n from "../../translationService";
import CustomButton from "../utils/CustomButton";
import { isPossiblePhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { useLocalSearchParams, useRouter } from "expo-router";
import { setChosenUser } from "../../store/sendFormSlice";
import { useAppDispatch } from "../../hooks";
import Colors from "../../constants/Colors";
import { User, UserRole } from "../../types/User";

interface SearchResultsInfoProps {
  debouncedFilterTerms: string;
  noContacts: boolean; // Keeping the prop name for compatibility, but it now refers to users
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
    // Create a minimal User object for phone number search
    const phoneNumber = parsePhoneNumber(debouncedFilterTerms, "IL").nationalNumber;
    const fakeUser: User = {
      id: "temp-phone-search",
      firstName: "",
      lastName: "",
      role: UserRole.BASIC,
      userLocalCompostStandId: 1,
      accountBalance: 0,
      createdAt: new Date().toISOString(),
      transactions: [],
      phoneNumber: phoneNumber,
      adminCompostStandId: null,
    };
    dispatch(setChosenUser(fakeUser));
    if (isRequest) {
      router.push({ pathname: "/SendAmount", params: { isRequest: 'true' } });
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
          >{
              i18n.t("send_search_no_results", { search: debouncedFilterTerms })
            }
          </Text>
          {/* if search is done for valid number, allow user to send directly to this number */}
          {isPossiblePhoneNumber(debouncedFilterTerms, "IL") === true && (
            <View>
              <CustomButton
                text={isRequest == 'true' ? i18n.t("request_search_no_results_send_to_number", {
                  number: debouncedFilterTerms,
                }) : i18n.t("send_search_no_results_send_to_number", {
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
