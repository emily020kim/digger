import Image from "next/image";
import doug from '../public/facing_left.png';
import logo from '../public/diggr.png';

import { MdOutlineCopyright } from "react-icons/md";
import { FaLinkedin, FaGithub, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-full px-4 py-12 border-t-[2px] border-gold">
      <div className="md:grid md:grid-cols-3 w-full">
        <div className="flex flex-col md:col-span-1 mb-6 md:mb-0">
          <div className="flex items-center gap-x-3 mb-1">
            <Image src={logo} width={70} height={70} alt="Logo" />
            <Image src={doug} width={70} height={70} alt="Character" />
          </div>
          <div className="flex items-center">
            <p className="text-xs mr-1">Diggr</p>
            <MdOutlineCopyright size={10} />
            <p className="text-xs ml-1">2024</p>
          </div>
        </div>
        <div className="flex flex-col md:col-span-1 gap-y-2 md:gap-y-6 mb-6 md:mb-0">
          <a
            href="/faq"
            className="text-sm md:text-base font-semibold hover:underline"
          >
            FAQs
          </a>
          <a
            href="#"
            className="text-sm md:text-base font-semibold hover:underline"
          >
            About
          </a>
          <a
            href="#"
            className="text-sm md:text-base font-semibold hover:underline"
          >
            Support
          </a>
        </div>
        <div className="flex flex-col md:col-span-1">
          <h1 className="text-base md:text-xl font-semibold mb-2 md:mb-4">
            Connect with us!
          </h1>
          <div className="flex items-center gap-x-4">
            <div className="rounded-full p-2 md:p-3 bg-gold">
              <FaLinkedin size={15} />
            </div>
            <div className="rounded-full p-2 md:p-3 bg-gold">
              <FaGithub size={15} />
            </div>
            <div className="rounded-full p-2 md:p-3 bg-gold">
              <FaTiktok size={15} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Footer;