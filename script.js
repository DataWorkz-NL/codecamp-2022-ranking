console.clear();


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


}

renderRanking();
