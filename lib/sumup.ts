// lib/sumup.ts
// Client serveur minimal pour l'API SumUp Online Payments.
// Docs: https://developer.sumup.com/online-payments
// Utilisé uniquement côté serveur (clé API secrète) — ne jamais importer côté client.

const SUMUP_API_BASE = "https://api.sumup.com/v0.1";

export type SumUpCheckoutStatus = "PENDING" | "PAID" | "FAILED" | "EXPIRED";

export interface SumUpCheckout {
  id: string;
  checkout_reference: string;
  amount: number;
  currency: string;
  merchant_code: string;
  status: SumUpCheckoutStatus;
  date: string;
  description?: string;
  transactions?: Array<{
    id: string;
    status: string;
    amount: number;
    currency: string;
  }>;
}

function getCredentials() {
  const apiKey = process.env.SUMUP_API_KEY;
  const merchantCode = process.env.SUMUP_MERCHANT_CODE;

  if (!apiKey || !merchantCode) {
    throw new Error(
      "SumUp non configuré : définissez SUMUP_API_KEY et SUMUP_MERCHANT_CODE dans votre .env",
    );
  }

  return { apiKey, merchantCode };
}

/**
 * Crée un checkout SumUp et retourne son identifiant.
 * Le widget carte (côté client) consomme cet id pour afficher le formulaire de paiement.
 */
export async function createSumUpCheckout(params: {
  reference: string;
  amount: number;
  currency?: string;
  description?: string;
}): Promise<SumUpCheckout> {
  const { apiKey, merchantCode } = getCredentials();

  const res = await fetch(`${SUMUP_API_BASE}/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      checkout_reference: params.reference.slice(0, 90),
      amount: params.amount,
      currency: params.currency ?? "EUR",
      merchant_code: merchantCode,
      description: params.description,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`SumUp create checkout failed (${res.status}): ${detail}`);
  }

  return (await res.json()) as SumUpCheckout;
}

/**
 * Récupère l'état d'un checkout afin de vérifier le paiement côté serveur.
 * À appeler après le callback "success" du widget (ne jamais faire confiance au seul client).
 */
export async function getSumUpCheckout(
  checkoutId: string,
): Promise<SumUpCheckout> {
  const { apiKey } = getCredentials();

  const res = await fetch(`${SUMUP_API_BASE}/checkouts/${checkoutId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`SumUp get checkout failed (${res.status}): ${detail}`);
  }

  return (await res.json()) as SumUpCheckout;
}
