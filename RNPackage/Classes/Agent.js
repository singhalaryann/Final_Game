/*
## Params

- id (*)
- user_id (*)
- name (*)
- description (*)
- personality
- likes
- dislikes
- backstory
- opinions
- motive

Example json : {
	"id": 1,
	"user_id": 1,
	"name": "John Doe",
	"description" : "sadasd",
	"personality": "cruel, dumb, stupid",
	"likes": ["a", "b", "c"],
	"dislikes": ["d", "e", "f"],
	"backstory": "asdasd",
	"opinions": {"a": "b", "c": "d"},
	"motive": "asdasd"
}
*/

class Agent {
	constructor(json) {
		if (json) {
			this.set_from_json(json);
			return;
		}
		this._id = null;
		this._user_id = null;
		this._name = null;
		this._description = null;
		this._personality = null;
		this._likes = null;
		this._dislikes = null;
		this._backstory = null;
		this._opinions = null;
		this._motive = null;
	}

	// Getters
	get id() {
		return this._id;
	}

	get user_id() {
		return this._user_id;
	}

	get name() {
		return this._name;
	}

	get description() {
		return this._description;
	}

	get personality() {
		return this._personality;
	}

	get likes() {
		return this._likes;
	}

	get dislikes() {
		return this._dislikes;
	}

	get backstory() {
		return this._backstory;
	}

	get opinions() {
		return this._opinions;
	}

	get motive() {
		return this._motive;
	}

	// Setters
	set id(id) {
		this._id = id;
	}

	set user_id(user_id) {
		this._user_id = user_id;
	}

	set name(name) {
		this._name = name;
	}

	set description(description) {
		this._description = description;
	}

	set personality(personality) {
		this._personality = personality;
	}

	set likes(likes) {
		this._likes = likes;
	}

	set dislikes(dislikes) {
		this._dislikes = dislikes;
	}

	set backstory(backstory) {
		this._backstory = backstory;
	}

	set opinions(opinions) {
		this._opinions = opinions;
	}

	set motive(motive) {
		this._motive = motive;
	}

	set_from_json(json) {
		this._id = json.id;
		this._user_id = json.user_id;
		this._name = json.name;
		this._description = json.description;
		this._personality = json.personality;
		this._likes = json.likes;
		this._dislikes = json.dislikes;
		this._backstory = json.backstory;
		this._opinions = json.opinions;
		this._motive = json.motive;
	}

	to_json() {
		return {
			id: this._id,
			user_id: this._user_id,
			name: this._name,
			description: this._description,
			personality: this._personality,
			likes: this._likes,
			dislikes: this._dislikes,
			backstory: this._backstory,
			opinions: this._opinions,
			motive: this._motive,
		};
	}
}
