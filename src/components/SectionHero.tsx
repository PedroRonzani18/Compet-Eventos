import Container from "@/components/Container";
import Image from "next/image";
const SectionHero = () => {
  return (
    <section className="w-full h-[704px] bg-img_bg_blue bg-no-repeat bg-center bg-cover">
      <Container>
        <div className="flex-1 max-w-[40%]">
          <h1 className="text-white text-7xl font-bold mb-4">
            Conheça o Interpet, uma fonte de conhecimento inesgotável
          </h1>
          <p className="text-white text-xl max-w-[408px] mb-8">
            A essência do conhecimento consiste em aplicá-lo, uma vez possuído
          </p>
          <button className="flex items-center gap-3">
            <Image src={"/arrow-down.svg"} alt="Explorar Mais" width={20} height={20}/>
            <span className="text-white text-sm font-bold">Saiba mais</span>
          </button>
        </div>
        <Image
          src={"/estudante.png"}
          alt="estudantes"
          width={400}
          height={400}
          className="max-w-[60%] mt-[20px] w-full h-auto"
        />
      </Container>
    </section>
  );
};
export default SectionHero;
