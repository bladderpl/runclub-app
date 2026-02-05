// Funkcja Netlify dla wymiany tokenu Strava
// Plik: netlify/functions/strava-token.js

exports.handler = async (event) => {
  // Obsługa CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  }

  // Sprawdź metodę
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { code, refresh_token, grant_type } = JSON.parse(event.body);

     const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
     const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

    // OPCJA 2: Hardcoded (TYLKO DLA TESTÓW!)
    // Odkomentuj poniższe linie i wpisz swoje klucze jeśli testujesz lokalnie:
    // const CLIENT_ID = 'TWÓJ_CLIENT_ID';
    // const CLIENT_SECRET = 'TWÓJ_CLIENT_SECRET';

    if (!CLIENT_ID || !CLIENT_SECRET) {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          error: 'Missing Strava credentials. Set STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET in Netlify environment variables.' 
        })
      };
    }

    // Przygotuj dane dla Strava API
    const stravaData = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: grant_type || 'authorization_code'
    };

    // Dodaj odpowiedni parametr w zależności od typu grantu
    if (grant_type === 'refresh_token') {
      stravaData.refresh_token = refresh_token;
    } else {
      stravaData.code = code;
    }

    // Wymień kod/refresh token na access token
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(stravaData)
    });

    const data = await response.json();

    // Sprawdź czy Strava zwróciło błąd
    if (!response.ok) {
      console.error('Strava API error:', data);
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          error: data.message || 'Strava API error',
          details: data
        })
      };
    }

    // Zwróć sukces
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Token exchange error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Token exchange failed',
        message: error.message
      })
    };
  }
};
