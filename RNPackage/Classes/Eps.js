/*
## Params

- id (*)
- topic  (*)
- story_id (*)
- year (*)
- context (*)
- goals (*)
- cards

## json format : {
    "id": 1,
    "topic": "topic",
    "story_id": 1,
    "year": 1,
    "context": "context",
    "goals": "goals",
    "cards": [<Card>]
}
*/

// Path: RNPackage/Classes/Eps.js
import Card from "./Card";
import { generateCards } from "../Backend/loreai";

class Eps {
	constructor(id, topic, story_id, year, context, goals, cards, description) {
		if (typeof id === "object") {
			this.set_from_json(id);
			return;
		}
		this._id = id;
		this._topic = topic;
		this._story_id = story_id;
		this._year = year;
		this._context = context;
		this._goals = goals;
		this._cards = cards;
		this._description = description;
	}

	// Getters
	get id() {
		return this._id;
	}

	get topic() {
		return this._topic;
	}

	get story_id() {
		return this._story_id;
	}

	get year() {
		return this._year;
	}

	get context() {
		return this._context;
	}

	get goals() {
		return this._goals;
	}

	get cards() {
		return this._cards;
	}

	// Setters
	set id(id) {
		this._id = id;
	}

	set topic(topic) {
		this._topic = topic;
	}

	set story_id(story_id) {
		this._story_id = story_id;
	}

	set year(year) {
		this._year = year;
	}

	set context(context) {
		this._context = context;
	}

	set goals(goals) {
		this._goals = goals;
	}

	set cards(cards) {
		this._cards = cards;
	}

	set_from_json(json) {
		//TODO : Implement this
		//use Card class to create card objects
		throw new Error("Not implemented yet");
	}

	to_json() {
		//TODO : Implement this
		throw new Error("Not implemented yet");
	}

	async generate_cards(agents) {
		var agents_json_list = [];
		for (let agent of agents) {
			agents_json_list.push(agent.to_json());
		}
		const card_data = await generateCards(this.to_json, agents_json_list);
		//TODO : Implement this
		throw new Error("Not implemented yet");
	}

	set_card_decision(card_id, choice) {
		//TODO : Implement this
		//choice can be 1 or 2 depending on the user's choice of choice_1 or choice_2
		const card = this.cards.find((card) => card.id === card_id);
		if (choice === 1) {
			//TODO : Implement this
			//make sure choice is registered
			throw new Error("Not implemented yet");
		} else if (choice === 2) {
			//TODO : Implement this
			//make sure choice is registered
			throw new Error("Not implemented yet");
		} else {
			throw new Error("Invalid choice");
		}
		throw new Error("Not implemented yet");
	}
}
