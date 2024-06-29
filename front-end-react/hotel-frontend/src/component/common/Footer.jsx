const Footer = () => {


    return (
        <div className="min-h-7 flex flex-col">
      <div className="flex-grow">  
      </div>
      <footer className="bg-teal-500 w-full h-[60px] flex items-center justify-center text-white font-mono font-bold text-xl">
        <span>
          Oceanview Hotel | All Right Reserved &copy;{new Date().getFullYear()} Rayyan Sheikh
        </span>
      </footer>
    </div>
    );
};

export default Footer;