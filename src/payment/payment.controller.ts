import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import JwtGuard from 'src/auth/guards/jwt.guard';

@Controller('payment')
export class PaymentController {
    constructor(private readonly stripeService: PaymentService) { }

    @Post()
    @UseGuards(JwtGuard)
    async sendPay(@Request() req, @Body('quantity') quantity) {
        console.log("info")
        console.log(req.user)
        const uuid = req.user.subset.id;
        const email = req.user.email;
        console.log(uuid)
        const session = await this.stripeService.createSession(uuid, email, quantity);
        return session;
    }

    @Post('intent')
    @UseGuards(JwtGuard)
    async sendIntentPayment(@Request() req, @Body('quantity') quantity){
        console.log("info")
        console.log(req.user)
        const uuid = req.user.subset.id;
        const email = req.user.email;
        console.log(uuid)
        const session = await this.stripeService.createIntentPayment(uuid, email, quantity);
        console.log("Session");
        console.log(session)
        return session;
    }
}
