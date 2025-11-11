// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Helper: get amount from preset or custom field
function getAmount() {
  const preset = document.getElementById("amountPreset").value;
  const custom = document.getElementById("amountCustom").value;

  let amount = null;

  if (custom && Number(custom) > 0) {
    amount = Number(custom).toFixed(2);
  } else if (preset) {
    amount = Number(preset).toFixed(2);
  }

  return amount;
}

// Render PayPal Buttons
if (window.paypal) {
  paypal
    .Buttons({
      style: {
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "paypal",
      },

      createOrder: function (data, actions) {
        const amount = getAmount();
        if (!amount) {
          alert("Please select or enter an amount before continuing.");
          throw new Error("No amount selected");
        }

        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount,
              },
              description: "Consulting services payment",
            },
          ],
        });
      },

      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          alert(
            `Payment completed. Thank you, ${details.payer.name.given_name}!`
          );
          // TODO: optional – redirect to a thank-you page, fire analytics, etc.
        });
      },

      onError: function (err) {
        console.error(err);
        alert("There was an error processing the payment. Please try again.");
      },
    })
    .render("#paypal-button-container");
}