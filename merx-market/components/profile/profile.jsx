
import Link from "next/link";
import { Row, Col} from "react-bootstrap";


function Setprofile() {

    return (
      <>
            <Row className="my-4">
                <Col md={3} xs={6} className="my-2 my-lg-2">
                <div className="box-profile-set4"> 
                    <div className="d-flex align-content-center justify-content-center">
                    <img src="assets/rsu-image/icons/icon-add1.svg"  className="me-2" alt="..." />
                    <div className="">
                        <h2 className="mb-0">24k</h2>
                        <p className="mb-0">Collected</p>
                    </div>
                    </div>
                </div>
                </Col>
                <Col md={3} xs={6} className="my-2 my-lg-2">
                <div className="box-profile-set4"> 
                    <div className="d-flex align-content-center justify-content-center">
                    <img src="assets/rsu-image/icons/icon-add2.svg"  className="me-2" alt="..." />
                    <div className="">
                        <h2 className="mb-0">82K</h2>
                        <p className="mb-0">Auction</p>
                    </div>
                    </div>
                </div>
                </Col>
                <Col md={3} xs={6} className="my-2 my-lg-2">
                <div className="box-profile-set4"> 
                    <div className="d-flex align-content-center justify-content-center">
                    <img src="assets/rsu-image/icons/icon-add3.svg"  className="me-2" alt="..." />
                    <div className="">
                        <h2 className="mb-0">200</h2>
                        <p className="mb-0">Creators</p>
                    </div>
                    </div>
                </div>
                </Col>
                <Col md={3} xs={6} className="my-2 my-lg-2">
                <div className="box-profile-set4"> 
                    <div className="d-flex align-content-center justify-content-center">
                    <img src="assets/rsu-image/icons/icon-add4.svg"  className="me-2" alt="..." />
                    <div className="">
                        <h2 className="mb-0">200</h2>
                        <p className="mb-0">Creators</p>
                    </div>
                    </div>
                </div>
                </Col>
            </Row>
            <Row className="">
                <Col xxl={8} xl={7} lg={6} xs={12} className="mb-3 mb-lg-2">
                <div className="box-profile-set2 pt-3">
                    <div className="d-flex justify-content-between align-items-center">
                    <Row className="layout_profile-btn">
                        <div className="col-xxl-7 col-xl-6 col-lg-12">
                            <img src="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp" className=" img_profile border-img-profile" />
                        </div>
                        <div className="text-start col-xxl-5 col-xl-5 col-lg-12 layout-padding-profile">
                            <h3>
                                dbai<span><img className="mx-2" src="assets/rsu-image/icons/verify.svg" alt="..." /></span>
                            </h3>
                            <button className="btn d-flex btn-token align-items-center"><img className="mx-2" src="assets/rsu-image/icons/token.svg" alt="..." />1f6s4f6wf... <img className="mx-2" src="assets/rsu-image/icons/copy.svg" alt="..." /></button>
                            <div className="btn-group my-2" role="group" aria-label="Basic example ">
                                <button type="button" className="btn btn-social-profile-right mx-1">
                                    <span><img className="mx-2" src="assets/rsu-image/icons/twitter.svg" alt="..." /></span>dbai
                                </button>
                                <button type="button" className="btn btn-social-profile-left mx-1">
                                    <span><img className="mx-2" src="assets/rsu-image/icons/camera.svg" alt="..." /></span>dbai
                                </button>
                            </div>
                            <p>Dour Darcels are a collection of 10,000 moody frens from Darcel Disappoints. All are individual and unique – just like frens IRL</p>
                            <p>Joined December 2021</p>
                            
                            <Link href="/Profile/editprofile">
                                <a className="ci-blue fw-bold">Edit</a>
                            </Link>
                        </div>
                        </Row>
                    </div>
                  <div className="text-start">
                        <div className="my-4"/>
                        <h3 className="ci-green">
                            <span><img className="mx-2" src="assets/rsu-image/icons/correct.svg" alt="..." /></span>Vertify Account
                        </h3>
                    </div>
                    <div className="text-start">
                        <div className="my-4"/>
                        <h3 className="ci-blue">
                            <span><img className="mx-2" src="assets/rsu-image/icons/factor.svg" alt="..." /></span>Two-factor authentication (2FA)
                        </h3>
                    </div>
                </div>
                
                </Col>
                <Col xxl={4} xl={5} lg={6} xs={12} className="d-flex align-items-stretch mb-0 mb-lg-2">
                <div className="box-profile-set2 pt-3">
                    <div className=" text-white">
                    <h5>Connect Social</h5>
                    </div>
                    <div className="row">
                    <Col sm={6} className="text-start d-flex align-items-center my-3 col-6">
                    <img className="mx-2" src="assets/rsu-image/icons/facebook.svg" alt="..." />
                    <p className="mb-0">
                        Facebook
                    </p>
                    </Col>
                    <Col sm={6} className="text-end px-4 my-2 d-flex align-items-center justify-content-end col-6">
                        <p  className="ci-blue mb-0">Connected</p>
                    </Col>
                    <Col sm={6} className="text-start d-flex align-items-center my-3 col-6">
                    <img className="mx-2" src="assets/rsu-image/icons/Twitter-R.svg" alt="..." />
                    <p className="mb-0">
                        Twitter
                    </p>
                    </Col>
                    <Col sm={6} className="text-end px-4 my-2 d-flex align-items-center justify-content-end col-6">
                        <p  className="text-white mb-0">Connect</p>
                    </Col>
                    <Col sm={6} className="text-start d-flex align-items-center my-3 col-6">
                    <img className="mx-2" src="assets/rsu-image/icons/Instagram.svg" alt="..." />
                    <p className="mb-0">
                    Instagram
                    </p>
                    </Col>
                    <Col sm={6} className="text-end px-4 my-2 d-flex align-items-center justify-content-end col-6">
                        <p  className="text-white mb-0">Connect</p>
                    </Col>
                    <Col sm={6} className="text-start d-flex align-items-center my-3 col-6">
                    <img className="mx-2" src="assets/rsu-image/icons/discord2.svg" alt="..." />
                    <p className="mb-0">
                    Discord
                    </p>
                    </Col>
                    <Col sm={6} className="text-end px-4 my-2 d-flex align-items-center justify-content-end col-6">
                        <p  className="text-white mb-0">Connect</p>
                    </Col>
                    <Col sm={6} className="text-start d-flex align-items-center my-3 col-6">
                    <img className="mx-2" src="assets/rsu-image/icons/youtube.svg" alt="..." />
                    <p className="mb-0">
                    Youtube
                    </p>
                    </Col>
                    <Col sm={6} className="text-end px-4 my-2 d-flex align-items-center justify-content-end col-6">
                        <p  className="text-white mb-0">Connect</p>
                    </Col>
                    </div>
                </div>
                </Col>
            </Row>
            <Row className="">
                <Col sm={12}>
                <h4 className=" text-white  my-4">Information</h4>
                </Col>
                <Col sm={12} className="mb-5">
                <div className="box-profile-set2 ">
                    <Row>
                    <Col sm={3} className="text-start my-2">
                        <p className="ci-purple mb-0">User ID</p>
                        <p className=" text-white  mb-0">879334</p>
                    </Col>
                    <Col sm={3} className="text-start  my-2">
                        <p className="ci-purple  mb-0">Joined Since</p>
                        <p className=" text-white  mb-0">20/09/2020</p>
                    </Col>
                    <Col sm={3} className="text-start  my-2">
                        <p className="ci-purple  mb-0">Country of Residence</p>
                        <p className=" text-white  mb-0">Thailand</p>
                    </Col>
                    </Row>
                    <Row>
                    <Col sm={3} className="text-start  my-2">
                        <p className="ci-purple  mb-0">Email address</p>
                        <p className=" text-white  mb-0">Email@gmail.com</p>
                    </Col>
                    <Col sm={3} className="text-start  my-2">
                        <p className="ci-purple  mb-0">Type</p>
                        <p className=" text-white  mb-0">Personal</p>
                    </Col>
                    </Row>
                </div>
                </Col>

            </Row>
      </>
    )
  }
  export default Setprofile
  