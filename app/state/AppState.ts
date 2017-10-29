import { remote } from 'electron';
import * as _ from 'lodash';
import { action, computed, observable, runInAction } from 'mobx';
import fs from 'fs';
import { persistentStateSeed } from './persistent-state-seed';

export interface ExpansionType {
  name: string;
  servers: ServerType[];
  directory?: string;
  selectedServerIndex?: number;
}

export interface ServerType {
  name: string;
  realmlist: string;
  website: string;
}

export class AppState {

  // read only app data
  private readonly appPath: string = remote.app.getPath('appData') + '/' + remote.app.getName();
  private readonly persistentFilePath: string = this.appPath + '/app-state.json';
  private readonly appVersion: string = VERSION;

  @observable public expansions: { [key: string]: ExpansionType };
  @observable public isBootstrapped: boolean = false;
  @observable public selectedExpKey: string = 'vanilla';

  constructor() {
    this.bootstrap();
  }

  @computed
  public get selectedExpansion(): ExpansionType {
    return _.get(this.expansions, `[${this.selectedExpKey}]`);
  }

  @computed
  public get selectedServer(): ServerType {

    if (this.selectedExpansion.servers.length < 1) {
      return null;
    }

    const index: number = this.selectedExpansion.selectedServerIndex;
    return this.selectedExpansion.servers[index];
  }


  /**
   * @param {number} index 
   * @param {boolean} [persist=true] flag whether to persist after setting server index
   * @memberof AppState
   */
  @action
  public setSelectedServerIndex(index: number, persist: boolean = false): void {
    this.selectedExpansion.selectedServerIndex = index;
    if (persist) {
      this.persistState();
    }
  }

  @action
  public setSelectedExpansion(exp: string): void {
    this.selectedExpKey = exp;
    this.persistState();
  }

  @action
  public setDirectory(dir: string): void {
    this.selectedExpansion.directory = dir;
    this.persistState();
  }

  /**
   * @param {ServerType} server 
   * @returns {boolean} returns whether or not the server was added to the list
   * @memberof AppState
   */
  @action
  public addServer(server: ServerType): boolean {

    // check if server already exists
    if (_.some(this.selectedExpansion.servers, s => s.name === server.name)) {
      return false;
    }

    // push server into list
    const index = this.selectedExpansion.servers.push(server) - 1;

    // setting selected server index persists state
    this.setSelectedServerIndex(index);
    this.persistState();
    return true;
  }

  @action
  public deleteServer(serverIndex: number): void {
    if (this.selectedExpansion.selectedServerIndex === serverIndex) {
      this.setSelectedServerIndex(0);
    }

    // remove server from list
    this.selectedExpansion.servers.splice(serverIndex, 1);
    this.persistState();
  }

  /**
   * edit server info and persist state
   * @param {number} serverIndex index of server in array
   * @memberof AppState
   */
  @action
  public editServer(serverIndex: number, newServer: ServerType): void {
    this.selectedExpansion.servers[serverIndex] = newServer;
    this.persistState();
  }

  // bootstrap application
  // creates directory and persistent store in appData
  @action
  private bootstrap(): void {
    if (!fs.statSync(this.appPath).isDirectory()) {
      fs.mkdirSync(this.appPath);
    }

    fs.readFile(this.persistentFilePath, (err, data) => {

      runInAction(() => {
        // create file if not exists
        if (err) {
          this.expansions = persistentStateSeed();
          this.isBootstrapped = true;
          this.persistState();
        } else {
          // TODO: future note - grab app version here and update
          // any persisted state accordingly after app has been updated
          const storedData = JSON.parse(data.toString()) as any;
          this.expansions = storedData.expansions;
          this.selectedExpKey = storedData.selectedExpKey;
          this.isBootstrapped = true;
        }
      });
    });
  }

  // save state of app to file in app data
  private persistState(): Promise<void> {

    // select what we want to persist
    const { appVersion, expansions, selectedExpKey } = this;

    // create new object of what we want to persist
    const persistedState = {
      appVersion,
      expansions,
      selectedExpKey,
    };

    // write our new object to a file
    return new Promise((resolve, reject) => {
      fs.writeFile(this.persistentFilePath, JSON.stringify(persistedState, null, 2), {}, err => {
        err ? reject(err) : resolve();
      });
    });
  }
}

export default new AppState();
