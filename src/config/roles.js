'use strict';

const rolesRightMap = {
  user: [],
  admin: ['getUsers', 'manageUsers']
};

let roles = [];
const roleRights = new Map();

Object.keys(rolesRightMap).forEach(k => {
  roles.push(k);
  roleRights.set(k, rolesRightMap[k]);
});

module.exports = {
  roles,
  roleRights
};
