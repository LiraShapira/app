import {Contact} from "expo-contacts";

export function filterContactsCondition(c: Contact, debouncedFilterTerms: string): boolean{
    if (c.phoneNumbers?.length) {
        return (
            c.firstName?.toLowerCase().includes(debouncedFilterTerms.toLowerCase()) ||
            c.lastName?.toLowerCase().includes(debouncedFilterTerms.toLowerCase()) ||
            c.phoneNumbers?.some(
                phoneNumber => phoneNumber.number?.toString().includes(debouncedFilterTerms.toLowerCase())
            )
        );
    }
}