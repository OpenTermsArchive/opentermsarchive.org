"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
// import fs from 'fs';
const next_1 = __importDefault(require("next"));
const dev = process.env.NODE_ENV !== 'production';
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
if (!process.env.TMP_SCRAPED_SERVICES_FOLDER || !process.env.TMP_SCRAPED_SERVICES_URL) {
    console.error('You need to setup TMP_SCRAPED_SERVICES_FOLDER and TMP_SCRAPED_SERVICES_URL');
    process.exit(1);
}
(async () => {
    try {
        await app.prepare();
        const server = express_1.default();
        server.use(process.env.TMP_SCRAPED_SERVICES_URL || '', express_1.default.static(process.env.TMP_SCRAPED_SERVICES_FOLDER || ''));
        server.all('*', (req, res) => {
            return handle(req, res);
        });
        server.listen(port, (err) => {
            if (err)
                throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
