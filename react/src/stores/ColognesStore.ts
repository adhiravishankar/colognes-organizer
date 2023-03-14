import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { useMap } from 'usehooks-ts';

import { API } from '../api/API';
import { Cologne } from '../models/Cologne';
import { DetailedCologne } from '../models/DetailedCologne';

export function useColognesStore() {
  const api = new API();
  let [colognes, setColognes] = useState<Cologne[]>([]);
  let [colognesMap, setColognesMap] = useMap<string, Cologne>();
  let [selectedCologne, setSelectedCologne] = useState<DetailedCologne | null>(null);

  const fetchColognes = async () => {
    const response = await api.getColognes();
    setColognes(response.data);
    setColognesMap.setAll(response.data.map((cologne: Cologne) => [cologne.Id, cologne]));
  };

  return { colognes, colognesMap, fetchColognes, selectedCologne, setSelectedCologne };
}

export const ColognesContainer = createContainer(useColognesStore);

