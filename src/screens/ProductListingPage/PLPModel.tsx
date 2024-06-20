interface CustomAttribute {
  attribute_code: string;
  value: string | number | any[];
}

interface ProductItem {
  id: string;
  sku: string;
  name: string;
  attribute_set_id: string;
  price: number;
  discount_percent: string;
  status: string;
  visibility: string;
  type_id: string;
  created_at: string;
  updated_at: string;
  weight: number;
  product_links: any[];
  tier_prices: any[];
  extension_attributes: {};
  custom_attributes: CustomAttribute[];
  thumb_image: string;
  cache_thumb_image: string;
}

interface Filter {
  field: string;
  value: string | number;
  condition_type: string;
}

interface FilterGroup {
  filters: Filter[];
}

interface SearchCriteria {
  filter_groups: FilterGroup[];
  page_size: number;
  current_page: number;
}

export interface ProductListResponse {
  items: ProductItem[];
  search_criteria: SearchCriteria;
  total_count: number;
}
