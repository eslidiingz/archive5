
import { Row, Col } from "react-bootstrap";
import Search from "../../components/form/search";
import Select from "../../components/form/select";
import CardHidden from "../../components/card/CardHidden";
import { useCallback, useState } from "react";
import { useEffect } from "react";






function SetCreate() {
  const [nftList, setNftList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const _assets = useCallback(() => {
    const fetchingAssets = async () => {
      
    }
  }, [])
  useEffect(() => {

  }, [])
  return (
    <>
      <Row className="my-4">
        <Col md={6} className="my-2">
          <Search />
        </Col>
        <Col md={3} className="my-2">
          <Select selected="Single Items" />
        </Col>
        <Col md={3} className="my-2">
          <Select selected="Price" />
        </Col>
      </Row>
      <Row>
        <Col lg={4} md={4} sm={4} xs={6} className="mb-4">
          <CardHidden
            ClassTittle="text-white mb-0"
            img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
            img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
            tittle="Lorem Ipsum is"
            profile="sala"
            price="153"
            link="/Explore-collection/detail-music"
          ></CardHidden>
        </Col>
        <Col lg={4} md={4} sm={4} xs={6} className="mb-4">
          <CardHidden
            ClassTittle="text-white mb-0"
            img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
            img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
            tittle="Lorem Ipsum is"
            profile="sala"
            price="153"
            link="/Explore-collection/detail-music"
          ></CardHidden>
        </Col>
        <Col lg={4} md={4} sm={4} xs={6} className="mb-4">
          <CardHidden
            ClassTittle="text-white mb-0"
            img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
            img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
            tittle="Lorem Ipsum is"
            profile="sala"
            price="153"
            link="/Explore-collection/detail-music"
          ></CardHidden>
        </Col>
        <Col lg={4} md={4} sm={4} xs={6} className="mb-4">
          <CardHidden
            ClassTittle="text-white mb-0"
            img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
            img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
            tittle="Lorem Ipsum is"
            profile="sala"
            price="153"
            link="/Explore-collection/detail-music"
          ></CardHidden>
        </Col>
        <Col lg={4} md={4} sm={4} xs={6} className="mb-4">
          <CardHidden
            ClassTittle="text-white mb-0"
            img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
            img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
            tittle="Lorem Ipsum is"
            profile="sala"
            price="153"
            link="/Explore-collection/detail-music"
          ></CardHidden>
        </Col>
        <Col lg={4} md={4} sm={4} xs={6} className="mb-4">
          <CardHidden
            ClassTittle="text-white mb-0"
            img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
            img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
            tittle="Lorem Ipsum is"
            profile="sala"
            price="153"
            link="/Explore-collection/detail-music"
          ></CardHidden>
        </Col>
        <Col lg={4} md={4} sm={4} xs={6} className="mb-4">
          <CardHidden
            ClassTittle="text-white mb-0"
            img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
            img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
            tittle="Lorem Ipsum is"
            profile="sala"
            price="153"
            link="/Explore-collection/detail-music"
          ></CardHidden>
        </Col>
        <Col lg={4} md={4} sm={4} xs={6} className="mb-4">
          <CardHidden
            ClassTittle="text-white mb-0"
            img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
            img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
            tittle="Lorem Ipsum is"
            profile="sala"
            price="153"
            link="/Explore-collection/detail-music"
          ></CardHidden>
        </Col>
        <Col lg={4} md={4} sm={4} xs={6} className="mb-4">
          <CardHidden
            ClassTittle="text-white mb-0"
            img_profile="assets/nft-image/user/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.webp"
            img="assets/nft-image/woman-dive-underwater-see-mysterious-light-sea-digital-art-style-illustration-painting.webp"
            tittle="Lorem Ipsum is"
            profile="sala"
            price="153"
            link="/Explore-collection/detail-music"
          ></CardHidden>
        </Col>
      </Row>
    </>
  )
}
export default SetCreate
