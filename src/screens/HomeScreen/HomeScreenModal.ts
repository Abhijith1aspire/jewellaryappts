export interface AdditionalField {
    image: string;
    title: string;
    subtitle: null;
    link: null;
    linkText: string | null;
    content: string | null;
  }

  export interface TabItem {
    backgroundImage: string|null;
    tabTitle: string|null;
    backgroundCOlor:string|null;
    additionalFields:AdditionalField[]
  }



  export interface SliderData {
    title: string;
    type: string;
    backgroundImage: string | null;
    backgroundColor: string | null;
    heroBanner: number;
    sortOrder: number;
    additionalFields?: AdditionalField[];
    tabItems?:TabItem[];
    cssClass?:String
    tabGroup?:string|null
    link?:string|null;
    linkText?:string|null;
  }

  export interface HomePageBannerData {
  data:{
    getTemplateList:{
        identifier:string;
        items:SliderData[]
    };
}

  }
  