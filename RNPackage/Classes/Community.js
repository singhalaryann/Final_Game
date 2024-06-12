/*
import json

class Community:
    def __init__(self, id, name, description, likes=None, dislikes=None, wealth_lvl=None, influence_lvl=None, pop_percentage=None, opinion=None):
        self._id = id
        self._name = name
        self._description = description
        self._likes = likes
        self._dislikes = dislikes
        self._wealth_lvl = wealth_lvl
        self._influence_lvl = influence_lvl
        self._pop_percentage = pop_percentage
        self._opinion = opinion

    # Getters
    def get_id(self):
        return self._id

    def get_name(self):
        return self._name

    def get_description(self):
        return self._description

    def get_likes(self):
        return self._likes

    def get_dislikes(self):
        return self._dislikes

    def get_wealth_lvl(self):
        return self._wealth_lvl

    def get_influence_lvl(self):
        return self._influence_lvl

    def get_pop_percentage(self):
        return self._pop_percentage

    def get_opinion(self):
        return self._opinion

    # Setters
    def set_id(self, id):
        self._id = id

    def set_name(self, name):
        self._name = name

    def set_description(self, description):
        self._description = description

    def set_likes(self, likes):
        self._likes = likes

    def set_dislikes(self, dislikes):
        self._dislikes = dislikes

    def set_wealth_lvl(self, wealth_lvl):
        self._wealth_lvl = wealth_lvl

    def set_influence_lvl(self, influence_lvl):
        self._influence_lvl = influence_lvl

    def set_pop_percentage(self, pop_percentage):
        self._pop_percentage = pop_percentage

    def set_opinion(self, opinion):
        self._opinion = opinion

    # Set parameters from JSON
    def set_from_json(self, json_data):
        self.set_id(json_data.get("id"))
        self.set_name(json_data.get("name"))
        self.set_description(json_data.get("description"))
        self.set_likes(json_data.get("likes"))
        self.set_dislikes(json_data.get("dislikes"))
        self.set_wealth_lvl(json_data.get("wealth_lvl"))
        self.set_influence_lvl(json_data.get("influence_lvl"))
        self.set_pop_percentage(json_data.get("pop_percentage"))
        self.set_opinion(json_data.get("opinion"))

    # Get parameters as JSON
    def to_json(self):
        return {
            "id": self.get_id(),
            "name": self.get_name(),
            "description": self.get_description(),
            "likes": self.get_likes(),
            "dislikes": self.get_dislikes(),
            "wealth_lvl": self.get_wealth_lvl(),
            "influence_lvl": self.get_influence_lvl(),
            "pop_percentage": self.get_pop_percentage(),
            "opinion": self.get_opinion()
        }
 */

// Path: RNPackage/Classes/Community.js

class Community {
	constructor(
		id,
		name,
		description,
		likes,
		dislikes,
		wealth_lvl,
		influence_lvl,
		pop_percentage,
		opinion
	) {
		if (typeof id === "object") {
			this.set_from_json(id);
			return;
		}
		this._id = id;
		this._name = name;
		this._description = description;
		this._likes = likes;
		this._dislikes = dislikes;
		this._wealth_lvl = wealth_lvl;
		this._influence_lvl = influence_lvl;
		this._pop_percentage = pop_percentage;
		this._opinion = opinion;
	}

	// Getters
	get_id() {
		return this._id;
	}

	get_name() {
		return this._name;
	}

	get_description() {
		return this._description;
	}

	get_likes() {
		return this._likes;
	}

	get_dislikes() {
		return this._dislikes;
	}

	get_wealth_lvl() {
		return this._wealth_lvl;
	}

	get_influence_lvl() {
		return this._influence_lvl;
	}

	get_pop_percentage() {
		return this._pop_percentage;
	}

	get_opinion() {
		return this._opinion;
	}

	// Setters
	set_id(id) {
		this._id = id;
	}

	set_name(name) {
		this._name = name;
	}

	set_description(description) {
		this._description = description;
	}

	set_likes(likes) {
		this._likes = likes;
	}

	set_dislikes(dislikes) {
		this._dislikes = dislikes;
	}

	set_wealth_lvl(wealth_lvl) {
		this._wealth_lvl = wealth_lvl;
	}

	set_influence_lvl(influence_lvl) {
		this._influence_lvl = influence_lvl;
	}

	set_pop_percentage(pop_percentage) {
		this._pop_percentage = pop_percentage;
	}

	set_opinion(opinion) {
		this._opinion = opinion;
	}

	// Set parameters from JSON
	set_from_json(json_data) {
		this.set_id(json_data.id);
		this.set_name(json_data.name);
		this.set_description(json_data.description);
		this.set_likes(json_data.likes);
		this.set_dislikes(json_data.dislikes);
		this.set_wealth_lvl(json_data.wealth_lvl);
		this.set_influence_lvl(json_data.influence_lvl);
		this.set_pop_percentage(json_data.pop_percentage);
		this.set_opinion(json_data.opinion);
	}

	// Get parameters as JSON
	to_json() {
		return {
			id: this.get_id(),
			name: this.get_name(),
			description: this.get_description(),
			likes: this.get_likes(),
			dislikes: this.get_dislikes(),
			wealth_lvl: this.get_wealth_lvl(),
			influence_lvl: this.get_influence_lvl(),
			pop_percentage: this.get_pop_percentage(),
			opinion: this.get_opinion(),
		};
	}
}
