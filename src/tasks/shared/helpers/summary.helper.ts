export const currentWeatherHelper = {
    name: 'nome',
    description: 'Nome do município deve respeitar caracteres maiúsculos e minúsculos',
    allowEmptyValue: false,
    examples: {
        a: {
            summary: 'São Paulo',
            description: 'Clima e tempo do município de São Paulo',
            value: 'São Paulo',
        },
        b: {
            summary: 'Vitória',
            description: 'Clima e tempo do município de Vitória',
            value: 'Vitória',
        },
        c: {
            summary: 'São José dos Campos',
            description: 'Clima e tempo do município de São José dos Campos',
            value: 'São José dos Campos',
        },
    },
};

export const currentSummaryHelper = { summary: 'Pesquisar clima-tempo de um município brasileiro' };

export const historicalWeatherHelper = {
    name: 'municipio',
    timestamp: 'data',
    description: 'Nome do municipío e data(yyyy/mm/dd) para pesquisar histórico de clima-tempo dos ultimos 5 dias',
    allowEmptyValues: false,
};

export const historicalSummary = { summary: 'Pesquisar dados de clima-tempo dos ultimos 5 dias' };