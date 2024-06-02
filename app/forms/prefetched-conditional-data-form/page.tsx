import { PrefetchedConditionalDataForm } from "@/components/forms/prefetched-conditional-data";
import { getEndpoints } from "./actions";
import { TypographyP } from "@/components/ui/typography";

export default async function ConditionalDataForm() {
  const endpoints = await getEndpoints();

  return (
    <>
      <TypographyP>
        In this form, we fetch all the possible endpoints for all clusters beforehand. This leads to
        a faster UX within the form, but the form may take longer to load.
      </TypographyP>
      <TypographyP>
        This also means that the list of endpoints will be static, and won't update if the database
        is updated while working on the form. This is possible when multiple users are working in
        the same organization, at the same time.
      </TypographyP>
      <div className="mt-4">
        <PrefetchedConditionalDataForm endpoints={endpoints} />
      </div>
    </>
  );
}
