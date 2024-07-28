"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const simpleController_1 = require("./controllers/simpleController");
const authController_1 = require("./controllers/authController");
require("reflect-metadata");
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = require("./passport-config");
const app = (0, routing_controllers_1.createExpressServer)({
    controllers: [
        simpleController_1.SimpleController,
        authController_1.AuthController
    ]
});
const port = 3000;
app.use(passport_1.default.initialize());
const bearerStrategy = (0, passport_config_1.createBearerStrategy)();
passport_1.default.use(bearerStrategy);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
