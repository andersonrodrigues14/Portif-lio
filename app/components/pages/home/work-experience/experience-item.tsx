'use client'

import { TechBadge } from '@/app/components/tech-badge';
import { differenceInMonths, differenceInYears, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { WorkExperience } from '@/app/types/work-experience';
import { RichText } from '@/app/components/rich-text';
import { fadeUpAnimation, techBadgeAnimation } from '@/app/lib/animations';

type ExperienceItemProps = {
  experience: WorkExperience
}

export const ExperienceItem = ({experience}: ExperienceItemProps) => {

    const {
        endDate,
        companyName,
        companyLogo,
        companyUrl,
        description,
        role,
        technologies,
      } = experience
      
      const dataStartOld = experience.startDate.split("-");
      var ano = parseInt(dataStartOld[0]);
      var mes = parseInt(dataStartOld[1]);
      var dia = parseInt(dataStartOld[2]);
      
      const startDate = new Date(ano, (mes-1), dia)
    
      const formattedStartDate = format(startDate, 'MMM yyyy', { locale: ptBR })

      let formattedEndDate = 'Até o momento'
      let end =  new Date()

      if(endDate) {
        const dataEndOld = experience.endDate.split("-");
        var anoEnd = parseInt(dataEndOld[0]);
        var mesEnd = parseInt(dataEndOld[1]);
        var diaEnd = parseInt(dataEndOld[2]);

        formattedEndDate = format(new Date(anoEnd, (mesEnd-1), diaEnd), 'MMM yyyy', { locale: ptBR })
        end = new Date(anoEnd, (mesEnd-1), diaEnd)

      }
      
      const months = differenceInMonths(end, startDate)
      const years = differenceInYears(end, startDate)
      const monthsRemaining = months % 12
    
      const formattedDuration =
        years > 0
          ? `${years} ano${years > 1 ? 's' : ''}${
              monthsRemaining > 0
                ? ` e ${monthsRemaining} mes${monthsRemaining > 1 ? 'es' : ''}`
                : ''
            }`
          : `${months} mes${months > 1 ? 'es' : ''}`

    return(
        <motion.div 
            className="grid grid-cols-[40px,1fr] gap-4 md:gap-10"
            {...fadeUpAnimation}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col items-center gap-4">
                <div className="rounded-full border border-gray-500 p-0.5">
                    <Image 
                        src={companyLogo.url}
                        width={40}
                        height={40}
                        className="rounded-full"
                        alt={`Logo da empresa ${companyName}`}
                    />
                </div>

                <div className="h-full w-[1px] bg-gray-800" />
            </div>

            <div>
                <div className="flex flex-col gap-2 text-sm sm:text-base">
                    <a
                        href={companyUrl}
                        target="_blank"
                        className="text-gray-500 hover:text-emerald-500 transition-colors"
                        rel="noreferrer"
                    >
                        @ {companyName}
                    </a>
                    <h4 className="text-gray-300">{role}</h4>
                    <span className="text-gray-500">
                        {formattedStartDate} • {formattedEndDate} • ({formattedDuration})
                    </span>
                    <div className="text-gray-400">
                        <RichText content={description.raw} />
                    </div>
                </div>

                <p className="text-gray-400 text-sm mb-3 mt-6 font-semibold">
                    Competência
                </p>
                <div className="flex gap-x-2 gap-y-3 flex-wrap lg:max-w-[350px] mb-8">
                {technologies.map((tech, index) => (
                    <TechBadge
                        name={tech.name}
                        key={`experience-${companyName}-tech-${tech.name}`}
                        {...techBadgeAnimation}
                        transition={{ duration: 0.2, delay: index * 0.1 }}
                    />
                ))}
                </div>
            </div>
        </motion.div>  
    )
}