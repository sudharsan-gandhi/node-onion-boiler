import { Container } from 'inversify';
import { RegistrableController } from '../controller/RegistrableController';
import Types from './types';
import { UserService, UserServiceImp } from '../service/userService';
import { UserRepository } from '../repository/userRepository';
import { UserController } from '../controller/userController';
import ReplServer from '../console';

const container: Container = new Container();

// Controllers
container.bind<RegistrableController>(Types.Controller).to(UserController);

// Services
container.bind<UserService>(Types.UserService).to(UserServiceImp).inSingletonScope();

// Repositories
container.bind<UserRepository>(Types.UserRepository).to(UserRepository).inSingletonScope();

// Services


//Repl
container.bind(Types.Repl).to(UserRepository).inSingletonScope();


export { container };