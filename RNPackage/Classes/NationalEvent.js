/*
## Params

- id (*)
- country_id (*)
- user_id (*)
- year (*)
- involved_demographics (*)
- cause (*)
- goal (*)
- threat_lvl
- effect

## json format : {
    "id": 1,
    "country_id": 1,
    "user_id": 1,
    "year": 1,
    "involved_demographics": [<name of community>],
    "cause": "cause",
    "goal": "goal",
    "threat_lvl": "threat_lvl",
    "effect": "effect"
}
*/

// Path: RNPackage/Classes/NationalEvent.js

class NationalEvent {
	constructor(
		id,
		country_id,
		user_id,
		year,
		involved_demographics,
		cause,
		goal,
		threat_lvl,
		effect,
		news_heading
	) {
		if (typeof id === "object") {
			this.set_from_json(id);
			return;
		}
		this._id = id;
		this._country_id = country_id;
		this._user_id = user_id;
		this._year = year;
		this._involved_demographics = involved_demographics; // array of demographics involved in the event
		this._cause = cause; // cause of the event
		this._goal = goal; //goal to be achieved to resolve the event
		this._threat_lvl = threat_lvl; // threat level of the event
		this._effect = effect; // effect on the country because of the event
		this._news_heading = news_heading; // news heading of the event
	}

	// Getters
	get id() {
		return this._id;
	}

	get country_id() {
		return this._country_id;
	}

	get user_id() {
		return this._user_id;
	}

	get year() {
		return this._year;
	}

	get involved_demographics() {
		return this._involved_demographics;
	}

	get cause() {
		return this._cause;
	}

	get goal() {
		return this._goal;
	}

	get threat_lvl() {
		return this._threat_lvl;
	}

	get effect() {
		return this._effect;
	}

	get news_heading() {
		return this._news_heading;
	}

	// Setters
	set id(id) {
		this._id = id;
	}

	set country_id(country_id) {
		this._country_id = country_id;
	}

	set user_id(user_id) {
		this._user_id = user_id;
	}

	set year(year) {
		this._year = year;
	}

	set involved_demographics(involved_demographics) {
		this._involved_demographics = involved_demographics;
	}

	set cause(cause) {
		this._cause = cause;
	}

	set goal(goal) {
		this._goal = goal;
	}

	set threat_lvl(threat_lvl) {
		this._threat_lvl = threat_lvl;
	}

	set effect(effect) {
		this._effect = effect;
	}

	set news_heading(news_heading) {
		this._news_heading = news_heading;
	}

	set_from_json(json) {
		this._id = json.id;
		this._country_id = json.country_id;
		this._user_id = json.user_id;
		this._year = json.year;
		this._involved_demographics = json.involved_demographics;
		this._cause = json.cause;
		this._goal = json.goal;
		this._threat_lvl = json.threat_lvl;
		this._effect = json.effect;
		this._news_heading = json.news_heading;
	}
}
