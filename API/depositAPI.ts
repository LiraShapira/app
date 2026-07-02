import { ApiResponse } from "../types/APITypes";
import { DepositForm } from "../types/Deposit";
import { Transaction } from "../types/Transaction";
import { depositLogger } from "../utils/depositLogger";
import { SERVER_URL } from "./config";

export interface FormWithUserId extends DepositForm {
  userId: string;
}

const getErrorMessage = (payload: unknown, fallback: string): string => {
  if (payload && typeof payload === 'object' && 'error' in payload) {
    const error = (payload as { error?: unknown }).error;
    if (typeof error === 'string' && error.trim()) {
      return error;
    }
    if (error && typeof error === 'object' && 'message' in error) {
      const message = (error as { message?: unknown }).message;
      if (typeof message === 'string' && message.trim()) {
        return message;
      }
    }
  }
  return fallback;
};

export const saveDepositToDatabase = async (
  formWithUserId: FormWithUserId,
): Promise<ApiResponse<Transaction[]>> => {
  const {
    compostSmell,
    missingDryMatter,
    notes,
    compostStand,
    compostFull: full,
    bugs,
    cleanAndTidy,
    scalesMissing: scalesProblem,
    amount,
  } = formWithUserId;

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
  };

  const requestBody = {
    userId: formWithUserId.userId,
    compostReport,
  };

  const requestString = `${SERVER_URL}/deposit`;

  try {
    await depositLogger.step('api_request_sent', {
      details: {
        compostStand,
        amount,
        hasNotes: Boolean(notes),
      },
    });

    const response = await fetch(requestString, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let jsonResponse: unknown;
    try {
      jsonResponse = await response.json();
    } catch (parseError: any) {
      await depositLogger.step('submit_failed', {
        error: `Invalid JSON response (status ${response.status})`,
        details: { parseError: parseError?.message },
      });
      return {
        data: null,
        status: response.status,
        error: 'Server returned an invalid response. Please try again.',
      };
    }

    await depositLogger.step('api_response_received', {
      details: {
        status: response.status,
        isArray: Array.isArray(jsonResponse),
        count: Array.isArray(jsonResponse) ? jsonResponse.length : undefined,
      },
    });

    if (response.status !== 201) {
      const errorMessage = getErrorMessage(jsonResponse, 'Deposit failed');
      await depositLogger.step('submit_failed', { error: errorMessage });
      return {
        data: null,
        status: response.status,
        error: errorMessage,
      };
    }

    if (!Array.isArray(jsonResponse)) {
      const errorMessage = 'Server returned an unexpected deposit response';
      await depositLogger.step('submit_failed', {
        error: errorMessage,
        details: { responseType: typeof jsonResponse },
      });
      return {
        data: null,
        status: response.status,
        error: errorMessage,
      };
    }

    return { data: jsonResponse as Transaction[], status: response.status };
  } catch (e: any) {
    const errorMessage = e?.message ?? 'Network error during deposit';
    await depositLogger.step('submit_failed', { error: errorMessage });
    return {
      data: null,
      status: 0,
      error: errorMessage,
    };
  }
};
