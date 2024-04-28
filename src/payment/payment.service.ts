import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
@Injectable()
export class PaymentService {
    async createSession(uuid: string, email: string, quantity2: number) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY)

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            client_reference_id: uuid,
            customer_email: email,
            mode: 'payment',
            line_items: [
                {
                    price: 'price_1PAMGFHOAHCs9Mdp3yllDN4U',
                    quantity: quantity2
                }
            ],
            return_url: 'http://localhost:3000/perfil',
            submit_type: 'pay'
        })

        console.log("Session con await")
        console.log({ id: session.id, client_secret: session.client_secret })
        return { id: session.id, client_secret: session.client_secret };
    }
    async createIntentPayment(uuid: string, email: string, quantity2: number) {
        const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY)

        /* client_reference_id: uuid,
            customer_email: email,
            mode: 'payment',
            line_items: [
                {
                    price: 'price_1PAMGFHOAHCs9Mdp3yllDN4U',
                    quantity: quantity2
                }
            ],
            return_url:'http://localhost:3000/perfil',
            submit_type:'pay' */
        const session = await stripe.paymentIntents.create({
            amount: 3000,
            currency: 'mxn',
            automatic_payment_methods: {
                enabled: true,
            },
            description:"1 PokeCoin",
            receipt_email: email,
            setup_future_usage:"off_session",
        })
        return { id: session.id, client_secret: session.client_secret };
    }
}
