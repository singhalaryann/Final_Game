class Country {
	constructor(id, user_id, name, description, demography = [], traits = []) {
		if (typeof id === "object") {
			this.setFromJson(id);
		} else {
			this._id = id;
			this._user_id = user_id;
			this._name = name;
			this._description = description;
			this._demography = demography;
			this._traits = traits;
		}
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

	get demography() {
		return this._demography;
	}

	get traits() {
		return this._traits;
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

	set demography(demography) {
		this._demography = demography;
	}

	set traits(traits) {
		this._traits = traits;
	}

	// Set parameters from JSON
	setFromJson(jsonData) {
		//TODO: Implement this
	}

	// Get parameters as JSON
	toJson() {
		//TODO: Implement this
	}
}
