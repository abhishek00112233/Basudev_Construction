import baluImg from '../assets/balu.png';
import gittiImg from '../assets/gitti.png';
import stoneImg from '../assets/stone.png';

export const materials = [
    {
        id: 1,
        name: "Balu (Sand)",
        type: "Fine Aggregate",
        ratePerTon: "₹800",
        ratePerTruck: "₹18,000",
        description: "High quality river sand for construction.",
        image: baluImg
    },
    {
        id: 2,
        name: "Gitti (Stone Chips)",
        type: "Coarse Aggregate",
        ratePerTon: "₹950",
        ratePerTruck: "₹22,000",
        description: "Durable stone chips for strong concrete.",
        image: gittiImg
    },
    {
        id: 3,
        name: "Stone",
        type: "Raw Stone",
        ratePerTon: "₹700",
        ratePerTruck: "₹15,000",
        description: "Large stones for foundation work.",
        image: stoneImg
    }
];
