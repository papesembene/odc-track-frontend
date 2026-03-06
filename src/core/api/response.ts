export function extractApiData<T>(res: any): T | null {
  return (res?.data?.data ?? res?.data ?? null) as T | null;
}

export function extractApiItems<T>(res: any): T[] {
  const data = extractApiData<any>(res);

  if (!data) return [];
  if (Array.isArray(data)) return data as T[];
  if (Array.isArray(data.items)) return data.items as T[];

  return [];
}

export function extractApiPagination(res: any) {
  return (
    res?.data?.data?.pagination ?? {
      page: 1,
      limit: 10,
      totalItems: 0,
      totalPages: 1,
    }
  );
}
