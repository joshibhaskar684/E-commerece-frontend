import {
  PolicyPage,
  Section,
  P,
  List,
  ContactBlock,
} from "../_components/PolicyUI";

export const metadata = {
  title: "Return & Exchange Policy | Quick",
  description:
    "Return window, eligibility conditions, non-returnable items and the step-by-step return process at Quick.",
  alternates: {
    canonical: "https://quicksin.in/policy/returns",
  },
  openGraph: {
    title: "Return & Exchange Policy | Quick",
    description: "Return window, eligibility conditions, non-returnable items and the step-by-step return process at Quick.",
    url: "https://quicksin.in/policy/returns",
    siteName: "Quick",
  },
};

export default function Page() {
  return (
    <PolicyPage
      title="Return & Exchange Policy"
      intro={
        <>
          We want you to be happy with what you buy from <strong>Quick</strong>.
          If a product is not right for you, this policy explains when and how
          you can return or exchange it.
        </>
      }
    >
      <Section title="1. Return Window">
        <P>
          Most products can be returned within <strong>7 days</strong> of
          delivery. The exact return window for a product is shown on its
          product page and may be shorter for certain categories.
        </P>
      </Section>

      <Section title="2. Eligibility Conditions">
        <List
          items={[
            "The product is unused, unwashed and undamaged",
            "All original tags, labels and accessories are intact",
            "The product is returned in its original packaging",
            "Free items or combo components that came with the product are also returned",
            "Proof of purchase (order ID or invoice) is available",
          ]}
        />
      </Section>

      <Section title="3. Non-Returnable Items">
        <P>
          For hygiene and safety reasons, the following are not eligible for
          return or exchange unless they arrive damaged or incorrect:
        </P>
        <List
          items={[
            "Innerwear, lingerie and socks",
            "Personal care, cosmetics and grooming products",
            "Perishable and food items",
            "Customised or made-to-order products",
            "Digital products, gift cards and vouchers",
            "Products marked 'Non-returnable' on the product page",
          ]}
        />
      </Section>

      <Section title="4. How to Raise a Return">
        <List
          items={[
            "Go to Account → Orders and open the order you want to return",
            "Select the item and choose 'Return' or 'Exchange', then pick a reason",
            "Upload clear photographs if the item is damaged, defective or incorrect",
            "Our team reviews the request, usually within 24–48 hours",
            "Once approved, a reverse pickup is scheduled at your address",
          ]}
        />
        <P>
          If reverse pickup is not available at your pincode, we will ask you to
          self-ship the product and reimburse reasonable courier charges after
          verification.
        </P>
      </Section>

      <Section title="5. Exchanges">
        <P>
          Exchanges are offered for size or colour variants of the same product,
          subject to stock availability. If the requested variant is
          unavailable, the return is converted into a refund as per our{" "}
          <a className="underline" href="/policy/refund">
            Refund Policy
          </a>
          .
        </P>
      </Section>

      <Section title="6. Quality Check">
        <P>
          Every returned item goes through a quality check at our warehouse. If
          the product fails the check — for example, it shows signs of use, is
          missing parts or does not match the item ordered — the return is
          rejected and the product is shipped back to you.
        </P>
      </Section>

      <Section title="7. Damaged, Defective or Wrong Items">
        <P>
          Report damaged, defective or wrong deliveries within 48 hours of
          receiving the order. These are picked up free of cost and replaced or
          refunded in full, including shipping charges.
        </P>
      </Section>

      <ContactBlock label="For help with a return or exchange, contact us at:" />
    </PolicyPage>
  );
}
