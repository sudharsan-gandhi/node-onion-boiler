import { Controller } from './../controller';
import { Application, Request, NextFunction, Response } from 'express';
import { injectable } from 'inversify';
import path from 'path';

@injectable()
export class EjsController implements Controller {

    public register(app: Application): void {
        // step 1: npm install ejs
        // step 2: bind this controller in config/inversify.ts
        console.log('registering ejs template');
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, '/../../views/ejs'));

        app.get('/index', async (req: Request, res: Response, next: NextFunction) => {
            res.render('index', { title: 'ejs file' });
        });
    }

}