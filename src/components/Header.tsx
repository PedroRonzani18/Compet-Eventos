'use client'
import Image from "next/image";
import ItemMenu from "./ItemMenu";
import Search from "./Search";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";

const Header = () => {
  const navigation = useRouter()
  return (
    <header className="relative flex items-center w-full h-20 bg-primary-white">
      <div className="absolute top-0 right-0 bg-primary-green w-[19%] h-full z-0"></div>
      {/*estilização do container */}
      <div className="flex items-center justify-between w-full max-w-[1246px] px-[15px] mx-auto">
        <Container>
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-14">
              <Image className="w-[80px]" src={"/logoInterpet.png"} alt="Logo" width={200} height={200}/>
              <ul className="flex items-center gap-12">
                <li>
                  <ItemMenu name="Projetos" />
                </li>
                <li>
                  <ItemMenu name="Grupos PET" />
                </li>
                <li>
                  <ItemMenu name="CEFET-MG" />
                </li>
                <li>
                  <ItemMenu name="Sobre" />
                </li>
              </ul>
            </div>
            <div>
              <Search />
            </div>
          </div>
          <button className="flex items-center gap-4 bg-primary-green h-20 pl-10 z-10" onClick={()=>{
            navigation.push('/login')
          }}>
            <Image src={"/icon-user.svg"} alt="Icon User" width={20} height={20}/>
            <span className="text-white">Seja um produtor</span>
          </button>
        </Container>
      </div>
    </header>
  );
};
export default Header;
