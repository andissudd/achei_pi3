import Router from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";


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
  const items = await itemRepository.find({ where: {state: true}});
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
  const userRepository = AppDataSource.getRepository(User); 
  //create new code
  const items = await itemRepository.find();
  const newCode = `item${items.length}`
  //get user data
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const arrayToken = token && token.split('.');
  const token1 = arrayToken && JSON.parse(atob(arrayToken[1]));
  const userId = token1.userId;
  const userFound = await userRepository.findOne({
    where: { id: userId },
    relations: ["role"],
  });
  if (!userFound) {
    error = "Usuário não encontrado.";
    res.status(400).json({ error });
    return;
  }
  //
  const { name, category, color, size, desc } = req.body;
  inputValidation(name, category, color, size, desc);
  

  const newItem = {
    code: newCode,
    name: name,
    state: true,
    category: category,
    color: color,
    size: size,
    desc: desc,
    date_created: new Date(),
    date_recovered: null,
    user_found: userFound,
    user_recovered: null,
  };

  await itemRepository.save(newItem);
  res.status(201).json({
    data: newItem,
  });

});

//update specific item
router.put("/:code",authenticationJWT, async (req, res) => {
  const itemRepository = AppDataSource.getRepository(Item);
  // const roleRepository = AppDataSource.getRepository(Role);

  const itemCode = req.params.code;
  const { name, category, color, size, desc } = req.body;

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
        id: itemToUpdate.id,
        code: itemCode,
        name: name,
        state: true,
        category: category,
        color: color,
        size: size,
        desc: desc,
        date_created: itemToUpdate.date_created,
        date_recovered: itemToUpdate.date_created,
        user_found: itemToUpdate.user_found,
        user_recovered: itemToUpdate.user_recovered,
        photos: itemToUpdate.photos,
      };

      await itemRepository.save(newData);
      res.status(200).json({
        data: newData,
      });
    } else {
      res.status(400).json({ error });
    }
  } else {
    res.status(404).json({ erro: "Item não encontrado." });
  }
});

//delete specific item
router.delete("/:code", authenticationJWT, async (req, res) => {
  const itemRepository = AppDataSource.getRepository(Item);
  const itemCode = req.params.code;
  const itemToRemove = await itemRepository.findOneBy({ code: itemCode });

  if (itemToRemove) {
    console.log(itemToRemove);
    await itemRepository.remove(itemToRemove);
    res.status(200).json({
      data: itemToRemove,
    });
  } else {
    error = "Usuário não encontrado.";
    res.status(404).json({ error });
  }
});

export default router;
