import 'reflect-metadata';
import App from './app';

process.on('uncaughtException', (err: Error) => {
    console.error(`
    --------------------
    Unhandled Exception:
    ${err.message}
    --------------------
    `);
});

process.on('unhandledRejection', (err: Error) => {
    console.error(`
    --------------------
    Unhandled Rejection:
    ${err.message}
    --------------------
    `);
});

const app: App = new App();
app.start();
module.exports = app;
