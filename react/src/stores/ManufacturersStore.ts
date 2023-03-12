import { useState } from 'react';
import { createContainer } from 'unstated-next';

import { API } from '../api/API';
import { Manufacturer } from '../models/Manufacturer';


export function useManufacturersStore() {
  const api = new API();
  let [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  let [manufacturersMap, setManufacturersMap] = useState<Map<string, Manufacturer>>(new Map());
  let [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | undefined>(undefined);

  const fetchManufacturers = async () => {
    const response = await api.getManufacturers();
    setManufacturers(response.data);
    setManufacturersMap(new Map<string, Manufacturer>(response.data.map((manufacturer: Manufacturer) => [manufacturer.id, manufacturer])));
  };

  return { fetchManufacturers, manufacturers, manufacturersMap, selectedManufacturer, setSelectedManufacturer };
}

export const ManufacturersContainer = createContainer(useManufacturersStore);