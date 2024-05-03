import { Body, Controller, Post, Request } from '@nestjs/common';
import Stripe from 'stripe';

@Controller('webhooks')
export class WebhooksController {
    private stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY)

    @Post('payment-intent-success')
    async paymentIntentSuccess(@Body('id') data:any, @Request() req){
        console.log("ejecutado")
        console.log(data);
        console.log(req)
        const dataxd= await req.text();
        console.log("Data x2")
        console.log(dataxd);
    }
}
