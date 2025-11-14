import { PlateRecord } from "@/types/plate";

const STORAGE_KEY = "polish_plates";

export const getPlates = (): PlateRecord[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const savePlate = (plate: string): { isDuplicate: boolean; record: PlateRecord } => {
  const plates = getPlates();
  const existing = plates.find((p) => p.plate === plate);
  const now = new Date().toISOString();

  if (existing) {
    existing.lastAttempt = now;
    existing.attemptCount += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plates));
    return { isDuplicate: true, record: existing };
  }

  const newRecord: PlateRecord = {
    plate,
    firstAdded: now,
    lastAttempt: now,
    attemptCount: 1,
  };

  plates.unshift(newRecord);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plates));
  return { isDuplicate: false, record: newRecord };
};

export const deletePlate = (plate: string): void => {
  const plates = getPlates().filter((p) => p.plate !== plate);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plates));
};
