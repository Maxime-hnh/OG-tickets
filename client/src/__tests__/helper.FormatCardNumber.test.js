import {formatCardNumber} from "../_helpers/helper";

describe('formatCardNumber', () => {
    it('should format a valid 16-digit card number with spaces', () => {
        const cardNumber = '1234567812345678';
        const formattedCardNumber = formatCardNumber(cardNumber);

        expect(formattedCardNumber).toBe('1234 5678 1234 5678');
    });

    it('should handle card numbers shorter than 16 digits', () => {
        const cardNumber = '12345678';
        const formattedCardNumber = formatCardNumber(cardNumber);

        expect(formattedCardNumber).toBe('1234 5678');
    });

    it('should ignore any existing spaces in the input', () => {
        const cardNumber = '1234 5678 1234 5678';
        const formattedCardNumber = formatCardNumber(cardNumber);

        expect(formattedCardNumber).toBe('1234 5678 1234 5678');
    });

    it('should limit the card number to 16 digits', () => {
        const cardNumber = '12345678123456789012';
        const formattedCardNumber = formatCardNumber(cardNumber);

        expect(formattedCardNumber).toBe('1234 5678 1234 5678'); // Limité à 16 chiffres
    });

    it('should return an empty string for empty input', () => {
        const cardNumber = '';
        const formattedCardNumber = formatCardNumber(cardNumber);

        expect(formattedCardNumber).toBe('');
    });
});
