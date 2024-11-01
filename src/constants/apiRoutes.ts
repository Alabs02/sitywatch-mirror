export const baseURI = "https://sitywatch-backend.onrender.com/api/v1/"

export const apiRoutes = {
  SITIZENS_SIGN_UP: "sitizens",
  VERIFY_EMAIL: "auth/verifyEmail",
  SITADELS_SIGN_UP: "sitadels",
  SIGN_IN: "auth/signin",
  SIGN_OUT: "auth/signout",
  REFRESH_TOKEN: "auth/tokens",
  PANDAR_POLLS: "pandar-polls",
  PANDAR_POLLS_INTERACTIONS: (id: string) => `pandar-polls/${id}/interactions`,
  UPLOAD_IMAGE: "images",
  GET_IMAGE: (id: string) => `images/${id}`,
}
