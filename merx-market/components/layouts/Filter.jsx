import React, { useState } from 'react';
import { Accordion } from "react-bootstrap";

function Filter() {
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

  const [isOffer, setOffer] = useState(false);
  const Offer = () => {
    setOffer(!isOffer);
  };

  const [isRinkeby, setRinkeby] = useState(false);
  const Rinkeby = () => {
    setRinkeby(!isRinkeby);
  };

  const [isMumbai, setMumbai] = useState(false);
  const Mumbai = () => {
    setMumbai(!isMumbai);
  };

  const [isBaobab, setBaobab] = useState(false);
  const Baobab = () => {
    setBaobab(!isBaobab);
  };

  const [isBCS, setBCS] = useState(false);
  const BCS = () => {
    setBCS(!isBCS);
  };

  const [isGoerli, setGoerli] = useState(false);
  const Goerli = () => {
    setGoerli(!isGoerli);
  };

  const [isETH, setETH] = useState(false);
  const ETH = () => {
    setETH(!isETH);
  };

  const [isWETH, setWETH] = useState(false);
  const WETH = () => {
    setWETH(!isWETH);
  };




  return (
    <>
      <div className='row'>
        <div className='col-4  d-none d-lg-block'>
          <div>
            <h4 className='footer-font pb-2' >Status</h4>
          </div>
          <div>
            <div className='d-flex gap-2 flex-wrap p-r-10 py-2'>
              <button className={`btn btn-filter ${isBuynow ? "active" : ""}`} onClick={Buynow}><i className={isBuynow ? "fal fa-times mgr-8 c-pointer" : ""}></i> Buy now</button>
              <button className={`btn btn-filter ${isAuction ? "active" : ""}`} onClick={Auction}><i className={isAuction ? "fal fa-times mgr-8 c-pointer" : ""}></i>On Auction</button>
              <button className={`btn btn-filter ${isNew ? "active" : ""}`} onClick={New}><i className={isNew ? "fal fa-times mgr-8 c-pointer" : ""}></i>New</button>
              <button className={`btn btn-filter ${isOffer ? "active" : ""}`} onClick={Offer}><i className={isOffer ? "fal fa-times mgr-8 c-pointer" : ""}></i>Has Offers</button>
            </div>
          </div>
        </div>

        <div className='col-5  d-none d-lg-block'>
          <div>
            <h4 className='footer-font pb-2' >Chains</h4>
          </div>
          <div>
            <div className='d-flex gap-2 flex-wrap p-r-10 py-2'>
              <button className={`btn btn-filter ${isRinkeby ? "active" : ""}`} onClick={Rinkeby}><i className={isRinkeby ? "fal fa-times mgr-8 c-pointer" : ""}></i>Rinkeby</button>
              <button className={`btn btn-filter ${isMumbai ? "active" : ""}`} onClick={Mumbai}><i className={isMumbai ? "fal fa-times mgr-8 c-pointer" : ""}></i>Mumbai</button>
              <button className={`btn btn-filter ${isBaobab ? "active" : ""}`} onClick={Baobab}><i className={isBaobab ? "fal fa-times mgr-8 c-pointer" : ""}></i>Baobab</button>
              <button className={`btn btn-filter ${isBCS ? "active" : ""}`} onClick={BCS}><i className={isBCS ? "fal fa-times mgr-8 c-pointer" : ""}></i>BCS Testnet</button>
              <button className={`btn btn-filter ${isGoerli ? "active" : ""}`} onClick={Goerli}><i className={isGoerli ? "fal fa-times mgr-8 c-pointer" : ""}></i>Goerli</button>
            </div>
          </div>
        </div>

        <div className='col-3 d-none d-lg-block'>
          <div>
            <h4 className='footer-font pb-2' >On Sale in</h4>
          </div>
          <div>
            <div className='d-flex gap-2 flex-wrap p-r-10 py-2'>
              <button className={`btn btn-filter ${isETH ? "active" : ""}`} onClick={ETH}><i className={isETH ? "fal fa-times mgr-8 c-pointer" : ""}></i>ETH</button>
              <button className={`btn btn-filter ${isWETH ? "active" : ""}`} onClick={WETH}><i className={isWETH ? "fal fa-times mgr-8 c-pointer" : ""}></i>WETH</button>
            </div>
          </div>
        </div>
      </div>

      <div className='filter-m d-lg-none' >
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Filter</Accordion.Header>
            <Accordion.Body>
              <h6 className='footer-font' >Status</h6>
              <div>
                <div className='d-flex gap-2 flex-wrap p-r-10 pb-4'>
                  <button className={`btn btn-filter ${isBuynow ? "active" : ""}`} onClick={Buynow} >Buy now</button>
                  <button className={`btn btn-filter ${isAuction ? "active" : ""}`} onClick={Auction} >On Auction</button>
                  <button className={`btn btn-filter ${isNew ? "active" : ""}`} onClick={New} >New</button>
                  <button className={`btn btn-filter ${isOffer ? "active" : ""}`} onClick={Offer} >Has Offers</button>
                </div>
              </div>
              <h6 className='footer-font pt-4'>Chains</h6>
              <div>
                <div className='d-flex gap-2 flex-wrap p-r-10 pb-4'>
                  <button className={`btn btn-filter ${isRinkeby ? "active" : ""}`} onClick={Rinkeby} >Rinkeby</button>
                  <button className={`btn btn-filter ${isMumbai ? "active" : ""}`} onClick={Mumbai} >Mumbai</button>
                  <button className={`btn btn-filter ${isBaobab ? "active" : ""}`} onClick={Baobab} >Baobab</button>
                  <button className={`btn btn-filter ${isBCS ? "active" : ""}`} onClick={BCS} >BCS Testnet</button>
                  <button className={`btn btn-filter ${isGoerli ? "active" : ""}`} onClick={Goerli} >Goerli</button>
                </div>
              </div>
              <h6 className='footer-font pt-4' >On Sale in</h6>
              <div className='d-flex gap-2 flex-wrap p-r-10 pb-4'>
                <button className={`btn btn-filter ${isETH ? "active" : ""}`} onClick={ETH} >ETH</button>
                <button className={`btn btn-filter ${isWETH ? "active" : ""}`} onClick={WETH} >WETH</button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}

export default Filter;