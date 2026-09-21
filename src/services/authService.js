// =========================================================
// FRONTEND AUTH SERVICE
// =========================================================

const USERS_KEY = "statskill_auth_users";
const SESSION_KEY = "statskill_auth_session";

// ---------------------------------------------------------
// Helpers
// ---------------------------------------------------------

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Failed to read users:", error);
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function cleanUser(user) {
  if (!user) return null;

  // Never expose password through session
  const { password, ...safeUser } = user;

  return safeUser;
}

// =========================================================
// CREATE ACCOUNT
// =========================================================

export async function register({ name, email, password }) {
  const cleanName = name?.trim();
  const cleanEmail = email?.trim().toLowerCase();

  if (!cleanName) {
    throw new Error("Please enter your full name.");
  }

  if (!cleanEmail) {
    throw new Error("Please enter your email address.");
  }

  if (!cleanEmail.includes("@")) {
    throw new Error("Please enter a valid email address.");
  }

  if (!password) {
    throw new Error("Please create a password.");
  }

  if (password.length < 6) {
    throw new Error("Password must contain at least 6 characters.");
  }

  const users = readUsers();

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === cleanEmail,
  );

  if (existingUser) {
    throw new Error(
      "An account with this email already exists. Please sign in.",
    );
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: cleanName,
    email: cleanEmail,
    password,

    role: "Learner",
    department: "",
    location: "",
    joinedYear: new Date().getFullYear(),

    authProvider: "password",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  saveUsers(users);

  const session = cleanUser(newUser);

  saveSession(session);

  return session;
}

// =========================================================
// LOGIN WITH EMAIL + PASSWORD
// =========================================================

export async function login({ email, password }) {
  const cleanEmail = email?.trim().toLowerCase();

  if (!cleanEmail) {
    throw new Error("Please enter your email address.");
  }

  if (!password) {
    throw new Error("Please enter your password.");
  }

  const users = readUsers();

  const user = users.find((item) => item.email.toLowerCase() === cleanEmail);

  if (!user) {
    throw new Error(
      "No account found with this email. Please create an account first.",
    );
  }

  if (user.password !== password) {
    throw new Error("Incorrect password. Please try again.");
  }

  const session = cleanUser(user);

  saveSession(session);

  return session;
}

// =========================================================
// GOOGLE LOGIN
// =========================================================

export async function loginWithGoogle(googleUser) {
  if (!googleUser?.email) {
    throw new Error("Google sign-in did not return an email address.");
  }

  const email = googleUser.email.trim().toLowerCase();

  const users = readUsers();

  let user = users.find((item) => item.email.toLowerCase() === email);

  // First Google login -> create account
  if (!user) {
    user = {
      id: `google-${Date.now()}`,

      name: googleUser.name || email.split("@")[0],

      email,

      role: "Learner",
      department: "",
      location: "",
      joinedYear: new Date().getFullYear(),

      authProvider: "google",

      picture: googleUser.picture || "",

      createdAt: new Date().toISOString(),
    };

    users.push(user);

    saveUsers(users);
  } else {
    // Update Google profile picture/name if available
    user = {
      ...user,

      name: googleUser.name || user.name,

      picture: googleUser.picture || user.picture || "",

      authProvider: "google",
    };

    saveUsers(users);
  }

  const session = cleanUser(user);

  saveSession(session);

  return session;
}

// =========================================================
// DEMO LOGIN
// =========================================================

export async function loginAsDemo() {
  const demoUser = {
    id: "demo-user",

    name: "Demo User",

    email: "demo@statskill.ai",

    role: "Learner",

    department: "Demo Department",

    location: "India",

    joinedYear: 2026,

    authProvider: "demo",

    picture: "",
  };

  saveSession(demoUser);

  return demoUser;
}

// =========================================================
// GET CURRENT SESSION
// =========================================================

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to load session:", error);

    return null;
  }
}

// =========================================================
// UPDATE PROFILE
// =========================================================

export async function updateProfile(updates) {
  const session = getSession();

  if (!session) {
    throw new Error("No logged-in user found.");
  }

  const users = readUsers();

  const index = users.findIndex((user) => user.id === session.id);

  if (index === -1) {
    throw new Error("User account could not be found.");
  }

  const updatedUser = {
    ...users[index],

    name: updates.name?.trim() || users[index].name,

    role: updates.role?.trim() ?? users[index].role,

    department: updates.department?.trim() ?? users[index].department,

    location: updates.location?.trim() ?? users[index].location,
  };

  users[index] = updatedUser;

  saveUsers(users);

  const safeUser = cleanUser(updatedUser);

  saveSession(safeUser);

  return safeUser;
}

// =========================================================
// LOGOUT
// =========================================================

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
