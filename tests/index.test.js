import {helloWorld} from 'index';

describe('Test', () => {
    it('should say "Hello, world!"', () => {
        expect(helloWorld()).toBe('Hello, world!');
    });
});
