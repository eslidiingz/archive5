import { useEffect } from "react";
import Link from "next/link";
import Mainlayout from "../components/layouts/Mainlayout";
import Card from "../components/card/CardDrops";
import CardCollections from "../components/card/CardCollections";
import CardResources from "../components/card/CardResources";
import React from "react";
import Slider from "react-slick";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import CardTrending from "../components/card/CardTrending";

import { Dropdown, DropdownButton } from "react-bootstrap";

const App = () => {
  var settingsNFT = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 4,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 991.98,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 575.98,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  var settingsBlog = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 575.98,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  // const nftCarousels = [
  //   {
  //       title: "Name of art Name of art Name of art",
  //       verify: true,
  //       artist: "Name of artist Name of artist Name of artist",
  //       artistId: "2290",
  //       price: "99999",
  //       like: "5555",
  //       img: "assets/image/asset-01.png",
  //       href: "#"
  //   },
  //   {
  //     title: "Name of art",
  //     verify: true,
  //     artist: "Name of artist",
  //     artistId: "2290",
  //     price: "6",
  //     like: "5",
  //     img: "assets/image/asset-02.png",
  //     href: "#"
  //   },
  //   {
  //     title: "Name of art",
  //     verify: true,
  //     artist: "Name of artist",
  //     artistId: "2290",
  //     price: "6",
  //     like: "5",
  //     img: "assets/image/asset-03.png",
  //     href: "#"
  //   },
  //   {
  //     title: "Name of art",
  //     verify: true,
  //     artist: "Name of artist",
  //     artistId: "2290",
  //     price: "6",
  //     like: "5",
  //     img: "assets/image/asset-04.png",
  //     href: "#"
  //   },
  //   {
  //     title: "Name of art",
  //     verify: true,
  //     artist: "Name of artist",
  //     artistId: "2290",
  //     price: "6",
  //     like: "5",
  //     img: "assets/image/asset-01.png",
  //     href: "#"
  //   },
  //   {
  //     title: "Name of art",
  //     verify: true,
  //     artist: "Name of artist",
  //     artistId: "2290",
  //     price: "6",
  //     like: "5",
  //     img: "assets/image/asset-02.png",
  //     href: "#"
  //   },
  //   {
  //     title: "Name of art",
  //     verify: true,
  //     artist: "Name of artist",
  //     artistId: "2290",
  //     price: "6",
  //     like: "5",
  //     img: "assets/image/asset-03.png",
  //     href: "#"
  //   },
  //   {
  //     title: "Name of art",
  //     verify: true,
  //     artist: "Name of artist",
  //     artistId: "2290",
  //     price: "6",
  //     like: "5",
  //     img: "assets/image/asset-04.png",
  //     href: "#"
  //   }
  // ];
  // const blogCarousels = [
  //   {
  //       article: "Name News",
  //       articleAvatar: "assets/image/asset-01.png",
  //       title: "Headline news,You can read over here Headline news,You can read over here",
  //       img: "assets/image/asset-01.png",
  //       href: "#",
  //       postTime: "2 mins read",
  //   },{
  //     article: "Name News",
  //     articleAvatar: "assets/image/asset-01.png",
  //     title: "Headline news,You can read over here",
  //     img: "assets/image/asset-01.png",
  //     href: "#",
  //     postTime: "2 mins read",
  //   },{
  //     article: "Name News",
  //     articleAvatar: "assets/image/asset-01.png",
  //     title: "Headline news,You can read over here",
  //     img: "assets/image/asset-01.png",
  //     href: "#",
  //     postTime: "2 mins read",
  //   },{
  //     article: "Name News",
  //     articleAvatar: "assets/image/asset-01.png",
  //     title: "Headline news,You can read over here",
  //     img: "assets/image/asset-01.png",
  //     href: "#",
  //     postTime: "2 mins read",
  //   },{
  //     article: "Name News",
  //     articleAvatar: "assets/image/asset-01.png",
  //     title: "Headline news,You can read over here",
  //     img: "assets/image/asset-01.png",
  //     href: "#",
  //     postTime: "2 mins read",
  //   },{
  //     article: "Name News",
  //     articleAvatar: "assets/image/asset-01.png",
  //     title: "Headline news,You can read over here",
  //     img: "assets/image/asset-01.png",
  //     href: "#",
  //     postTime: "2 mins read",
  //   },

  // ];
  // const brandList = [
  //   {
  //     name: "Avania",
  //     img: "assets/image/brands/avania.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Avindus",
  //     img: "assets/image/brands/avindus.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Binance",
  //     img: "assets/image/brands/binance.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Bird Express",
  //     img: "assets/image/brands/bird-express.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Chainlink",
  //     img: "assets/image/brands/chainlink.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Covest Finance",
  //     img: "assets/image/brands/covest-finance.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Depa",
  //     img: "assets/image/brands/depa.png",
  //     href: "#",
  //   },
  //   {
  //     name: "DGA",
  //     img: "assets/image/brands/dga.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Firo",
  //     img: "assets/image/brands/firo.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Frontry Capital",
  //     img: "assets/image/brands/frontry-capital.png",
  //     href: "#",
  //   },
  //   {
  //     name: "กลต.",
  //     img: "assets/image/brands/grt-30year.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Laika",
  //     img: "assets/image/brands/laika.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Ledger",
  //     img: "assets/image/brands/ledger.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Metamask",
  //     img: "assets/image/brands/metamask.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Mi Group",
  //     img: "assets/image/brands/mi-group.jpg",
  //     href: "#",
  //   },
  //   {
  //     name: "Moo Monster",
  //     img: "assets/image/brands/moo-monster.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Moon Cat",
  //     img: "assets/image/brands/moon-cat.jpg",
  //     href: "#",
  //   },
  //   {
  //     name: "Mousebelt",
  //     img: "assets/image/brands/mousebelt.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Multiverse Expert",
  //     img: "assets/image/brands/multiverse-expert.png",
  //     href: "#",
  //   },
  //   {
  //     name: "OM Platform",
  //     img: "assets/image/brands/om-platform.png",
  //     href: "#",
  //   },
  //   {
  //     name: "ม.ราชมงคล",
  //     img: "assets/image/brands/rmut.png",
  //     href: "#",
  //   },
  //   {
  //     name: "ม.รังสิต",
  //     img: "assets/image/brands/rsu.png",
  //     href: "#",
  //   },
  //   {
  //     name: "เช้านี้",
  //     img: "assets/image/brands/tcn.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Shorea",
  //     img: "assets/image/brands/shorea.jpeg",
  //     href: "#",
  //   },
  //   {
  //     name: "Trezor",
  //     img: "assets/image/brands/trezor.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Trust Wallet",
  //     img: "assets/image/brands/trust-wallet.png",
  //     href: "#",
  //   },
  //   {
  //     name: "Valix",
  //     img: "assets/image/brands/valix.jpg",
  //     href: "#",
  //   },

  //   {
  //     name: "xBitcoin",
  //     img: "assets/image/brands/xbitcoin.jpg",
  //     href: "#",
  //   },
  // ];
  const CardDrops = [
    {
      img: "assets/rsu-image/card_ex.png",
      title: "Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is",
      description:
        "the industry's standard dummyLorem Ipsum has been the industry's standard dummy",
      button: "Explore",
      href: "#",
    },
    {
      img: "assets/rsu-image/card_ex.png",
      title: "Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is",
      description:
        "the industry's standard dummyLorem Ipsum has been the industry's standard dummy",
      button: "Explore",
      href: "#",
    },
    {
      img: "assets/rsu-image/card_ex.png",
      title: "Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is",
      description:
        "the industry's standard dummyLorem Ipsum has been the industry's standard dummy",
      button: "Explore",
      href: "#",
    },
    {
      img: "assets/rsu-image/card_ex.png",
      title: "Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is",
      description:
        "the industry's standard dummyLorem Ipsum has been the industry's standard dummy",
      button: "Explore",
      href: "#",
    },
  ];
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    sliderToScroll: 1,
  };
  const settings_s = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div>
        {/* section 01  */}
        <section className="hilight-sections">
          <div className="container">
            {/* end-left  */}
            <div className="row hilight-content">
              <div className="col-lg-6">
                <p className="small-title">ARTIST NFT Marketplace</p>
                <p className="text02 mb-3">
                  Lorem Ipsum has been the industry s standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries,
                </p>
                <div>
                  <button className="btn btn01 btn-primary me-2">
                    Explore
                  </button>
                  <button className="btn04">
                    <a href="#" className="text-gradient">
                      Create
                    </a>
                  </button>
                  <div className="row mt-4">
                    <div className="col-2 layout-m01" align="center">
                      <p className="text01">
                        240k+
                        <p className="text01-2">Artists NFTs</p>
                      </p>
                    </div>
                    <div className="col-2">
                      <p className="text01" align="center">
                        12k+
                        <p className="text01-2">Artists</p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* end-left  */}
              {/* right  */}
              <div className="col-lg-6">
                <div>
                  <Slider className="layout-slider_hp01">
                    <div>
                      <img
                        className="img01"
                        style={{ objectFit: "cover" }}
                        alt=""
                        src="assets/rsu-image/Frame_ex.png"
                      />
                    </div>
                    <div>
                      <img
                        className="img01"
                        style={{ objectFit: "cover" }}
                        alt=""
                        src="assets/rsu-image/Frame_ex.png"
                      />
                    </div>
                  </Slider>
                </div>
              </div>
              {/* end-right  */}
            </div>
          </div>
        </section>
        {/* end-sction 01  */}
        {/* section 02  */}
        <section className="hilight-section02 pt-3">
          <div className="container">
            <div className="row">
              {/* header  */}
              <div className="col-6 mt-5" align="left">
                <p className="text03">Notable Drops</p>
              </div>
              <div className="col-6 mt-5" align="right">
                <a href="#" className="text04">
                  more&nbsp;
                </a>
                <i className="fas fa-angle-right text04-2"></i>
              </div>
              {/* end-header  */}
              {/* card  */}
              <div className="row">
                {CardDrops.map((item, key) => {
                  return (
                    item && (
                      <div className="col-lg-3">
                        <Card
                          img={item.img}
                          title={item.title}
                          description={item.description}
                          button={item.button}
                          href={item.href}
                        ></Card>
                      </div>
                    )
                  );
                })}
              </div>
              {/* card  */}
              {/* header  */}
              <div className="col-6 col-6-1 mt-5 mb-4" align="left">
                <div className="dropdown">
                  <p className="text03">
                    Top collections over{" "}
                    <a className="text07">
                      last 7 days <i className="fas fa-angle-down"></i>
                    </a>
                  </p>
                  <div className="dropdown-content">
                    <a href="#" className="text08">
                      last 7 days
                    </a>
                    <a href="#" className="text08">
                      last 7 days
                    </a>
                    <a href="#" className="text08">
                      last 7 days
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-6 col-6-2 mt-5" align="right">
                <a href="#" className="text04">
                  Go to Ranking&nbsp;
                </a>
                <i className="fas fa-angle-right text04-2"></i>
              </div>
              {/* end-header  */}
              {/* content  */}
              <div className="row mb-5">
                <div className="col-lg-4">
                  <CardCollections
                    number="1"
                    img="assets/rsu-image/user/Ellipse-3.svg"
                    title="Lorem Ipsum is simply d ..."
                    price="1"
                    percent="+85.89%"
                    diamond_number="522"
                  ></CardCollections>
                  <CardCollections
                    number="1"
                    img="assets/rsu-image/user/Ellipse-3.svg"
                    title="Lorem Ipsum is simply d ..."
                    price="1"
                    percent="+85.89%"
                    diamond_number="522"
                  ></CardCollections>
                </div>
                <div className="col-lg-4">
                  <CardCollections
                    number="1"
                    img="assets/rsu-image/user/Ellipse-3.svg"
                    title="Lorem Ipsum is simply d ..."
                    price="1"
                    percent="+85.89%"
                    diamond_number="522"
                  ></CardCollections>
                  <CardCollections
                    number="1"
                    img="assets/rsu-image/user/Ellipse-3.svg"
                    title="Lorem Ipsum is simply d ..."
                    price="1"
                    percent="+85.89%"
                    diamond_number="522"
                  ></CardCollections>
                </div>
                <div className="col-lg-4">
                  <CardCollections
                    number="1"
                    img="assets/rsu-image/user/Ellipse-3.svg"
                    title="Lorem Ipsum is simply d ..."
                    price="1"
                    percent="+85.89%"
                    diamond_number="522"
                  ></CardCollections>
                  <CardCollections
                    number="1"
                    img="assets/rsu-image/user/Ellipse-3.svg"
                    title="Lorem Ipsum is simply d ..."
                    price="1"
                    percent="+85.89%"
                    diamond_number="522"
                  ></CardCollections>
                </div>
              </div>
              {/* end-content  */}
            </div>
          </div>
        </section>
        {/* end-section 02  */}
        {/* section 03  */}
        <section className="hilight-section03 layout03-2 pb-5s">
          <div className="container">
            <div className="row ">
              {/* header  */}
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
              {/* end-header  */}
              {/* card  */}
              {/* Slider homepage 02  */}
              <div className="row">
                <div>
                  <Slider {...settings_s} className="layout-slider_hp02  mt-2">
                    <div className="col-lg-3 layout-slider_hp02-2">
                      <CardTrending
                        img="assets/rsu-image/Group_3.png"
                        title="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                        day="5 days left"
                        number_heart="12"
                        price="$12"
                      ></CardTrending>
                    </div>

                    <div className="col-lg-3 layout-slider_hp02-2">
                      <CardTrending
                        img="assets/rsu-image/Group_3.png"
                        title="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                        day="5 days left"
                        number_heart="12"
                        price="$12"
                      ></CardTrending>
                    </div>

                    <div className="col-lg-3 layout-slider_hp02-2">
                      <CardTrending
                        img="assets/rsu-image/Group_3.png"
                        title="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                        day="5 days left"
                        number_heart="12"
                        price="$12"
                      ></CardTrending>
                    </div>

                    <div className="col-lg-3 layout-slider_hp02-2">
                      <CardTrending
                        img="assets/rsu-image/Group_3.png"
                        title="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                        day="5 days left"
                        number_heart="12"
                        price="$12"
                      ></CardTrending>
                    </div>

                    <div className="col-lg-3 layout-slider_hp02-2">
                      <CardTrending
                        img="assets/rsu-image/Group_3.png"
                        title="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                        day="5 days left"
                        number_heart="12"
                        price="$12"
                      ></CardTrending>
                    </div>
                  </Slider>
                </div>
                {/* end-Slider homepage 02 */}
              </div>
              {/* card  */}
            </div>
          </div>
        </section>
        {/* end-section 03  */}
        {/* section 04  */}
        <section className="hilight-section02 pb-5s">
          <div className="container">
            <div className="row">
              {/* header  */}
              <div className="col-12 layout03 mb-4" align="left">
                <p className="text03">Create and sell your NFTs</p>
              </div>
              {/* end-header  */}
              {/* card  */}
              <div className="row">
                <div className="col-lg-6 ">
                  <div className="layout02 ps-4">
                    <img
                      src="assets/rsu-image/icons/wallet.svg"
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
                <div className="col-lg-6">
                  <div className="layout02 ps-4">
                    <img
                      src="assets/rsu-image/icons/collection2.svg"
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

                <div className="col-lg-6 ">
                  <div className="layout02 ps-4">
                    <img
                      src="assets/rsu-image/icons/img-nft.svg"
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
                <div className="col-lg-6">
                  <div className="layout02 ps-4">
                    <img
                      src="assets/rsu-image/icons/sale.svg"
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
              {/* card  */}
            </div>
          </div>
        </section>
        {/* end-section 04  */}
        {/* section 05  */}
        <section className="hilight-section03 layout03-2 pb-5s">
          <div className="container">
            <div className="row ">
              {/* header  */}
              <div className="col-6 col-6-1 mt-5 mb-4" align="left">
                <p className="text03">Resources for getting started</p>
              </div>
              {/* end-header  */}
              {/* card  */}
              {/* Slider homepage 03  */}
              <div className="row">
                <div>
                  <Slider
                    {...settings_s}
                    className="layout-slider_hp02 layout-slider_hp03  mt-2"
                  >
                    <div className="col-lg-3 layout-slider_hp02-2">
                      <CardResources
                        img="assets/rsu-image/card_ex.png"
                        title="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                      ></CardResources>
                    </div>

                    <div className="col-lg-3 layout-slider_hp02-2">
                      <CardResources
                        img="assets/rsu-image/card_ex.png"
                        title="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                      ></CardResources>
                    </div>

                    <div className="col-lg-3 layout-slider_hp02-2">
                      <CardResources
                        img="assets/rsu-image/card_ex.png"
                        title="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                      ></CardResources>
                    </div>

                    <div className="col-lg-3 layout-slider_hp02-2">
                      <CardResources
                        img="assets/rsu-image/card_ex.png"
                        title="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                      ></CardResources>
                    </div>

                    <div className="col-lg-3 layout-slider_hp02-2">
                      <CardResources
                        img="assets/rsu-image/card_ex.png"
                        title="Lorem Ipsum is Lorem Ipsum Ipsum isLorem Ipsum is"
                      ></CardResources>
                    </div>
                  </Slider>
                </div>
                {/* end-Slider homepage 03 */}
              </div>

              {/* card  */}
            </div>
          </div>
        </section>

        {/* end-section 05  */}
      </div>
    </>
  );
};

export default App;
App.layout = Mainlayout;
