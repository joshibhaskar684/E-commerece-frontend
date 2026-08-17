import {
  PolicyPage,
  Section,
  P,
  List,
  ContactBlock,
} from "../_components/PolicyUI";

export const metadata = {
  title: "Cancellation Policy | Quick",
  description:
    "How to cancel a Quick order, until when cancellation is allowed, and when we may cancel an order.",
  alternates: {
    canonical: "https://quicksin.in/policy/cancellation",
  },
  openGraph: {
    title: "Cancellation Policy | Quick",
    description: "How to cancel a Quick order, until when cancellation is allowed, and when we may cancel an order.",
    url: "https://quicksin.in/policy/cancellation",
    siteName: "Quick",
  },
};

export default function Page() {
  return (
    <PolicyPage
      title="Cancellation Policy"
      intro={
        <>
          Plans change. This policy explains how you can cancel an order on{" "}
          <strong>Quick</strong> and the situations in which we may cancel one.
        </>
      }
    >
      <Section title="1. Cancellation by You">
        <P>
          You can cancel an order free of cost any time before it is dispatched.
          Open Account → Orders, select the order and choose{" "}
          <strong>Cancel Order</strong>. Once the order is handed over to our
          courier partner, the cancel option is no longer available.
        </P>
      </Section>

      <Section title="2. Partial Cancellation">
        <P>
          Individual items in a multi-item order can be cancelled as long as
          that item has not been dispatched. Order-level discounts are
          recalculated on the remaining items after a partial cancellation.
        </P>
      </Section>

      <Section title="3. After Dispatch">
        <P>
          If your order has already shipped, you can refuse the delivery or
          raise a return once it arrives, as per our{" "}
          <a className="underline" href="/policy/returns">
            Return & Exchange Policy
          </a>
          .
        </P>
      </Section>

      <Section title="4. Cancellation by Quick">
        <P>We may cancel an order, in whole or in part, when:</P>
        <List
          items={[
            "The product is out of stock or has been discontinued",
            "There is a pricing, description or listing error",
            "The delivery address is outside our serviceable area",
            "The payment is not authorised or is flagged as suspicious",
            "We suspect fraud, resale or abuse of promotional offers",
            "Repeated Cash on Delivery orders from the account have been refused",
          ]}
        />
        <P>
          If we cancel a prepaid order, the full amount is refunded as per our{" "}
          <a className="underline" href="/policy/refund">
            Refund Policy
          </a>
          . We will inform you over email or SMS whenever this happens.
        </P>
      </Section>

      <Section title="5. Refund on Cancellation">
        <P>
          Refunds for cancelled prepaid orders are initiated within 2 business
          days and credited to the original payment method within the timelines
          listed in the Refund Policy.
        </P>
      </Section>

      <ContactBlock label="Need help cancelling an order? Contact us at:" />
    </PolicyPage>
  );
}
