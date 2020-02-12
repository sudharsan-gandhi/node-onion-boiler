import { Container } from 'inversify';
import { Controller } from '../controller/controller';
import Types from './types';
import { UserService, UserServiceImp } from '../service/user-service';
import { UserRepository } from '../repository/user-repository';
import { UserController } from '../controller/user-controller';
import ReplServer from '../console';

const container: Container = new Container();

// Controllers
container.bind<Controller>(Types.Controller).to(UserController);

// Services
container.bind<UserService>(Types.UserService).to(UserServiceImp).inSingletonScope();

// Repositories
container.bind<UserRepository>(Types.UserRepository).to(UserRepository).inSingletonScope();

// Services


// Repl
container.bind(Types.Repl).to(UserRepository).inSingletonScope();


export { container };