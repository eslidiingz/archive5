import { useState } from "react";
import Link from "next/link";

function CardBuy(props) {
  const [isActive, setActive] = useState(false);
  const toggleFav = () => {
    setActive(!isActive);
  };

  return (
    <>
      <div className="cards text-white ">
        <Link href={"/"}>
          <a className="w-full">
            <div className=" position-relative">
              <img
                className="card-img-top img-card"
                src={props.img}
                alt="Card image"
              />
            </div>
          </a>
        </Link>

        <div className="w-full p-3">
          <p className="text05 mt-2">{props.detail}</p>
          <p className="text05 mt-2" align="right">
            Price
          </p>
          <p className="text13" align="right">
            {props.time}
          </p>
          <div className="row">
            <div className="col-6 mt-2 d-flex gap-2">
              <button className="btn-none">
                <div className="d-flex gap-1 align-items-center fav">
                  <i
                    className={`fas fa-heart layout04 ${isActive ? "icon-purple" : "icon-white"
                      }`}
                    onClick={toggleFav}
                  ></i>
                  <p
                    className={`text14 ${isActive ? "icon-purple" : "ci-white"
                      }`}
                    onClick={toggleFav}
                  >
                    {props.fav}
                  </p>
                </div>
              </button>
            </div>
            <div className="col-6 mt-2">
              <div className="d-flex gap-2 align-items-center justify-content-end pt-1">
                <img
                  alt=""
                  width={13}
                  src="/assets/rsu-image/icons/diamond.svg"
                />
                <p className="text15" align="right">
                  ${props.coin}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <hr className="hr-width my-0" /> */}
        <div className="container d-flex justify-content-end p-3">
          <div className="row">
            <div className="col-7">
              <a href={props.href} className="btn btn03 btn-hover color-1 w160">
                {props.button}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CardBuy;
