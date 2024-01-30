import { useState } from "react";
import Link from "next/link";

function CardTrending(props) {
  const [isActive, setActive] = useState(false);
  const toggleFav = () => {
    setActive(!isActive);
  };

  return (
    <>
      
          <div className="card_new">
            <img className="img-card_new" src={props.img} alt="Card image" />
            <div className="d-flex gap-2 layout-main-icon_hearth" align="right">
              <i className={`fas fa-heart layout04 layout-icon_hearth ${isActive ? "icon-purple" : ""}`} onClick={toggleFav}></i>
            </div>

            <div className="card_new-body">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-2 col-2 p-0">
                  <img className="img-profile-card_new" alt="" src={props.img_profile} />
                </div>
                <div className="col-lg-9 col-sm-9 mt-xxl-2 col-9 mt-1 mb-4 p-0">
                  <div className="w-fit px-2">
                    <div className="d-flex">
                      <p className={props.ClassTittle}>{props.tittle}</p>
                      <img className="i-purple ms-2 icon-verify" alt="" src="/assets/rsu-image/icons/verify-black.svg" />
                    </div>
                    <p className="text-tittle-sub-menu">By. {props.profile}</p>
                    <p className="text-price2-card_new"> {props.stock} </p>
                  </div>
                </div>


                <div className="col-6 col-sm-6 col-mb-6 mb-2 layout-btn_card" align="left">
                  <div className="d-flex gap-2">
                    {props.price && (
                      <>
                        <img className="icon-diamond" alt="" src="/assets/rsu-image/icons/diamond.svg" />
                        <p className="text-price-card_new" align="right"> {props.price} </p>
                      </>
                    )}
                    
                  </div>
                </div>
                <div className="col-6 col-sm-6 col-mb-6 mb-2 layout-btn_card">
                  {props.price && (
                    <Link href="/Explore-collection/detail-music">
                      <button className="btn-sub_cardnew w-full h-36">VIEW</button>
                    </Link>
                  )}
                </div>

              </div>
            </div>
          </div>
    </>
  );
}
export default CardTrending;