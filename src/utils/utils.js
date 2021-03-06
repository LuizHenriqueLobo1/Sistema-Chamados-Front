export function getDataAtualFormatada() {
    const data = new Date();
    const dataAtual = {
        dia: data.getDate(),
        mes: data.getMonth() + 1,
        ano: data.getFullYear()
    };
    const stringDataAtual = {
        dia: formataSeMenorQueDez(dataAtual.dia),
        mes: formataSeMenorQueDez(dataAtual.mes),
        ano: `${dataAtual.ano}`
    };
    return `${stringDataAtual.dia}/${stringDataAtual.mes}/${stringDataAtual.ano}`;
}

function formataSeMenorQueDez(data) {
    return data < 10 ? `0${data}` : `${data}`;
}

export function formataStatus(status) {
    switch(status) {
        case 'EM_ABERTO':    return 'Em Aberto';
        case 'EM_PROGRESSO': return 'Em Progresso'; 
        case 'ATENDIDO':     return 'Atendido';
    }
}