import { JwtPayload } from "jsonwebtoken";
import { IUserToken } from "../../middleware/auth";

declare global {
    namespace Express{
        interface Request{
            user?: IUserToken
        }
    }
}