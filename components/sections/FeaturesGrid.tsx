interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesGridProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  columns?: number;
}

export default function FeaturesGrid({
  title = "Why Choose approvU?",
  subtitle,
  features: customFeatures,
  columns = 3,
}: FeaturesGridProps) {
  const defaultFeatures: Feature[] = [
    {
      title: "Expert Guidance",
      description: "Access to experienced mortgage brokers across Canada",
      icon: "👥",
    },
    {
      title: "Best Rates",
      description:
        "Compare rates from multiple lenders to find your best option",
      icon: "💰",
    },
    {
      title: "Fast Approval",
      description: "Get pre-approved quickly with our streamlined process",
      icon: "⚡",
    },
    {
      title: "Free Calculators",
      description: "Use our tools to estimate payments and affordability",
      icon: "🧮",
    },
    {
      title: "Local Expertise",
      description: "Province and city-specific mortgage information",
      icon: "📍",
    },
    {
      title: "24/7 Support",
      description: "Get answers to your questions anytime",
      icon: "🕐",
    },
  ];

  const features = customFeatures || defaultFeatures;

  const gridColsClass =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-2 lg:grid-cols-3"; // default 3 columns

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold mb-4 text-[#2F8396]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={`grid grid-cols-1 ${gridColsClass} gap-8`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-card-hover cursor-pointer group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-5xl mb-6 mx-auto  text-white group-hover:animate-gentle-bounce`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4 group-hover:text-primary-glow transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Named export for compatibility
export { FeaturesGrid };
