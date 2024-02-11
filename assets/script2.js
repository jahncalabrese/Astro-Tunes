var playlistId;

async function getHoroscopeData() {
	var signVariable = JSON.parse(localStorage.getItem('signInput')).toLowerCase();
	console.log(signVariable);
    playlistId = getPlaylistId(signVariable)
    console.log(playlistId);

	const url =
		'https://horoscope-astrology.p.rapidapi.com/horoscope?day=week&sunsign=' +
		signVariable;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'd1e56ad769msh4e9fb5e7f7013b7p1c1110jsn11368c13f4de',
			'X-RapidAPI-Host': 'horoscope-astrology.p.rapidapi.com',
		},
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log('result', result);

		const dailyHoroscope = result.horoscope;
		const horoscopeDetails = document.createElement('p');
		horoscopeDetails.textContent = dailyHoroscope;

		const horoscopeDetailsDiv = document.getElementById('horoscopeDetails');
		horoscopeDetailsDiv.appendChild(horoscopeDetails); // Append
        // added--
        fetchMusicData()
        embedMusicPlayer();
	} catch (error) {
		console.error(error);
	}
}


//Get Music Data

const fetchMusicData = async () => {
    console.log(playlistId);
    const urlMusic = 'https://spotify23.p.rapidapi.com/playlist_tracks/?id=' + playlistId +'&offset=0&limit=100';
    console.log(urlMusic);
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd1e56ad769msh4e9fb5e7f7013b7p1c1110jsn11368c13f4de',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
    };
	try {
		const response = await fetch(urlMusic, options);
		const result = await response.json();
		console.log(result);

		const randomIndex = Math.floor(Math.random() * result.items.length);

		const songName = result.items[randomIndex].track.name;
		const artistName = result.items[randomIndex].track.artists[0].name;

		const recommendedSong = document.createElement('h3');

		// Add "Recommended Song" to the song name
		recommendedSong.textContent = `Recommended Song: ${songName} by ${artistName}`;
        
        const recommendedSongDiv = document.getElementById('recommendedSong');
        recommendedSongDiv.appendChild(recommendedSong); // Append
	} catch (error) {
		console.error(error);
	}

}
// fetchMusicData();

// Function to get playlist ID based on the sign


function getPlaylistId(sign){
    console.log('sign', sign);
    const playlistMap = {
        "pisces": "37i9dQZF1DWX0EDWtabVRv",
        "aries": "37i9dQZF1DX2DC3Q7JOmYe",
        "taurus": "37i9dQZF1DXbCgDGG5xQtb",
        "gemini": "37i9dQZF1DWWVULl5wUsL9",
        "cancer": "37i9dQZF1DXaeX3MJpiD4U",
        "leo": "37i9dQZF1DX7cvHpkIJFt2",
        "virgo": "37i9dQZF1DX6PdsVYbP4rI",
        "libra": "37i9dQZF1DXco4NYQOMLiT",
        "scorpio": "0ybME665syNkRpRUIRcKqj",
        "sagittarius": "5W4HtI15pWZLiALqm0XWhb",
        "capricorn": "37i9dQZF1DX2rcqmLx0nK4",
        "aquarius": "37i9dQZF1DX7F9VDRJOFhw"
    };
    return playlistMap[sign];
}

function embedMusicPlayer() {
    const playlistIframe = document.createElement('iframe');
        playlistIframe.setAttribute('style', 'border-radius:12px');
        playlistIframe.setAttribute('src', `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`);
        playlistIframe.setAttribute('width', '100%');
        playlistIframe.setAttribute('height', '152');
        playlistIframe.setAttribute('frameBorder', '0');
        playlistIframe.setAttribute('allowfullscreen', '');
        playlistIframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
        playlistIframe.setAttribute('loading', 'lazy');

    const musicPlayerDiv = document.getElementById('musicPlayer');
    musicPlayerDiv.appendChild(playlistIframe); // Append
}

// Function to handle "Back to Earth" button click
function backToEarth() {
	// Clear local storage
	localStorage.removeItem('signInput');

	// Redirect to the first page
	window.location.href = 'index.html';
}
getHoroscopeData();