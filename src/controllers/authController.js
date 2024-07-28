"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const routing_controllers_1 = require("routing-controllers");
const axios_1 = __importDefault(require("axios"));
let AuthController = class AuthController {
    constructor() {
        this.tenantID = process.env.AZURE_AD_TENANT_ID;
        this.clientID = process.env.AZURE_AD_CLIENT_ID;
        this.clientSecret = process.env.AZURE_AD_CLIENT_SECRET;
        this.resource = "https://graph.microsoft.com";
        //   @Get("/api")
        //   async callApi(@HeaderParam("Authorization") authHeader: string) {
        //     try {
        //       const response = await axios.get('https://graph.microsoft.com/v1.0/me', {
        //         headers: {
        //           'Authorization': authHeader
        //         }
        //       });
        //       return response.data;
        //     } catch (error) {
        //       console.error("Error calling API:", error);
        //       throw new Error("Could not call API");
        //     }
        //   }
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenEndpoint = `https://login.microsoftonline.com/${this.tenantID}/oauth2/v2.0/token`;
            if (this.clientID && this.clientSecret) {
                const params = new URLSearchParams();
                params.append('grant_type', 'client_credentials');
                params.append('client_id', this.clientID);
                params.append('client_secret', this.clientSecret);
                params.append('scope', `${this.resource}/.default`);
                try {
                    const response = yield axios_1.default.post(tokenEndpoint, params);
                    return response.data;
                }
                catch (error) {
                    console.error("Error getting access token:", error);
                    throw new Error("Could not obtain access token");
                }
            }
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, routing_controllers_1.Get)("/token"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getToken", null);
exports.AuthController = AuthController = __decorate([
    (0, routing_controllers_1.JsonController)()
], AuthController);
