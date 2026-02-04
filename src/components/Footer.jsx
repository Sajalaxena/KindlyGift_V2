import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaHeart
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative mt-28">
      
      {/* Soft divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-pink-400/40 to-transparent mb-12" />

      <div className="glass max-w-7xl mx-auto px-8 py-16 rounded-t-3xl text-gray-700">
        
        {/* Brand */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="font-heading text-3xl md:text-4xl text-pink-600 flex items-center justify-center gap-2">
            KindlyGift <FaHeart className="text-pink-500" />
          </h3>

          <p className="mt-5 text-lg leading-relaxed">
            Turning moments into memories with glowing gifts made from love.
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Valentine’s Day • Birthdays • Special Moments
          </p>
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-8 mt-12">
          
          <SocialIcon href="#" label="Instagram">
            <FaInstagram />
          </SocialIcon>

          <SocialIcon href="#" label="Facebook">
            <FaFacebookF />
          </SocialIcon>

          <SocialIcon href="#" label="Twitter">
            <FaTwitter />
          </SocialIcon>

        </div>

        {/* Contact */}
        <div className="text-center mt-12 text-sm">
          <p>
            Contact us:{" "}
            <a
              href="mailto:support@kindlygift.com"
              className="text-pink-600 font-medium hover:underline"
            >
              support@kindlygift.com
            </a>
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center mt-10 text-xs text-gray-500">
          © 2026 KindlyGift. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* Reusable icon wrapper */
function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="
        w-12 h-12
        rounded-full
        glass
        flex items-center justify-center
        text-pink-600
        text-xl
        shadow-lg
        hover:scale-110
        hover:text-white
        hover:bg-gradient-to-br
        hover:from-pink-500
        hover:to-rose-500
        transition
      "
    >
      {children}
    </a>
  );
}
