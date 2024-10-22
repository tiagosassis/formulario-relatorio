export function createDateTimeInfo(){
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

// A função createDateTimeInfo gera um objeto contendo informações sobre a data e o horário atual. Ela ajusta o dia para o anterior caso a hora esteja entre meia-noite e 5 da manhã, define o turno (manhã ou noite) com base na hora atual, e inclui o dia da semana, dia do mês e o mês. O resultado é um objeto com as propriedades: currentHour, turn, weekDay, day e month.