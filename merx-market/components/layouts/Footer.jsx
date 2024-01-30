import Link from "next/link"



function Footer() {


  return (
    <>
      <div className="container-fluid bg-rsu-footer">
        <div className="container">
          <div className="row py-5">
            <div className="col-lg-4 col-xl-5 py-4">
              <div className="footer-font" >
                <img alt="" width={100} src="/assets/nft-image/icon-passionworld.svg" />
                <h5 className="py-4" >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</h5>
                <div className="pt-3" >
                  <h5 className="fw-600" >Join the community</h5>
                  <div className="col-lg-4 col-xl-5 d-flex gap-2" >
                    <Link href="#">
                      <div className="footer-bg-icon">
                        <i className="fab fa-twitter icon-footer-twitter"></i>
                      </div>
                    </Link>
                    <Link href="#">
                      <div className="footer-bg-icon">
                        <i className="fab fa-instagram icon-footer-ig"></i>
                      </div>
                    </Link>
                    <Link href="#">
                      <div className="footer-bg-icon">
                        <i className="fab fa-reddit-alien icon-footer-reddit"></i>
                      </div>
                    </Link>
                    <Link href="#">
                      <div className="footer-bg-icon">
                        <i className="fab fa-youtube icon-footer-youtube"></i>
                      </div>
                    </Link>
                    <Link href="#">
                      <div className="footer-bg-icon">
                        <i className="fas fa-envelope icon-footer-mail"></i>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-xl-7">
              <div className="row">
                <div className="col-custom-5 footer-font">
                  <h4>Marketplace</h4>
                  <div className="d-flex flex-row flex-wrap flex-lg-column gap-2 gap-lg-0" >
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >All NFTs</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Art</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Collectibles</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Domain Names</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Music</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Photography</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Sports</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Trading Cards</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Utility</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Virtual Worlds</h5></Link>
                  </div>
                </div>
                <div className="col-custom-5 footer-font mt-4 mt-lg-0">
                  <h4>My Account</h4>
                  <div className="d-flex flex-row flex-wrap flex-lg-column gap-2 gap-lg-0">
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Profile</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Favorites</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Watchlist</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >My Collections</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Settings</h5></Link>
                  </div>
                </div>
                <div className="col-custom-5 footer-font mt-4 mt-lg-0">
                  <h4>Stats</h4>
                  <div className="d-flex flex-row flex-wrap flex-lg-column gap-2 gap-lg-0">
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Rankings</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Activity</h5></Link>
                  </div>
                </div>
                <div className="col-custom-5 footer-font mt-4 mt-lg-0">
                  <h4>Resources</h4>
                  <div className="d-flex flex-row flex-wrap flex-lg-column gap-2 gap-lg-0">
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Help Center</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Platform Status</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Partners</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Gas-Free Marketplace</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Taxes</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Blog</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Docs</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Newsletter</h5></Link>
                  </div>
                </div>
                <div className="col-custom-5 footer-font mt-4 mt-lg-0">
                  <h4>Company</h4>
                  <div className="d-flex flex-row flex-wrap flex-lg-column gap-2 gap-lg-0">
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >About</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Careers</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Ventures</h5></Link>
                    <Link href="#"><h5 className="mb-0 mb-lg-2 text-footer_h" >Grants</h5></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Footer
