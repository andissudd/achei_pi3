import Router from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { authenticationJWT } from "../middleware/authMiddleware";
import bcrypt from "bcryptjs";

let error: String | null = null;

function inputValidation(
  username: string,
  email: string,
  password: string,
  role: string
) {
  if (username && email && password && role) {
    const emailRegex = new RegExp("^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$");
    const passwordRegex = new RegExp(
      `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`
    );

    if (username.length < 5) {
      return (error = "Nome de usuário deve ter pelo menos 5 caracteres.");
    } else if (!emailRegex.exec(email)) {
      return (error = "Email inválido.");
    } else if (!passwordRegex.exec(password)) {
      return (error =
        "Senha inválida. Certifique-se de que a senha tenha pelo menos 8 caracteres, 1 número e 1 letra maiúscula.");
    }
  } else {
    return (error = "Todos os campos devem ser preenchidos.");
  }
}

const router = Router();

// router.use(authenticationJWT);

//show all users
router.get("/", async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({ relations: ["role"] });
  res.status(200).json({
    data: users,
  });
});

//show a user
router.get("/:id", async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const userId = parseInt(req.params.id);
  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ["role"],
  });

  if (user) {
    res.status(200).json({
      data: user,
    });
  } else {
    error = "Usuário não encontrado.";
    res.status(400).json({ error });
  }
});

//add a user
router.post("/", authenticationJWT, async (req, res) => {
  const { username, email, password, role } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const roleRepository = AppDataSource.getRepository(Role);

  let roleInDb = await roleRepository.findOne({ where: { name: role } });
  if (!roleInDb) {
    roleInDb = roleRepository.create({ name: role });
    await roleRepository.save(roleInDb);
  }

  inputValidation(username, email, password, role);
  if (!roleInDb) {
    roleInDb = roleRepository.create({ name: role });
    await roleRepository.save(roleInDb);
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    username: username,
    email: email,
    password: hashedPassword,
    role: roleInDb,
  };

  await userRepository.save(newUser);
  res.status(201).json({
    data: newUser,
  });
});

//update specific user
router.put("/:id", authenticationJWT, async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const roleRepository = AppDataSource.getRepository(Role);

  const userId = parseInt(req.params.id);
  const { username, email, password, role } = req.body;

  let userToUpdate = await userRepository.findOne({
    where: { id: userId },
    relations: ["role"],
  });

  let roleInDb = await roleRepository.findOne({ where: { name: role } });
  if (!roleInDb) {
    roleInDb = roleRepository.create({ name: role });
    await roleRepository.save(roleInDb);
  }

  if (userToUpdate) {
    inputValidation(username, email, password, role);
    if (!error) {
      const newData = {
        id: userId,
        username: username,
        email: email,
        password: password,
        role: roleInDb,
      };

      await userRepository.save(newData);
      res.status(200).json({
        data: newData,
      });
    } else {
      res.status(400).json({ error });
    }
  } else {
    res.status(404).json({ erro: "Usuário não encontrado." });
  }
});

//delete specific user
router.delete("/:id", async (req, res) => {
  const userRepository = AppDataSource.getRepository(User);
  const userId = parseInt(req.params.id);
  const userToRemove = await userRepository.findOneBy({ id: userId });

  if (userToRemove) {
    console.log(userToRemove);
    await userRepository.remove(userToRemove);
    res.status(200).json({
      data: userToRemove,
    });
  } else {
    error = "Usuário não encontrado.";
    res.status(404).json({ error });
  }
});

export default router;
