export type RootStackParamList = {
    HomeScreen: undefined;
    CardDetails: {
      image: string;
      price: number;
      originalPrice: number;
      offer: string;
      title: string;
      description: string;
      id: string;
    };
    CartScreen: undefined;
    FavoritesScreen: undefined;
    MapScreen: undefined;
    ProductDetailsScreen: {
      id: string;
      title: string;
      description: string;
      price: string;
      offer: string;
      originalprice: number;
      keywords: string;
      image: string;
    }[];
    UserScreen: undefined;
    ProfileDetailsScreen: {
      firstName: string;
    };
    ProductListingPage:undefined;
  };