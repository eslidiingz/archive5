import { useEffect } from "react";
import Link from "next/link";
import Mainlayout from "../components/layouts/Mainlayout";
import React from "react";
import Slider from "react-slick";
// import Tab from 'react-bootstrap/Tab'
import { Container, Row, Col, Nav } from "react-bootstrap";
import Category from "../components/layouts/Category";
import CardCollection from "../components/card/CardCollection";
import CardProfile from "../components/card/CardCollection";
import CardCollections from "../components/card/CardCollections";
import CardTrending from "../components/card/CardTrending";
import { Table, Tabs, Tab } from "react-bootstrap";
import SlideTrending from "../components/Slide/SlideTrending";

const Musicnft = () => {
  return (
    <>
      <div>
        <section className="hilight-sections-home ">
          <div className="container">
            {/* end-left  */}
            <div className="row hilight-content-home text-center justify-content-start">
              <div className="col-lg-6 hilight-content2-2">
                <p className="small-title mb-4">NFT Marketplace</p>
                <p className="text02 mb-5">
                  Lorem Ipsum has been the industry s standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries,
                </p>
                <div>
                  <button className="btn btn01 btn-hover color-1 me-2">
                    <a href="#" className="text-white">
                      Explore
                    </a>
                  </button>
                  <button className="btn btn01 btn-hover color-1-blue me-2">
                    <a href="#" className="text-white">
                      Create
                    </a>
                  </button>
                  <div className="row mt-4  text-center justify-content-center" >
                    <div className="col-xl-3 layout-m01" align="center">
                      <p className="text01">
                        240k+
                        <span className="text01-2">Artists NFTs</span>
                      </p>
                    </div>
                    <div className="col-xl-3">
                      <p className="text01" align="center">
                        12k+
                        <span className="text01-2">Artists</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        <section className="hilight-section02 pt-3">
          <div className="container">
            <div className="row">
              <div className="col-12 mt-5 mb-4" align="left">
                <p className="txt-03">Top Artists</p>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-12 col-sm-6 col-lg-3 my-2">
                <div className="d-flex gap-3 box-top">
                  <div className="d-flex gap-2 align-items-center ">
                    <img
                      src="assets/rsu-image/user/Ellipse_3-1.svg"
                      width={45}
                      alt=""
                    />
                  </div>
                  <div className="col">
                    <p className="text09 twoline-dot">Lorem Ipsum</p>
                    <p className="text09-2">
                      <img src="assets/rsu-image/icons/diamond.svg" />
                      &nbsp;<span className="text10">$ 522,456</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 my-2">
                <div className="d-flex gap-3 box-top">
                  <div className="d-flex gap-2 align-items-center ">
                    <img
                      src="assets/rsu-image/user/Ellipse_3-2.svg"
                      width={45}
                      alt=""
                    />
                  </div>
                  <div className="col">
                    <p className="text09 twoline-dot">Lorem Ipsum</p>
                    <p className="text09-2">
                      <img src="assets/rsu-image/icons/diamond.svg" />
                      &nbsp;<span className="text10">$ 522,456</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 my-2">
                <div className="d-flex gap-3 box-top">
                  <div className="d-flex gap-2 align-items-center ">
                    <img
                      src="assets/rsu-image/user/Ellipse_3-3.svg"
                      width={45}
                      alt=""
                    />
                  </div>
                  <div className="col">
                    <p className="text09 twoline-dot">Lorem Ipsum</p>
                    <p className="text09-2">
                      <img src="assets/rsu-image/icons/diamond.svg" />
                      &nbsp;<span className="text10">$ 522,456</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 my-2">
                <div className="d-flex gap-3 box-top">
                  <div className="d-flex gap-2 align-items-center ">
                    <img
                      src="assets/rsu-image/user/Ellipse_3-4.svg"
                      width={45}
                      alt=""
                    />
                  </div>
                  <div className="col">
                    <p className="text09 twoline-dot">Lorem Ipsum</p>
                    <p className="text09-2">
                      <img src="assets/rsu-image/icons/diamond.svg" />
                      &nbsp;<span className="text10">$ 522,456</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 my-2">
                <div className="d-flex gap-3 box-top">
                  <div className="d-flex gap-2 align-items-center ">
                    <img
                      src="assets/rsu-image/user/Ellipse_3-1.svg"
                      width={45}
                      alt=""
                    />
                  </div>
                  <div className="col">
                    <p className="text09 twoline-dot">Lorem Ipsum</p>
                    <p className="text09-2">
                      <img src="assets/rsu-image/icons/diamond.svg" />
                      &nbsp;<span className="text10">$ 522,456</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 my-2">
                <div className="d-flex gap-3 box-top">
                  <div className="d-flex gap-2 align-items-center ">
                    <img
                      src="assets/rsu-image/user/Ellipse_3-2.svg"
                      width={45}
                      alt=""
                    />
                  </div>
                  <div className="col">
                    <p className="text09 twoline-dot">Lorem Ipsum</p>
                    <p className="text09-2">
                      <img src="assets/rsu-image/icons/diamond.svg" />
                      &nbsp;<span className="text10">$ 522,456</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 my-2">
                <div className="d-flex gap-3 box-top">
                  <div className="d-flex gap-2 align-items-center ">
                    <img
                      src="assets/rsu-image/user/Ellipse_3-3.svg"
                      width={45}
                      alt=""
                    />
                  </div>
                  <div className="col">
                    <p className="text09 twoline-dot">Lorem Ipsum</p>
                    <p className="text09-2">
                      <img src="assets/rsu-image/icons/diamond.svg" />
                      &nbsp;<span className="text10">$ 522,456</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3 my-2">
                <div className="d-flex gap-3 box-top">
                  <div className="d-flex gap-2 align-items-center ">
                    <img
                      src="assets/rsu-image/user/Ellipse_3-4.svg"
                      width={45}
                      alt=""
                    />
                  </div>
                  <div className="col">
                    <p className="text09 twoline-dot">Lorem Ipsum</p>
                    <p className="text09-2">
                      <img src="assets/rsu-image/icons/diamond.svg" />
                      &nbsp;<span className="text10">$ 522,456</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="hilight-section02 pt-3">
          <div className="container">
            <div className="row">
              <div className="">
                <div className="col-6 col-6-1 mt-5 mb-4" align="left">
                  <div className="dropdown">
                    <p className="text03">
                      Trending in{" "}
                      <a className="text07">
                        all categories <i className="fas fa-angle-down"></i>
                      </a>
                    </p>
                    <div className="dropdown-content">
                      <a href="#" className="text08">
                        Trending in{" "}
                      </a>
                      <a href="#" className="text08">
                        Trending in{" "}
                      </a>
                      <a href="#" className="text08">
                        Trending in{" "}
                      </a>
                    </div>
                  </div>
                </div>
                {/* end-header 02  */}
                {/* card 02  */}
                {/* Slider homepage 02  */}
                <SlideTrending />
                {/* end-Slider homepage 02 */}
                {/* card  */}
              </div>
            </div>
          </div>
        </section>

        <section className="set-section-home">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className="text-white">
                  Hot Collection
                </h1>
              </div>
              <div className="col-12 text-end">
                <p className="ci-purple"> View All <i className="fal fa-arrow-right"></i></p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-4 py-3">
                <div className=" row set-row box-hot-home ">
                  <div className="col-4 pe-0 ps-2">
                    <img src="assets/nft-image/5938211.webp" className="w-100 height-img-hot border-r-01" />
                  </div>
                  <div className="col-4 px-1">
                    <img src="assets/nft-image/5148675.webp" className="w-100 height-img-hot" />
                  </div>
                  <div className="col-4 pe-2 ps-0">
                    <img src="assets/nft-image/2968335.webp" className="w-100 height-img-hot border-r-02" />
                  </div>
                  <div className="col-12 py-1 px-2">
                    <img src="assets/nft-image/5931495.webp" className="w-100 height-img-hot-full border-r-04" />
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="mb-0 ci-purple">Abstract</p>
                    <button className="btn-sub_cardnew w-25 h-36">28 items</button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 py-3">
                <div className=" row set-row box-hot-home ">
                  <div className="col-4 pe-0 ps-2">
                    <img src="assets/nft-image/5931495.webp" className="w-100 height-img-hot border-r-01" />
                  </div>
                  <div className="col-4 px-1">
                    <img src="assets/nft-image/5148675.webp" className="w-100 height-img-hot" />
                  </div>
                  <div className="col-4 pe-2 ps-0">
                    <img src="assets/nft-image/5938211.webp" className="w-100 height-img-hot border-r-02" />
                  </div>
                  <div className="col-12 py-1 px-2">
                    <img src="assets/nft-image/2968335.webp" className="w-100 height-img-hot-full border-r-04" />
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="mb-0 ci-purple">Abstract</p>
                    <button className="btn-sub_cardnew w-25 h-36">28 items</button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 py-3">
                <div className=" row set-row box-hot-home ">
                  <div className="col-4 pe-0 ps-2">
                    <img src="assets/nft-image/2968335.webp" className="w-100 height-img-hot border-r-01" />
                  </div>
                  <div className="col-4 px-1">
                    <img src="assets/nft-image/5148675.webp" className="w-100 height-img-hot" />
                  </div>
                  <div className="col-4 pe-2 ps-0">
                    <img src="assets/nft-image/5931495.webp" className="w-100 height-img-hot border-r-02" />
                  </div>
                  <div className="col-12 py-1 px-2">
                    <img src="assets/nft-image/5938211.webp" className="w-100 height-img-hot-full border-r-04" />
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="mb-0 ci-purple">Abstract</p>
                    <button className="btn-sub_cardnew w-25 h-36">28 items</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="set-section-home">
          <div className="container">
            <div className="row d-flex align-items-center">
              <div className="col-md-5">
                <h1 className="text-white">
                  Create and sell <br /> your NFTs
                </h1>
                <p className="text-white">Lorem Ipsum is simply dummy text of <br /> the printing and typesetting industry</p>
              </div>
              <div className="col-md-7">
                <div className="row">
                  <div className="col-6 p-3">
                    <div className="text-white knockout-around ">
                      <img
                        src="assets/nft-image/icons/wallet.svg"
                        className="img02"
                      />
                      <p className="text12 twoline-dot mb-3">
                        Set up your wallet
                      </p>
                      <p className="text09-2 twoline-dot2">
                        Once you’ve set up your wallet of choice, connect it to
                        OpenSea by clicking the wallet icon in the top right
                        corner. Learn about the{" "}
                        <a href="#" className="text10">
                          wallets we support.
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="col-6 p-3">
                    <div className="text-white knockout-around ">
                      <img
                        src="assets/nft-image/icons/collection2.svg"
                        className="img02"
                      />
                      <p className="text12 twoline-dot mb-3">
                        Create your collection
                      </p>
                      <p className="text09-2 twoline-dot2">
                        Click{" "}
                        <a href="#" className="text10">
                          My Collections
                        </a>{" "}
                        and set up your collection. Add social links, a
                        description, profile & banner images, and set a secondary
                        sales fee.
                      </p>
                    </div>

                  </div>
                  <div className="col-6 p-3">
                    <div className="text-white knockout-around ">
                      <img
                        src="assets/nft-image/icons/img-nft.svg"
                        className="img02"
                      />
                      <p className="text12 twoline-dot mb-3">Add your NFTs</p>
                      <p className="text09-2 twoline-dot2">
                        Upload your work (image, video, audio, or 3D art), add a
                        title and description, and customize your NFTs with
                        properties, stats, and unlockable content.
                      </p>
                    </div>
                  </div>
                  <div className="col-6 p-3">
                    <div className="text-white knockout-around ">
                      <img
                        src="assets/nft-image/icons/sale.svg"
                        className="img02"
                      />
                      <p className="text12 twoline-dot mb-3">
                        Set up your wallet
                      </p>
                      <p className="text09-2 twoline-dot2">
                        Choose between auctions, fixed-price listings, and
                        declining-price listings. You choose how you want to sell
                        your NFTs, and we help you sell them!
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </section>


        <section>
          <div className="container">
            <div className="row">
              <div className="col-12 layout03 mb-4 " align="left">
                <p className="text03 text-start">Explore</p>
              </div>
              <div className="trending position-relative">
                <Tabs
                  defaultActiveKey="New"
                  id="uncontrolled-tab-example"
                  className="layout-tab02 flex-scroll"
                >
                  <Tab eventKey="New" title="New" tabClassName="w-170-tab">
                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
                        <CardTrending
                          ClassTittle="text-tittle-slidertren mb-0"
                          img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                          img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                          tittle="Lorem Ipsum is"
                          profile="sala"
                          price="153"
                          link="/Explore-collection/detail-music"
                        ></CardTrending>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
                        <CardTrending
                          ClassTittle="text-tittle-slidertren mb-0"
                          img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                          img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                          tittle="Lorem Ipsum is"
                          profile="sala"
                          price="153"
                          link="/Explore-collection/detail-music"
                        ></CardTrending>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
                        <CardTrending
                          ClassTittle="text-tittle-slidertren mb-0"
                          img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                          img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                          tittle="Lorem Ipsum is"
                          profile="sala"
                          price="153"
                          link="/Explore-collection/detail-music"
                        ></CardTrending>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
                        <CardTrending
                          ClassTittle="text-tittle-slidertren mb-0"
                          img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                          img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                          tittle="Lorem Ipsum is"
                          profile="sala"
                          price="153"
                          link="/Explore-collection/detail-music"
                        ></CardTrending>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="Hot" title="Hot">
                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
                        <CardTrending
                          ClassTittle="text-tittle-slidertren mb-0"
                          img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                          img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                          tittle="Lorem Ipsum is"
                          profile="sala"

                          price="153"
                          link="/Explore-collection/detail-music"
                        ></CardTrending>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
                        <CardTrending
                          ClassTittle="text-tittle-slidertren mb-0"
                          img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                          img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                          tittle="Lorem Ipsum is"
                          profile="sala"
                          price="153"
                          link="/Explore-collection/detail-music"
                        ></CardTrending>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
                        <CardTrending
                          ClassTittle="text-tittle-slidertren mb-0"
                          img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                          img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                          tittle="Lorem Ipsum is"
                          profile="sala"
                          price="153"
                          link="/Explore-collection/detail-music"
                        ></CardTrending>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
                        <CardTrending
                          ClassTittle="text-tittle-slidertren mb-0"
                          img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
                          img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
                          tittle="Lorem Ipsum is"
                          profile="sala"
                          price="153"
                          link="/Explore-collection/detail-music"
                        ></CardTrending>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
                <Link href="/Explore-collection">
                  <div className="btn-seemore">See More</div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Musicnft;
Musicnft.layout = Mainlayout;
