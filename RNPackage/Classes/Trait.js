/*
import json

class Trait:
    def __init__(self, id, country_id, name, description, cause, effect, lvl=None):
        self._id = id
        self._country_id = country_id
        self._name = name
        self._lvl = lvl
        self._description = description
        self._cause = cause
        self._effect = effect

    # Getters
    def get_id(self):
        return self._id

    def get_country_id(self):
        return self._country_id

    def get_name(self):
        return self._name

    def get_lvl(self):
        return self._lvl

    def get_description(self):
        return self._description

    def get_cause(self):
        return self._cause

    def get_effect(self):
        return self._effect

    # Setters
    def set_id(self, id):
        self._id = id

    def set_country_id(self, country_id):
        self._country_id = country_id

    def set_name(self, name):
        self._name = name

    def set_lvl(self, lvl):
        self._lvl = lvl

    def set_description(self, description):
        self._description = description

    def set_cause(self, cause):
        self._cause = cause

    def set_effect(self, effect):
        self._effect = effect

    # Set parameters from JSON
    def set_from_json(self, json_data):
        self.set_id(json_data.get("id"))
        self.set_country_id(json_data.get("country_id"))
        self.set_name(json_data.get("name"))
        self.set_lvl(json_data.get("lvl"))
        self.set_description(json_data.get("description"))
        self.set_cause(json_data.get("cause"))
        self.set_effect(json_data.get("effect"))

    # Get parameters as JSON
    def to_json(self):
        return {
            "id": self.get_id(),
            "country_id": self.get_country_id(),
            "name": self.get_name(),
            "lvl": self.get_lvl(),
            "description": self.get_description(),
            "cause": self.get_cause(),
            "effect": self.get_effect()
        }
*/

// Path: RNPackage/Classes/Event.js

class Trait {
	constructor(id, country_id, name, description, cause, effect, lvl = null) {
		if (typeof id === "object") {
			this.setFromJson(id);
			return;
		}
		this._id = id;
		this._country_id = country_id;
		this._name = name;
		this._lvl = lvl;
		this._description = description;
		this._cause = cause;
		this._effect = effect;
	}

	// Getters
	get id() {
		return this._id;
	}

	get country_id() {
		return this._country_id;
	}

	get name() {
		return this._name;
	}

	get lvl() {
		return this._lvl;
	}

	get description() {
		return this._description;
	}

	get cause() {
		return this._cause;
	}

	get effect() {
		return this._effect;
	}

	// Setters
	set id(id) {
		this._id = id;
	}

	set country_id(country_id) {
		this._country_id = country_id;
	}

	set name(name) {
		this._name = name;
	}

	set lvl(lvl) {
		this._lvl = lvl;
	}

	set description(description) {
		this._description = description;
	}

	set cause(cause) {
		this._cause = cause;
	}

	set effect(effect) {
		this._effect = effect;
	}

	// Set parameters from JSON
	setFromJson(jsonData) {
		this.id = jsonData.id;
		this.country_id = jsonData;
		this.name = jsonData.name;
		this.lvl = jsonData.lvl;
		this.description = jsonData.description;
		this.cause = jsonData.cause;
		this.effect = jsonData.effect;
	}

	// Get parameters as JSON
	toJson() {
		return {
			id: this.id,
			country_id: this.country_id,
			name: this.name,
			lvl: this.lvl,
			description: this.description,
			cause: this.cause,
			effect: this.effect,
		};
	}
}
