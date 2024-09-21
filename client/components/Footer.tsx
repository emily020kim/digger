import { LuHeartHandshake } from "react-icons/lu";

const Footer = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-center mb-2">
        <p className="text-base mr-1">
          Made with love
        </p>
        <LuHeartHandshake size={15} className="text-gold"/>
      </div>
    </div>
  )
};

export default Footer;