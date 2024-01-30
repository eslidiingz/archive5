import React, { Component } from "react";
import Slider from "react-slick";
import CardTrending from "../card/CardTrending";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={"arrow-next-customs layout-arrow-silder next-trend-position"}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={"arrow-prev-customs layout-arrow-silder prev-trend-position"}
      onClick={onClick}
    />
  );
}

export default class SlideCollection extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 760,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <>
        <Slider {...settings}>
          <div className="col-xxl-3 col-xl-4 col-lg-3 col-md-6 col-12 px-3">
          <CardTrending 
                ClassTittle="text-tittle-card_new"
                img="/assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                img_profile="/assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                tittle="Water Color"
                profile="Warawrp"
                price="122"
            />
          </div>

         <div className="col-xxl-3 col-xl-4 col-lg-3 col-md-6 col-12 px-3">
         <CardTrending 
                ClassTittle="text-tittle-card_new"
                img="/assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                img_profile="/assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                tittle="Water Color"
                profile="Warawrp"
                price="122"
            />
          </div>
          <div className="col-xxl-3 col-xl-4 col-lg-3 col-md-6 col-12 px-3">
          <CardTrending 
                ClassTittle="text-tittle-card_new"
                img="/assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                img_profile="/assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                tittle="Water Color"
                profile="Warawrp"
                price="122"
            />
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-3 col-md-6 col-12 px-3">
          <CardTrending 
                ClassTittle="text-tittle-card_new"
                img="/assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                img_profile="/assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                tittle="Water Color"
                profile="Warawrp"
                price="122"
            />
          </div>

          <div className="col-xxl-3 col-xl-4 col-lg-3 col-md-6 col-12 px-3">
          <CardTrending 
                ClassTittle="text-tittle-card_new"
                img="/assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                img_profile="/assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                tittle="Water Color"
                profile="Warawrp"
                price="122"
            />
          </div>
        </Slider>
      </>
    );
  }
}