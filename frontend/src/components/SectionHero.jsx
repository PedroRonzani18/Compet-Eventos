import Container from "@/components/Container";
import Image from "next/image";
import Arrow from "@/assets/arrow-explorer.svg";

import Estudantes from "@/assets/estudante.png";

const SectionHero = () => {
  return (
    <section className="w-full h-[704px] bg-img_bg_blue bg-no-repeat bg-center bg-cover">
      <Container>
        <div className="flex-1 max-w-[500px]">
          <h1 className="text-white text-7xl font-bold mb-4">
            Conheça o Interpet, uma fonte de conhecimento inesgotável
          </h1>
          <p className="text-white text-xl max-w-[408px] mb-8">
            A essência do conhecimento consiste em aplicá-lo, uma vez possuído
          </p>
          {/*
          <div className="flex gap-4 mb-24">
            <button>
              <Image src={ImgAppleStore} alt="imagem-Apple-Store" />
            </button>
            <button>
              <Image src={ImgGooglePlay} alt="imagem-Google-Play" />
            </button>
          </div>
            */}
          <button className="flex items-center gap-3">
            <Image src={Arrow} alt="Explorar Mais" />
            <span className="text-white text-sm font-bold">Saiba mais</span>
          </button>
        </div>
        <Image
          src={Estudantes}
          alt="estudantes"
          className="max-w-[65%] mr-[-41px] mt-[20px]"
        />
      </Container>
    </section>
  );
};
export default SectionHero;
