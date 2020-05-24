let dbURI = 'mongodb+srv://france:france090@cluster0-p0dro.mongodb.net/test?retryWrites=true&w=majority';
dbURI= 'mongodb://127.0.0.1:27017/dbFinalProject'
if (process.env.NODE_ENV === 'beta') {
   dbURI = 'mongodb://127.0.0.1:27017'; // production DB server
}
if (process.env.NODE_ENV === 'plilin') {
   dbURI = 'mongodb://127.0.0.1:27017/dbFinalProject'; // production DB server
}
export const config = {
   database: dbURI,
   userMongoClient: true,
   connectOptions: { useNewUrlParser: true, 
                     useUnifiedTopology: true,
                     useCreateIndex:true,
                     useFindAndModify: false  }
}

// To setup production and mongo uri env. Use:
// c:\> NODE_ENV=production MONGO_URI=mongodb:// :@:/ nodemon start
