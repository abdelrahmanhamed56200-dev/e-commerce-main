export type IActiveFilters =
  | { type: 'price'; value: string }
  | { type: 'searchValue'; value: string }
  | { type: 'brands'; value: string; id: string }
  | { type: 'categories'; value: string; id: string }
  | { type: 'subcategory'; value: string; id: string };
