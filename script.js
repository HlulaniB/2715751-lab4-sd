const fetchCountryBtn = document.getElementById('fetch-country-btn');
const countryInfo = document.getElementById('country-info');
const borderingCountries = document.getElementById('bordering-countries');

async function fetchCountryByName(country) {
try {
const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
if (!res.ok) throw new Error('Country not found');
const data = await res.json();
displayCountryInfo(data[0]); // Display the first matching country
} catch (error) {
countryInfo.innerHTML = `

Error: ${error.message}
`;
borderingCountries.innerHTML = '';
}
}

function displayCountryInfo(country) {
countryInfo.innerHTML = `
${country.name.common}

Capital: ${country.capital ? country.capital[0] : "N/A"}

Population: ${country.population.toLocaleString()}

Region: ${country.region}
${country.name.common} flag `;

// Display bordering countries
if (country.borders) {
borderingCountries.innerHTML = '
Bordering Countries:
';
country.borders.forEach(async (border) => {
const borderRes = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
const borderData = await borderRes.json();
const neighbor = borderData[0];
borderingCountries.innerHTML += `

${neighbor.name.common}
${neighbor.name.common} flag `;
});
} else {
borderingCountries.innerHTML = '

No bordering countries found.
';
}
}

fetchCountryBtn.addEventListener('click', () => {
const countryInput = document.getElementById('country-input').value.trim();
countryInfo.innerHTML = '';
borderingCountries.innerHTML = '';
if (countryInput) {
fetchCountryByName(countryInput);
}
});
