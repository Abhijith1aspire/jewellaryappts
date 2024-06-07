export interface AdditionalField {
    image: string;
    title: string;
    subtitle: null;
    link: null;
    linkText: string | null;
    content: string | null;
  }
  
  export interface SliderData {
    title: string;
    type: string;
    backgroundImage: string | null;
    backgroundColor: string | null;
    heroBanner: number;
    sortOrder: number;
    additionalFields: AdditionalField[];
  }

  export interface HomePageBannerData {
  data:{
    getTemplateList:{
        identifier:string;
        items:SliderData[]
    };
}

  }
  