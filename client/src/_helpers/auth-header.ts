import {authenticationService} from "@/_services/authentication.service";

export function authHeader(type: 'json' | 'form' | 'text' = "json"): HeadersInit {
  // return authorization header with jwt token
  const currentUser = authenticationService.currentUserValue;
  let header: HeadersInit = {};
  switch (type) {
    case "json":
      header = Object.assign(header, {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Accept: "application/json",
      });
      break;
    case "form":
      header = Object.assign(header, {
        "Cache-Control": "no-cache",
        Accept: "application/json",
      });
      break;
    default:
      header = Object.assign(header, {
        "Cache-Control": "no-cache",
        "Content-Type": "text/plain",
      });
      break;
  }

  if (currentUser && currentUser.token) {
    header["x-access-token"] = currentUser.token;
  }

  return header;
}
