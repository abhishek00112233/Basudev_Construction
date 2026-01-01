import basudevTruckImg from '../assets/basudev_truck.png';
import basudevTruck2Img from '../assets/basudev_truck_2.png';
import basudevJcbImg from '../assets/basudev_jcb.png';

export const vehicles = [
  {
    id: 1,
    truckNumber: "BR-01-HA-9988",
    wheels: 20,
    driverName: "Ramesh Kumar",
    driverPhone: "+91 9876543210",
    type: "Hyva Truck",
    image: basudevTruckImg
  },
  {
    id: 2,
    truckNumber: "BR-01-GB-5678",
    wheels: 12,
    driverName: "Suresh Yadav",
    driverPhone: "+91 9123456789",
    type: "Heavy Truck",
    image: basudevTruck2Img
  },
  {
    id: 3,
    truckNumber: "BR-01-JD-50000",
    wheels: 4,
    driverName: "Rajesh Paswan",
    driverPhone: "+91 9776655443",
    type: "JCB Excavator",
    image: basudevJcbImg
  }
];
