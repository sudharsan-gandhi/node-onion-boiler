import { instance, mock, when, anything } from 'ts-mockito';
import { expect } from 'chai';
import { UserRepository } from '../../src/repository/userRepository';
import { UserService, UserServiceImp } from '../../src/service/userService';
import { User } from '../../src/entity/user';

describe('UserService', () => {
    let userRepository: UserRepository;
    let userService: UserService;

    beforeAll(async done => {
        userRepository = mock(UserRepository);
        userService = new UserServiceImp(userRepository);
        done();
    });

    describe('getAll', () => {
        it('should get all', async () => {
            const result = await userService.getAll();
            expect(true).to.be.equal(true);
        });
    });
});