import TabList from "../../components/utilities/tabs/tab-list"
import LaunchpadBuyPanel from "./buy-panel"
import LaunchpadSellPanel from "./sell-panel"

const LaunchpadPage = () => {
  return (
    <main className="d-flex flex-column min-vh-100">
      <div className="bg-main">
        <div className="row pl-4 pr-2 mx-3 h-100 d-flex align-items-center ">
          <div className="lp-content mx-auto">
            <div className="row mt-80">
              <div className="col-12 col-lg-6 p-0 mb-3 mb-lg-0 order-2 order-lg-1">
                <div className="font-w-500 bg-left d-flex flex-column justify-content-center">
                  <img
                    className="mx-auto"
                    src="deep-coin.webp"
                    alt="deep-coin.webp"
                    width={130}
                    height={130}
                  />
                  <div className="mt-5">
                    <h3 className="text-h3 color-black">
                      เงื่อนไข Private Sale :
                    </h3>
                    <ol className="text-desc">
                      <li>
                        เสนอขายให้กับผู้สนับสนุนกลุ่มแรก, คณะทำงาน, ที่ปรึกษา
                        และพาร์ทเนอร์ต่างๆ
                      </li>
                      <li>
                        กำหนดให้ระยะให้ Private Sale
                        ห้ามขายเหรียญหรือเปลี่ยนผู้ถือ เป็นระยะเวลา 5 ปี
                        โดยกำหนดให้เหรียญที่ได้จากการเปลี่ยนแปลง/ขายสินทรัพย์ใดๆที่เกิดจากธุรกรรมในช่วงระยะเวลา
                        5 ปี ผู้ที่อยู่ในกลุ่ม Private Sale
                        จะต้องนำมารวมกับเหรียญที่ถือในครั้งแรก
                        และขายหรือเปลี่ยนผู้ถือภายใต้
                      </li>
                    </ol>
                    <ul className="text-desc">
                      <li>
                        ถือครบ 6 เดือน สามารถขายหรือเปลี่ยนผู้ถือได้ 10%
                        ของจำนวนเหรียญที่ถือในครั้งแรก
                      </li>
                      <li>
                        ถือครบ 12 เดือน สามารถขายหรือเปลี่ยนผู้ถือได้ 10%
                        ของจำนวนเหรียญที่ถือในครั้งแรก
                      </li>
                      <li>
                        ถือครบ 24 เดือน สามารถขายหรือเปลี่ยนผู้ถือได้ 10%
                        ของจำนวนเหรียญที่ถือในครั้งแรก
                      </li>
                      <li>
                        ถือครบ 36 เดือน สามารถขายหรือเปลี่ยนผู้ถือได้ 10%
                        ของจำนวนเหรียญที่ถือในครั้งแรก
                      </li>
                      <li>
                        ถือครบ 48 เดือน สามารถขายหรือเปลี่ยนผู้ถือได้ 10%
                        ของจำนวนเหรียญที่ถือในครั้งแรก
                      </li>
                      <li>
                        ถือครบ 60 เดือน สามารถขายหรือเปลี่ยนผู้ถือได้ทั้งหมด{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 p-0 mb-3 mb-lg-0 order-1 order-lg-2">
                <div className="bg-right">
                  <div label="Buy" className="tab-content">
                    <LaunchpadBuyPanel />
                  </div>
                  {/* <TabList>
                    <div label="Buy" className="tab-content">
                      <LaunchpadBuyPanel />
                    </div>
                    <div label="Sell" className="tab-content">
                      <LaunchpadSellPanel />
                    </div>
                  </TabList> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal  */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default LaunchpadPage
