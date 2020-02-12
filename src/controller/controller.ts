import { Application } from 'express';

export interface Controller {
    register(app: Application): void;
}