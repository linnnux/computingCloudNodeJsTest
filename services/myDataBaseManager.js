const mongoose = require('mongoose');

exports.connect = function(dataBase)
{

  mongoose.connect(dataBase,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

}
