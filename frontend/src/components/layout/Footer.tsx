import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Smartphone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-gray-50 pt-16 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="text-xl font-bold text-primary-600">Cyber</span>
                            <span className="text-xl font-bold text-secondary-500">Bandhu</span>
                        </div>
                        <p className="text-gray-600 mb-4">Affordable and secure doorstep digital assistance for students in rural and semi-urban India.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-500 hover:text-primary-600">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-primary-600">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-primary-600">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/services" className="text-gray-600 hover:text-primary-600">Our Services</Link>
                            </li>
                            <li>
                                <Link to="/how-it-works" className="text-gray-600 hover:text-primary-600">How It Works</Link>
                            </li>
                            <li>
                                <Link to="/join-us" className="text-gray-600 hover:text-primary-600">Join as Digital Assistant</Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-gray-600 hover:text-primary-600">FAQ</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 hover:text-primary-600">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Our Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/services#form-filling" className="text-gray-600 hover:text-primary-600">Form Filling Assistance</Link>
                            </li>
                            <li>
                                <Link to="/services#college-help" className="text-gray-600 hover:text-primary-600">College Admissions Help</Link>
                            </li>
                            <li>
                                <Link to="/services#scholarship" className="text-gray-600 hover:text-primary-600">Scholarship Applications</Link>
                            </li>
                            <li>
                                <Link to="/services#digital-safety" className="text-gray-600 hover:text-primary-600">Digital Safety</Link>
                            </li>
                            <li>
                                <Link to="/services#career-guidance" className="text-gray-600 hover:text-primary-600">Career Guidance</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <Smartphone className="mr-2 h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-600">+91 9876543210</span>
                            </li>
                            <li className="flex items-start">
                                <Mail className="mr-2 h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-600">ranadebsaha@yahoo.com</span>
                            </li>
                            <li className="flex items-start">
                                <MapPin className="mr-2 h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-600">Katwa, Purba Bardhaman, West Bengal, India - 713150</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 mt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} Cyber Bandhu. All rights reserved.</p>
                        <div className="mt-4 md:mt-0">
                            <ul className="flex space-x-6">
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">Terms of Service</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
