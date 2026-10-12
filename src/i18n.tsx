import { createContext, useContext } from "react";
import * as ko from "./data";
import * as en from "./data.en";

export type Data = typeof ko;

export const isEnglish = () => typeof location !== "undefined" && location.pathname.startsWith("/en");

export const data: Data = isEnglish() ? (en as Data) : ko;

const Ctx = createContext<Data>(data);

export const DataProvider = Ctx.Provider;
export const useData = () => useContext(Ctx);
