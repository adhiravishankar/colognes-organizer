import { useState } from 'react';
import { createContainer } from 'unstated-next';

import { API } from '../api/API';
import { Cologne } from '../models/Cologne';

export function useColognesStore() {
  const api = new API();
  let [colognes, setColognes] = useState<Cologne[]>([]);
  let [colognesMap, setColognesMap] = useState<Map<string, Cologne>>(new Map<string, Cologne>());
  let [selectedCologne, setSelectedCologne] = useState<Cologne | null>(null);

  const fetchColognes = async () => {
    const response = await api.getColognes();
    setColognes(response.data);
    setColognesMap(new Map<string, Cologne>(response.data.map((cologne: Cologne) => [cologne.Id, cologne])));
  };

  return { colognes, colognesMap, fetchColognes, selectedCologne, setSelectedCologne };
}

export const ColognesContainer = createContainer(useColognesStore);

