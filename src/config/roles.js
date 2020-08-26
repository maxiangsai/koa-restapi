'use strict';

const roles = {
  user: [],
  admin: ['getUsers', 'manageUsers']
};

const roleRights = new Map();

Object.keys(roles).forEach(k => {
  roleRights.set(k, roles[k]);
});

module.exports = {
  roles,
  roleRights
};
