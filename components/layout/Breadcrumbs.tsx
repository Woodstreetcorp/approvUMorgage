import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
      aria-label="Breadcrumb"
    >
      <Link href="/" className="hover:text-primary-600 transition">
        Home
      </Link>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <span className="text-gray-400">/</span>
          {index === items.length - 1 ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-primary-600 transition"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
