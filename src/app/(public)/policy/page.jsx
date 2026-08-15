import Link from "next/link";
import { POLICY_LINKS, SUPPORT_EMAIL } from "./_components/PolicyUI";

export const metadata = {
  title: "Policies | Quick",
  description:
    "All Quick store policies — privacy, terms, shipping, returns, refunds, cancellation, cookies, payments and disclaimer.",
};

const DESCRIPTIONS = {
  "/policy/privacy": "How we collect, use and protect your personal data.",
  "/policy/terms": "The rules that apply when you use Quick.",
  "/policy/shipping": "Delivery timelines, charges and tracking.",
  "/policy/returns": "How to return or exchange a product you received.",
  "/policy/refund": "When refunds are issued and how long they take.",
  "/policy/cancellation": "Cancelling an order before it is delivered.",
  "/policy/cookies": "Cookies we use and how to control them.",
  "/policy/payment-security": "Accepted payment methods and how we keep them safe.",
  "/policy/disclaimer": "Limits of the information published on this website.",
};

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-foreground">
      <h1 className="text-4xl font-bold mb-6">Our Policies</h1>
      <p className="mb-8">
        Everything you need to know about shopping with <strong>Quick</strong> —
        how we handle your data, your orders, and your money. Pick a policy
        below to read it in full.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {POLICY_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="block rounded-lg border border-gray-300 p-5 transition-all hover:border-yellow-400 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold mb-1">{label}</h2>
            <p className="text-sm opacity-80">{DESCRIPTIONS[href]}</p>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-sm">
        Still not sure about something? Write to us at{" "}
        <span className="font-medium">{SUPPORT_EMAIL}</span> and we will get
        back to you.
      </p>
    </div>
  );
}
