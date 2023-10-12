import{buffer} from 'micro';
import * as admin from 'firebase-admin';

// secure connection to firebase from backend
const service_account = require('../../../permission.json');

const app = !admin.apps.length ?admin.initializeApp({
    credential:admin.credential.cert(service_account)
    }) 
    : admin.app();

// start connection to stripe

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpoint_secret = process.env.STRIPE_SIGNING_SECRET;


// function to pump data into firestore
const fulfullOrder = async(session) => {
    console.log('fulfill order',session);

    return app
    .firestore()
    .collection('user')
    .doc(session.metadata.email)
    .collection('orders').doc(session.id).set({
        amount: session.amount_total/100,
        amount_shipping : session.total_details.amount_shipping /100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    })

    .then(() =>{
          console.log(`SUCCESS : Order ${session.id} has been added`)
    })
}

export default async (req,res) => {
    if(req.method == 'POST')
    {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];

        let event;

        // Verify that the EVENT is from stripe
        try{
            event = stripe.webhooks.constructEvent(payload,sig,endpoint_secret);
        }catch (err){
            console.log('ERROR',err.message)
            return res.status(400).send(`Webhook ERROR :  ${err.message}`)
        }

        // if no error then it is legit stripe event

        if(event.type == 'checkout.session.completed')
        {
            const session = event.data.object;

            // store into firebase(now we stored in stripe and firebase ),
            //  and then show a /success page

            return fulfullOrder(session)
            .then(()=>res.status(200))
            .catch((err) => res.status(400).send(`Webhook Error : ${err.message}`))
        }
    }
};

export const config = {
    api:{
        bodyParser:false,
        externalResolver:true
    }
}