import { firebaseApp } from "@/firebase/clientApp";
import { getStorage } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export async function getReservations(companyName) {
  console.log(companyName);
  try {
    const companiesRef = collection(db, "companies");
    const q = query(companiesRef, where("data.company", "==", companyName));
    const querySnapshot = await getDocs(q);
    const allData = querySnapshot.docs.map((doc) => {
      return {
        data: doc.data().data,
      };
    });
    //console.log("returned", allData);
    return { status: 200, data: allData };
  } catch (error) {
    return { status: 500, error: error };
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    //console.log("GETTING DATA");
    const { currentComp } = req.query;
    const data = await getReservations(currentComp);
    return res.status(data.status).json(data.data);
  } else {
    res.status(401).json({ message: "Method not allowed" });
    return;
  }
}
