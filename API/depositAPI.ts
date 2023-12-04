import { mockTransaction } from "../Mocks/mockDB";
import { ApiResponse } from "../types/APITypes";
import { DepositForm } from "../types/Deposit";
import { Transaction } from "../types/Transaction";
import { SERVER_URL } from "./config";

export interface FormWithUserId extends Omit<DepositForm, 'compostSmell'> {
  userId: string;
  compostSmell?: boolean;
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
      compostStand: formWithUserId.compostStand,
      full: formWithUserId.compostFull,
      bugs: formWithUserId.bugs,
      cleanAndTidy: formWithUserId.cleanAndTidy,
      scalesProblem: formWithUserId.scalesMissing
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
