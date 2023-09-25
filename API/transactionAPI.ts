import { mockTransaction, mockUser, mockUser2 } from "../Mocks/mockDB";
import { ApiResponse } from "../types/APITypes";
import { Transaction, saveTransactionArgs } from "../types/Transaction";
import { User } from "../types/User";
import { SERVER_URL } from "./config";

export interface TransactionWithUsers extends Transaction {
    users: [User, User]
}

export const saveTransactionToDatabase = async (partialTransaction: saveTransactionArgs): Promise<ApiResponse<TransactionWithUsers>> => {
    // return example transaction if in dev mode
    if (process.env.EXPO_PUBLIC_DEV) return {
        data: {
            ...mockTransaction,
            users: [mockUser, mockUser2]
        },
        status: 201
    };

    const jsonBody = JSON.stringify(partialTransaction)
    try {
        const requestString = `${SERVER_URL}/saveTransaction`;
        const response = await fetch(requestString, {
            method: 'POST',
            body: jsonBody,
            headers: {
                'Content-Type': 'application/json', // Set the correct Content-Type header
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
