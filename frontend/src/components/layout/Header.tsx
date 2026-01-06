import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (window.innerWidth >= 768 && isServicesOpen) {
            setIsServicesOpen(false);
        }
    };

    useEffect(() => {
        if (!isMenuOpen) setIsServicesOpen(false);
    }, [isMenuOpen]);

    return (
        <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-md border-b-2 border-primary-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <img
    src="https://res.cloudinary.com/dd0youa8w/image/upload/v1757505100/generated-image_stjkyo.png"
    alt="Cyber Bandhu Logo"
    className="h-12 w-12" 
  />
                        <span className="text-2xl font-bold text-primary-600">Cyber</span>
                        <span className="text-2xl font-bold text-secondary-500">Bandhu</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-base text-gray-700 hover:text-primary-600 font-semibold transition-colors">Home</Link>
                        <Link to="/services" className="text-base text-gray-700 hover:text-primary-600 font-semibold transition-colors">Services</Link>
                        <Link to="/how-it-works" className="text-base text-gray-700 hover:text-primary-600 font-semibold transition-colors">How It Works</Link>
                        <Link to="/join-us" className="text-base text-gray-700 hover:text-primary-600 font-semibold transition-colors">Join Us</Link>
                        <Link to="/faq" className="text-base text-gray-700 hover:text-primary-600 font-semibold transition-colors">FAQ</Link>
                        <Link to="/contact" className="text-base text-gray-700 hover:text-primary-600 font-semibold transition-colors">Contact</Link>
                    </nav>
                    <div className="hidden md:flex items-center space-x-3">
                        <Button variant="outline" size="lg" className="border-2 border-primary-500 text-primary-700 hover:bg-primary-50 font-semibold h-11">
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold h-11 shadow-md">
                            <Link to="/register">Register Now</Link>
                        </Button>
                    </div>
                    <div className="md:hidden">
                        <button type="button" className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors" onClick={toggleMenu} aria-label="Toggle menu">
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t-2 border-gray-100">
                        <div className="flex flex-col space-y-3">
                            <Link to="/" className="text-base text-gray-700 hover:text-primary-600 font-semibold px-3 py-2 rounded-md hover:bg-primary-50 transition-colors" onClick={toggleMenu}>Home</Link>
                            <Link to="/services" className="text-base text-gray-700 hover:text-primary-600 font-semibold px-3 py-2 rounded-md hover:bg-primary-50 transition-colors" onClick={toggleMenu}>Services</Link>
                            <Link to="/how-it-works" className="text-base text-gray-700 hover:text-primary-600 font-semibold px-3 py-2 rounded-md hover:bg-primary-50 transition-colors" onClick={toggleMenu}>How It Works</Link>
                            <Link to="/join-us" className="text-base text-gray-700 hover:text-primary-600 font-semibold px-3 py-2 rounded-md hover:bg-primary-50 transition-colors" onClick={toggleMenu}>Join Us</Link>
                            <Link to="/faq" className="text-base text-gray-700 hover:text-primary-600 font-semibold px-3 py-2 rounded-md hover:bg-primary-50 transition-colors" onClick={toggleMenu}>FAQ</Link>
                            <Link to="/contact" className="text-base text-gray-700 hover:text-primary-600 font-semibold px-3 py-2 rounded-md hover:bg-primary-50 transition-colors" onClick={toggleMenu}>Contact</Link>
                            <div className="pt-2 space-y-2">
                                <Button variant="outline" size="lg" className="w-full border-2 border-primary-500 text-primary-700 hover:bg-primary-50 font-semibold">
                                    <Link to="/login">Login</Link>
                                </Button>
                                <Button size="lg" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold shadow-md">
                                    <Link to="/register">Register Now</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};
