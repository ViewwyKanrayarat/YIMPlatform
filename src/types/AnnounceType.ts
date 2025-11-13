import { type _GettersTree } from "pinia"
import type { AppConfig } from "../types/CartType"
export interface State {
  list: AppConfig
}

export interface Getters extends _GettersTree<State> {
  List(state: State): AppConfig
  
}

export interface Actions {
  getAnnounce(): void
}
