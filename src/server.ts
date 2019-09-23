import 'reflect-metadata';
import App from './app';

process.on('uncaughtException', (err:Error) => {
    console.error(`
    --------------------
    Unhandled Exception:
    ${err.stack}
    --------------------
    `);
});

process.on('unhandledRejection', (err:Error) => {
    console.error(`
    --------------------
    Unhandled Rejection:
    ${err.message}
    ${err.stack}
    --------------------
    `);
});

const app: App = new App();
app.start();
module.exports = app;