import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService){}

 async use (req: any, _: Response, next: Function) {
     try{
        const token = req.headers.authorization.split(' ')[1];
        if (!token) throw new UnauthorizedException('Unauthorized access');
        const payload = this.jwtService.verify(token);
        if (!payload) throw new UnauthorizedException('Token expired');
        req.user = payload; 
     }catch(error){
        throw new UnauthorizedException(error.message);
    }
    next();
 }
}