import { action, computed, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivatFields = "_params" | "_input";

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";
  private _input: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivatFields>(this, {
      _params: observable.ref,
      _input: observable,
      input: computed,
      setSearch: action,
      setInput: action,
    });
  }

  getAllParams(): qs.ParsedQs {
    return this._params;
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  get input(): string {
    return this._input;
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search;
    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }

  setInput(input: string) {
    this._input = input;
  }
}
