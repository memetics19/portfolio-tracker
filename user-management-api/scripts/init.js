// Seed Local database with data
// Instruction: 
//   1. cd <project_directory>/user-management-api/scripts
//   1. mongo
//   2. use pt-user;
//   3. load("init.js);

// Test User with password of 'admin'
db.User.insert({
    "lastName" : "Admin",
    "firstName" : "PT",
    "userPassword" : "$2a$10$y4zxFe5MIZtws5fTjmEiReCaL8FbOnG1H/Uhxg09uf9RNzxmaiSdW",
    "username" : "admin"});


