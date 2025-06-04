"use client";

export default function FormattedPhoneNumber(props: FormattedPhoneNumberProps): JSX.Element {
    const formatNumber = (phoneNumber: number): string => {
        if (!phoneNumber) {
            return '';
        }
        const phoneNumberStr = phoneNumber.toString();
        if (phoneNumberStr.length !== 10) {
            return phoneNumberStr;
        }

        const areaCode = phoneNumberStr.slice(0, 3);
        const begin = phoneNumberStr.slice(3, 6);
        const end = phoneNumberStr.slice(6, 10);
        return `(${areaCode}) ${begin}-${end}`;
    }

    return (
        <span>{formatNumber(props.phoneNumber)}</span>
    );
}