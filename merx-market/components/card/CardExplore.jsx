
import Link from "next/link";
function CardExplore(props) {

    return (
        <>
            <Link href="/Explore-collection/item">
                <div className="exp-bg-card pb-3 c-pointer">
                    <div className="exp-cover">
                        <img alt="" src={props.cover} />
                    </div>
                    <div className="position-relative p-3" >
                        <div className="d-flex gap-2 position-absolute exp-header">
                            <div className="exp-img">
                                <img alt="" src={props.imgProfile} />
                            </div>
                            <div className="mt-auto" >
                                <div className="d-flex gap-2" >
                                    <h6 className="mb-0 fw-500 footer-font" >{props.name}</h6>
                                    <img className="i-purple" alt="" width={20} src="/assets/rsu-image/icons/verify-black.svg" />
                                </div>
                                <p className="mb-0 footer-font" >By. <span className="text-purple" >{props.user}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 d-flex gap-2 mt-2">
                        {/* <img className="i-purple" alt="" width={25} src="/assets/rsu-image/icons/art.svg" /> */}
                        <img className="i-purple" alt="" width={25} src="/assets/nft-image/icons/img-nft.svg" />
                    </div>
                    <div className="px-3">
                        <h6 className="exp-w-textdot fw-500 footer-font" >{props.title}</h6>
                        <h6 className="mb-0 fw-light exp-des-textdot footer-font">{props.des}</h6>
                    </div>
                </div>
            </Link>
        </>
    )
}
export default CardExplore
