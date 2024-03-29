import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export default class JwtGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService){}
    async canActivate(context: ExecutionContext):Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.validateToken(request);
        try {
            const payload = await this.jwtService.verifyAsync(token,{
                secret: process.env.jwtSecretTokenKey
            });
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException();
        }
        return true
    }
    private validateToken(req:Request){
        const [type, token] = req.headers.authorization?.split(' ') || [];
        if (type !== 'Bearer' || !token) throw new UnauthorizedException();

        return token;
    }
}