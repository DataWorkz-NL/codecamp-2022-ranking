// console.clear();


async function getRanking() {
  let url = "https://api.jsonbin.io/v3/b/636e77ff2b3499323bfcdf25";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

const randomEmoji = () => {
  const emojis = ["👏", "👍", "🙌", "🤩", "🔥", "⭐️", "🏆", "💯"];
  let randomNumber = Math.floor(Math.random() * emojis.length);
  return emojis[randomNumber];
};



async function renderRanking() {
  let ranking = await getRanking();
  let html = "";
  let rankingArray = [];

  for (const [key, value] of Object.entries(ranking.record)) {
    console.log(`${key}: ${value}`);
    rankingArray.push(value);
  }





  console.log(rankingArray);

  rankingArray = rankingArray.sort((a, b) => b.score - a.score);

let rank = 1;

  rankingArray.forEach((member) => {
    let newRow = document.createElement("li");
    member.rank = rank;
    member.hr =
      Math.round((member.score / member.runs + Number.EPSILON) * 100) / 100;
    newRow.classList = "c-list__item";
    newRow.innerHTML = `
		<div class="c-list__grid">
			<div class="c-flag c-place u-bg--transparent">${member.rank}</div>
			<div class="c-media">
				
				<div class="c-media__content">
					<div class="c-media__title">Team: ${member.name}</div>
          <div class="c-media__title">Nickname: ${member.nickname}</div>
          <div class="c-media__title">Makers: ${member.authors}</div>

				</div>
			</div>
			<div class="u-text--right c-kudos">
				<div class="u-mt--8">
					<strong>${member.score}</strong> ${randomEmoji()}
          runs: ${member.runs}
				</div>
        <div>
          HR: ${member.hr}
        </div>
			</div>
		</div>
	`;
    if (member.rank === 1) {
      newRow.querySelector(".c-place").classList.add("u-text--dark");
      newRow.querySelector(".c-place").classList.add("u-bg--yellow");
      newRow.querySelector(".c-kudos").classList.add("u-text--yellow");
    } else if (member.rank === 2) {
      newRow.querySelector(".c-place").classList.add("u-text--dark");
      newRow.querySelector(".c-place").classList.add("u-bg--teal");
      newRow.querySelector(".c-kudos").classList.add("u-text--teal");
    } else if (member.rank === 3) {
      newRow.querySelector(".c-place").classList.add("u-text--dark");
      newRow.querySelector(".c-place").classList.add("u-bg--orange");
      newRow.querySelector(".c-kudos").classList.add("u-text--orange");
    }
    list.appendChild(newRow);
    rank ++;
  });

  // Find Winner from sent kudos by sorting the drivers in the team array
  let sortedTeam = rankingArray.sort((a, b) => b.score - a.score);
  let winner = sortedTeam[0];

  const ctx = document.getElementById("myChart");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });


}

(() => {
  // const urlParams = new URLSearchParams(window.location.search);
  const id = 1;

  /*  const bracketsStore = JSON.parse(localStorage.getItem('brackets'));  */

  const bracketsStore = JSON.parse(bracketsNew);

  if (null === bracketsStore ) {
    alert("Key is not found in data!");
    return;
  }

  const data = bracketsStore[id];
  console.log(data);

  // You can manually add locales. English will be used as a fallback if keys are missing.
  // You can force browser language detection by setting the `i18nextLng` property to a locale key (ex: 'ru') in the localStorage.
  window.bracketsViewer.addLocale("ru", {
    common: {
      "round-name": "раунд {{roundNumber}}",
    },
  });

  // This is optional. You must do it before render().
  window.bracketsViewer.setParticipantImages(
    data.participant.map((participant) => ({
      participantId: participant.id,
      imageUrl: "https://github.githubassets.com/pinned-octocat.svg",
    }))
  );

  window.bracketsViewer.onMatchClicked = (match) => console.log(match);

  window.bracketsViewer
    .render(
      {
        stages: data.stage,
        matches: data.match,
        matchGames: data.match_game,
        participants: data.participant,
      },
      {
        selector: "#brackets",
        participantOriginPlacement: "before",
        separatedChildCountLabel: true,
        showSlotsOrigin: true,
        showLowerBracketSlotsOrigin: true,
        highlightParticipantOnHover: true,
      }
    )
    .then(() => console.log("Render finished"));
})();


renderRanking();
