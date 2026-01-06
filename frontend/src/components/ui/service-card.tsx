import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
}

export const ServiceCard = ({ title, description, icon: Icon, }: ServiceCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};
