interface CustomAttribute {
  plp_attribute_code: string;
  plp_value: string | number | any[];
}

interface ProductItem {
  plp_id: string;
  plp_sku: string;
  plp_name: string;
  plp_attribute_set_id: string;
  plp_price: number;
  plp_discount_percent: string;
  plp_status: string;
  plp_visibility: string;
  plp_type_id: string;
  plp_created_at: string;
  plp_updated_at: string;
  plp_weight: number;
  plp_product_links: any[];
  plp_tier_prices: any[];
  plp_extension_attributes: {};
  plp_custom_attributes: CustomAttribute[];
  plp_thumb_image: string;
  plp_cache_thumb_image: string;
}

interface Filter {
  plp_field: string;
  plp_value: string | number;
  plp_condition_type: string;
}

interface FilterGroup {
  plp_filters: Filter[];
}

interface SearchCriteria {
  plp_filter_groups: FilterGroup[];
  plp_page_size: number;
  plp_current_page: number;
}

export interface ProductListResponse {
  plp_items: ProductItem[];
  plp_search_criteria: SearchCriteria;
  plp_total_count: number;
}

export const plpkeyMapping = {
  items: 'plp_items',
  id: 'plp_id',
  sku: 'plp_sku',
  name: 'plp_name',
  attribute_set_id: 'plp_attribute_set_id',
  price: 'plp_price',
  discount_percent: 'plp_discount_percent',
  status: 'plp_status',
  visibility: 'plp_visibility',
  type_id: 'plp_type_id',
  created_at: 'plp_created_at',
  updated_at: 'plp_updated_at',
  weight: 'plp_weight',
  product_links: 'plp_product_links',
  tier_prices: 'plp_tier_prices',
  extension_attributes: 'plp_extension_attributes',
  custom_attributes: 'plp_custom_attributes',
  thumb_image: 'plp_thumb_image',
  cache_thumb_image: 'plp_cache_thumb_image',
  search_criteria: 'plp_search_criteria',
  filter_groups: 'plp_filter_groups',
  filters: 'plp_filters',
  field: 'plp_field',
  value: 'plp_value',
  condition_type: 'plp_condition_type',
  page_size: 'plp_page_size',
  current_page: 'plp_current_page',
  total_count: 'plp_total_count',
};
