import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import { Repository } from "typeorm";

import express from "express";
import path from 'path';
import { engine } from 'express-handlebars'

//
const app = express();
// app.use(express.json());
app.engine('hbs', engine({
  extname: '.hbs'
}));

app.use(express.static('./public/'));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './views'));

async function main() {
  await AppDataSource.initialize();
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  let emailRegex = new RegExp("^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$");
  let passwordRegex = new RegExp(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`);
  let error:String|null = null;

  // app.get("/", (req, res) => res.redirect("/users"));

  //show all users
  app.get("/users", async (req, res) => {
    const users = await userRepository.find();
    if (users.length < 1) {
      error = "Nenhum usuário encontrado."
      res.status(400).json({error});
    } else {
      res.json(users);
    }
  });
  //show a user
  app.get("/users/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    const user = await userRepository.findOneBy({id: userId});

    if (user) {
      res.send(user);
    } else {
      error = "Usuário não encontrado."
      res.status(400).json({error});
    }
  });

  //add a user
  app.post("/users/", async (req, res) => {
    const { username, email, password } = req.body;
    if (username && email && password) {
      switch (true) {
        case username.length < 5:
          error = "Nome de usuário deve ter pelo menos 5 caracteres.";
          break;

        case !emailRegex.exec(email):
          error = "Email inválido.";
          break;

        case !passwordRegex.exec(password):
          error =
            "Senha inválida. Certifique-se de que a senha tenha pelo menos 8 caracteres, 1 número e 1 letra maiúscula.";
          break;

        default:
          // Se não houver erro, adiciona o usuário
          const newUser = req.body;
          await userRepository.save(newUser)
          res.send("Usuário adicionado com sucesso.")
      }

      res.status(400).json({ error });
    } else {
      error = "Preencha todos os campos.";
      res.status(400).json({ error });
    }
  });

  //update specific user
  app.put("/users/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    let userToUpdate = await userRepository.findOneBy({id: userId});
    const { username, email, password } = req.body;

    const newData = {
      id: userId,
      username: username,
      email: email,
      password: password,
    }

    if (userToUpdate) {
      
      if (username && email && password) {
        switch (true) {
          case username.length < 5:
            error = "Nome de usuário deve ter pelo menos 5 caracteres.";
            break;
  
          case !emailRegex.exec(email):
            error = "Email inválido.";
            break;
  
          case !passwordRegex.exec(password):
            error =
              "Senha inválida. Certifique-se de que a senha tenha pelo menos 8 caracteres, 1 número e 1 letra maiúscula.";
            break;
  
          default:
            // Se não houver erro, atualiza o usuário
            await userRepository.save(newData)
            return res.send("Usuário atualizado com sucesso.")
        }
  
        // Retorna o erro encontrado
        res.status(400).json({ error });
      } else {
        error = "Preencha todos os campos";
        res.status(400).json({ error });
      }

    } else {
      res.status(404).json({ erro: "Usuário não encontrado." });
    }
  });

  //delete specific user
  app.delete("/users/:id", async (req, res) => {
    const userId = parseInt(req.params.id);

    const userToRemove = await userRepository.findOneBy({id: userId});
    
    if (userToRemove) {
      console.log(userToRemove);
      await userRepository.remove(userToRemove);
      res.send("Usuário deletado com sucesso.")
          .redirect("/users/");
    } else {
      error = "Usuário não encontrado.";
      res.status(404).json({error});
    }
  });

  //Start server
  const port = 8000;
  app.listen(port, () => {
    console.log(
      `Servidor do portfolio esperando reqs: https://localhost:${port} OU https://127.0.0.1:${port}`
    );
  });
};

main();
