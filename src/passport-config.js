"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBearerStrategy = createBearerStrategy;
const passport_azure_ad_1 = require("passport-azure-ad");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// （参考）https://github.com/AzureAD/passport-azure-ad/blob/dev/lib/bearerstrategy.js
function createBearerStrategy() {
    if (!process.env.AZURE_AD_TENANT_ID || !process.env.AZURE_AD_CLIENT_ID) {
        throw new Error('AZURE_AD_TENANT_ID and AZURE_AD_CLIENT_ID must be set in .env file');
    }
    const bearerStrategyOption = {
        identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/v2.0/.well-known/openid-configuration`,
        clientID: process.env.AZURE_AD_CLIENT_ID,
        passReqToCallback: false,
        scope: ["Access"],
        loggingLevel: "info",
    };
    // console.log('bearerStrategyOption:', bearerStrategyOption);
    return new passport_azure_ad_1.BearerStrategy(bearerStrategyOption, (req, token, done) => {
        // console.log('token:', token);
        // const payload = token as any;
        // console.log('payload:', payload);
        // done(null, payload, token);
        done(null, token);
        // Optionally, validate the token or retrieve user information
        // done(null, token);
        // return done(null, user, token);
    });
}
