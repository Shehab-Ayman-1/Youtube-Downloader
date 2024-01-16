export type Providers = {
   github: {
      id: "github";
      name: "GitHub";
      type: "oauth";
      signinUrl: "http://localhost:3000/api/auth/signin/github";
      callbackUrl: "http://localhost:3000/api/auth/callback/github";
   };
   google: {
      id: "google";
      name: "Google";
      type: "oauth";
      signinUrl: "http://localhost:3000/api/auth/signin/google";
      callbackUrl: "http://localhost:3000/api/auth/callback/google";
   };
};
