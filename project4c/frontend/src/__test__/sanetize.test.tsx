import sanitize from "../tools/sanitize";

describe('Test sanitation function', () => {
    const validInput = "AB CDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!().- ";
    const invalidInput = "A'B CDEFGH\\IJKLMNO'PQRSTUVWXYZ\+?abcdef|@gh*ijklmnop{}qrstuvwxyz0123456789!().- ";

    it('Confirm no change to valid input', () => {
        expect(sanitize(validInput) === validInput);
    });
    it('Confirm removal of invalid characters from input', () => {
        expect(sanitize(invalidInput) === validInput);
    });
});