export const POLICY_LINKS = [
  { label: "Privacy Policy", href: "/policy/privacy" },
  { label: "Terms & Conditions", href: "/policy/terms" },
  { label: "Shipping Policy", href: "/policy/shipping" },
  { label: "Return & Exchange", href: "/policy/returns" },
  { label: "Refund Policy", href: "/policy/refund" },
  { label: "Cancellation Policy", href: "/policy/cancellation" },
  { label: "Cookie Policy", href: "/policy/cookies" },
  { label: "Payment & Security", href: "/policy/payment-security" },
  { label: "Disclaimer", href: "/policy/disclaimer" },
];

export const SUPPORT_EMAIL = "support@quicksin.in";
export const SITE_URL = "https://quicksin.in";

export function PolicyPage({ title, intro, children }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-foreground">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      <p className="mb-4 text-sm text-foreground">
        Last Updated: {new Date().toLocaleDateString()}
      </p>
      {intro ? <p className="mb-6">{intro}</p> : null}
      {children}
    </div>
  );
}

export function Section({ title, children }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-8 mb-3">{title}</h2>
      {children}
    </>
  );
}

export function P({ children }) {
  return <p className="mb-4">{children}</p>;
}

export function List({ items }) {
  return (
    <ul className="list-disc pl-6 mb-4 space-y-2">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

export function ContactBlock({ label = "If you have any questions, please contact us:" }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-8 mb-3">Contact Us</h2>
      <p className="mb-4">{label}</p>
      <p className="font-medium">
        Email: {SUPPORT_EMAIL} <br />
        Website: {SITE_URL}
      </p>
    </>
  );
}
