const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// async function createStripeProducts(items) {
//     const price_ids = [];
//     for (const item of items) {
//         try {
//             // check if product exist
//             // if dont exist we create one
        
//             const product = await stripe.products.create({
//                 name: item.title,
//                 default_price_data: {
//                     unit_amount: item.price * 100,
//                     currency: 'gbp',
//                 },
//                 expand: ['default_price'],
//             });

//             console.log(`Created product: ${product.name}`);

//             // if exist, get the price id and simply push
//             price_ids.push(product.default_price.id)

//         } catch (error) {
//             console.error('Error creating product:', error);
//         }
//     }
//     return price_ids;
// }

export default async (req,res) =>{
    const {items,email} = req.body;
    
    // const product_to_pay = await createStripeProducts(items);

    const transformedItems = items.map(item => ({

        quantity : 1,
        price_data : {
            currency : 'gbp',
            unit_amount : item.price * 100,
            product_data : {
                name : item.title,
                images : [item.image],
                description : item.description,

            },
        },
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            shipping_options: [
                {
                    shipping_rate : 'shr_1NyFMLKGzT5TI2AnX77YcYHz'
                },
            ],
            shipping_address_collection : {
                allowed_countries : ['GP','US','CA']
            },
            line_items : transformedItems,
            mode : 'payment',
            success_url : `${process.env.HOST}/success`,
            cancel_url : `${process.env.HOST}/checkout`,
    
            metadata: {
                email,
                images : JSON.stringify(items.map(item => item.image))
            },
        });
        res.status(200).json({ id :session.id})
        
        // Process the result
      } catch (error) {
        console.error('Stripe API Error:', error);
        // Handle the error, log details, and possibly provide feedback to the user
      }
      
    


    



};