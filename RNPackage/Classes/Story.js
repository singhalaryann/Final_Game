/*
## Params

- id (*)
- user_id (*)
- current_year
- story_name (*)
- story_summary (*)
- Eps
- news
- national_events
- country (*)
- agents (*)

## json format : {
    "id": 1,
    "user_id": 1,
    "current_year": 1,
    "story_name": "story_name",
    "story_summary": "story_summary",
    "Eps": [<Episode>],
    "national_events": [<NationalEvent>],
    "country": <Country>,
    "agents": [<Agent>]
}
*/

// Path: RNPackage/Classes/Story.js
import Episode from "./Episode";
import NationalEvent from "./NationalEvent";
import Country from "./Country";
import Agent from "./Agent";
import {
	generateNextEps,
	generateFirstEps,
	progressStory,
} from "./Backend/loreai";

class Story {
	constructor(
		id,
		user_id,
		current_year,
		story_name,
		story_summary,
		Eps,
		news,
		national_events,
		country,
		agents
	) {
		if (typeof id === "object") {
			this.set_from_json(id);
			return;
		}
		this._id = id;
		this._user_id = user_id;
		this._current_year = current_year;
		this._story_name = story_name;
		this._story_summary = story_summary;
		this._Eps = Eps;
		this._national_events = national_events;
		this._country = country;
		this._agents = agents;
	}

	// Getters
	get id() {
		return this._id;
	}

	get user_id() {
		return this._user_id;
	}

	get current_year() {
		return this._current_year;
	}

	get story_name() {
		return this._story_name;
	}

	get story_summary() {
		return this._story_summary;
	}

	get Eps() {
		return this._Eps;
	}

	get national_events() {
		return this._national_events;
	}

	get country() {
		return this._country;
	}

	get agents() {
		return this._agents;
	}

	// Setters
	set id(id) {
		this._id = id;
	}

	set user_id(user_id) {
		this._user_id = user_id;
	}

	set current_year(current_year) {
		this._current_year = current_year;
	}

	set story_name(story_name) {
		this._story_name = story_name;
	}

	set story_summary(story_summary) {
		this._story_summary = story_summary;
	}

	set Eps(Eps) {
		this._Eps = Eps;
	}

	set national_events(national_events) {
		this._national_events = national_events;
	}

	set country(country) {
		this._country = country;
	}

	set agents(agents) {
		this._agents = agents;
	}

	// Set parameters from JSON
	set_from_json(json_data) {
		//TODO: implement this
		throw new Error("Not implemented");
	}

	to_json() {
		//TODO: implement this
		throw new Error("Not implemented");
	}

	/*
	This will send a request to backend. 
	The backend will return the first episode json data of the story.
	*/
	async get_first_episode(chosen_agent_id) {
		const epsJson = await generateFirstEps(
			this.to_json(),
			chosen_national_event_id
		);
		//TODO: implement this
		//convert epsJson to Eps
		//append Eps to this._Eps
		//return Episode object
		//to generate cards use eps.generate_cards() method
		throw new Error("Not implemented");
	}

	async get_next_episode(chosen_agent_id) {
		const epsJson = await generateNextEps(
			this.to_json(),
			chosen_national_event_id
		);
		//TODO: implement this
		//convert epsJson to Eps
		//append Eps to this._Eps
		//return Episode object
		//to generate cards use eps.generate_cards() method
		throw new Error("Not implemented");
	}

	get_national_events_news() {
		/*
		This will return the national events which are news.
		json format : {
			"Header" : "Eps name",
			"news" : [<List of _news_heading in national event >]
		}
		*/
		throw new Error("Not implemented");
	}

	async progress(eps) {
		//append eps to this._Eps
		this._Eps.push(eps);
		//send request to backend to progress story
		const storyJson = await progressStory(this.to_json());

		//update this object with new story json data
		this.set_from_json(storyJson);
		throw new Error("Not implemented");
	}
}
