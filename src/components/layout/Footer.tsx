import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-gray-50 text-gray-700">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          
          {/* Column 1: Organization Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Image 
                src="/logos/logo-is-blue-nobg.png" 
                alt="Impact Stories Logo" 
                width={32} 
                height={32} 
                className="object-contain"
              />
              <span className="text-lg font-bold text-gray-900 tracking-tight">
                Impact Stories
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-600">
              A global foundation dedicated to sharing stories of positive change, sustainable development, and community empowerment.
            </p>
          </div>

          {/* Column 2: Contact Info & Address */}
          <div className="col-span-1">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">Contact Us</h3>
            <address className="not-italic text-sm text-gray-600 space-y-2">
              <p>Impact Stories Foundation</p>
              <p>123 Impact Avenue, Suite 400</p>
              <p>Jakarta, Indonesia 10110</p>
              <p className="pt-2">
                <a href="mailto:contact@impactstories.org" className="hover:text-primary transition-colors">contact@impactstories.org</a>
              </p>
              <p>
                <a href="tel:+622112345678" className="hover:text-primary transition-colors">+62 21 1234 5678</a>
              </p>
            </address>
          </div>

          {/* Column 3: Links */}
          <div className="col-span-1">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">Discover</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/blog" className="hover:text-primary transition-colors">Latest Stories</Link></li>
              <li><Link href="/blog?category=Sustainability" className="hover:text-primary transition-colors">Sustainability</Link></li>
              <li><Link href="/blog?category=Global+Issues" className="hover:text-primary transition-colors">Global Issues</Link></li>
              <li><Link href="/blog?category=Non-Profit" className="hover:text-primary transition-colors">Non-Profit Work</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal & Social */}
          <div className="col-span-1">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">Transparency</h3>
            <ul className="space-y-3 text-sm text-gray-600 mb-6">
              <li><Link href="#" className="hover:text-primary transition-colors">Annual Reports</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Financials</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-200 pt-8 sm:flex-row gap-4">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            © {currentYear} Impact Stories Foundation. All rights reserved. <br className="sm:hidden" />
            Written by Wayan Phantom Megaditha.
          </p>
          <div className="flex gap-4">
             {/* Social placeholders */}
             <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
             </a>
             <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
