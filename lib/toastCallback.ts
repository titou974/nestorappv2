import { toast } from "react-toastify";

type CreateToastCallbacksOptions = { loadingMessage?: string };

type ActionState =
  | {
      message: string;
      errors?: any;
      status?: "SUCCESS" | "ERROR";
    }
  | null
  | undefined;

type Callbacks<T, R = unknown> = {
  onStart?: () => R;
  onEnd?: (reference: R) => void;
  onSuccess?: (result: T) => void;
  onError?: (result: T) => void;
};
export function toastCallback(onClose: () => void) {
  return {
    onSuccess: (result: ActionState) => {
      if (result?.message) {
        toast.success(result.message);
      }
      onClose();
    },
    onError: (result: ActionState) => {
      if (result?.message) {
        toast.error(result.message);
      }
    },
  };
}

export const withCallbacks = <
  Args extends unknown[],
  T extends ActionState,
  R = unknown,
>(
  fn: (...args: Args) => Promise<T>,
  callbacks: Callbacks<T, R>
): ((...args: Args) => Promise<T>) => {
  return async (...args: Args) => {
    const promise = fn(...args);

    const reference = callbacks.onStart?.();

    const result = await promise;

    if (reference) {
      callbacks.onEnd?.(reference);
    }

    if (result?.status === "SUCCESS") {
      callbacks.onSuccess?.(result);
    }

    if (result?.status === "ERROR") {
      callbacks.onError?.(result);
    }

    return promise;
  };
};
