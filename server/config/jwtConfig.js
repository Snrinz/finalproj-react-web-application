export const jwtSecret = 'yoursecret';
export const jwtSession = {
  session: false
};
export const ROLES = {
  user: 1, 
  owner: 2, 
  admin: 3,
  name: (value) => Object.keys(ROLES).find(e=>ROLES[e]===value)
};