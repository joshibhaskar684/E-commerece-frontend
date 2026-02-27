export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
      <p className="mb-4 text-sm text-gray-500">
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-6">
        Welcome to <strong>Quick</strong> (quicksin.in). By accessing or using our website,
        you agree to be bound by these Terms & Conditions. Please read them
        carefully before making a purchase.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. General Information</h2>
      <p className="mb-4">
        Quick is an ecommerce platform that sells products directly to customers.
        By using our website, you confirm that you are at least 18 years old or
        accessing the site under the supervision of a parent or guardian.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. Products & Pricing</h2>
      <p className="mb-4">
        All products listed on Quick are subject to availability. We reserve the
        right to change prices, product descriptions, and availability at any
        time without prior notice.
      </p>
      <p className="mb-4">
        We strive to display product colors and images accurately, but we cannot
        guarantee that your device screen will reflect exact colors.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Orders & Payments</h2>
      <p className="mb-4">
        By placing an order, you agree that all information provided is accurate
        and complete. Quick reserves the right to cancel or refuse any order if
        fraud or unauthorized activity is suspected.
      </p>
      <p className="mb-4">
        Payments must be completed at checkout using the available payment
        methods listed on the website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. Shipping & Delivery</h2>
      <p className="mb-4">
        Delivery timelines are estimates and may vary depending on location and
        unforeseen circumstances. Quick is not responsible for delays caused by
        courier services or external factors.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. Returns & Refunds</h2>
      <p className="mb-4">
        Customers may request returns or refunds according to our Return Policy.
        Products must be returned unused and in original packaging within the
        specified return window.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">6. User Conduct</h2>
      <p className="mb-4">
        You agree not to misuse the website, attempt unauthorized access, or
        engage in fraudulent activities. Any violation may result in termination
        of your access to Quick.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">7. Intellectual Property</h2>
      <p className="mb-4">
        All content on this website, including logos, text, graphics, and images,
        is the property of Quick and may not be used without permission.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">8. Limitation of Liability</h2>
      <p className="mb-4">
        Quick shall not be liable for any indirect, incidental, or consequential
        damages arising from the use of our website or products.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">9. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to update these Terms & Conditions at any time.
        Continued use of the website after changes constitutes acceptance of
        the updated terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">10. Contact Information</h2>
      <p className="mb-4">
        If you have any questions about these Terms & Conditions, please contact us at:
      </p>
      <p className="font-medium">
        Email: support@quicksin.in <br />
        Website: https://quicksin.in
      </p>
    </div>
  );
}