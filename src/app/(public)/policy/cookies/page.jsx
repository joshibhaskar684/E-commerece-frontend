import {
  PolicyPage,
  Section,
  P,
  List,
  ContactBlock,
} from "../_components/PolicyUI";

export const metadata = {
  title: "Cookie Policy | Quick",
  description:
    "The cookies Quick uses, what they are used for, and how you can control or disable them.",
  alternates: {
    canonical: "https://quicksin.in/policy/cookies",
  },
  openGraph: {
    title: "Cookie Policy | Quick",
    description: "The cookies Quick uses, what they are used for, and how you can control or disable them.",
    url: "https://quicksin.in/policy/cookies",
    siteName: "Quick",
  },
};

export default function Page() {
  return (
    <PolicyPage
      title="Cookie Policy"
      intro={
        <>
          This Cookie Policy explains what cookies are, which ones{" "}
          <strong>Quick</strong> (quicksin.in) uses, and how you can control
          them. It should be read together with our{" "}
          <a className="underline" href="/policy/privacy">
            Privacy Policy
          </a>
          .
        </>
      }
    >
      <Section title="1. What Are Cookies">
        <P>
          Cookies are small text files stored on your device when you visit a
          website. They let the site remember your actions and preferences over
          time, so you do not have to re-enter them on every page or visit. We
          also use similar technologies such as local storage and pixels.
        </P>
      </Section>

      <Section title="2. Types of Cookies We Use">
        <List
          items={[
            "Essential cookies — keep you signed in, remember your cart and secure the checkout. The site cannot work without these.",
            "Preference cookies — remember your language, theme and recently viewed products.",
            "Analytics cookies — help us understand which pages are used, so we can improve them.",
            "Marketing cookies — used to show relevant offers and measure campaign performance.",
          ]}
        />
      </Section>

      <Section title="3. Third-Party Cookies">
        <P>
          Some cookies are set by our service providers — analytics tools,
          payment gateways and advertising partners — when their content or
          scripts load on our pages. These providers process data under their
          own privacy policies.
        </P>
      </Section>

      <Section title="4. How Long Cookies Last">
        <P>
          Session cookies are deleted when you close your browser. Persistent
          cookies remain on your device until they expire or you delete them,
          typically between a few days and a year depending on their purpose.
        </P>
      </Section>

      <Section title="5. Managing Cookies">
        <P>
          You can delete or block cookies through your browser settings, and
          most browsers let you block third-party cookies specifically. Please
          note that blocking essential cookies will break sign-in, cart and
          checkout functionality on Quick.
        </P>
      </Section>

      <Section title="6. Changes to This Policy">
        <P>
          We may update this Cookie Policy as we add or remove services.
          Changes are posted on this page with a revised date at the top.
        </P>
      </Section>

      <ContactBlock label="For questions about our use of cookies, contact us at:" />
    </PolicyPage>
  );
}
