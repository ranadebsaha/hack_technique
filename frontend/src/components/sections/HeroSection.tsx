import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
    title: string;
    subtitle: string;
    image?: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
}

export const HeroSection = ({ title, subtitle, image, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink, }: HeroSectionProps) => {
    return (
        <section className="py-12 md:py-20 lg:py-24 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                            {title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                            {subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="bg-secondary-500 hover:bg-secondary-600">
                                <Link to={primaryButtonLink}>
                                    {primaryButtonText} <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            {secondaryButtonText && secondaryButtonLink && (
                                <Button asChild size="lg" variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
                                    <Link to={secondaryButtonLink}>{secondaryButtonText}</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="relative">
                            {image ? (
                                <img src={image} alt="Digital Dost Services" className="rounded-lg shadow-xl max-w-full mx-auto" />
                            ) : (
                                <div className="bg-gradient-to-br from-primary-100 to-primary-200 h-80 w-full rounded-lg shadow-xl flex items-center justify-center">
                                    <span className="text-primary-700 font-semibold text-lg">Hero Image</span>
                                </div>
                            )}
                            <div className="absolute -z-10 -top-6 -right-6 w-72 h-72 bg-secondary-100 rounded-full opacity-70 blur-3xl"></div>
                            <div className="absolute -z-10 -bottom-8 -left-8 w-80 h-80 bg-primary-100 rounded-full opacity-70 blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
