// eslint-disable-next-line strict
class JOIN {
  constructor(_username) {
    this.username = _username || '游客';
  }
}

class ACTION {
  constructor(_action) {
    this.action = _action || '';
  }
}

module.exports = { JOIN, ACTION }
;
