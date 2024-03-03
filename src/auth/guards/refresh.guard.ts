import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export default class RefreshGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        Logger.log("Entro")
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token) throw new UnauthorizedException('Token not found');
        try {
            const payload = await this.jwtService.verifyAsync(token,{
                secret:process.env.jwtRefreshToken
            });
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
        return true;
    }
    private extractTokenFromHeader(request:Request){
        Logger.log("Entro")

        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Refresh' ? token : null;
    }
}