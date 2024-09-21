import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";

const router = Router();

router.post("/login", async (req, res) => {
  const { register, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { register: register },
    relations: ["role"],
  });


  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        userId: user.id,
        userRole: user.role,
      },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      data: {
        user: {
          id : user.id,
          name: user.name,
          email: user.email,
          register: user.register,
          role: {
            id: user.role.id,
            name: user.role.name,
          }
        },
        jwt: token
      }});
  
  } else {
    res.status(401).json({
      status: 401,
      name: "Authentication Error",
      message: "Nome de usuário ou senha inválidos",
    });
  }
});

router.get("/logout", (req, res) => {
  res.status(200).json({
    data: {
      message: "Logout realizado com sucesso",
    },
  });
});

export default router;
