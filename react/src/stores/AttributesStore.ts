import { createContainer } from 'unstated-next';
import { useMap } from 'usehooks-ts';

import { API } from '../api/API';
import { Attribute } from '../models/Attribute';
import { DetailedCologne } from '../models/DetailedCologne';

export function useAttributesStore() {
  const api = new API();
  let [attributesMap, setAttributesMap] = useMap<string, Attribute[]>();

  const fetchAttributes = async (cologneID: string) => {
    const response = await api.getCologne(cologneID);
    const data = response.data as DetailedCologne;
    setAttributesMap.set(cologneID, data.Attributes);
  };

  return { attributesMap, fetchAttributes };
}

export const AttributesContainer = createContainer(useAttributesStore);
