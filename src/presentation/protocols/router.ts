import { HttpRequest } from "./http-request"
import { HttpResponse } from "./http-response"

export type Router = {
  route: (httpRequest: HttpRequest) => HttpResponse
}