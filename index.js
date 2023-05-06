const express = require('express');
const cookieParser = require('cookie-parser');
const env=require('./config/environment');
const logger=require('morgan');
const path = require('path');


const app = express();
require('./config/view_helper')(app);

const port = 8000;
const mimetype=require('mime-type');
const sassMiddleware = require('sass-middleware');
// const sassMiddleware = require('dart-sass-middleware');

const flash = require('connect-flash');

const customMware = require('./config/middleware');
const noty = require('noty');
// const chatRouter=require('./routes/chat')

// // setupchatserver and using it
// // const chatServer=http.createserver(app);
const chatServer = require('http').Server(app);
// // const chatServer=require('http').createServer(app);


const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.prependListener("request",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
})
chatServer.listen(5000, () => {
    console.log("chatserver is running on port ");

});
// // const io = require('socket.io')(chatServer, {
// //     cors: {
// //       origin: "http://localhost:8000",
// //     }
// // });
// // console.log("chatserver is running on port ");

// const Mongostore=require('connect-mongo')(session);
if(env.name=='development'){
app.use(sassMiddleware(
    {
        // src: './assets/scss',
        src: path.join(__dirname, env.assets_path,'/scss'),
        // dest: './assets/css',
        dest: path.join(__dirname, env.assets_path,'/css'),
        debug: true,
        outputStyle: 'extended',
        prefix:'/css'
    }));
}
// for layouts
const expressLayouts = require('express-ejs-layouts');

// for database
const db = require('./config/mongoose');


// libraries for session
const session = require('express-session');
// const MongoStore=require('connect-mongo');

const passport = require('passport');
const PassportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2Strategy');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// app.use(express.static('./assets'));
app.use(express.static(env.assets_path));
app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use('/assets', express.static( './assets/'));

// app.use(express.static(path.join(__dirname ,'public')));

// morgan use to log datas
app.use(logger(env.morgan.mode,env.morgan.options));
app.use(expressLayouts);

// individual css
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// app.use('/',require('./routes/index'));
// view engine
app.set('view engine', 'ejs');
app.set('views', './views');
// const Mongostore=require('connect-mongo')(session);

app.use(session({
    name: 'Socialmedia',
    // secret: 'blah',
    secret: env.session_cookie_key,

    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 5)
    }
    ,
    store: MongoStore.create({

        mongoUrl: 'mongodb://127.0.0.1/Socialmedia_development',
        autoRemove: "disabled"
        // autoRemove:"interval",
        // autoRemoveInterval:1
    },
        function (err) {
            console.log("cant conncet");
        }
    )

}));
app.use(passport.initialize());
app.use(passport.session());
// require('./path/to/passport/config/file')(passport);

// setAuth
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setflash);


// app.use('/',require('./routes/index'));
app.use('/', require('./routes'));


app.listen(port, function (err) {
    if (err) {
        // console.log("error on port " + port);
        console.log(`error on port :${port}`);
    }

    console.log(`successfully running on :${port}`);
});

// ssh -i ~/Downloads/socialmedia_production.pem  ubuntu@ec2-34-238-255-83.compute-1.amazonaws.com
//  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

// // export NVM_DIR="$HOME/.nvm"
//  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
//  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion