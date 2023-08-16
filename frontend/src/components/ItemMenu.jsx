import Arrow from "@/assets/arrow-down.svg";
import Image from "next/image";
const ItemMenu = (props) => {
  const name = props.name;
  return (
    <button className="flex items-center gap-3">
      <span className="text-primary-blue font-bold">{name}</span>
      <Image src={Arrow} alt="Arrow-down" />
    </button>
  );
};
export default ItemMenu;
