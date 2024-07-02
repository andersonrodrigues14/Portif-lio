import Image from "next/image";

export const HeroSection = () => {
    return (
        <section className="w-full h-[755px] bg-hero-image bg-cover bg-center bg-no-repeat flex flex-col justify-end pb-10 sm:pb-32 py-32 lg:pb-[110px]">
            <div className="container flex items-start justify-between flex-col-reverse lg:flex-row">
                <div className="w-full lg:max-w-[530px]">
                    <p className="font-mono text-emerald-400">Olá, meu nome é</p>
                    <h2 className="text-4xl font-medium mt-2">Anderson Almeida Rodrigues</h2>

                    
                    <p className="text-gray-400 my-6 text-sm sm:text-base">
                        Olá, meu nome é Anderson Almeida Rodrigues e sou desenvolvedor full-stack apaixonado por tecnologia. Com mais de 2 anos de experiência. Meu objetivo é criar sistemas de ponta a ponta funcionais, sempre disposto a embarcar em projetos desafiadores. Estou sempre aberto a novas oportunidade e desafios.
                    </p>
                    
                    <div>
                        techs
                    </div>

                    <div>
                        Contato
                    </div>
                </div>

                <Image 
                    width={420}
                    height={404}
                    src="/images/profile-pic.png"
                    alt="Foto de perfil do Anderson Rodrigues"
                />
            </div>

        </section>
    );
}