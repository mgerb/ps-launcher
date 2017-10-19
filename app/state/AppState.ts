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
  private appPath: string;
  private persistentFilePath: string;

  constructor() {
    this.appPath = remote.app.getPath('appData') + '/' + remote.app.getName();
    this.persistentFilePath = this.appPath + '/state.json';
    this.bootstrap();
  }

  @observable public expansions: { [key: string]: ExpansionType };
  @observable public isBootstrapped: boolean = false;
  @observable public selectedExpKey: string = 'vanilla';

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

  @action
  public setSelectedServerIndex(index: number): void {
    this.selectedExpansion.selectedServerIndex = index;
    this.updateFile(this.expansions);
  }

  @action
  public setSelectedExpansion(exp: string): void {
    this.selectedExpKey = exp;
  }

  @action
  public setDirectory(dir: string): void {
    this.selectedExpansion.directory = dir;
    this.updateFile(this.expansions);
  }


  // bootstrap application
  // creates directory and state.json in appData
  @action
  private bootstrap(): void {
    if (!fs.statSync(this.appPath).isDirectory()) {
      fs.mkdirSync(this.appPath);
    }

    fs.stat(this.persistentFilePath, err => {
      // create file if not exists
      if (err) {
        runInAction(() => {
          this.expansions = persistentStateSeed();
          this.isBootstrapped = true;
        });
        this.updateFile(this.expansions);
      } else {
        fs.readFile(this.persistentFilePath, (err, data) => {
          if (!err) {
            runInAction(() => {
              this.expansions = JSON.parse(data.toString()) as any;
              this.isBootstrapped = true;
            });
          }
        });
      }
    });
  }

  private updateFile(exp: any): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.persistentFilePath, JSON.stringify(exp, null, 2), {}, err => {
        err ? reject(err) : resolve();
      });
    });
  }
}

export default new AppState();
