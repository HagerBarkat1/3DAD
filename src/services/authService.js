// Simple authentication service using localStorage

const AUTH_KEY = '3dad_auth_data';
const USERS_KEY = '3dad_users';

// Initialize users array if it doesn't exist
const initUsers = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
};

// Register a new user
export const registerUser = (userData) => {
  initUsers();
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  
  // Check if email already exists
  if (users.some(user => user.email === userData.email)) {
    return { success: false, message: 'Email is already registered' };
  }
  
  // Add new user
  const newUser = {
    id: Date.now().toString(),
    name: userData.name,
    email: userData.email,
    password: userData.password, // In a real app, this would be hashed
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return { success: true, message: 'Account created successfully' };
};

// Login user
export const loginUser = (credentials, rememberMe = false) => {
  initUsers();
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  
  const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
  
  if (!user) {
    return { success: false, message: 'Email or password is incorrect' };
  }
  
  // Create session
  const authData = {
    userId: user.id,
    name: user.name,
    email: user.email,
    token: `token_${Math.random().toString(36).substr(2, 9)}`,
    expiresAt: rememberMe ? null : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours or no expiry
  };
  
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
  
  return { success: true, user: { id: user.id, name: user.name, email: user.email } };
};

// Check if user is logged in
export const isAuthenticated = () => {
  const authData = JSON.parse(localStorage.getItem(AUTH_KEY));
  
  if (!authData) return false;
  
  // Check if session has expired
  if (authData.expiresAt && new Date(authData.expiresAt) < new Date()) {
    localStorage.removeItem(AUTH_KEY);
    return false;
  }
  
  return true;
};

// Get current user
export const getCurrentUser = () => {
  if (!isAuthenticated()) return null;
  
  const authData = JSON.parse(localStorage.getItem(AUTH_KEY));
  return {
    id: authData.userId,
    name: authData.name,
    email: authData.email
  };
};

// Update user information
export const updateUser = (userId, updatedInfo) => {
  initUsers();
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  const authData = JSON.parse(localStorage.getItem(AUTH_KEY));
  
  // Find the user to update
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return { success: false, message: 'User not found' };
  }
  
  // Update user data
  users[userIndex] = {
    ...users[userIndex],
    ...updatedInfo,
    // Don't override these fields
    id: users[userIndex].id,
    createdAt: users[userIndex].createdAt
  };
  
  // Update users in localStorage
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // Update auth data if user is logged in
  if (authData && authData.userId === userId) {
    const updatedAuthData = {
      ...authData,
      name: updatedInfo.name || authData.name,
      email: updatedInfo.email || authData.email
    };
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(updatedAuthData));
  }
  
  return { success: true, message: 'User information updated successfully' };
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem(AUTH_KEY);
  return true;
};