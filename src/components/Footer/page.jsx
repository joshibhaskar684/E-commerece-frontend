import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowRight,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative text-white bg-yellow-300 ">
      {/* Soft Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-blue-500/5 opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* Brand */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-foreground roboto-slab">
            <img src="/QuickLogo.png" alt="logo image   " className='w-[120px] h-[60px] '></img>
          </h2>
          <p className="mt-4 text-sm leading-relaxed font-semibold text-white">
           Get Max Product at a Reasonable price and with a Hassle free Experience and better quality.
                     </p>
        </div>

        {/* Quick Links */}
        <FooterSection title="Quick Links">
          {[
            { label: 'About Us', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'products', href: '/products' },
            { label: 'cart', href: '/cart' },
          ].map((item, idx) => (
            <FooterLink key={idx} {...item} />
          ))}
        </FooterSection>

        {/* Legal */}
        <FooterSection title="Legal">
          {[
            { label: 'Privacy Policy', href: '/legal/privacy' },
            { label: 'Terms of Service', href: '/legal/terms' },
            { label: 'Disclaimer', href: '/legal/disclaimer' },
          ].map((item, idx) => (
            <FooterLink key={idx} {...item} />
          ))}
        </FooterSection>

        {/* Services */}
        <FooterSection title="Other App">
          {[
            { label: 'Quick App', href: '#' },
            { label: 'Seller-Quick App ', href: '#' },
            { label: 'Delivery-Quick App', href: '#' },
          ].map((item, idx) => (
            <FooterLink key={idx} {...item} />
          ))}
        </FooterSection>

        {/* Social */}
        <div className="lg:col-span-1">
          <h3 className="text-sm font-semibold text-white roboto-slab uppercase tracking-wider mb-4">
            Connect With Us
          </h3>

          <div className="flex space-x-4">
            {[
              { icon: FaFacebookF, href: 'https://facebook.com' },
              { icon: FaTwitter, href: 'https://twitter.com' },
              { icon: FaInstagram, href: 'https://www.instagram.com/vhbuyio' },
              { icon: FaLinkedinIn, href: 'https://linkedin.com' },
            ].map(({ icon: Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-background text-foreground hover:text-white hover:bg-yellow-500 rounded-full transition-all duration-200 transform hover:scale-110"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <p className="mt-6 text-sm text-white font-semibold">
            Email:{' '}
            <a
              href="mailto:joshibhaskar684@gmail.com"
              className="text-white font-semibold hover:text-white underline underline-offset-2"
            >
              joshibhaskar684@gmail.com
            </a>
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-background border-t border-gray-800 py-5 text-center text-xs sm:text-sm text-foreground">
        © {new Date().getFullYear()} Quick. All rights reserved.
      </div>
    </footer>
  );
}

function FooterSection({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 roboto-slab">
        {title}
      </h3>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ label, href, external }) {
  return (
    <li>
      <a
        href={href}
        target={external ? '_blank' : '_self'}
        rel={external ? 'noopener noreferrer' : undefined}
        className="flex items-center gap-2 text-white hover:text-black font-semibold transition-all"
      >
        <FaArrowRight className="text-white group-hover:translate-x-1 transition-transform duration-200" />
        {label}
      </a>
    </li>
  );
}
