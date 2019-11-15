const dBase = require('../database/dbConfig.js');

module.exports = {
    find,
    findBy,
    addUser,
    findByUser,
    getLoggedIn
  };
  
  function find() {
    return dBase('users').select('id', 'username', 'password');
  }
  
  function findBy(id) {
    return dBase('users').where({id});
  }
  
  function addUser(user) {
    return dBase('users')
    .insert(user)
    .then(idx => {
      const id = idx[0];
      return findBy(id);
    })
  }
  
  function findByUser(user) {
    return dBase('users')
      .where(user)
  }

  function getLoggedIn(id) {
    return dBase('users')
    .where({id})
    .first()
  }