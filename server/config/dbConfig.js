let dbURI = 'mongodb+srv://france:france090@cluster0-p0dro.mongodb.net/test?retryWrites=true&w=majority';
if (process.env.NODE_ENV === 'production') {
   dbURI = dbURI; // production DB server
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
