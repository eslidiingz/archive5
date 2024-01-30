import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Mainlayout from "../../components/layouts/Mainlayout";
import React from "react";
import Tab from "react-bootstrap/Tab";
import { Nav } from "react-bootstrap";
import Link from "next/link";

import Setprofile from "../../components/profile/profile";
import Setvertify from "../../components/profile/vertify";
import SetCreate from "../../components/profile/create";
import SetActivity from "../../components/profile/activity";
import SetFavorites from "../../components/profile/favorites";
import SetHidden from "../../components/profile/hidden";
import SetCollection from "../../components/profile/collection";
import SetOffer from "../../components/profile/offer";
import SetSetting from "../../components/profile/setting";
import Setplacement from "../../components/profile/placement";
import Setbiding from "../../components/profile/biding";


const Profile = (props) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (router.isReady) {
      const { tab } = router.query;
      setActiveTab(tab);
    }
  }, [router.isReady]);

  const handleChangeTab = (selectedTab) => {
    setActiveTab(selectedTab);
  };
  return (
    <Mainlayout setActiveTab={setActiveTab} activeTab={activeTab}>
      <section className="">
        <div className="container pd-top-bottom-section">
          <div className="row d-flex align-items-center">
            <div className="col-6">
              <h1 className="ci-white">Profile</h1>
            </div>
            <div className="col-xl-6 col-12 text-end">
              <p className="text-navgation text-white">
                <Link href="/"><a className="text-white text-navation_mr">Home</a></Link> {'>'}
                <Link href=""><a className="text-white text-navation_mr">Profile</a></Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className=" test2">
        <Tab.Container id="left-tabs-example"
          defaultActiveKey={activeTab}
          className="mb-3 flex-scroll"
          activeKey={activeTab}
          onSelect={handleChangeTab}
        >
          <div className=" container d-flex-set-profile">
            <div className="w-300-100profile">
              <Nav
                variant="pills"
                className="flex-column tab-profile nav-profile-md"
              >
                <Nav.Item>
                  <Nav.Link eventKey="profile">
                    <img
                      src="assets/rsu-image/icons/profile.svg"
                      className="mx-3"
                    />
                    Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="vertify">
                    <img
                      src="assets/rsu-image/icons/verify.svg"
                      className="mx-3"
                    />
                    Verification
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="create">
                    <img
                      src="assets/rsu-image/icons/create.svg"
                      className="mx-3"
                    />
                    Create
                  </Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                <Nav.Link eventKey="collected">
                <img src="assets/rsu-image/icons/collected.svg" className="mx-3" />
                Collected
                </Nav.Link>
              </Nav.Item> */}
                <Nav.Item>
                  <Nav.Link eventKey="activity">
                    <img
                      src="assets/rsu-image/icons/activity.svg"
                      className="mx-3"
                    />
                    Activity
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="favorites">
                    <img
                      src="assets/rsu-image/icons/favorites.svg"
                      className="mx-3"
                    />
                    Favorites <span> (3)</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="hidden">
                    <img
                      src="assets/rsu-image/icons/hidden.svg"
                      className="mx-3"
                    />
                    Hidden <span> (3)</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="collection">
                    <img
                      src="assets/rsu-image/icons/collection.svg"
                      className="mx-3"
                    />
                    Collection <span> (3)</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="offer">
                    <img
                      src="assets/rsu-image/icons/offer.svg"
                      className="mx-3"
                    />
                    offer <span> (3)</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  {/* <Nav.Link eventKey="settings">
                    <img
                      src="assets/rsu-image/icons/setting.svg"
                      className="mx-3"
                    />
                    Settings <span> (3)</span>
                  </Nav.Link> */}
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="placement">
                    <img
                      src="assets/rsu-image/icons/placement-list.svg"
                      className="mx-3"
                    />
                    Placement list <span> (3)</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="biding">
                    <img
                      src="assets/rsu-image/icons/bidding.svg"
                      className="mx-3"
                    />
                    Biding list <span> (3)</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <div className="col bd-left ps-lg-4 ps-0">
              <Tab.Content className="px-3 px-lg-0">
                <Tab.Pane eventKey="profile">
                  <Setprofile />
                </Tab.Pane>
                <Tab.Pane eventKey="vertify">
                  <Setvertify />
                </Tab.Pane>
                <Tab.Pane eventKey="create">
                  <SetCreate />
                </Tab.Pane>
                <Tab.Pane eventKey="activity">
                  <SetActivity />
                </Tab.Pane>
                <Tab.Pane eventKey="favorites">
                  <SetFavorites />
                </Tab.Pane>
                <Tab.Pane eventKey="hidden">
                  <SetHidden />
                </Tab.Pane>
                <Tab.Pane eventKey="collection">
                  <SetCollection />
                </Tab.Pane>
                <Tab.Pane eventKey="offer">
                  <SetOffer />
                </Tab.Pane>
                <Tab.Pane eventKey="settings">
                  <SetSetting />
                </Tab.Pane>
                <Tab.Pane eventKey="placement">
                  <Setplacement />
                </Tab.Pane>
                <Tab.Pane eventKey="biding">
                  <Setbiding />
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </section>
    </Mainlayout>
  );
};

export default Profile;
