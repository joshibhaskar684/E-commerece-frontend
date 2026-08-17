import {
  PolicyPage,
  Section,
  P,
  List,
  ContactBlock,
} from "../_components/PolicyUI";

export const metadata = {
  title: "Shipping Policy | Quick",
  description:
    "Delivery timelines, shipping charges, tracking and undelivered order handling at Quick.",
  alternates: {
    canonical: "https://quicksin.in/policy/shipping",
  },
  openGraph: {
    title: "Shipping Policy | Quick",
    description: "Delivery timelines, shipping charges, tracking and undelivered order handling at Quick.",
    url: "https://quicksin.in/policy/shipping",
    siteName: "Quick",
  },
};

export default function Page() {
  return (
    <PolicyPage
      title="Shipping Policy"
      intro={
        <>
          This Shipping Policy explains how <strong>Quick</strong> (quicksin.in)
          processes, packs and delivers your orders across India.
        </>
      }
    >
      <Section title="1. Order Processing">
        <P>
          Orders are processed within 1–2 business days of successful payment or
          confirmation of a Cash on Delivery order. Orders placed on Sundays or
          public holidays are processed on the next working day.
        </P>
        <P>
          You will receive an order confirmation email as soon as the order is
          placed, and a dispatch notification once the package leaves our
          warehouse.
        </P>
      </Section>

      <Section title="2. Delivery Timelines">
        <List
          items={[
            "Metro cities: 2–4 business days after dispatch",
            "Other cities and towns: 4–7 business days after dispatch",
            "Remote and hard-to-reach locations: 7–10 business days after dispatch",
          ]}
        />
        <P>
          These timelines are estimates. Delays may occur due to weather,
          strikes, courier disruptions, regional restrictions or other events
          outside our control.
        </P>
      </Section>

      <Section title="3. Shipping Charges">
        <P>
          Shipping charges, if applicable, are calculated at checkout based on
          the delivery pincode, order value and product weight. Any free
          shipping offer will be shown on the cart page before you pay.
        </P>
      </Section>

      <Section title="4. Order Tracking">
        <P>
          Once your order is dispatched, a tracking ID and courier partner link
          are shared over email and SMS. You can also track the status of every
          order from the Orders section of your Quick account.
        </P>
      </Section>

      <Section title="5. Serviceable Locations">
        <P>
          We currently deliver only within India. If your pincode is not
          serviceable, it will be flagged at checkout and you will not be able
          to place the order for that address.
        </P>
      </Section>

      <Section title="6. Failed or Undelivered Deliveries">
        <P>
          Our courier partners make up to three delivery attempts. If the
          package cannot be delivered because the address is incorrect,
          incomplete or nobody is available to receive it, the shipment is
          returned to us. In such cases, shipping charges are non-refundable and
          may be deducted from any refund issued.
        </P>
      </Section>

      <Section title="7. Damaged or Missing Packages">
        <P>
          Please do not accept a package that appears tampered with or damaged.
          If you notice a problem after delivery, report it within 48 hours with
          photographs of the package and product so we can raise a claim with
          the courier partner.
        </P>
      </Section>

      <ContactBlock label="For any shipping or delivery related query, reach us at:" />
    </PolicyPage>
  );
}
