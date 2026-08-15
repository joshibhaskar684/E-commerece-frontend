import {
  PolicyPage,
  Section,
  P,
  ContactBlock,
} from "../_components/PolicyUI";

export const metadata = {
  title: "Disclaimer | Quick",
  description:
    "Limits of liability and accuracy of product information, pricing and third-party content on Quick.",
};

export default function Page() {
  return (
    <PolicyPage
      title="Disclaimer"
      intro={
        <>
          The information on <strong>Quick</strong> (quicksin.in) is published in
          good faith and for general information only. This disclaimer explains
          the limits of what we can guarantee.
        </>
      }
    >
      <Section title="1. Product Information">
        <P>
          We make every effort to describe products accurately, but we do not
          warrant that descriptions, specifications, images or other content are
          error-free or current. Product images are for representation and the
          actual colour or packaging may vary slightly.
        </P>
      </Section>

      <Section title="2. Pricing Errors">
        <P>
          If a product is listed at an incorrect price due to a typographical or
          system error, we reserve the right to cancel the affected order and
          refund any amount paid, even after the order is confirmed.
        </P>
      </Section>

      <Section title="3. No Professional Advice">
        <P>
          Content on this website, including blogs, guides and product usage
          notes, is not medical, legal, financial or other professional advice.
          Always read the manufacturer's instructions and consult a qualified
          professional where appropriate.
        </P>
      </Section>

      <Section title="4. External Links">
        <P>
          Our website may link to third-party sites. We do not control their
          content, products or practices, and their inclusion does not imply an
          endorsement. Visiting them is at your own risk.
        </P>
      </Section>

      <Section title="5. Reviews and User Content">
        <P>
          Ratings and reviews reflect the personal opinions of individual
          customers, not those of Quick. We may remove content that is abusive,
          misleading or violates our terms.
        </P>
      </Section>

      <Section title="6. Availability of the Website">
        <P>
          The website is provided on an "as is" and "as available" basis. We do
          not guarantee uninterrupted or error-free operation, and we may
          suspend access for maintenance without prior notice.
        </P>
      </Section>

      <Section title="7. Limitation of Liability">
        <P>
          To the extent permitted by law, Quick is not liable for any indirect,
          incidental or consequential loss arising from the use of this website
          or reliance on its content. Nothing here limits liability that cannot
          be excluded under applicable law.
        </P>
      </Section>

      <ContactBlock label="For questions about this disclaimer, contact us at:" />
    </PolicyPage>
  );
}
