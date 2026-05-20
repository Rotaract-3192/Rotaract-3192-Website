// Server-side mock auth for testing without Clerk
export async function auth() {
  return {
    userId: "test_admin_user_id",
    permissionBits: 1, // 01 = Master Admin
    sessionClaims: {
      email: "thejaswinps@gmail.com",
      metadata: { role: "district_admin" }
    },
    protect: async () => {},
    redirectToSignIn: () => {}
  };
}

export async function currentUser() {
  return {
    id: "test_admin_user_id",
    firstName: "Test",
    lastName: "Admin",
    permissionBits: 1,
    emailAddresses: [{ emailAddress: "thejaswinps@gmail.com" }],
    imageUrl: "https://ui-avatars.com/api/?name=Test+Admin",
    publicMetadata: { role: "district_admin" }
  };
}
