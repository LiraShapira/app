import { mockTransaction, mockUser, mockUser2 } from "../Mocks/mockDB";
import { ApiResponse } from "../types/APITypes";
import { Transaction, SaveTransactionArgs } from "../types/Transaction";
import { SERVER_URL } from "./config";

export const saveTransactionToDatabase = async (partialTransaction: SaveTransactionArgs): Promise<ApiResponse<Transaction>> => {
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

interface updateRequestInDatabaseArgs {
    transaction: Transaction;
    isRequestAccepted: boolean;
}

export const updateRequestInDatabase = async ({ transaction, isRequestAccepted }: updateRequestInDatabaseArgs): Promise<ApiResponse<Transaction>> => {
    const jsonBody = JSON.stringify({ transaction, isRequestAccepted })
    try {
        const requestString = `${SERVER_URL}/handleRequest`;
        const response = await fetch(requestString, {
            method: 'PUT',
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
