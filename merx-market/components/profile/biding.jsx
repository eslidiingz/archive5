
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Table, Tabs, Tab} from "react-bootstrap";
import Accept from "../../components/modal/Accept";

function Setbiding() {
    const [showAcceptModal, setAcceptModal] = useState(false);

    const handleCloseAcceptModal = () => {
        setAcceptModal(false);
    };

    return (
        <>
                <Row className="exp-tab px-3">
                    <Tabs defaultActiveKey="Biding list" id="main-tab" className="mb-3 px-0">
                        <Tab eventKey="Biding list" title="Biding list" >
                            <Col md={12} className="exp-table px-0">
                                <div className="table-responsive">
                                    <Table borderless responsive hover >
                                        <thead>
                                        <tr className="bd-bottom text-white" >
                                            <th className="py-3 ps-3 " ><p className="mb-0 text-white" >Item</p></th>
                                            <th className="py-3" ><p className="mb-0 text-white" >Unit Price</p></th>
                                            <th className="py-3" ><p className="mb-0 text-white" >USD Unit Price</p></th>
                                            <th className="py-3" ><p className="mb-0 text-white" >Floor Difference</p></th>
                                            <th className="py-3" ><p className="mb-0 text-white" >From</p></th>
                                            <th className="py-3" ><p className="mb-0 text-white" >Expiration</p></th>
                                            <th className="py-3" ><p className="mb-0 text-white" >Received</p></th>
                                            <th className="py-3" ><p className="mb-0 text-white" >Actions</p></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="pt-4 pb-3 ps-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                                <button className="btn btn03 btn-hover color-1 w-100" type="btn" onClick={() => setAcceptModal(true)}>Accept</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pt-4 pb-3 ps-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                                <button className="btn btn03 btn-hover color-1 w-100" type="btn" onClick={() => setAcceptModal(true)}>Accept</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pt-4 pb-3 ps-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                                <button className="btn btn03 btn-hover color-1 w-100" type="btn" onClick={() => setAcceptModal(true)}>Accept</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pt-4 pb-3 ps-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                                <button className="btn btn03 btn-hover color-1 w-100" type="btn" onClick={() => setAcceptModal(true)}>Accept</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pt-4 pb-3 ps-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                                <button className="btn btn03 btn-hover color-1 w-100" type="btn" onClick={() => setAcceptModal(true)}>Accept</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pt-4 pb-3 ps-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                                <button className="btn btn03 btn-hover color-1 w-100" type="btn" onClick={() => setAcceptModal(true)}>Accept</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pt-4 pb-3 ps-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                                <button className="btn btn03 btn-hover color-1 w-100" type="btn" onClick={() => setAcceptModal(true)}>Accept</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pt-4 pb-3 ps-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3"><p className="mb-0 text-white">text</p></td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                            <p className="mb-0 text-white">text</p>
                                            </td>
                                            <td className="pt-4 pb-3">
                                                <button className="btn btn03 btn-hover color-1 w-100" type="btn" onClick={() => setAcceptModal(true)}>Accept</button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Tab>
                    </Tabs>
                </Row>
                <Accept
                    onClose={handleCloseAcceptModal}
                    show={showAcceptModal}
                />
        </>
    )
  }
  export default Setbiding
  