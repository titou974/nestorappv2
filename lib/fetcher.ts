// lib/fetcher.ts
export const fetcher = async ({
  url,
  args,
}: {
  url: string;
  args?: Record<string, any>;
}) => {
  // Convert args to query parameters
  const queryParams = args
    ? "?" +
      new URLSearchParams(
        Object.entries(args).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] =
                value instanceof Date ? value.toISOString() : String(value);
            }
            return acc;
          },
          {} as Record<string, string>
        )
      ).toString()
    : "";

  const response = await fetch(`${url}${queryParams}`);

  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return response.json();
};
