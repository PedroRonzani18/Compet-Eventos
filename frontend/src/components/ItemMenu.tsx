import Image from "next/image";
const ItemMenu = ({name}:{name:string}) => {
  return (
    <button className="flex items-center gap-3">
      <span className="text-primary-blue font-bold">{name}</span>
      <Image src={"/arrow-down.svg"} alt="Arrow-down" width={20}  height={20}/>
    </button>
  );
};
export default ItemMenu;
