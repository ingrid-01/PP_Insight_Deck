import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const COLLECTION_NAME = "insights";
const LOCAL_STORAGE_KEY = "insight_deck_data";

// Helper to check if Firebase is configured
const isFirebaseReady = () => {
  return !!import.meta.env.VITE_FIREBASE_API_KEY;
};

// --- Local Storage Fallback Helpers ---
const getLocalData = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveLocalData = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

// --- Service Methods ---

// Now accepting uid to scope data by user
export const getInsights = async (uid) => {
  if (isFirebaseReady() && uid) {
    try {
      // Path: users/{uid}/insights
      const userInsightsRef = collection(db, "users", uid, COLLECTION_NAME);
      const q = query(userInsightsRef, orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching from Firebase:", error);
      // If fetching fails, we typically don't fall back to local for a specific user unless we sync.
      // For now, let's return local if no user, or empty array if error to avoid mixing data.
      // Actually, if we are logged in, we expect cloud data.
      return [];
    }
  } else {
    return getLocalData();
  }
};

export const addInsight = async (insight, uid) => {
  if (isFirebaseReady() && uid) {
    try {
      const userInsightsRef = collection(db, "users", uid, COLLECTION_NAME);
      const docRef = await addDoc(userInsightsRef, insight);
      return { id: docRef.id, ...insight };
    } catch (error) {
      console.error("Error adding to Firebase:", error);
      // Fallback? If we are logged in, we should probably alert error.
      // But to keep it usable, we might update local.
      // For this phase, let's assume if you are logged in, you want cloud.
      throw error;
    }
  } else {
    const current = getLocalData();
    const newItem = { ...insight, id: Date.now().toString() };
    saveLocalData([newItem, ...current]);
    return newItem;
  }
};

export const updateInsight = async (id, updates, uid) => {
  if (isFirebaseReady() && uid) {
    try {
      const insightRef = doc(db, "users", uid, COLLECTION_NAME, id);
      await updateDoc(insightRef, updates);
      return { id, ...updates };
    } catch (error) {
      console.error("Error updating in Firebase:", error);
      throw error;
    }
  } else {
    const current = getLocalData();
    const index = current.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updated = { ...current[index], ...updates };
      current[index] = updated;
      saveLocalData(current);
      return updated;
    }
  }
};

export const deleteInsight = async (id, uid) => {
  if (isFirebaseReady() && uid) {
    try {
      await deleteDoc(doc(db, "users", uid, COLLECTION_NAME, id));
      return id;
    } catch (error) {
      console.error("Error deleting from Firebase:", error);
      throw error;
    }
  } else {
    const current = getLocalData();
    const filtered = current.filter((item) => item.id !== id);
    saveLocalData(filtered);
    return id;
  }
};
