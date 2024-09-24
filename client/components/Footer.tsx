import Image from "next/image";
import doug from '../public/facing_left.png';
import logo from '../public/diggr.png';

import { MdOutlineCopyright } from "react-icons/md";
import { FaLinkedin, FaGithub, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex w-full h-full px-4 py-12 border-t-[2px] border-gold">
      <div className="grid grid-cols-3 w-full">
        <div className="flex flex-col col-span-1 justify-between">
          <div className="flex items-center gap-x-3">
            <Image src={logo} width={70} height={70} alt="Logo" />
            <Image src={doug} width={70} height={70} alt="Character" />
          </div>
          <div className="flex items-center">
            <p className="text-xs mr-2">Diggr</p>
            <MdOutlineCopyright size={10} />
            <p className="text-xs ml-2">2024</p>
          </div>
        </div>
        <div className="flex flex-col col-span-1 gap-y-6">
          <a
            href="#"
            className="text-base font-semibold"
          >
            FAQs
          </a>
          <a
            href="#"
            className="text-base font-semibold"
          >
            About
          </a>
          <a
            href="#"
            className="text-base font-semibold"
          >
            Support
          </a>
        </div>
        <div className="flex flex-col col-span-1 gap-y-4">
          <h1 className="text-xl font-semibold">
            Connect with us!
          </h1>
          <div className="flex items-center gap-x-4">
            <div className="rounded-full p-3 bg-gold">
              <FaLinkedin size={15} />
            </div>
            <div className="rounded-full p-3 bg-gold">
              <FaGithub size={15} />
            </div>
            <div className="rounded-full p-3 bg-gold">
              <FaTiktok size={15} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Footer;