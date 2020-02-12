import { Controller } from './../controller';
import { Application, Request, NextFunction, Response } from 'express';
import { injectable } from 'inversify';
import path from 'path';
// import * as mustacheExpress from 'mustache-express' // uncomment if using mustache

@injectable()
export class MustacheController implements Controller {

    public register(app: Application): void {
        // step 1: npm i mustache-express
        // step 2: uncomment mustache related comments in this page
        // step 3: bind this controller in config/inversify.ts
        console.log('registering ejs template');
        // app.engine('mustache', mustacheExpress()); //uncomment if using mustache
        app.set('view engine', 'mustache');
        app.set('views', path.join(__dirname, '/../../views/mustache'));

        app.get('/index', async (req: Request, res: Response, next: NextFunction) => {
            res.render('index', { title: 'mustache file' });
        });
    }

}