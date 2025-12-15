import { toast } from "react-toastify";
import createToast from "./createToast";

type CreateToastCallbacksOptions = { loadingMessage?: string };

type ActionState =
  | {
      title: string;
      content: string;
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
      if (result?.title && result?.content) {
        createToast(result.title, result.content, true);
      }
      onClose();
    },
    onError: (result: ActionState) => {
      if (result?.title && result?.content) {
        createToast(result.title, result.content, false);
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
