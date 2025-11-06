import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface CTAButton {
  text: string;
  href: string;
}

interface HeroProps {
  // Support both naming conventions
  title?: string;
  headline?: string;
  subtitle?: string;
  subheadline?: string;

  // Support both string and object CTA formats
  ctaText?: string;
  ctaLink?: string;
  primaryCTA?: string | CTAButton;
  primaryCTALink?: string;
  secondaryCTA?: string | CTAButton;
  secondaryCTALink?: string;

  backgroundImage?: string;
  variant?: "default" | "gradient";
}

export default function Hero({
  title,
  headline,
  subtitle,
  subheadline,
  ctaText,
  ctaLink,
  primaryCTA,
  primaryCTALink,
  secondaryCTA,
  secondaryCTALink,
  backgroundImage,
  variant = "gradient",
}: HeroProps) {
  // Use the provided prop (support both naming styles)
  const displayTitle = headline || title || "Welcome";
  const displaySubtitle = subheadline || subtitle || "";

  // Handle primary CTA (string or object format)
  const getPrimaryCTAText = () => {
    if (typeof primaryCTA === "object") return primaryCTA.text;
    return primaryCTA || ctaText || "Get Started";
  };

  const getPrimaryCTALink = () => {
    if (typeof primaryCTA === "object") return primaryCTA.href;
    return primaryCTALink || ctaLink || "/mortgage-appointment-online";
  };

  // Handle secondary CTA (string or object format)
  const getSecondaryCTAText = () => {
    if (typeof secondaryCTA === "object") return secondaryCTA.text;
    return secondaryCTA;
  };

  const getSecondaryCTALink = () => {
    if (typeof secondaryCTA === "object") return secondaryCTA.href;
    return secondaryCTALink;
  };
  const getGradientClasses = () => {
    return variant === "gradient"
      ? "bg-gradient-to-r from-primary/95 via-primary/85 to-transparent"
      : "bg-[#0E6173]";
  };

  const showSecondaryCTA = secondaryCTA || secondaryCTALink;

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      {backgroundImage && backgroundImage !== "No Image" && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={displayTitle}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
            quality={90}
            className="z-0"
          />
          <div className={`absolute inset-0 ${getGradientClasses()}`}></div>
        </div>
      )}

      {/* Content */}
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-left">
          {title === "Your Mortgage. Matched to Your Life." && (
            <Badge
              variant="secondary"
              className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm"
            >
              Powered by 25+ Lenders | FSRA Licensed | Zero-Pressure Process
            </Badge>
          )}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-white leading-tight">
            {displayTitle.split(".").map((part, i, arr) => (
              <span key={i}>
                {i === arr.length - 1 && part.includes("Life") ? (
                  <span className="text-highlight">{part}</span>
                ) : (
                  part + (i < arr.length - 1 ? "." : "")
                )}
              </span>
            ))}
          </h1>
          <p className="text-xl text-white/95 mb-8 max-w-2xl">
            {displaySubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              asChild
              className="text-lg px-8 bg-white text-primary hover:bg-white/90 shadow-xl animate-bounce [animation-duration:0.4s]"
            >
              <Link href={getPrimaryCTALink()}>
                {getPrimaryCTAText()}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {showSecondaryCTA && (
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary backdrop-blur-sm"
              >
                <Link href={getSecondaryCTALink() || "#"}>
                  {getSecondaryCTAText()}
                </Link>
              </Button>
            )}
          </div>
          {title === "Your Mortgage. Matched to Your Life." && (
            <p className="text-sm text-white/90 mt-4">
              It only takes 5 minutes • No sales calls • No credit impact
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// Named export for compatibility
export { Hero };
