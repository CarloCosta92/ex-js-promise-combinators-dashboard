// test
// const data = fetch("http://localhost:3333/destinations")
//     .then(response => response.json())

// console.log(data)

// In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query),
//  che accetta una città come input e recupera simultaneamente:
// Nome completo della città e paese da / destinations ? search = [query]
//     (result.name, result.country, nelle nuove proprietà city e country).
// Il meteo attuale da / weathers ? search = { query }
//     (result.temperature e result.weather_description nella nuove proprietà temperature e weather).
// Il nome dell’aeroporto principale da / airports ? search = { query }
//     (result.name nella nuova proprietà airport).
// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
// Note del docente
// Scrivi la funzione getDashboardData(query), che deve:
// Essere asincrona(async).
// Utilizzare Promise.all() per eseguire più richieste in parallelo.
// Restituire una Promise che risolve un oggetto contenente i dati aggregati.
// Stampare i dati in console in un messaggio ben formattato.
// Testa la funzione con la query "london"

async function getDashboardData(query) {
    try {
        const [città, meteo, aereoporto] = await Promise.all([
            fetch(`http://localhost:3333/destinations?search=${query}`),
            fetch(`http://localhost:3333/weathers?search=${query}`),
            fetch(`http://localhost:3333/airports?search=${query}`)
        ])


        const [cittàData, meteoData, aereoportoData] = await Promise.all([
            città.json(),
            meteo.json(),
            aereoporto.json()
        ])

        console.log(cittàData)
        console.log(meteoData)
        console.log(aereoportoData)

        // nuove proprietà city e country
        const city = cittàData.length > 0 ? cittàData[0].name : null;
        const country = cittàData.length > 0 ? cittàData[0].country : null;
        // nuove proprietà temperature e weather
        const temperature = meteoData.length > 0 ? meteoData[0].temperature : null;
        const weather = meteoData.length > 0 ? meteoData[0].weather_description : null;
        // nuova proprietà airport
        const airport = aereoportoData.length > 0 ? aereoportoData[0].name : null;

        return { city, country, temperature, weather, airport };

    } catch (error) {
        throw new Error(`errore nel recupero dei dati: ${error.message}`);

    }

}

getDashboardData('vienna')
    .then(data => {
        console.log('Dasboard data:', data);
        let message = '';
        if (data.city && data.country) {
            message += `${data.city} is in ${data.country}.\n`;
        }
        if (data.temperature && data.weather) {
            message += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
        }
        if (data.airport) {
            message += `The main airport is ${data.airport}.\n`;
        }
        console.log(message);
    })
    .catch(error => console.error(error));

//      Bonus 1 - Risultato vuoto
// Se l’array di ricerca è vuoto, invece di far fallire l'intera funzione, semplicemente i dati relativi a quella chiamata verranno settati a null e  la frase relativa non viene stampata. Testa la funzione con la query “vienna” (non trova il meteo).





