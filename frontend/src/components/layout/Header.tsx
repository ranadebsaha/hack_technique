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
        <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center space-x-2">
                    <img
    src="https://res.cloudinary.com/dd0youa8w/image/upload/v1757505100/generated-image_stjkyo.png"
    alt="Cyber Bandhu Logo"
    className="h-12 w-12" 
  />
                        <span className="text-2xl font-bold text-primary-600">Cyber</span>
                        <span className="text-2xl font-bold text-secondary-500">Bandhu</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">Home</Link>
                        <Link to="/services" className="text-gray-700 hover:text-primary-600 font-medium">Services</Link>
                        <Link to="/how-it-works" className="text-gray-700 hover:text-primary-600 font-medium">How It Works</Link>
                        <Link to="/join-us" className="text-gray-700 hover:text-primary-600 font-medium">Join Us</Link>
                        <Link to="/faq" className="text-gray-700 hover:text-primary-600 font-medium">FAQ</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium">Contact</Link>
                    </nav>
                    <div className="hidden md:flex items-center space-x-4">
                        <Button variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button className="bg-secondary-500 hover:bg-secondary-600">
                            <Link to="/register">Register Now</Link>
                        </Button>
                    </div>
                    <div className="md:hidden">
                        <button type="button" className="p-2 rounded-md text-gray-700" onClick={toggleMenu}>
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden py-4">
                        <div className="flex flex-col space-y-4">
                            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium px-3 py-2" onClick={toggleMenu}>Home</Link>
                            <Link to="/services" className="text-gray-700 hover:text-primary-600 font-medium px-3 py-2" onClick={toggleMenu}>Services</Link>
                            <Link to="/how-it-works" className="text-gray-700 hover:text-primary-600 font-medium px-3 py-2" onClick={toggleMenu}>How It Works</Link>
                            <Link to="/join-us" className="text-gray-700 hover:text-primary-600 font-medium px-3 py-2" onClick={toggleMenu}>Join Us</Link>
                            <Link to="/faq" className="text-gray-700 hover:text-primary-600 font-medium px-3 py-2" onClick={toggleMenu}>FAQ</Link>
                            <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium px-3 py-2" onClick={toggleMenu}>Contact</Link>
                            <Button variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button className="bg-secondary-500 hover:bg-secondary-600 mt-2">
                                <Link to="/register">Register Now</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};
