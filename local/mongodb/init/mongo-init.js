db.auth('root', 'example')

db = db.getSiblingDB('sw_society')

db.createUser({
  user: 'mongo_sw',
  pwd: 'th1sIsSecr3tOfM0ng0',
  roles: [{
    role: 'dbOwner',
    db: 'sw_society',
  }],
});

db.createCollection("roles", { autoIndexId: true });
var roleAdminId = ObjectId();
db.roles.insert({_id: roleAdminId, name: "ADMIN"});
var roleUserId = ObjectId();
db.roles.insert({_id: roleUserId, name: "USER"});
db.roles.insert({name: "MODERATOR"});
db.roles.insert({name: "SUBSCRIBED"});
db.createCollection("users", { autoIndexId: true });
db.users.insert({
  username: "admin",
  password: "$2a$10$6t2JRXUKlSkKgPDA1m8zS.5fvhzgXfhBFo3A6Uu3fgvN5UJ7BUrKu", /* => password: user */
  email: "admin@swsociety.com",
  roles: [{$ref: "roles", $id: roleAdminId}, {$ref: "roles", $id: roleUserId}]
});
db.createCollection("passwordResetTokens", { autoIndexId: true });
