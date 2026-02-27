export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-500">
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-6">
        Welcome to <strong>Quick</strong> (quicksin.in). Your privacy is important to us.
        This Privacy Policy explains how we collect, use, disclose, and safeguard
        your information when you visit our website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        1. Information We Collect
      </h2>
      <p className="mb-4">
        We may collect personal information such as your name, email address,
        phone number, shipping address, billing details, and payment information
        when you make a purchase or create an account.
      </p>
      <p className="mb-4">
        We may also collect non-personal information such as browser type, IP
        address, device information, and browsing behavior through cookies and
        analytics tools.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>To process and fulfill your orders</li>
        <li>To improve our website and customer experience</li>
        <li>To send order updates and promotional emails</li>
        <li>To prevent fraud and enhance security</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        3. Sharing Your Information
      </h2>
      <p className="mb-4">
        We do not sell your personal information. However, we may share your
        information with trusted third parties such as payment gateways,
        shipping partners, and analytics providers to operate our business
        effectively.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        4. Cookies & Tracking Technologies
      </h2>
      <p className="mb-4">
        Quick uses cookies to enhance user experience, analyze traffic, and
        personalize content. You can disable cookies in your browser settings,
        but some features of the website may not function properly.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        5. Data Security
      </h2>
      <p className="mb-4">
        We implement reasonable security measures to protect your personal
        information. However, no method of transmission over the internet is
        100% secure.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        6. Your Rights
      </h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal
        information. To make such requests, please contact us using the details
        provided below.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        7. Third-Party Links
      </h2>
      <p className="mb-4">
        Our website may contain links to third-party websites. We are not
        responsible for the privacy practices of those websites.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        8. Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with an updated revision date.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        9. Contact Us
      </h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, please contact us:
      </p>
      <p className="font-medium">
        Email: support@quicksin.in <br />
        Website: https://quicksin.in
      </p>
    </div>
  );
}