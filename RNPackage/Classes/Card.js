/*
Params : 
- id (*)
- user_id (*)
- agent_name (*)
- agent_dialogue (*)
- choice_1 (*)
- choice_2 (*)
- context (*)

json format : {
    "id": 1,
    "user_id": 1,
    "agent_name": "agent_name",
    "agent_dialogue": "agent_dialogue",
    "choice_1": "choice_1",
    "choice_2": "choice_2",
    "context": "context"
}
*/

// Path: RNPackage/Classes/Card.js

class Card {
	constructor(
		id,
		user_id,
		agent_name,
		agent_dialogue,
		choice_1,
		choice_2,
		decision,
		context
	) {
		if (typeof id === "object") {
			this.set_from_json(id);
			return;
		}
		this._id = id;
		this._user_id = user_id;
		this._agent_name = agent_name;
		this._agent_dialogue = agent_dialogue;
		this._choice_1 = choice_1;
		this._choice_2 = choice_2;
		this._context = context;
		this._decision = decision;
	}

	// Getters
	get id() {
		return this._id;
	}

	get user_id() {
		return this._user_id;
	}

	get agent_name() {
		return this._agent_name;
	}

	get agent_dialogue() {
		return this._agent_dialogue;
	}

	get choice_1() {
		return this._choice_1;
	}

	get choice_2() {
		return this._choice_2;
	}

	get context() {
		return this._context;
	}

	get decision() {
		return this._decision;
	}

	// Setters
	set id(id) {
		this._id = id;
	}

	set user_id(user_id) {
		this._user_id = user_id;
	}

	set agent_name(agent_name) {
		this._agent_name = agent_name;
	}

	set agent_dialogue(agent_dialogue) {
		this._agent_dialogue = agent_dialogue;
	}

	set choice_1(choice_1) {
		this._choice_1 = choice_1;
	}

	set choice_2(choice_2) {
		this._choice_2 = choice_2;
	}

	set context(context) {
		this._context = context;
	}

	set decision(decision) {
		this._decision = decision;
	}

	set_from_json(json) {
		this._id = json.id;
		this._user_id = json.user_id;
		this._agent_name = json.agent_name;
		this._agent_dialogue = json.agent_dialogue;
		this._choice_1 = json.choice_1;
		this._choice_2 = json.choice_2;
		this._context = json.context;
		this._decision = json.decision;
	}

	to_json() {
		return {
			id: this._id,
			user_id: this._user_id,
			agent_name: this._agent_name,
			agent_dialogue: this._agent_dialogue,
			choice_1: this._choice_1,
			choice_2: this._choice_2,
			context: this._context,
			decision: this._decision,
		};
	}
}
