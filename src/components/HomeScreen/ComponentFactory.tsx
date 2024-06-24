import React from 'react';
import CarouselSlider from './CarouselSlider';
import OnlineOffersHalfSliderButton from './OnlineOffersHalfSliderButton';
import AboutGRTHaldSliderButton from './AboutGRTHalfSliderButton';
import LatestClassicsSlider from './LatestClassicsSlider';
import CuratedClassicsTabSlider from './CuratedClassicsTabSlider';
import OurBrandsStaticBannersButton from './OurBrandsStaticBanners';
import JewellaryCustomizationStaticbanner from './JewellaryCustomizationStaticbanner';
import GiftsHalfStaticButton from './GiftsHalfStaticButton';
import VirtualShoppingHalfStaticBannerButton from './VirtualShoppingHalfStaticBannerButton';
import StaticBannerSliderButton from './StaticBannerSliderButton';
import FullSlider from './FullSlider';
import LocationStaticBanners from './LocationStaticBanner';

const ComponentFactory = (item, index) => {
  switch (item.type) {
    case 'carousel':
      return (
        <CarouselSlider
          key={index}
          backgroundColor={item.backgroundColor}
          data={item.additionalFields}
          backgroundImage={item.backgroundImage}
        />
      );
    case 'half-slider-button':
      if (item.title === 'Checkout our online offers') {
        return (
          <OnlineOffersHalfSliderButton
            key={index}
            backgroundImage={item.backgroundImage}
            data={item.additionalFields}
            headerTitle={item.title}
            backgroundColor={item.backgroundColor}
          />
        );
      }
      if (item.title === 'About GRT') {
        return (
          <AboutGRTHaldSliderButton
            key={index}
            data={item.additionalFields}
            headerTitle={item.title}
            backgroundColor={''}
            backgroundImage={item.backgroundImage}
          />
        );
      }
      break;
    case 'slider':
      return (
        <LatestClassicsSlider
          key={index}
          backgroundColor={item.backgroundColor}
          data={item.additionalFields}
          headerTitle={item.title}
          backgroundImage={item.backgroundImage}
        />
      );
    case 'tab':
      return (
        <CuratedClassicsTabSlider
          key={index}
          headerTitle={item.title}
          tabItems={item.tabItems}
        />
      );
    case 'static-banners-button':
      if (item.title === 'Our Brands') {
        return (
          <OurBrandsStaticBannersButton
            key={index}
            backgroundColor={item.backgroundColor}
            data={item.additionalFields}
            headerTitle={item.title}
            backgroundImage={item.backgroundImage}
          />
        );
      }
      if (
        item.title === 'Jewellery Customisation' ||
        item.title === 'Save big! With our Jewellery Savings Schemes'
      ) {
        return (
          <JewellaryCustomizationStaticbanner
            key={index}
            backgroundColor={item.backgroundColor}
            data={item.additionalFields}
            headerTitle={item.title}
            cssClass={item.cssClass}
            backgroundImage={item.backgroundImage}
          />
        );
      }
      break;
    case 'half-static-banners-button':
      if (item.title === 'Gifting your loved ones just got easier') {
        return (
          <GiftsHalfStaticButton
            key={index}
            data={item.additionalFields}
            headerTitle={item.title}
            backgroundColor={item.backgroundColor}
            backgroundImage={item.backgroundImage}
          />
        );
      }
      if (item.title === 'Virtual Shopping') {
        return (
          <VirtualShoppingHalfStaticBannerButton
            key={index}
            data={item.additionalFields}
            headerTitle={item.title}
            backgroundColor={item.backgroundColor}
            backgroundImage={item.backgroundImage}
          />
        );
      }
      break;
    case 'static-banner-slider-button':
      return (
        <StaticBannerSliderButton
          key={index}
          data={item.additionalFields}
          headerTitle={item.title}
          backgroundColor={item.backgroundColor}
          backgroundImage={item.backgroundImage}
        />
      );
    case 'full-slider':
      return (
        <FullSlider
          key={index}
          data={item.additionalFields}
          headerTitle={item.title}
          backgroundColor={item.backgroundColor}
          backgroundImage={item.backgroundImage}
        />
      );
    case 'static-banners':
      if (item.title === 'Come visit us at any of our store') {
        return (
          <LocationStaticBanners
            key={index}
            backgroundColor={item.backgroundColor}
            data={item.additionalFields}
            headerTitle={item.title}
          />
        );
      }
      break;
    default:
      return null;
  }
};

export default ComponentFactory;
