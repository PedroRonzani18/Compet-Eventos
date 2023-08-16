import Image from "next/image";
import Logo from "@/assets/logointerpet.png";
import ItemMenu from "./ItemMenu";
import Search from "./Search";
import IconUser from "@/assets/icon-user.svg";
import Container from "@/components/Container";

const Header = () => {
  return (
    <header className="relative flex items-center w-full h-20 bg-primary-white">
      <div className="absolute top-0 right-0 bg-primary-green w-[19%] h-full z-0"></div>
      {/*estilização do container */}
      <div className="flex items-center justify-between w-full max-w-[1246px] px-[15px] mx-auto">
        <Container>
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-14">
              <Image className="w-[80px]" src={Logo} alt="Logo" />
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
          <button className="flex items-center gap-4 bg-primary-green h-20 pl-10 z-10">
            <Image src={IconUser} alt="Icon User" />
            <span className="text-white">Seja um produtor</span>
          </button>
        </Container>
      </div>
    </header>
  );
};
export default Header;
