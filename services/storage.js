import { INITIAL_COURSES } from '../constants';

const KEYS = {
  COURSES: 'lumina_courses_v2',
  PROGRESS: 'lumina_progress_v2',
};

export const getCourses = () => {
  try {
    const stored = localStorage.getItem(KEYS.COURSES);
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem(KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
    return INITIAL_COURSES;
  } catch (e) {
    console.error("Failed to load courses", e);
    return INITIAL_COURSES;
  }
};

export const saveCourse = (course) => {
  const current = getCourses();
  const updated = [...current, course];
  localStorage.setItem(KEYS.COURSES, JSON.stringify(updated));
};

export const resetData = () => {
  localStorage.setItem(KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
  localStorage.removeItem(KEYS.PROGRESS);
  window.location.reload();
};

export const getProgress = () => {
  try {
    const stored = localStorage.getItem(KEYS.PROGRESS);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const toggleProgress = (subtopicId) => {
  const current = getProgress();
  const newState = {
    ...current,
    [subtopicId]: !current[subtopicId],
  };
  localStorage.setItem(KEYS.PROGRESS, JSON.stringify(newState));
  return newState;
};

