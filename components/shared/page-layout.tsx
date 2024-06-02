import UglyLink from "./ugly-link";

export default function PageLayout({
  children,
  backLink,
}: { children: React.ReactNode; backLink?: string }) {
  return (
    <>
      {backLink && (
        <div className="mb-4">
          <UglyLink href={backLink}>back</UglyLink>
        </div>
      )}
      {children}
    </>
  );
}
