export function createDateTimeInfo(){
    /**
     * Cria um objeto com informações sobre a data e hora atuais, incluindo o turno do dia
     * e o dia da semana.
     * 
     * - A função ajusta a data para o dia anterior se a hora atual estiver entre meia-noite e 5 da manhã.
     * - Determina o turno do dia como "Morning" se a hora estiver entre 5:00 e 17:00, e "Night" caso contrário.
     * - Identifica o dia da semana correspondente ao valor do dia da semana retornado pelo método `getDay()` do objeto Date, convertendo-o em uma string representativa (ex: "Monday").
     * - Retorna um objeto contendo as seguintes propriedades:
     *   - currentHour: A hora atual no formato 24 horas.
     *   - turn: O turno do dia ("Morning" ou "Night").
     *   - weekDay: O dia da semana (ex: "Monday", "Tuesday").
     *   - day: O dia do mês com dois dígitos.
     *   - month: O mês atual com dois dígitos.
     * 
     * @returns {Object} Um objeto com informações sobre a data e hora atuais.
     */
    const now = new Date()
    if (now.getHours() < 5)
        now.setDate(now.getDate() - 1) // Ajusta para o dia anterior caso a hora esteja entre meia noite e 5 da madrugada

    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    let dayShift, weekDay

    if(now.getHours() >= 5 && now.getHours() < 17) // define o turno
        dayShift = 'Morning'
    else
        dayShift = 'Night'

    switch (now.getDay()) { // organiza o dia da semana
        case 1:
            weekDay = 'Monday'
            break;

        case 2:
            weekDay = 'Tuesday'
            break;

        case 3:
            weekDay = 'Wednesday'
            break;

        case 4:
            weekDay = 'Thursday'
            break;

        case 5:
            weekDay = 'Friday'
            break;

        case 6:
            weekDay = 'Saturday'
            break;

        case 0:
            weekDay = 'Sunday'
            break;
    
        default:
            break;
    }

    let time = { // cria um objeto contendo hora, turno, dia, dia da semana, dia do mês e mês
        currentHour: now.getHours(),
        turn: dayShift,
        weekDay: weekDay,
        day: day,
        month: month
    }
    return time
}