const sumupApiClient = {
  createCheckout: async ({
    paymentType: payment_type,
  }: {
    paymentType?: string;
  }) => {
    const response = await fetch("/api/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payment_type }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  },
};

export default sumupApiClient;
