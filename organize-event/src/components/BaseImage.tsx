interface IBaseImage {
  src: string;
  style?: React.CSSProperties;
  default_src?: string;
  class_name?: string;
}

const BaseImage = ({
  src,
  class_name,
  default_src = "/assets/images/default_img.png",
}: IBaseImage) => {
  return (
    <img
      src={src}
      className={class_name}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = default_src;
      }}
    />
  );
};

export default BaseImage;
