import { JsonController, Get, HeaderParam } from "routing-controllers";
import axios from 'axios';

@JsonController()
export class AuthController {
  private tenantID = process.env.AZURE_AD_TENANT_ID;
  private clientID = process.env.AZURE_AD_CLIENT_ID;
  private clientSecret = process.env.AZURE_AD_CLIENT_SECRET;
  private resource = "https://graph.microsoft.com";

  @Get("/token")
  async getToken() {
    const tokenEndpoint = `https://login.microsoftonline.com/${this.tenantID}/oauth2/v2.0/token`;

    if(this.clientID && this.clientSecret) {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', this.clientID);
        params.append('client_secret', this.clientSecret);
        params.append('scope', `${this.resource}/.default`);

        try {
        const response = await axios.post(tokenEndpoint, params);
        return response.data;
        } catch (error) {
        console.error("Error getting access token:", error);
        throw new Error("Could not obtain access token");
        }
    }
  }

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
