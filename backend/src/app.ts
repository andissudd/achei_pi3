import "reflect-metadata";
import express from "express";
import userRoutes from './routes/userRoutes'
import itemRoutes from './routes/itemRoutes'
import authRoutes  from './routes/authRoutes'
import { AppDataSource } from "./database/data-source";
import path from 'path';
import { engine } from 'express-handlebars';
//
const app = express();
app.use(express.json());
//
app.engine('hbs', engine({
  extname: '.hbs'
}));
app.use(express.static('./src/public'));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './views'));
//
async function main() {
  try{
    //db
    await AppDataSource.initialize();
    
    //routes views
    app.get('/', function(req, res) {
      res.render('index', {
          layout : 'main',
          pageTitle: 'Achei!'
      });
    });

    app.get('/help', function(req, res) {
      res.render('help', {
          layout : 'main',
          pageTitle: 'Achei! | Ajuda'
      });
    });

    app.get('/item-register', function(req, res) {
      res.render('item_register', {
          layout : 'main',
          pageTitle: 'Achei! | Cadastrar item'
      });
    });

    app.get('/search', function(req, res) {
      res.render('search', {
          layout : 'main',
          pageTitle: 'Achei! | Pesquisar'
      });
    });

    app.get('/booking_confirm', function(req, res) {
      res.render('booking', {
          layout : 'main',
          pageTitle: 'Achei! | Agendamento confirmado'
      });
    });

    app.get('/login', function(req, res) {
      res.render('login_form', {
          layout : 'login',
          pageTitle: 'Entrar'
      });
    });
    //
    app.use('/', authRoutes);
    app.use('/users', userRoutes);
    app.use('/items', itemRoutes);

    //Start server
    const port = 8000;
    app.listen(port, () => {
    console.log(`Servidor do Achei! esperando reqs: https://localhost:${port} OU https://127.0.0.1:${port}`);
      });

  }catch(error){
    throw error;
  }
};

main();
