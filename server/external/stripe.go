package external

import (
	"os"

	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/charge"
)

func StripeProcessCharge(price int64, email string) (*stripe.Charge, error) {
	stripeAPIKey := os.Getenv("STRIPE_API_KEY")
	stripe.Key = stripeAPIKey

	charge, err := charge.New(&stripe.ChargeParams{
		Amount:       stripe.Int64(price),
		Currency:     stripe.String(string(stripe.CurrencyUSD)),
		Source:       &stripe.SourceParams{Token: stripe.String("tok_visa")},
		ReceiptEmail: stripe.String(email)})

	if err != nil {
		return &stripe.Charge{}, err
	}

	return charge, nil
}
