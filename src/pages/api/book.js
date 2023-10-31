import { getStorage, ref, getDownloadURL } from "firebase/storage";

const db = getStorage(firebaseApp);

export async function getReservations() {
  try {
    const q = query(collection(db, "companies"));
    const querySnapshot = await getDocs(q);
    const allSeats = querySnapshot.docs.map((doc) => {
      return {
        seat: doc.data().data.seat,
        floor: doc.data().data.floor,
      };
    });
    return { status: 200, data: allSeats };
  } catch (error) {
    return { status: 500, error: error };
  }
}

export async function addRegistration(data) {
  console.log(data);
  try {
    //Add logo
    //Add data
    const docRef = await addDoc(collection(db, "companies"), {
      data,
    });

    return {
      status: 201,
      message: "Registration was sent and recieved successfully!",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: JSON.stringify(error), success: false };
  }
}

export default async function handler(req, res) {
  const data = await getReservations();
  if (req.method === "POST") {
    let foundDuplicate = false;
    data.data.forEach((booking) => {
      console.log(req.body.sponsor);

      if (
        req.body.sponsor !== "Brons" &&
        booking.seat == req.body.seat &&
        booking.floor == req.body.floor
      ) {
        foundDuplicate = true;
      }
    });

    if (foundDuplicate) {
      return res
        .status(409)
        .json({ message: "This seat is already reserved", success: false });
    } else {
      try {
        const insert_data = req.body;
        /*  await transporter.sendMail({
          from: "webb@medieteknikdagarna.se",
          to: req.body.email,
          subject: "Tack för din bokning till Medieteknikdagen",
          text: "Test",
        }); */
        const response = await addRegistration(insert_data);
        res
          .status(response.status)
          .json({ message: response.message, success: response.success });
        return;
      } catch (error) {
        res.status(409).json({ error: "Error while booking" });
        return;
      }
    }
  } else if (req.method === "GET") {
    //console.log("GETTING DATA");
    return res.status(data.status).json(data.data);
  } else {
    res.status(401).json({ message: "Method not allowed" });
    return;
  }
}
