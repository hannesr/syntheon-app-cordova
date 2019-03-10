
class SyntheonApi {

  constructor(device_id) {
    this.device_id = device_id;
    this.SERVICE = "6627989e-423b-11e9-b210-d663bd873d93";
    this.BANK_CHR = "66279b96-423b-11e9-b210-d663bd873d93";
    this.PRESET_CHR = "66279d12-423b-11e9-b210-d663bd873d93";
    this.C_CHR = "66279e7a-423b-11e9-b210-d663bd873d93";
    this.D_CHR = "6627a000-423b-11e9-b210-d663bd873d93";
    this.E_CHR = "6627a1ae-423b-11e9-b210-d663bd873d93";
  }

  getBank(success, failure) {
    ble.read(this.device_id, this.SERVICE, this.BANK_CHR,
      (data) => {
        try {
          let bank = JSON.parse(this.bytesToString(data));
          success(bank);
        } catch(ex) {
          failure(ex.message);
        }
      },
      (err) => {
        failure(JSON.stringify(err));
      }
    );
  }

  getPreset(success, failure) {
    ble.read(this.device_id, this.SERVICE, this.PRESET_CHR,
      (data) => {
        try {
          let buffer = new Uint8Array(data);
          success(buffer[0]);
        } catch(ex) {
          failure(ex.message);
        }
      },
      (err) => {
        failure(JSON.stringify(err));
      }
    );
  }

  setPreset(preset, success, failure) {
    let data = new Uint8Array(1);
    data[0] = preset;
    ble.write(this.device_id, this.SERVICE, this.PRESET_CHR,
      data, success, failure);
  }

  stringToBytes(string) {
    let array = new Uint8Array(string.length);
    for (let i = 0, l = string.length; i < l; i++) {
      array[i] = string.charCodeAt(i);
    }
    return array.buffer;
  }

  bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

}

module.exports = SyntheonApi;
