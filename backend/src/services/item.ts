import { AppDataSource } from "../database/data-source";

import { Item } from "../entities/Item";
import { User } from "../entities/User";
// import { Color } from "../entities/Color";
// import { Category } from "../entities/Category";
// import { Size } from "../entities/Size";

let error: String | null = null;

function inputValidation(
  name: string,
  category: string,
  color: string,
  size: string,
  desc: string,
  photo: Blob
) {
  if (!name && !category && !color && !size && !desc && !photo) {
    return (error = "Todos os campos devem ser preenchidos.");
  }
}

export async function getAllActive(res: any) {
  const itemRepository = AppDataSource.getRepository(Item);
  const items = await itemRepository.find({ where: { state: true }});
  return res.status(200).json({
    data: items,
  });
}

export async function getFiltered(req: any, res: any) {

  const filters = req.params.filters.split(",");
  const category = filters[0];
  const color = filters[1];
  const size = filters[2];

  const itemRepository = AppDataSource.getRepository(Item);
  const items = await itemRepository.find({ where: { state: true, category: category, color: color, size: size} });
  return res.status(200).json({
    data: items,
  });
}

export async function getItemByCode(req: any, res: any) {
  const itemRepository = AppDataSource.getRepository(Item);
  const userRepository = AppDataSource.getRepository(User);
  const itemCode = req.params.code;
  const item = await itemRepository.findOne({
    where: { code: itemCode }, relations: ['user_found']
  });

  if (item) {
    const itemData= {
      name: item.name,
      category: item.category,
      color: item.color,
      size: item.size,
      desc: item.desc,
      date_created: item.date_created,
      photo: item.photo,
    }

    const userFound = item.user_found.name;
    res.status(200).json({
      data: {
        item: itemData,
        user_found: userFound,
      }
    });

  } else {
    error = "Item não encontrado.";
    res.status(400).json({ erro: "Item não encontrado." });
  }
}

export async function createItem(req: any, res: any) {
  const itemRepository = AppDataSource.getRepository(Item);
  const userRepository = AppDataSource.getRepository(User);

  const { user_register, name, category, color, size, desc, date_found, photo } = req.body;
  inputValidation(name, category, color, size, desc, photo);

  //create new code
  const items = await itemRepository.find();
  const newCode = `item${items.length}`;
  //

  // //get user data
  const userFound = await userRepository.findOne({
    where: { register: user_register },
    relations: ["role"],
  });
  if (!userFound) {
    console.log("deu erro")
    error = "Usuário não encontrado.";
    res.status(400).json({ error });
    return;
  }
  //

  const newItem = {
    code: newCode,
    name: name,
    state: true,
    category: category,
    color: color,
    size: size,
    desc: desc,
    date_created: date_found,
    date_recovered: null,
    user_found: userFound,
    user_recovered: null,
    photo: "https://thumbs.dreamstime.com/b/d-person-using-magnifying-glass-searching-inspecting-concept-exploration-figure-holding-representing-act-321657133.jpg"
    // photo: photo
  };

  console.log(name); 

  await itemRepository.save(newItem);
  res.status(201).json({
    data: newItem,
  });
}

export async function updateItem(req: any, res: any) {
  const itemRepository = AppDataSource.getRepository(Item);
  const userRepository = AppDataSource.getRepository(User);

  const itemCode = req.params.code;
  // const { name, category, color, size, desc } = req.body;

  let itemToUpdate = await itemRepository.findOne({
    where: { code: itemCode },
  });
  const userBooked = await userRepository.findOne({
    where: { register: "Adeêmi"},
  });

  console.log("entrou item")

  if (itemToUpdate) {
    if (!error) {
      const newData = {
        id: itemToUpdate.id,
        state: false,
        date_recovered: new Date(),
        user_found: itemToUpdate.user_found,
        user_recovered: userBooked,
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
}

export async function deleteItem(req: any, res: any) {
  const itemRepository = AppDataSource.getRepository(Item);
  const itemCode = req.params.code;
  const itemToRemove = await itemRepository.findOneBy({ code: itemCode });

  if (itemToRemove) {
    await itemRepository.remove(itemToRemove);
    res.status(200).json({
      data: itemToRemove,
    });
  } else {
    error = "Item não encontrado.";
    res.status(404).json({ error });
  }
}
