import Link from "next/link";

const Map = () => {
  const mouseEnter = (name) => {
    document.querySelector("#worldBG").classList.add(name);
  };
  const mouseLeave = (name) => {
    document.querySelector("#worldBG").classList.remove(name);
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="world">
          <div id="worldBG" className="world-nothover">
            <Link href="/map/world-kurnugia">
              <div
                className="cursor-pointer btn-world-overlay btn-world-kurnugia"
                onMouseEnter={() => mouseEnter("kurnugia")}
                onMouseLeave={() => mouseLeave("kurnugia")}
              ></div>
            </Link>
            {/* <Link href="">
              <div className="cursor-pointer btn-world-overlay btn-world-epsilon" 
              onMouseEnter={()=> mouseEnter("epsilon") }
              onMouseLeave={()=> mouseLeave("epsilon") }
              ></div>
            </Link>
            <Link href="">
              <div className="cursor-pointer btn-world-overlay btn-world-luxvana" 
              onMouseEnter={()=> mouseEnter("luxvana") }
              onMouseLeave={()=> mouseLeave("luxvana") }
              ></div>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
