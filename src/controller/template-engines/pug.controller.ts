import { Controller } from './../controller';
import { Application, Request, NextFunction, Response } from 'express';
import { injectable } from 'inversify';
import path from 'path';

@injectable()
export class PugController implements Controller {

    public register(app: Application): void {
        // step 1: npm install pug
        // step 2: bind this controller in config/inversify.ts
        console.log('registering pug template');
        app.set('view engine', 'pug');
        app.set('views', path.join(__dirname, '/../../views/pug'));

        app.get('/index', async (req: Request, res: Response, next: NextFunction) => {
            res.render('index', { title: 'pug file' });
        });
    }

}