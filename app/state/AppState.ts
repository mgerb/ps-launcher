import { action, computed, observable, runInAction } from 'mobx';
import fs from 'fs';

export interface ExpansionType {
  name: string;
  servers: ServerType[];
  directory?: string;
}

export interface ServerType {
  name: string;
  realmlist: string;
  website: string;
}

export class AppState {

  constructor() {
    this.bootstrap();
  }

  @action
  private bootstrap(): void {
    fs.readFile('./servers.json', (err, data) => {
      if (!err) {
        runInAction(() => {
          this.expansions = JSON.parse(data.toString()) as any;
        });
      }
    });
  }

  @observable
  public expansions: { [key: string]: ExpansionType } = {
    vanilla: {
      name: 'Vanilla',
      servers: [],
      directory: '',
    },
    bc: {
      name: 'Burning Crusade',
      servers: [],
      directory: '',
    },
    wotlk: {
      name: 'Wrath of the Lich King',
      servers: [],
      directory: '',
    },
  };

  @observable
  public selectedExpKey: string = 'vanilla';

  @computed
  public get selectedExpansion(): ExpansionType {
    return this.expansions[this.selectedExpKey];
  }

  @action
  public setSelectedExpansion(exp: string): void {
    this.selectedExpKey = exp;
  }

  @action
  public setDirectory(dir: string): void {
    this.expansions[this.selectedExpKey].directory = dir;
    this.updateFile(this.expansions);
  }

  private updateFile(exp: any): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile('./servers.json', JSON.stringify(exp, null, 2), {}, (err) => {
        err ? reject(err) : resolve();
      });
    });
  }
  
}

export default new AppState();
