import { action, computed, makeObservable, observable } from "mobx";
import * as qs from "qs";

type PrivatFields = "_params";

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivatFields>(this, {
      _params: observable.ref,
      allParams: computed,
      setSearch: action,
    });
  }

  get allParams(): qs.ParsedQs {
    return this._params;
  }

  getParam(
    key: string
  ): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
    return this._params[key];
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search;
    if (this._search !== search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }
}
