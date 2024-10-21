import {authenticationService} from "../_services/authentication.service";
import {authHeader} from "../_helpers/auth-header";

jest.mock('../_services/authentication.service', () => ({
    authenticationService: {
        loggedUserSubject: {
            next: jest.fn(),
        },
        get loggedUserValue() {
            return null;
        },
    },
}));

describe('authHeader', () => {
    afterEach(() => {

        authenticationService.loggedUserSubject.next(null);
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('should return JSON headers when type is "json"', () => {
        const headers = authHeader('json');
        expect(headers).toEqual({
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Accept: "application/json",
        });
    });

    it('should return Form headers when type is "form"', () => {
        const headers = authHeader('form');
        expect(headers).toEqual({
            "Cache-Control": "no-cache",
            Accept: "application/json",
        });
    });

    it('should return Text headers when type is "text"', () => {
        const headers = authHeader('text');
        expect(headers).toEqual({
            "Cache-Control": "no-cache",
            "Content-Type": "text/plain",
        });
    });

    it('should include Authorization header if user is logged in with accessToken', () => {
        // Remplace directement la méthode pour simuler un utilisateur connecté
        jest.spyOn(authenticationService, 'loggedUserValue', 'get').mockReturnValue({
            accessToken: 'test-token',
            refreshToken: 'refresh-token',
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            role: "USER",
        });

        const headers = authHeader('json');
        expect(headers).toEqual({
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Accept: "application/json",
            Authorization: "Bearer test-token",
        });
    });

    it('should not include Authorization header if no user is logged in', () => {
        jest.spyOn(authenticationService, 'loggedUserValue', 'get').mockReturnValue(null);

        const headers = authHeader('json');
        expect(headers).toEqual({
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Accept: "application/json",
        });
    });
});
