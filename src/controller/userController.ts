import { RegistrableController } from './RegistrableController';
import { Application, Request, NextFunction, Response } from 'express';
import { injectable, inject } from 'inversify';
import { dataResponse } from '../utils/response';
import Types from '../config/types';
import { UserService } from '../service/userService';
import { BadRequest } from '../utils/exceptions';
import { hashSync, compareSync } from 'bcrypt';

@injectable()
export class UserController implements RegistrableController {

    @inject(Types.UserService)
    private userService: UserService;

    public register(app: Application): void {
        app.post('/register', async (req: Request, res: Response, next: NextFunction) => {
            try {
                if (req.body && req.body.name && req.body.password) {
                    console.log('req body:', req.body);
                    const password = req.body.password;
                    const passwordhash = hashSync(password, process.env.password_key);
                    const user = {
                        password: passwordhash,
                        name: req.body.name,
                        email: req.body.email
                    };
                    const result = await this.userService.save(user);
                    return dataResponse(res, result);
                } else {
                    throw new BadRequest('Registration failed: user details missing');
                }
            } catch (error) {
                return next(error);
            }
        });
        app.route('/user/all')
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const result = await this.userService.getAll();
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });

        app.route('/user/byId/:id')
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const id = req.params.id;
                    const result = await this.userService.getById(id);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });

        app.route('/user/create/:name')
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const name = req.params.name;
                    const result = await this.userService.save(name);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });

        // app.route('/user/:userId/vehicle/:vehicleId')
        //     .get(async (req: Request, res: Response, next: NextFunction) => {
        //         try {
        //             const userId = req.params.userId;
        //             const vehicleId = req.params.vehicleId;
        //             const result = await this.userService.newVehicle(userId, vehicleId);
        //             return dataResponse(res, result);
        //         } catch (error) {
        //             return next(error);
        //         }
        //     });
    }

}