const trainsData = {
  "90011": {
    trainNo: "90011",
    trainMode: "Slow",
    trainRoute: "Churchgate to Virar",
    stations: [
      { time: "04:15", station: "Churchgate", platform: "PF12 80TH" },
      { time: "04:18", station: "Marine Lines", platform: "PF1 LEFT" },
      { time: "04:20", station: "Charni Road", platform: "PFT LEFT" },
      { time: "04:23", station: "Grant Road", platform: "PF1 LEFT" },
      { time: "04:25", station: "Mumbai Central", platform: "PFT RIGHT" },
      { time: "04:28", station: "Mahalaxmi", platform: "PF2 RIGHT" },
      { time: "04:31", station: "Lower Parel", platform: "PFT LEFT" },
      { time: "04:34", station: "Prabhadevi", platform: "PF1 RIGHT" },
      { time: "04:36", station: "Dadar", platform: "PFI LEFT" },
      { time: "04:38", station: "Matunga Road", platform: "PF1 RIGHT" },
      { time: "04:41", station: "Mahim JN", platform: "PFT LEFT" },
      { time: "04:45", station: "Bandra", platform: "PFI LEFT" },
      { time: "04:48", station: "Khar Road", platform: "PFS RIGHT" },
      { time: "04:50", station: "Santa Cruz", platform: "PES RIGHT" },
      { time: "04:53", station: "Vile Parle", platform: "PFS RIGHT" },
      { time: "04:58", station: "Andheri", platform: "PFS LEFT" },
      { time: "05:01", station: "Jogeshwari", platform: "PFI RIGHT" },
      { time: "05:04", station: "Ram Mandir", platform: "PF3 RIGHT" },
      { time: "05:06", station: "Goregaon", platform: "PFO LEFT" },
      { time: "05:10", station: "Malad", platform: "PF1 RIGHT" },
      { time: "05:13", station: "Kandivali", platform: "PFI LEFT" },
      { time: "05:20", station: "Borivali", platform: "PF3 LEFT" },
      { time: "05:24", station: "Dahisar", platform: "PFI LEFT" },
      { time: "05:29", station: "Mira Road", platform: "PF1 LEFT" },
      { time: "05:34", station: "Bhayandar", platform: "PF1 RIGHT" },
      { time: "05:40", station: "Naigaon", platform: "PFI LEFT" },
      { time: "05:45", station: "Vasai Road", platform: "PFZ BOTH" },
      { time: "05:50", station: "Nala Sopara", platform: "PFI LEFT" },
      { time: "05:58", station: "Virar", platform: "" }
    ]
  }
};

function openTimetable(trainNo) {
    window.location.href = `timetable2.html?trainNo=${trainNo}`;
}

window.onload = function () {
    const timetableBody = document.getElementById("timetable-body");
    const trainTitle = document.getElementById("train-title");

    const urlParams = new URLSearchParams(window.location.search);
    const trainNo = urlParams.get("trainNo");

    if (trainNo && trainsData[trainNo]) {
        const train = trainsData[trainNo];
        trainTitle.textContent = `Train Timetable for Train No. ${train.trainNo} (${train.trainRoute})`;

        train.stations.forEach(station => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${station.station}</td>
                <td>${station.time}</td>
                <td>${station.platform}</td>
            `;
            timetableBody.appendChild(row);
        });
    } else {
        trainTitle.textContent = "Train not found!";
    }
};

const stations = [
    "Churchgate", "Marine Lines", "Charni Road", "Grant Road", "Mumbai Central", 
    "Mahalaxmi", "Lower Parel", "Prabhadevi", "Dadar", "Matunga Road", 
    "Mahim Jn", "Bandra", "Khar Road", "Santa cruz", "Vile Parle", "Andheri", 
    "Jogeshwari", "Goregaon","Ram mandir", "Malad", "Kandivali", "Borivali", "Dahisar", 
    "Mira Road", "Bhayandar", "Naigaon", "Vasai Road", "Nalla sopara", 
    "Virar", "Vaitarna", "Saphale", "Kelva Road", "Palghar", "Umroli", 
    "Boisar", "Vangaon", "Dahanu Road"
];

function searchTrain() {
    const searchInput = document.getElementById("station-search").value.toLowerCase();
    const trainCardContainer = document.getElementById("train-card-container");
    trainCardContainer.innerHTML = "";

    if (!searchInput) {
        alert("Please enter a station name.");
        return;
    }

    const matchingTrains = [];

    Object.values(trainsData).forEach(train => {
        const filteredStation = train.stations.find(station => station.station.toLowerCase() === searchInput);

        if (filteredStation) {
            const destinationStation = train.stations[train.stations.length - 1];
            matchingTrains.push({
                trainNo: train.trainNo,
                trainMode: train.trainMode,
                trainRoute: train.trainRoute,
                destination: destinationStation.station,
                time: filteredStation.time,
                platform: filteredStation.platform
            });
        }
    });

    if (matchingTrains.length === 0) {
        trainCardContainer.innerHTML = "<p>No trains found for the searched station.</p>";
        return;
    }

    matchingTrains.sort((a, b) => {
        const timeA = a.time.split(' ')[0].split(':').map(Number);
        const timeB = b.time.split(' ')[0].split(':').map(Number);
        return timeA[0] - timeB[0] || timeA[1] - timeB[1];
    });

    matchingTrains.forEach(train => {
        const card = document.createElement("div");
        card.classList.add("train-card");
        card.onclick = () => openTimetable(train.trainNo);

        card.innerHTML = `
            <div class="train-info">
                <div class="train-mode ${train.trainMode.toLowerCase()}">${train.trainMode[0]}</div>
                <div class="train-details">
                    <span class="train-time">${train.time}</span>
                    <span class="train-destination">${train.destination}</span>
                    <span class="train-route">${train.trainNo} - ${train.trainRoute}</span>
                </div>
            </div>
            <div class="platform-info">
                <span>${train.platform}</span>
            </div>
        `;
        trainCardContainer.appendChild(card);
    });
}











const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("station-search");
    const suggestionsBox = document.getElementById("suggestions-box");
    const trainCardContainer = document.getElementById("train-card-container");

    // Attach the search function to the button click event
    searchButton.addEventListener("click", searchTrain);

    // Add event listener for station suggestions
    searchInput.addEventListener("input", function () {
        const input = searchInput.value.toLowerCase();
        suggestionsBox.innerHTML = ''; // Clear previous suggestions

        if (input) {
            const matchingStations = stations.filter(station => 
                station.toLowerCase().startsWith(input)
            );

            matchingStations.forEach(station => {
                const suggestionItem = document.createElement("div");
                suggestionItem.textContent = station;
                suggestionItem.classList.add("suggestion-item");
                suggestionItem.onclick = () => {
                    searchInput.value = station; 
                    suggestionsBox.innerHTML = ''; 
                };
                suggestionsBox.appendChild(suggestionItem);
            });
        }
    });

    searchInput.addEventListener("blur", () => {
        setTimeout(() => {
            suggestionsBox.innerHTML = ''; 
        }, 100);
    });
