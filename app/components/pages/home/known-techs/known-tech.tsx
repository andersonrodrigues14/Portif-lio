import { CMSIcon } from "@/app/components/cms-icon";
import { KnownTech as IKnowTech} from "@/app/types/projects";
import { getRelativeTimeString } from "@/app/utils/get-relative-time";
import { differenceInMonths, differenceInYears, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type KnowTechProps = {
    tech: IKnowTech
}

export const KnowTech = ({tech}:KnowTechProps) => {
    let relativeTime = 'Sem tempo'

    if(tech.endDate && tech.startDate){
        const dataStartOld = tech.startDate.split("-");
        var ano = parseInt(dataStartOld[0]);
        var mes = parseInt(dataStartOld[1]);
        var dia = parseInt(dataStartOld[2]);
      
        const startDate = new Date(ano, (mes-1), dia)

        let formattedEndDate = 'O momento'
        let end =  new Date()

        if(tech.endDate) {
            const dataEndOld = tech.endDate.split("-");
            var anoEnd = parseInt(dataEndOld[0]);
            var mesEnd = parseInt(dataEndOld[1]);
            var diaEnd = parseInt(dataEndOld[2]);

            formattedEndDate = format(new Date(anoEnd, (mesEnd-1), diaEnd), 'MMM yyyy', { locale: ptBR })
            end = new Date(anoEnd, (mesEnd-1), diaEnd)
        }
      
        const months = differenceInMonths(end, startDate)
        const years = differenceInYears(end, startDate)
        const monthsRemaining = months % 12
    
        relativeTime =
            years > 0
                ? `${years} ano${years > 1 ? 's' : ''}${
                monthsRemaining > 0
                ? ` e ${monthsRemaining} mes${monthsRemaining > 1 ? 'es' : ''}`
                : ''
            }`
          : `${months} mes${months > 1 ? 'es' : ''}`
    } else if(tech.startDate && !tech.endDate) {
        relativeTime = getRelativeTimeString(new Date(tech.startDate), 'pt-BR')?.replace('há ', '');
    }
    
    return (
        <div className="h-32 p-6 rounded-lg bg-gray-600/20 text-gray-500 flex-col gap-2 hover:text-emerald-500 hover:bg-gray-600/30 transition-all">
            <div className="flex items-center justify-between">
                <p className="font-medium">{tech.name}</p>
                <CMSIcon icon={tech.iconSvg}/>
            </div>

            <span>{relativeTime} de experiência</span>
        </div>
    )
}