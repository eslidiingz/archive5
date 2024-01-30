import { useState } from "react";
import Link from "next/link";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";
import CardTrending from "../../components/card/CardTrending";
import Dropdown from 'react-bootstrap/Dropdown'
import SlideTrending from '../../components/Slide/SlideTrending';
import SlideCollection from '../../components/Slide/SlideCollection';


import CardCollection from '../../components/card/CardCollection';



const ExploreCollectionIndex = () => {
  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { languages } = userinfo;
      
    console.log(`${value} is ${checked}`);
     
    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        languages: [...languages, value],
        response: [...languages, value],
      });
    }
  
    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        languages: languages.filter((e) => e !== value),
        response: languages.filter((e) => e !== value),
      });
    }
  };
  const [isActive, setActive] = useState(false);
  const toggleFav = () => {
    setActive(!isActive);
  };
  const [isBuynow, setBuynow] = useState(false);
  const Buynow = () => {
    setBuynow(!isBuynow);
  };

  const [isAuction, setAuction] = useState(false);
  const Auction = () => {
    setAuction(!isAuction);
  };

  const [isNew, setNew] = useState(false);
  const New = () => {
    setNew(!isNew);
  };
  
  const [isTrading, setTrading] = useState(false);
  const Trading = () => {
    setTrading(!isTrading);
  };
  const [isTop, setTop] = useState(false);
  const Top = () => {
    setTop(!isTop);
  };
  const [isArt, setArt] = useState(false);
  const Art = () => {
    setArt(!isArt);
  };
  const [isUtifity, setUtifity] = useState(false);
  const Utifity = () => {
    setUtifity(!isUtifity);
  };
  const [isAll, setAll] = useState(false);
  const All = () => {
    setAll(!isAll);
  };
  return (
    <>
    <section>
      <div className="container pd-top-bottom-section">
        <div className="row d-flex align-items-center">
        <div className="col-xxl-12 mt-5" align="center">
            <h1 className="ci-white">Explore Collections</h1>
          </div>
          {/* <div className="col-xxl-6 mt-lg-5 col-lg-6 col-12">
            <h1 className="ci-white text-header_sc">NFT Category</h1>
          </div> */}
          <div className="mt-lg-5 col-12 mb-5" align="center">
          <button className={`btn btn-filter mx-2 mb-2 ${isBuynow ? "active" : ""}`} onClick={Buynow}><i className={"fas fa-heart mgr-8 c-pointer"}></i> Popular</button>
              <button className={`btn btn-filter mx-2 mb-2 ${isAuction ? "active" : ""}`} onClick={Auction}><i className={"fas fa-diamond mgr-8 c-pointer"}></i>Trand</button>
              <button className={`btn btn-filter mx-2 mb-2 ${isNew ? "active" : ""}`} onClick={New}><i className={"fab fa-hotjar mgr-8 c-pointer"}></i>Hot</button>
          </div>
          <div className="card_collection">
            <SlideCollection/>
          </div>
        </div>
      </div>
    </section>
    <section className="layout-explore">
      <div className="container mb-5">
        <div className="row">
          
          <div className="col-xxl-12 mt-5" align="center">
            <h1 className="ci-white">NFT Category</h1>
          </div>
          <div className="col-xxl-12 mt-2 mb-5" align="center">
              <button className={`btn btn-filter mx-2 mb-2 ${isAll ? "active" : ""}`} onClick={All}><i className={isAll ? "fal fa-times mgr-8 c-pointer" : ""}></i> All</button>
              <button className={`btn btn-filter mx-2 mb-2 ${isTop ? "active" : ""}`} onClick={Top}><i className={isTop ? "fal fa-times mgr-8 c-pointer" : ""}></i> Top</button>
              <button className={`btn btn-filter mx-2 mb-2 ${isTrading ? "active" : ""}`} onClick={Trading}><i className={isTrading ? "fal fa-times mgr-8 c-pointer" : ""}></i> Trading</button>
              <button className={`btn btn-filter mx-2 mb-2 ${isArt ? "active" : ""}`} onClick={Art}><i className={isArt ? "fal fa-times mgr-8 c-pointer" : ""}></i> Art</button>
              <button className={`btn btn-filter mx-2 mb-2 ${isUtifity ? "active" : ""}`} onClick={Utifity}><i className={isUtifity ? "fal fa-times mgr-8 c-pointer" : ""}></i> Wall Art</button>
              <button className={`btn btn-filter mx-2 mb-2 ${isUtifity ? "active" : ""}`} onClick={Utifity}><i className={isUtifity ? "fal fa-times mgr-8 c-pointer" : ""}></i> Game</button>
              <button className={`btn btn-filter mx-2 mb-2 ${isUtifity ? "active" : ""}`} onClick={Utifity}><i className={isUtifity ? "fal fa-times mgr-8 c-pointer" : ""}></i> Other</button>
              
          </div>

          <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
            <CardTrending 
                ClassTittle="text-tittle-card_new"
                img="/assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                img_profile="/assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                tittle="Water Color"
                profile="Warawrp"
                price="122"
            />
          </div>

          <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
            <CardTrending 
                ClassTittle="text-tittle-card_new"
                img="/assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                img_profile="/assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                tittle="Water Color"
                profile="Warawrp"
                price="122"
            />
          </div>

          <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
            <CardTrending 
                ClassTittle="text-tittle-card_new"
                img="/assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                img_profile="/assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                tittle="Water Color"
                profile="Warawrp"
                price="122"
            />
          </div>

          <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
            <CardTrending 
                ClassTittle="text-tittle-card_new"
                img="/assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                img_profile="/assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                tittle="Water Color"
                profile="Warawrp"
                price="122"
            />
          </div>

          <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
            <CardTrending 
                ClassTittle="text-tittle-card_new"
                img="/assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                img_profile="/assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                tittle="Water Color"
                profile="Warawrp"
                price="122"
            />
          </div>

          </div>
      </div>
    </section>
    </>
  );
};

export default ExploreCollectionIndex;
ExploreCollectionIndex.layout = Mainlayout;
