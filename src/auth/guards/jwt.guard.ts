import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export default class JwtGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService){}
    async canActivate(context: ExecutionContext):Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.validateToken(request);
        if(!token) throw new UnauthorizedException("Token no proveido");
        try {
            const payload = await this.jwtService.verifyAsync(token,{
                secret: process.env.jwtSecretTokenKey
            });
            request['user'] = payload;
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException("Token invalido");
        }
        return true
    }
    private validateToken(req:Request){
        const [type, token] = req.headers.authorization?.split(' ') || [];
        return type === 'Bearer'? token: null;
    }
}