export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export const createUser = (email: string, username: string, password: string): User => {
  const userId = Math.random().toString(36).substr(2, 9);
  const user: User = {
    id: userId,
    email,
    username,
    createdAt: new Date().toISOString()
  };
  
  const users = JSON.parse(localStorage.getItem('typemaster_users') || '[]');
  users.push({ ...user, password });
  localStorage.setItem('typemaster_users', JSON.stringify(users));
  localStorage.setItem('typemaster_currentUser', JSON.stringify(user));
  
  return user;
};

export const loginUser = (email: string, password: string): User | null => {
  const users = JSON.parse(localStorage.getItem('typemaster_users') || '[]');
  const user = users.find((u: any) => u.email === email && u.password === password);
  
  if (user) {
    const { password, ...userData } = user;
    localStorage.setItem('typemaster_currentUser', JSON.stringify(userData));
    return userData;
  }
  
  return null;
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('typemaster_currentUser');
  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
  localStorage.removeItem('typemaster_currentUser');
};

export const userExists = (email: string): boolean => {
  const users = JSON.parse(localStorage.getItem('typemaster_users') || '[]');
  return users.some((u: any) => u.email === email);
};
