import { createContext, useContext, useState, useEffect } from 'react';
import { vehicles as initialVehicles } from '../data/vehicles';
import { materials as initialMaterials } from '../data/materials';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
    const [vehicles, setVehicles] = useState(() => {
        try {
            const saved = localStorage.getItem('vehicles_v14');
            return saved ? JSON.parse(saved) : initialVehicles;
        } catch (e) {
            console.error('Failed to parse vehicles from local storage', e);
            return initialVehicles;
        }
    });

    const [materials, setMaterials] = useState(() => {
        try {
            const saved = localStorage.getItem('materials_v14');
            return saved ? JSON.parse(saved) : initialMaterials;
        } catch (e) {
            console.error('Failed to parse materials from local storage', e);
            return initialMaterials;
        }
    });

    useEffect(() => {
        localStorage.setItem('vehicles_v14', JSON.stringify(vehicles));
    }, [vehicles]);

    useEffect(() => {
        localStorage.setItem('materials_v14', JSON.stringify(materials));
    }, [materials]);

    // Vehicle Actions
    const addVehicle = (vehicle) => {
        const newVehicle = { ...vehicle, id: Date.now() };
        setVehicles([...vehicles, newVehicle]);
    };

    const removeVehicle = (id) => {
        setVehicles(vehicles.filter(v => v.id !== id));
    };

    // Material Actions
    const addMaterial = (material) => {
        const newMaterial = { ...material, id: Date.now() };
        setMaterials([...materials, newMaterial]);
    };

    const removeMaterial = (id) => {
        setMaterials(materials.filter(m => m.id !== id));
    };

    const updateMaterialPrice = (id, newRatePerTon, newRatePerTruck) => {
        setMaterials(materials.map(m =>
            m.id === id
                ? { ...m, ratePerTon: newRatePerTon, ratePerTruck: newRatePerTruck }
                : m
        ));
    };

    const value = {
        vehicles,
        materials,
        addVehicle,
        removeVehicle,
        addMaterial,
        removeMaterial,
        updateMaterialPrice
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
