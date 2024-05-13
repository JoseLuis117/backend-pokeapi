import { Body, Controller, Post, Request } from '@nestjs/common';
import Stripe from 'stripe';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
    constructor(private readonly webhookservice:WebhooksService){}
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

    @Post('sendEmail')
    async sendEmail(@Body('message') message, @Body('name') name, @Body('sender') sender){
        return this.webhookservice.sendEmail(message,name,sender);
    }
}
