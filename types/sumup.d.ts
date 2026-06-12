// types/sumup.d.ts
// Typage du SDK widget carte SumUp chargé via sdk.js (variable globale window.SumUpCard).
// Docs: https://developer.sumup.com/online-payments/checkouts/card-widget

export type SumUpResponseType =
  | "sent"
  | "invalid"
  | "auth-screen"
  | "error"
  | "success"
  | "fail";

export interface SumUpMountConfig {
  id: string;
  checkoutId: string;
  onResponse?: (type: SumUpResponseType, body: unknown) => void;
  onLoad?: () => void;
  onPaymentMethodsLoad?: (methods: unknown) => void;
  showSubmitButton?: boolean;
  showEmail?: boolean;
  email?: string;
  locale?: string;
  country?: string;
  currency?: string;
  amount?: string;
}

export interface SumUpWidget {
  submit: () => void;
  unmount: () => void;
  update: (config: Partial<SumUpMountConfig>) => void;
}

declare global {
  interface Window {
    SumUpCard?: {
      mount: (config: SumUpMountConfig) => SumUpWidget;
    };
  }
}

export {};
