import Image from "next/image";
const Search = () => {
  return (
    <div className="flex items-center gap-4">
      <Image src={"/icon-search.svg"} alt="Search" width={20} height={20}/>
      <input
        type="text"
        className="bg-transparent outline-none pr-3 text-white
        placeholder:text-white"
        placeholder="Buscar"
      />
    </div>
  );
};
export default Search;
