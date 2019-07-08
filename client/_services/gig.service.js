import config from "config";
import { authHeader } from "../_helpers";

export const gigService = {
  getAll
};

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/gigs`, requestOptions).then(handleResponse);
}
