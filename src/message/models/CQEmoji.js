const CQTag = require('../CQTag');

module.exports = class CQEmoji extends CQTag {
  constructor(id) {
    super('emoji', { id });
  }

  get id() {
    return this.data.id;
  }

  coerce() {
    this.data.id = Number(this.data.id);
    return this;
  }
};
