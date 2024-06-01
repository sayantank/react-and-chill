export type FormActionReturn<E = unknown> = {
  success: boolean;
  error?: E | undefined;
};
