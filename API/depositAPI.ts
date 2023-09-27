import { mockTransaction } from "../Mocks/mockDB";
import { ApiResponse } from "../types/APITypes";
import { Transaction } from "../types/Transaction";
import { SERVER_URL } from "./config";

interface FormWithUserId extends DepositForm {
  userId: string;
}

export const saveDepositToDatabase = async (formWithUserId: FormWithUserId): Promise<ApiResponse<Transaction>> => {
  // return example transaction if in demo mode
  if (process.env.EXPO_PUBLIC_DEMO) return {
    data: {
      ...mockTransaction,
    },
    status: 201
  };

  const requestBody = {
    userId: formWithUserId.userId,
    compostReport: {
      depositWeight: formWithUserId.amount,
      compostSmell: formWithUserId.compostSmell,
      dryMatterPresent: formWithUserId.dryMatter,
      notes: formWithUserId.notes,
      // TODO compostStand Make dynamic
      compostStandId: 1
    }
  }

  const jsonRequestBody = JSON.stringify(requestBody);
  try {
    const requestString = `${SERVER_URL}/deposit`;
    const response = await fetch(requestString, {
      method: 'POST',
      body: jsonRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const JSONresponse = await response.json();
    if (response.status !== 201) {
      throw new Error(JSONresponse.error);
    }
    return { data: JSONresponse, status: response.status };
  } catch (e: any) {
    return e;
  }
}
