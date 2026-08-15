import {
  PolicyPage,
  Section,
  P,
  List,
  ContactBlock,
} from "../_components/PolicyUI";

export const metadata = {
  title: "Refund Policy | Quick",
  description:
    "How refunds are approved, the refund modes available and how long the money takes to reach you.",
};

export default function Page() {
  return (
    <PolicyPage
      title="Refund Policy"
      intro={
        <>
          This policy explains when <strong>Quick</strong> issues a refund, how
          the money is returned to you, and how long it takes.
        </>
      }
    >
      <Section title="1. When a Refund Is Issued">
        <List
          items={[
            "An approved return passes our quality check",
            "You cancel an order before it is dispatched",
            "The order is undeliverable or lost in transit",
            "A product is out of stock after payment and cannot be fulfilled",
            "A duplicate or failed payment is debited from your account",
          ]}
        />
      </Section>

      <Section title="2. Refund Mode">
        <P>
          Prepaid orders are refunded to the original payment method — the same
          card, UPI ID, wallet or bank account used at checkout. For Cash on
          Delivery orders, the refund is credited to the bank account details
          you share with our support team.
        </P>
      </Section>

      <Section title="3. Refund Timelines">
        <List
          items={[
            "Refund initiated within 2 business days of return approval or cancellation",
            "UPI and wallets: 1–3 business days after initiation",
            "Credit and debit cards: 5–7 business days after initiation",
            "Net banking and bank transfers: 5–10 business days after initiation",
          ]}
        />
        <P>
          Once the refund is initiated from our side, the actual credit time
          depends on your bank or payment provider.
        </P>
      </Section>

      <Section title="4. Deductions">
        <P>
          Shipping charges and Cash on Delivery handling fees already paid are
          non-refundable, except when the return is caused by a damaged,
          defective or incorrect product. Charges for failed deliveries due to
          an incorrect address or repeated unavailability may also be deducted.
        </P>
      </Section>

      <Section title="5. Partial Refunds">
        <P>
          If you return only part of a multi-item order, the refund covers the
          value of the returned items. Discounts applied at the order level are
          adjusted proportionately, and a promotion that required a minimum
          order value may be reversed if the remaining order no longer qualifies.
        </P>
      </Section>

      <Section title="6. Failed Payments">
        <P>
          If money is debited but the order is not confirmed, the amount is
          usually auto-reversed by your bank within 5–7 business days. If it is
          not, share the transaction reference with us and we will follow it up
          with the payment gateway.
        </P>
      </Section>

      <Section title="7. Refund Not Received">
        <P>
          If the refund timeline above has passed, first check your bank
          statement and the refund reference shared with you. If the amount is
          still missing, contact us with your order ID and we will investigate.
        </P>
      </Section>

      <ContactBlock label="For refund related queries, contact us at:" />
    </PolicyPage>
  );
}
