interface TestimonialCardProps {
    name: string;
    location: string;
    testimonial: string;
    imageSrc?: string;
}

export const TestimonialCard = ({ name, location, testimonial, imageSrc, }: TestimonialCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    {imageSrc ? (
                        <img src={imageSrc} alt={name} className="h-full w-full object-cover" />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center bg-primary-100 text-primary-600 font-semibold text-lg">
                            {name.charAt(0)}
                        </div>
                    )}
                </div>
                <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{name}</h4>
                    <p className="text-sm text-gray-500">{location}</p>
                </div>
            </div>
            <p className="text-gray-600 italic">"{testimonial}"</p>
        </div>
    );
};
