const countries = document.querySelector('.countries');

// Number of total countries to get
const numTotalCountries = 100
// Countries with a color 
const countryColors = {
    Asia: 'yellow',
    Africa: 'orange',
    'North America': 'green',
    'South America': 'purple',
    Antarctica: 'cyan',
    Europe: 'blue',
    Australia: 'red'
}

// Get the keys from countryColors
const countryColorsKeys = Object.keys(countryColors)

const fetchCountries = async () => {
    // Fetch the data from the api
    const response = await fetch('https://restcountries.com/v2/all')
    // Use .json() to get the data in a array of objects
    const data = await response.json()

    // Create a loop that loops numTotalCountries times
    for(let i = 0; i < numTotalCountries; i++){
        // Set flag to active loop flag
        const flag = data[i].flag

        // Set name to active loop name
        const name = data[i].name
        
        // Set region to active loop region
        const region = data[i].region

        // Set population to active loop population
        const population = data[i].population

        // Set area to active loop area
        const area = data[i].area

        // Run createCards and pass in 5 parameters
        createCards(flag, name, region, population, area)
    }
}

// Create createCards function that takes in 5 parameters
const createCards = (flag, name, region, pop, area) => {
    // Create a div element
    const div = document.createElement('div')

    // Add class of countriesItem to the div
    div.classList.add('countriesItem')

    // Set innerHTML of div to the parameters
    div.innerHTML = `
        <img src="${flag}" alt="CountryFlag">
        <h2>Name: ${name}</h2>
        <h3>Region: ${region}</h3>
        <h3>Population: ${pop}</h3>
        <h3>Area: ${area}</h3>    
    `

    populationCheck(pop, div)

    // Loop through each countryColorsKey and find the key that is equal to the active region and set its background color to the match countryColors color in the key index
    countryColorsKeys.forEach((key) => {
            if(key === region){
                div.style.backgroundColor = countryColors[key]
            }
    })


    // Append the div into the DOM
    countries.appendChild(div)
}

// Create function called populationCheck
const populationCheck = (pop, div) => {
    // Check if population is over 1 million
    if(pop > 1000000){
        // Create a h5 element
        const h5 = document.createElement('h5')
        // Set innerText of the h5
        h5.innerText = 'Population over 1,000,000'
        // Append the h5 to the div
        div.appendChild(h5)
    }else{
        // Create a h5 element
        const h5 = document.createElement('h5')
        // Set innerText of the h5
        h5.innerText = 'Population under 1,000,000'
        // Append the h5 to the div
        div.appendChild(h5)
    }
}

fetchCountries()




