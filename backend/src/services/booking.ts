import { AppDataSource } from "../database/data-source";
import { Booking } from "../entities/Booking";

import { Item } from "../entities/Item";
import { User } from "../entities/User";
// import { Color } from "../entities/Color";
// import { Category } from "../entities/Category";
// import { Size } from "../entities/Size";

let error: String | null = null;


export async function getAllActive(res: any) {
  const bookingRepository = AppDataSource.getRepository(Booking);
  const bookings = await bookingRepository.find({ where: { state: true }, relations: ["item", "user_booked"] });
  return res.status(200).json({
    data: bookings,
  });
}

export async function getBookingByCode(req: any, res: any) {
  const bookingRepository = AppDataSource.getRepository(Booking);
  const userRepository = AppDataSource.getRepository(User);
  const itemCode = req.params.code;
  const booking = await bookingRepository.findOne({
    where: { code: itemCode },
  });


  if (booking) {
    res.status(200).json({
      data: booking
    });
  } else {
    error = "Agendamento não encontrado.";
    res.status(400).json({ erro: "Agendamento não encontrado." });
  }
}

export async function createBooking(req: any, res: any) {
  const bookingRepository = AppDataSource.getRepository(Booking);
  const itemRepository = AppDataSource.getRepository(Item);
  const userRepository = AppDataSource.getRepository(User);

  const { item_code, user_name } = req.body;
  //


  const userBooked = await userRepository.findOne({
    where: { register: "Adeêmi" }
  });

  if (!userBooked) {
    console.log("deu erro")
    error = "Usuário não encontrado.";
    res.status(400).json({ error });
    return;
  }
  //

  const item = await itemRepository.findOne({
    where: { code: item_code }
  });
  if (!item) {
    console.log("deu erro item")
    error = "Item não encontrado.";
    res.status(400).json({ error });
    return;
  }

  const newBooking = {
    code: item_code,
    state: true,
    date_booked: new Date(),
    date_concluded: null,
    item: item,
    user_booked: userBooked,
  }; 

  await bookingRepository.save(newBooking);
  res.status(201).json({
    data: newBooking,
  });
}

export async function updateBooking(req: any, res: any) {
  const bookingRepository = AppDataSource.getRepository(Booking);
  const userRepository = AppDataSource.getRepository(User);

  const bookingCode = req.params.code;

  console.log("entrou book")

  const bookingToUpdate = await bookingRepository.findOne({
    where: { code: bookingCode},
  });

  const userBooked = await userRepository.findOne({
    where: { register: "Adeêmi"},
  });

  if (bookingToUpdate && userBooked) {
    const newData = {
      id: bookingToUpdate.id,
      state: false,
      date_concluded: new Date(),
      user_booked: userBooked
    }

    await bookingRepository.save(newData);
      res.status(200).json({
        data: newData,
      });

  }

}

export async function deleteBooking(req: any, res: any) {
  const bookingRepository = AppDataSource.getRepository(Booking);
  const bookingCode = req.params.code;
  const bookingToRemove = await bookingRepository.findOneBy({ code: bookingCode });

  if (bookingToRemove) {
    console.log(bookingToRemove);
    // await bookingRepository.remove(bookingToRemove);
    // res.status(200).json({
    //   data: bookingToRemove,
    // });
  } else {
    error = "Agendamento não encontrado.";
    res.status(404).json({ error });
  }
}
