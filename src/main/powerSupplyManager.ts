import util from "node:util";
const exec = util.promisify(require('child_process').exec);

class powerSupplyManager {
  ipAddress: string;

  constructor(ipAddress: string) {
    this.ipAddress = ipAddress;
  }

  private async sendScpiMsg(command: string) {
    try {
      const { stdout, stderr } = await exec(
        `lxi scpi -a ${this.ipAddress} ${command}`,
      );
      if (stderr) {
        return -1;
      }
      return stdout;
    } catch {
      return -1;
    }
  }

  async getVoltage() {
    const res = await this.sendScpiMsg(`":MEAS:VOLT?"`);
    return parseFloat(res);
  }

  async getAmperage() {
    const res = await this.sendScpiMsg(`":MEAS:CURR?"`);
    return parseFloat(res);
  }

  async getEnabled() {
    const res = await this.sendScpiMsg(`":OUTP?"`);
    if (res === 'OFF\n') {
      return false;
    }
    if (res === 'ON\n') {
      return true;
    }
    return res;
  }

  async setVoltage(voltage: number) {
    const range = await this.sendScpiMsg(`":OUTP:RANG?"`);
    const maxVoltage = parseInt(range.slice(0, 2), 10);
    if (voltage <= maxVoltage) {
      await this.sendScpiMsg(`":VOLT ${voltage}"`);
      return parseFloat(await this.sendScpiMsg(`":VOLT?"`));
    }
    return false;
  }

  async setAmperage(amperage: number) {
    const range = await this.sendScpiMsg(`":OUTP:RANG?"`);
    const maxAmperage = parseInt(range.slice(4, 6).replace('A', ''), 10);
    if (amperage <= maxAmperage) {
      await this.sendScpiMsg(`":CURR ${amperage}"`);
      return parseFloat(await this.sendScpiMsg(`":CURR?"`));
    }
    return false;
  }

  async getSetVoltage() {
    const res = await this.sendScpiMsg(`":VOLT?"`);
    return parseFloat(res);
  }

  async getSetAmperage() {
    const res = await this.sendScpiMsg(`":CURR?"`);
    return parseFloat(res);
  }

  async enable() {
    await this.sendScpiMsg(`":OUTP ON"`);
    const res = await this.sendScpiMsg(`":OUTP?"`);
    if (res === 'ON\n') {
      return true;
    }
    return false;
  }

  async disable() {
    await this.sendScpiMsg(`":OUTP OFF"`);
    const res = await this.sendScpiMsg(`":OUTP?"`);
    if (res === 'OFF\n') {
      return true;
    }
    return false;
  }
}

export default powerSupplyManager;
