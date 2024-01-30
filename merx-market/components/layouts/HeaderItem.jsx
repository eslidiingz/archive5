import Link from "next/link"
import { Container, Row, Col, Nav, Button } from "react-bootstrap";

function HeaderItem(props) {

  return (
    <>
      <div className="row px-3 px-md-0 header-show">
        <div className="col-12 bg-round">
          <div className="d-flex align-items-center justify-content-between px-4 py-2 header-sub flex-nowrap">
            <div className="w-fit">
              <div className="f32 text-detail-itempage w-80-dot text-center">{props.item}</div>
              <h6 className="fw-500 text-purple text-center" >Item</h6>
            </div>
            <hr className="line-h" />
            <div className="w-fit">
              <div className="f32 text-detail-itempage w-80-dot text-center">{props.owners}</div>
              <h6 className="fw-500 text-purple text-center" >Owners</h6>
            </div>
            <hr className="line-h" />
            <div className="w-fit">
              <div className="d-flex">
                <img alt="" src="/assets/rsu-image/icons/coin.svg" width={16} />
                <div className="f32 text-detail-itempage w-80-dot text-center" title="4,612">{props.price}</div>
              </div>
              <h6 className="fw-500 text-purple text-center" >floor price</h6>
            </div>
            <hr className="line-h" />
            <div className="w-fit">
              <div className="d-flex mx-auto">
                <img alt="" src="/assets/rsu-image/icons/coin.svg" width={16} />
                <div className="f32 text-detail-itempage w-80-dot text-center">{props.volume}</div>
              </div>
              <h6 className="fw-500 text-purple text-center" >volume traded</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="header-hide">
        <div className="row d-flex my-2 ">
          <div className="col-custom-header ">
            <div className="mx-auto bg-round2 pb-2 pt-1">
              <div className="f32 text-detail-itempage w-80-dot text-center mx-auto">{props.item}</div>
              <h6 className="fw-500 text-purple text-center" >Item</h6>
            </div>
          </div>
          <div className="col-custom-header">
            <div className="mx-auto bg-round2 pb-2 pt-1">
              <div className="f32 text-detail-itempage w-80-dot text-center mx-auto">{props.owners}</div>
              <h6 className="fw-500 text-purple text-center" >Owners</h6>
            </div>
          </div>
          <div className="col-custom-header">
            <div className="mx-auto bg-round2 pb-2 pt-1">
              <div className="d-flex justify-content-center">
                <img alt="" src="/assets/rsu-image/icons/coin.svg" width={16} />
                <div className="f32 text-detail-itempage w-80-dot text-center" title="4,612">{props.price}</div>
              </div>
              <h6 className="fw-500 text-purple text-center" >floor price</h6>
            </div>
          </div>
          <div className="col-custom-header">
            <div className="mx-auto bg-round2 pb-2 pt-1">
              <div className="d-flex justify-content-center">
                <img alt="" src="/assets/rsu-image/icons/coin.svg" width={16} />
                <div className="f32 text-detail-itempage w-80-dot text-center">{props.volume}</div>
              </div>
              <h6 className="fw-500 text-purple text-center" >volume traded</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default HeaderItem