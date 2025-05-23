import { ApiResponse } from "../types/APITypes";
import { DepositForm } from "../types/Deposit";
import { Transaction } from "../types/Transaction";
import { SERVER_URL } from "./config";

export interface FormWithUserId extends DepositForm {
  userId: string;
}

export const saveDepositToDatabase = async (formWithUserId: FormWithUserId): Promise<ApiResponse<Transaction[]>> => {
  // extract and map to expected backend format
  const {
    compostSmell,
    missingDryMatter,
    notes,
    compostStand,
    compostFull: full,
    bugs,
    cleanAndTidy,
    scalesMissing: scalesProblem,
    amount
  } = formWithUserId;

  // include only the fields that are present
  const compostReport = {
    depositWeight: amount,
    ...(compostSmell !== undefined ? { compostSmell } : {}),
    ...(missingDryMatter !== undefined ? { missingDryMatter } : {}),
    ...(notes !== undefined ? { notes } : {}),
    ...(compostStand !== undefined ? { compostStand } : {}),
    ...(full !== undefined ? { full } : {}),
    ...(bugs !== undefined ? { bugs } : {}),
    ...(cleanAndTidy !== undefined ? { cleanAndTidy } : {}),
    ...(scalesProblem !== undefined ? { scalesProblem } : {}),
  }

  const requestBody = {
    userId: formWithUserId.userId,
    compostReport
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
