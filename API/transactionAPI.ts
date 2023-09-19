import { mockUser, mockUser2 } from "../Mocks/mockDB";
import { Transaction, saveTransactionArgs } from "../types/Transaction";
import { User } from "../types/User";
import { SERVER_URL } from "./config";

export interface TransactionWithUsers extends Transaction {
    users: [User, User]
}

export const saveTransactionToDatabase = async (userID: string, partialTransaction: saveTransactionArgs): Promise<TransactionWithUsers> => {     
    // return example transaction if in dev mode
    if (process.env.EXPO_PUBLIC_DEV) return {
        category: partialTransaction.category,
        amount: partialTransaction.amount,
        reason: partialTransaction.reason,
        recipientId: partialTransaction.recipientPhoneNumber,
        id: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        purchaserId: userID,
        users: [mockUser, mockUser2]
    };

    const jsonBody = JSON.stringify(partialTransaction)
    try {
        const requestString = `${SERVER_URL}/saveTransaction`;
        const user = await fetch(requestString, {
            method: 'POST',
            body: jsonBody,
            headers: {
                'Content-Type': 'application/json', // Set the correct Content-Type header
            },
        })
        return await user.json()
    } catch (e: any) {
        console.log(e);
        return e.message;
    }
}
