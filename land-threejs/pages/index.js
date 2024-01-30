import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
const CanvasPage = dynamic(() => import("../pages/canvas"), { ssr: false });

const IndexPage = () => {
  return (
    <div className={styles.canvas}>
      <CanvasPage />
    </div>
  );
};
export default IndexPage;
