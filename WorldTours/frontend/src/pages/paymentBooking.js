import * as React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
const token = localStorage.getItem("token");

// import * as PaymentAPI from '../../api/Payment/api';
// import * as styledPayment from './styled';

// const PaymentStatus = () => {
//   const receiptline = require('receiptline');
//   const doc = '{center}\nБилет на проезд\n{hr}\nВид транспорта: Автобус\nМаршрут: №100 "Центр — Академия"\nДата: 25.03.2025 Время: 23:26\nСтоимость: 2.00 BYN\n\n{qr:оплата123456789}\n';
//   const display = {
//     cpl: 42,
//     encoding: 'multilingual'
//   };
//   const svg = receiptline.transform(doc, display);

//   return (
//     <div dangerouslySetInnerHTML={{ __html: svg }} />
//   );
// };

export class PaymentResponse {
    clientSecret;
    error;
  
    constructor(obj) {
      this.clientSecret = obj.clientSecret ?? null;
      this.error = obj.error ?? null;
    }
  }
  
  export async function payFare() {
      try {
          let res = await fetch(`https://localhost:7276/payment/create-payment-intent`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json;charset=utf-8',
              },
              body: JSON.stringify({
                  Amount: 170,
                  Currency: 'byn',
                  PaymentMethodTypes: ['card'],
              }),
          });
  
          let json = await res.json();
  
          return new PaymentResponse(json);
      } catch (error) {
          throw error;
      }
  }


const PaymentForm = () => {
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const [open, setOpen] = React.useState(false);
  const [paymentInfo, setPaymentInfo] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    });

    console.log(paymentIntent)


    if (error) {
      alert(error);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        const segments = location.pathname.split('/');
        const id = segments[segments.length - 1];

        await axios.patch(`https://localhost:7276/booking/confirm_payment?bookingId=${id}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

        alert('Оплата успешно выполнена!');
        window.location.href = '/bookings'
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type='submit' variant="contained" disabled={!stripe}>
        Оплатить
      </Button>
      {/* <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={() => {
          setOpen(false);
        }}
      >
        <PaymentStatus />
      </Backdrop> */}
    </form>
  );
};

export default function Payment() {
  const stripePromise = loadStripe("pk_test_51R6wDJB7IRhuOKNW5vR6O286vglIQ6CXcPNIDtQNlyU6qiI0PPpYcGvGw0tE5FAs4arB38f4TBzEhwZTasfHkB8100dp7xzLHE");
  const [clientSecret, setClientSecret] = React.useState(null);

  function sendCredentials() {
    payFare()
      .then((result) => {
        if (result.error === null) {
          setClientSecret(result.clientSecret);
        } else alert(result.error);
      })
      .catch((error) => {
        console.log("Error creating payment intent:", error);
      });
  }

  React.useEffect(() => {
    sendCredentials();
  }, []);

    

  return (
    <>
      {clientSecret && (<Elements stripe={stripePromise} options={{ clientSecret }}>
        <div>
          <PaymentForm />
        </div>
      </Elements>
      )}
    </>
  );
}