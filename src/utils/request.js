import QueryString from "query-string";

import configs from "configs";
import auth from "utils/auth";

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function ServerAPIError(json) {
  this.name = "ServerAPIError";
  this.data = json;
  this.stack = new Error().stack;
}
ServerAPIError.prototype = Object.create(Error.prototype);
ServerAPIError.prototype.constructor = ServerAPIError;

class RequestUtil {
  constructor(...args) {
    if (args.length === 0 || args.length !== 1) {
      throw new Error(
        "Request constructor accepts only one parameter, which is a config object.",
      );
    }

    const { auth, apiUrl, defaultHeaders: headers = {}, tokenType } = args[0];

    this.auth = auth;
    this.apiUrl = apiUrl;
    this.defaultHeaders = { ...defaultHeaders, ...headers };
    this.tokenType = tokenType || "Bearer";
  }

  request = async (url, method, body, customHeaders = {}) => {
    let endpoint = url;

    if (!url.startsWith("http")) {
      endpoint = this.apiUrl + url;
    }
    const headers = {
      ...this.defaultHeaders,
      ...customHeaders,
    };

    let token;
    if (this.auth) {
      token = this.auth.getToken();
    }
    if (token) {
      headers.Authorization = `${this.tokenType} ${token}`;
    }
    let data = null;
    if (body) {
      if (headers["Content-Type"] === "application/json") {
        data = JSON.stringify(body);
      } else {
        delete headers["Content-Type"];
        data = body;
      }
    } else {
      delete headers["Content-Type"];
    }

    const fetchOpts = {
      method,
      headers,
    };
    if (method !== "HEAD" && method !== "GET") {
      fetchOpts.body = data;
    }

    const response = await fetch(endpoint, fetchOpts);

    let json = await response.json();

    if (response.status < 200 || response.status >= 300) {
      if (json) {
        throw new ServerAPIError(json);
      } else {
        throw new Error(response.statusText);
      }
    }

    return json;
  };

  get = (endpoint, params, headers = {}) => {
    let url = endpoint;
    if (params) {
      url += `?${QueryString.stringify(params)}`;
    }
    return this.request(url, "GET", null, headers);
  };

  post = (endpoint, body, headers = {}) =>
    this.request(endpoint, "POST", body, headers);

  put = (endpoint, body, headers = {}) =>
    this.request(endpoint, "PUT", body, headers);

  del = (endpoint, body, headers = {}) =>
    this.request(endpoint, "DELETE", body, headers);
}

const request = new RequestUtil({
  auth,
  apiUrl: configs.apiUrl,
});

export default request;
