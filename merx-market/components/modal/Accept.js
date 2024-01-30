import Modal from "react-bootstrap/Modal";
import Link from "next/link";

function AcceptModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onClose}
      className=""
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal-headers" closeButton>
        <Modal.Title>
          <p align="center" className="text-makeanoff-h_ex">
            Make an offer{" "}
          </p>
        </Modal.Title>
      </Modal.Header>
      <hr className="hr-detailpage" />
      <Modal.Body>
        <div className="row px-5">
          <div className="col-xl-12">
            <div className="layout-deatilpage-modal">
              <p className="text-deatilpage-modal">Item</p>
              <hr />
            </div>
            <div className="row layout-deatilpage-modal2">
              <div className="col-xl-2">
                <img
                  src="/assets/rsu-image/music/demo.png"
                  className="img-deatilpage-modal w-100"
                />
              </div>
              <div className="col-xl-4 layout-modal_main">
                <div className="d-flex">
                  <h4 className="text-tittle-deatilpage-modal">Xeroca</h4>
                  <img
                    className="i-purple"
                    alt=""
                    width={20}
                    src="/assets/rsu-image/icons/verify-black.svg"
                  />
                </div>
                <p className="text-buy-deatilpage-modal">Dipper</p>
                <p className="text-buy-deatilpage-modal2">Creator Fees: 2.5%</p>
              </div>
              <div className="col-xl-6 layout-token" align="right">
                <div className="d-flex layout-diamonds justify-content-end">
                  <img
                    src="/assets/rsu-image/icons/diamond.svg"
                    className="img-token"
                  />
                  <p className="layout-token-deatilpage mb-0">29.5</p>
                </div>
                <p className="layout-token-deatilpage text-token">$53,200.90</p>
              </div>
              <hr />
            </div>
          </div>
          <div className="col-xl-6 layout-deatilpage-modal2 my-3">
            <p className="text-deatilpage-modal">Total</p>
          </div>
          <div className="col-xl-6 layout-deatilpage-modal2 my-3" align="right">
            <div className="d-flex layout-diamonds justify-content-end">
              <img
                src="/assets/rsu-image/icons/diamond.svg"
                className="img-token"
              />
              <p className="layout-token-deatilpage2 mb-0">29.5</p>
            </div>
            <p className="layout-token-deatilpage text-token">$53,200.90</p>
          </div>
          <div className="col-xl-12 layout-deatilpage-modal2 my-3">
            <input type="checkbox" id="html" name="fav_language" value="HTML" />
            <label for="html" className="text-deatilpage-modal2 px-2">
              ข้อตกลงในการใช้งาน{" "}
              <Link href="">
                <u className="text-modal">อ่านข้อตกลง</u>
              </Link>
            </label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer align="center" style={{ display: "block" }}>
        <button className="btn btn01 btn-hover color-1">Make offer</button>
      </Modal.Footer>
    </Modal>
  );
}
export default AcceptModal;
