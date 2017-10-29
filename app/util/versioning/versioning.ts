import axios from 'axios';
import * as _ from 'lodash';

class Versioning {
  private readonly releaseEndPoint: string = 'https://api.github.com/repos/mgerb/ps-launcher/releases';

  public async checkForUpdates(): Promise<boolean> {
    const res = await axios.get(this.releaseEndPoint);

    return !!_.find(res.data, (release: any) => {
      return this.parseVersion(release.tag_name) > this.parseVersion(VERSION);
    });
  }

  
  /**
   * returns a number value for a version string matching '0.0.1'
   * @param {string} version 
   * @returns {*} 
   * @memberof Versioning
   */
  public parseVersion(version: string): number {
    const parts = version.split('.');
    return _.sumBy(parts, p => parseInt(p, 10));
  }
}

export const versioning = new Versioning();
