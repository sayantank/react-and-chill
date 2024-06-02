import Link from "next/link";
import { TypographyInlineCode } from "../ui/typography";

export default function UglyLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="block"
    >
      <TypographyInlineCode className="hover:underline">[{children}]</TypographyInlineCode>
    </Link>
  );
}
