const autoBind = self => {
	for (const key of Object.getOwnPropertyNames(self.constructor.prototype)) {
		const val = self[key];

		if (key !== 'constructor' && typeof val === 'function') {
			self[key] = val.bind(self);
		}
	}

	return self;
};

export default autoBind;