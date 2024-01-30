import Link from "next/link";
import React from "react";

const WorldLuxvana = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="world">
          
          <div className="world-kurnugia stage-4">{/*<--- stage-xx เลือกจะโชว์แผนที่ ว่าถึง stage ไหนแล้ว */}
            <div className="zoner zone-1">  
              <button className="zone-btn active">I</button>{/*<--- class active เมื่อคลิกแล้วให้ขึ้น class active */}
              <div className="zone-dropdown">
                <Link href="/map/world-kurnugia/market/id1"><div className="zone-child">1</div></Link>
                <div className="zone-child">2</div>
              </div>
            </div>
            <div className="zoner zone-2">  
              <button className="zone-btn">II</button>
              <div className="zone-dropdown">
                <div className="zone-child">3</div>
                <div className="zone-child">4</div> 
              </div>
            </div>
            <div className="zoner zone-3">  
              <button className="zone-btn">III</button>
              <div className="zone-dropdown">
                <div className="zone-child">5</div>
                <div className="zone-child">6</div>
              </div>
            </div>
            <div className="zoner zone-4">  
              <button className="zone-btn">IV</button>
              <div className="zone-dropdown">
                <div className="zone-child">7</div>
                <div className="zone-child">8</div>
              </div>
            </div>
            <div className="zoner zone-5">  
              <button className="zone-btn">V</button>
              <div className="zone-dropdown">
                <div className="zone-child">9</div>
                <div className="zone-child">10</div>
              </div>
            </div>
            <div className="zoner zone-6">  
              <button className="zone-btn">VI</button>
              <div className="zone-dropdown">
                <div className="zone-child">11</div>
                <div className="zone-child">12</div>
              </div>
            </div>
            <div className="zoner zone-7">  
              <button className="zone-btn">VII</button>
              <div className="zone-dropdown">
                <div className="zone-child">13</div>
                <div className="zone-child">14</div>
              </div>
            </div>
            <div className="zoner zone-8">  
              <button className="zone-btn">VIII</button>
              <div className="zone-dropdown">
                <div className="zone-child">15</div>
                <div className="zone-child">16</div>
              </div>
            </div>
            <div className="zoner zone-9">  
              <button className="zone-btn">IX</button>
              <div className="zone-dropdown">
                <div className="zone-child">17</div>
                <div className="zone-child">18</div>
              </div>
            </div>
            <div className="zoner zone-10">  
              <button className="zone-btn">x</button>
              <div className="zone-dropdown">
                <div className="zone-child">19</div>
                <div className="zone-child">20</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorldLuxvana;