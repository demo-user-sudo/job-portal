import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="container px-4 2xl:px-20 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-3 mt-20">
      <div className="flex items-center gap-4">
        <a href="/" aria-label="Home">
          <img width={160} src={assets.logo} alt="Company logo" />
        </a>
        <div className="h-4 border-l-2 border-gray-500 hidden lg:block"></div>
        <p className="hidden lg:block text-sm text-gray-500">
          Copyright © Rashid_C_2025 | All rights reserved.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://www.facebook.com/anurashidc/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Facebook profile"
        >
          <img width={38} src={assets.facebook_icon} alt="Facebook icon" />
        </a>
        <a
          href="https://www.instagram.com/rashidc___/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Instagram profile"
        >
          <img width={38} src={assets.instagram_icon} alt="Instagram icon" />
        </a>
        <a
          href="https://rashidc.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit personal website"
        >
          <img width={38} src={assets.twitter_icon} alt="Twitter icon" />
        </a>
      </div>
      <p className="text-sm text-gray-500 sm:hidden">
        Copyright © Rashid_C_2025 | All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
