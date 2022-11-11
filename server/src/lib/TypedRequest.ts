import {Request} from "express";

// allow body to have a type T, default to "any"
export interface TypedRequest<T = void> extends Request {
  userId?: number;
  body: T;
}
