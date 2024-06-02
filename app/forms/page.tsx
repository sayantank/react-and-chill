import UglyLink from "@/components/shared/ugly-link";

export default function FormsPage() {
  return (
    <div className="space-y-4">
      <UglyLink href="/forms/basic-form">basic-form</UglyLink>
      <UglyLink href="/forms/prefetched-conditional-data-form">
        prefetched-conditional-data-form
      </UglyLink>
    </div>
  );
}
