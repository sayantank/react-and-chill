import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";

type SubmitButtonProps = {
  disabled?: boolean;
  isSubmitting?: boolean;
  action?: {
    text: string;
    submittingText: string;
  };
};
export function SubmitButton({ action, disabled, isSubmitting }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? (
        <div className="flex items-center space-x-1">
          <LoaderCircle className="animate-spin text-white h-4 w-4" />
          <span>{action?.submittingText ?? "Submitting"}</span>
        </div>
      ) : (
        <span>{action?.text ?? "Submit"}</span>
      )}
    </Button>
  );
}
