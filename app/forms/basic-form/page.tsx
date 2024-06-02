import BasicForm from "@/components/forms/basic";

export default function BasicFormPage() {
  return (
    <div className="space-y-6">
      <BasicForm />
      <BasicForm initialValues={{ username: "shadcn", password: "password", theme: "dark" }} />
    </div>
  );
}
