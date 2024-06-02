import { Separator } from "../ui/separator";
import { TypographyH4, TypographyMuted } from "../ui/typography";

export function RadioCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-2 border rounded-md flex flex-col">
      <TypographyH4>{title}</TypographyH4>
      <Separator className="mb-2 mt-1" />
      <TypographyMuted>{description}</TypographyMuted>
    </div>
  );
}
