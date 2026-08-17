import {
  PolicyPage,
  Section,
  P,
  List,
  ContactBlock,
} from "../_components/PolicyUI";

export const metadata = {
  title: "Payment & Security Policy | Quick",
  description:
    "Accepted payment methods, pricing and taxes, and the security measures Quick uses to protect your transactions.",
  alternates: {
    canonical: "https://quicksin.in/policy/payment-security",
  },
  openGraph: {
    title: "Payment & Security Policy | Quick",
    description: "Accepted payment methods, pricing and taxes, and the security measures Quick uses to protect your transactions.",
    url: "https://quicksin.in/policy/payment-security",
    siteName: "Quick",
  },
};

export default function Page() {
  return (
    <PolicyPage
      title="Payment & Security Policy"
      intro={
        <>
          This policy covers the payment methods accepted on{" "}
          <strong>Quick</strong> and the measures we take to keep your
          transactions safe.
        </>
      }
    >
      <Section title="1. Accepted Payment Methods">
        <List
          items={[
            "UPI (Google Pay, PhonePe, Paytm and other UPI apps)",
            "Credit and debit cards (Visa, Mastercard, RuPay, American Express)",
            "Net banking from major Indian banks",
            "Wallets supported by our payment gateway",
            "Cash on Delivery, where available for your pincode",
          ]}
        />
      </Section>

      <Section title="2. Pricing and Taxes">
        <P>
          All prices are listed in Indian Rupees (INR) and are inclusive of
          applicable taxes unless stated otherwise. Any shipping charge or Cash
          on Delivery handling fee is shown separately at checkout before you
          pay.
        </P>
      </Section>

      <Section title="3. Payment Security">
        <P>
          Payments are processed by PCI-DSS compliant payment gateways over an
          encrypted HTTPS connection. Quick does not store your full card
          number, CVV or UPI PIN on its servers — this data is handled entirely
          by the payment gateway.
        </P>
      </Section>

      <Section title="4. Account Security">
        <P>
          Your account is protected by your password and, where enabled, by
          one-time passwords. Keep your credentials confidential and sign out on
          shared devices. You are responsible for activity carried out through
          your account.
        </P>
      </Section>

      <Section title="5. Fraud Prevention">
        <P>
          We monitor transactions for unusual patterns and may hold, verify or
          cancel an order that appears fraudulent. We may also request
          additional verification before dispatching high-value orders.
        </P>
      </Section>

      <Section title="6. Beware of Phishing">
        <P>
          Quick will never ask you for your password, card CVV, UPI PIN or an
          OTP over a call, email or message. Do not share these with anyone
          claiming to represent us, and report such attempts to our support
          team immediately.
        </P>
      </Section>

      <Section title="7. Failed Transactions">
        <P>
          If an amount is debited without the order being confirmed, it is
          normally reversed by your bank within 5–7 business days. See our{" "}
          <a className="underline" href="/policy/refund">
            Refund Policy
          </a>{" "}
          for details.
        </P>
      </Section>

      <ContactBlock label="To report a payment or security concern, contact us at:" />
    </PolicyPage>
  );
}
