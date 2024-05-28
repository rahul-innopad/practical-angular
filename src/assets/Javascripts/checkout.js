  var stripe = Stripe('pk_test_51MySyeEoRbJtPRX1X5ZsZJ2dk7iSXH0vQn360tonMZ0YvECZwX8wBJMvfIjKNB51EoDTL9p8vUI4qt8sid5xk4ra00W6gM7eVZ');


  var elements = stripe.elements();

  var style = {
    base: {
      iconColor: '#666EE8',
      color: '#31325F',
      lineHeight: '40px',
      fontWeight: 300,
      fontFamily: 'Helvetica Neue',
      fontSize: '15px',

      '::placeholder': {
        color: '#CFD7E0',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };

  // var card = elements.create('card', {style: style});

  // // Add an instance of the card Element into the `card-element` <div>
  // card.mount('#card-element');


  let cardNumberElement = elements.create("cardNumber", {
    style: style,
    placeholder: "XXXX-XXXX-XXXX-XXXX"
  })

  cardNumberElement.mount("#card-number-element");


  var cardExpiryElement = elements.create('cardExpiry', {
    style: style,
    placeholder: "MM/YY"
  });
  cardExpiryElement.mount('#card-expiry-element');

  var cardCvcElement = elements.create('cardCvc', {
    style: style,
    placeholder: "XXX"
  });
  cardCvcElement.mount('#card-cvc-element');

  document.getElementById("payment-form").addEventListener("submit", showAlert);
  function showAlert() {
    console.log(cardNumberElement.mount("#card-number-element"))
    let cardNumberValue = document.getElementById("cards-number-element").value;
    //let cardNumberElement=document.getElementById("CardNumberIdenetity").value;
    stripe.createToken(cardNumberValue).then(function (result) {
      if (result.error) {
        console.log(result.error);
      }
      else {
        console.log(result.token);
      }
    });
  }

