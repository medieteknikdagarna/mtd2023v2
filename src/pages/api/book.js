import { firebaseApp } from "@/firebase/clientApp";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

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
  if (req.method === "POST") {
    try {
      const insert_data = req.body;
      const response = await addRegistration(insert_data);
      res
        .status(response.status)
        .json({ message: response.message, success: response.success });
      return;
    } catch (error) {
      res.status(409).json({ error: "Bruh" });
      return;
    }
  } else if (req.method === "GET") {
    //console.log("GETTING DATA");
    const data = await getReservations();
    return res.status(data.status).json(data.data);
  } else {
    res.status(401).json({ message: "Method not allowed" });
    return;
  }
}
