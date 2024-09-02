import Router from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import { Category } from "../entities/Category";
import { Color } from "../entities/Color";
import { Size } from "../entities/Size";

import { Item } from "../entities/Item";
import { authenticationJWT } from "../middleware/authMiddleware";
import bcrypt from "bcryptjs";

let error: String | null = null;

function inputValidation(
  name: string,
  category: string,
  color: string,
  size: string,
  desc: string,
) {
  if (!name && !category && !color && !size && !desc) { 
    return (error = "Todos os campos devem ser preenchidos.");
  }
}

const router = Router();

// router.use(authenticationJWT);

//show all items 
router.get("/", async (req, res) => {
  const itemRepository = AppDataSource.getRepository(Item);
  const items = await itemRepository.find({ where: {state: true} });
  res.status(200).json({
    data: items,
  });
});

//show item details
router.get("/:code", async (req, res) => {
  const itemRepository = AppDataSource.getRepository(Item);
  const itemCode = req.params.code;
  const item = await itemRepository.findOne({
    where: { code: itemCode }
  });

  if (item) {
    res.status(200).json({
      data: item
    });
  } else {
    error = "Item não encontrado.";
    res.status(400).json({ error });
  }
});

//add a item
router.post("/", authenticationJWT, async (req, res) => {

  const itemRepository = AppDataSource.getRepository(Item); 
  const categoryRepository = AppDataSource.getRepository(Category); 
  const colorRepository = AppDataSource.getRepository(Color); 
  const sizeRepository = AppDataSource.getRepository(Size); 
  const userRepository = AppDataSource.getRepository(User); 
  //create new code
  const items = await itemRepository.find();
  const newCode = `Item: ${items.length}`
  //get user data
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const arrayToken = token && token.split('.');
  const token1 = arrayToken && JSON.parse(atob(arrayToken[1]));
  const userId = token1.user;
  const studentFound = await userRepository.findOne({
    where: { id: userId },
    relations: ["role"],
  });
  if (!studentFound) {
    error = "Usuário não encontrado.";
    res.status(400).json({ error });
    return;
  }
  //
  const { name, category, color, size, desc } = req.body;
  inputValidation(name, category, color, size, desc);
  //check category
  let categoryInDb = await categoryRepository.findOne({ where: { name: category } });
  if (!categoryInDb) {
    categoryInDb = categoryRepository.create({ name: category });
    await categoryRepository.save(categoryInDb);
  }
  //check color
  let colorInDb = await colorRepository.findOne({ where: { name: color } });
  if (!colorInDb) {
    colorInDb = colorRepository.create({ name: color });
    await colorRepository.save(colorInDb);
  }
  //check category
  let sizeInDb = await sizeRepository.findOne({ where: { name: size } });
  if (!sizeInDb) {
    sizeInDb = sizeRepository.create({ name: category });
    await sizeRepository.save(categoryInDb);
  }

  const newItem = {
    code: newCode,
    name: name,
    state: true,
    category: categoryInDb,
    color: colorInDb,
    size: sizeInDb,
    desc: desc,
    date_created: new Date(),
    date_recovered: null,
    student_found: studentFound,
    student_recovered: null,
  };

  console.log(newItem);

  await itemRepository.save(newItem);
  res.status(201).json({
    data: newItem,
  });
});

//update specific item
router.put("/:code", async (req, res) => {
  const itemRepository = AppDataSource.getRepository(Item);
  // const roleRepository = AppDataSource.getRepository(Role);

  const itemCode = req.params.code;
  const { username, email, password, role } = req.body;

  let itemToUpdate = await itemRepository.findOne({
    where: { code: itemCode }
  });

  // let roleInDb = await roleRepository.findOne({ where: { name: role } });
  // if (!roleInDb) {
  //   roleInDb = roleRepository.create({ name: role });
  //   await roleRepository.save(roleInDb);
  // }

  if (itemToUpdate) {
    // inputValidation(name, category, color, size, desc);
    if (!error) {
      const newData = {
        code: itemCode,
        username: username,
        email: email,
        password: password
      };

      await itemRepository.save(newData);
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

//delete specific item
router.delete("/:id", async (req, res) => {
  const itemRepository = AppDataSource.getRepository(User);
  const userId = parseInt(req.params.id);
  const userToRemove = await itemRepository.findOneBy({ id: userId });

  if (userToRemove) {
    console.log(userToRemove);
    await itemRepository.remove(userToRemove);
    res.status(200).json({
      data: userToRemove,
    });
  } else {
    error = "Usuário não encontrado.";
    res.status(404).json({ error });
  }
});

export default router;
