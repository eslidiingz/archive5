
import { Row, Col} from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import Search from "../../components/form/search";
import Select from "../../components/form/select";



function SetActivity() {

    return (
      <>
               <Row className="my-4">
                  <Col md={6} className="my-2">
                    <Search/>
                  </Col>
                  <Col md={3} className="my-2">
                    <Select selected="Event type"/>
                  </Col>
                  <Col md={3} className="my-2">
                    <Select selected="Recently Listed"/>
                  </Col>
                </Row>
                <Row className="exp-table">
                    <Table responsive borderless hover className=" text-white">
                        <thead>
                            <tr className="bd-bottom text-white">
                                <th>Event type</th>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="text-white td-width">
                                        Transfer
                                    </div>
                                </td>
                                <td>
                                    <div className="text-white  d-flex align-items-center td-width">
                                        <img className="mx-1 w-img-td" src="assets/rsu-image/user/Ellipse.png" />
                                        <div>
                                            Lorem ...
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex text-white td-width">
                                        <img className="mx-2" src="assets/rsu-image/icons/diamond.svg" />
                                        ---
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex  text-white td-width">
                                        1
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex ci-purple td-width">
                                        <div>
                                            awdw
                                        </div>
                                        <img className="mx-2" src="assets/rsu-image/icons/verify.svg" />
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex ci-purple td-width">
                                        7868SD78
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex ci-purple td-width">
                                        6 Hours ago
                                        <img className="mx-2" src="assets/rsu-image/icons/document.svg" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="text-white td-width">
                                        Sale
                                    </div>
                                </td>
                                <td>
                                    <div className="text-white  d-flex align-items-center td-width">
                                        <img className="mx-1 w-img-td" src="assets/rsu-image/user/Ellipse.png" />
                                        <div>
                                            Lorem ...
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex text-white td-width">
                                        <img className="mx-2" src="assets/rsu-image/icons/diamond.svg" />
                                        <div className="lh-1">
                                            <p className="mb-0">120</p>
                                            <small className="f-8">($1,234.65)</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex  text-white td-width">
                                        1
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex ci-purple td-width">
                                        <div>
                                            awdw
                                        </div>
                                        <img className="mx-2" src="assets/rsu-image/icons/verify.svg" />
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex ci-purple td-width">
                                        7868SD78
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex ci-purple td-width">
                                        6 Hours ago
                                        <img className="mx-2" src="assets/rsu-image/icons/document.svg" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="text-white td-width">
                                        Offer
                                    </div>
                                </td>
                                <td>
                                    <div className="text-white  d-flex align-items-center td-width">
                                        <img className="mx-1 w-img-td" src="assets/rsu-image/user/Ellipse.png" />
                                        <div>
                                            Lorem ...
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex text-white td-width">
                                        <img className="mx-2" src="assets/rsu-image/icons/diamond.svg" />
                                        <div className="lh-1">
                                            <p className="mb-0">120</p>
                                            <small className="f-8">($1,234.65)</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex  text-white td-width">
                                        1
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex ci-purple td-width">
                                        <div>
                                            awdw
                                        </div>
                                        <img className="mx-2" src="assets/rsu-image/icons/verify.svg" />
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex ci-purple td-width">
                                        ---
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex  text-white td-width">
                                        6 Hours ago
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="text-white">
                                        Offer
                                    </div>
                                </td>
                                <td>
                                    <div className="text-white  d-flex align-items-center">
                                        <img className="mx-1 w-img-td" src="assets/rsu-image/user/Ellipse.png" />
                                        <div>
                                            Lorem ...
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex text-white">
                                        <img className="mx-2" src="assets/rsu-image/icons/diamond.svg" />
                                        <div className="lh-1">
                                            <p className="mb-0">120</p>
                                            <small className="f-8">($1,234.65)</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex  text-white">
                                        1
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex ci-purple">
                                        <div>
                                            awdw
                                        </div>
                                        <img className="mx-2" src="assets/rsu-image/icons/verify.svg" />
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex ci-purple">
                                        ---
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex  text-white">
                                        6 Hours ago
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="text-white">
                                        List
                                    </div>
                                </td>
                                <td>
                                    <div className="text-white  d-flex align-items-center">
                                        <img className="mx-1 w-img-td" src="assets/rsu-image/user/Ellipse.png" />
                                        <div>
                                            Lorem ...
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex text-white">
                                        <img className="mx-2" src="assets/rsu-image/icons/diamond.svg" />
                                        <div className="lh-1">
                                            <p className="mb-0">120</p>
                                            <small className="f-8">($1,234.65)</small>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex  text-white">
                                        1
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex ci-purple">
                                        <div>
                                            awdw
                                        </div>
                                        <img className="mx-2" src="assets/rsu-image/icons/verify.svg" />
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex ci-purple">
                                        ---
                                    </div>
                                </td>
                                <td>
                                    <div className=" d-flex  text-white">
                                        6 Hours ago
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
      </>
    )
  }
  export default SetActivity
  