// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/firestore";
import {
  Timestamp,
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { redirect, useNavigate, useNavigation } from "react-router-dom";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore(app);

export async function getActivationCodeInfo(code) {
  return (await getDoc(doc(db, "MeterActivationCode", code))).data();
}

export async function addMeterToUser(meter_id, u_id) {
  return addDoc(collection(db, "User", `${u_id}/UserMeter`), {
    meter_id,
  });
}

export async function deleteActivationCode(code) {
  return deleteDoc(doc(db, "MeterActivationCode", code));
}

export async function createUser(first_name, last_name, auth_id) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setDoc(doc(db, "User", auth_id), {
        age: null,
        first_name,
        last_name,
        permanent_address: null,
        phone: null,
      });

      return true;
    }
  });
}

export async function getUserMeterStatus(user) {
  const docRef = collection(db, "User", `${user.uid}/UserMeter`);
  const querySnapshot = await getDocs(docRef);
  let hasMeter = false;

  if (querySnapshot.size > 0) {
    hasMeter = true;
  }
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // })

  return hasMeter;
}

export async function getUserMeter(uid) {
  const docRef = collection(db, "User", `${uid}/UserMeter`);
  const querySnapshot = await getDocs(docRef);

  if (querySnapshot.empty) {
    retll;
  } else {
    const meter_info = await getDoc(
      doc(db, "Meter", querySnapshot.docs.at(0).data().meter_id)
    );

    return meter_info;
  }
}

export async function getUserMeterReadingCollectionRef(uid) {
  const docRef = collection(db, "User", `${uid}/UserMeter`);
  const querySnapshot = await getDocs(docRef);
  const meter_reading_ref = collection(
    db,
    "Meter",
    `${querySnapshot.docs.at(0).data().meter_id}/MeterReadings`
  );

  return meter_reading_ref;
}

export async function getConfig() {
  const docRef = collection(db, "Config");
  const querySnapshot = await getDocs(docRef);

  return querySnapshot.docs;
}

export async function getSortedEnergyUsage(date, userMeterID) {
  if(date){
    date = new Date(date);
  }else{
    date = new Date();
  }
  date.setHours(0, 0, 1);
  const fDateBegin = Timestamp.fromDate(date);
  date.setHours(23, 59, 59);
  const fDateEnd = Timestamp.fromDate(date);
  const meterRef = collection(db, `Meter/${userMeterID}/MeterReadings`);
  const queryRef = query(
    meterRef,
    where("timestamp", ">=", fDateBegin.seconds),
    where("timestamp", "<=", fDateEnd.seconds)
  );
  

  const meterReadings = await getDocs(queryRef);
  let sortedAlgorithm = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
    13: [],
    14: [],
    15: [],
    16: [],
    17: [],
    18: [],
    19: [],
    20: [],
    21: [],
    22: [],
    23: []
  };

  meterReadings.forEach((doc) => {
    //segment for 24 hours
    const hours = firestoreTimestampToJSDate(doc.data().timestamp).getHours();
    sortedAlgorithm[hours].push(doc.data())
  });

  // console.log(sortedAlgorithm);
  return sortedAlgorithm;
}


export async function computeEnergyUsage(sortedAlgorithm, tariff) {
  const data = await sortedAlgorithm;
  const finalComputedEnergyUsage = {
    data: [],
    totalTariff: 0,
    totalEnergy: 0,
    heading: "Energy consumption over time",
  };

  for (let hour in data) {
    let cummulativeEnergyUsage = 0.00;

    data[hour].forEach((consumption) => {
      const power = powerToEnergy(consumption.power);

      cummulativeEnergyUsage += power;
    });
    
    finalComputedEnergyUsage["data"].push({
      energy: cummulativeEnergyUsage,
      hour: `${hour}:00`,
      
    });

    finalComputedEnergyUsage.totalTariff += cummulativeEnergyUsage * tariff;
    finalComputedEnergyUsage.totalEnergy += cummulativeEnergyUsage;
  }

  return finalComputedEnergyUsage
}

//Utilities
export function firestoreTimestampToJSDate(timestamp) {
  const ts = timestamp * 1000;
  return new Date(ts);
}

export function powerToEnergy(power) {
  //average power * time (5 mins converted to hours) / 1000 (kilowatts)
  return Math.fround((power * (1 / 60)) / 1000);
}
