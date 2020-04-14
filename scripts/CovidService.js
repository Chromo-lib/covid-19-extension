const BASE_URL = 'https://corona.lmao.ninja/countries';

async function CovidService (country = 'tunisia') {
  try {
    let resp = await fetch(`${BASE_URL}/` + country);
    let respJson = await resp.json();

    return respJson;
  } catch (error) {
    return error.message;
  }
}
