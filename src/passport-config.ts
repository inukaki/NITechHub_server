import passport from 'passport';
import { BearerStrategy, IBearerStrategyOptionWithRequest } from 'passport-azure-ad';
import dotenv from 'dotenv';

dotenv.config();

// （参考）https://github.com/AzureAD/passport-azure-ad/blob/dev/lib/bearerstrategy.js

export function createBearerStrategy(): BearerStrategy {
    if (!process.env.AZURE_AD_TENANT_ID || !process.env.AZURE_AD_CLIENT_ID) {
        throw new Error('AZURE_AD_TENANT_ID and AZURE_AD_CLIENT_ID must be set in .env file');
    }
    const bearerStrategyOption: IBearerStrategyOptionWithRequest = {
        identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/v2.0/.well-known/openid-configuration`,
        clientID: process.env.AZURE_AD_CLIENT_ID,
        passReqToCallback: false,
        scope: ["Access"],
        loggingLevel: "info",
    };


    // console.log('bearerStrategyOption:', bearerStrategyOption);
    return new BearerStrategy(bearerStrategyOption, (req, token, done) => {
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