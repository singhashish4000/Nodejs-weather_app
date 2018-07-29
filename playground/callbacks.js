var getUser = (id, callback) => {
  var user = {
      id: id,
      name: 'Ashish'
  };
  setTimeout(()=> {callback(user)},3000);
};

getUser(32,(user) => { 
   console.log(user);
});