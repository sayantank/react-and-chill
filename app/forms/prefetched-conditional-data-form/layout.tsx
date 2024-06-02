import PageLayout from "@/components/shared/page-layout";

export default function ConditionalDataFormLayout({ children }: { children: React.ReactNode }) {
  return <PageLayout backLink="/forms">{children}</PageLayout>;
}
