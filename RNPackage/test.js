// import Story from "./Story";

const { fetchStory } = require("./Backend/loreai");

import Story from "./Story";
import Eps from "./Eps";
import Card from "./Card";

const story = new Story(fetchStory(1));
//news
var national_events = story.get_national_events_news();
var eps = await story.get_first_episode("M");
var cards = await eps.get_cards(); //time lagega yaha
cards.forEach((card) => {
	//show card or do what ever is needed
	console.log(card);

	//set decision for card
	const decision = 1;
	eps.set_card_decision(card.get_id(), decision);
});

await story.progress(eps);
national_events = story.get_national_events_news();
const next_eps = await story.get_next_episode("E");
