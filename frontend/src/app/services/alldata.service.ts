import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlldataService {
  orders = [
    {
      status: 'progress',
      e_sign: 'initiated',
      e_stamp: 'pending',
      state: 'Karnataka',
      date: '2019-12-25',
    },
    {
      status: 'completed',
      e_sign: 'signed',
      e_stamp: 'signed',
      state: 'Maharashtra',
      date: '2020-01-01',
    },
    {
      status: 'cancelled',
      e_sign: 'expired',
      e_stamp: 'initiated',
      state: 'Gujarat',
      date: '2017-03-07',
    },
    {
      status: 'progress',
      e_sign: 'pending',
      e_stamp: 'signed',
      state: 'Punjab',
      date: '2023-06-20',
    },
    {
      status: 'completed',
      e_sign: 'signed',
      e_stamp: 'expired',
      state: 'Tamil Nadu',
      date: '2022-11-01',
    },
    {
      status: 'cancelled',
      e_sign: 'initiated',
      e_stamp: 'pending',
      state: 'Rajasthan',
      date: '2018-05-14',
    },
    {
      status: 'progress',
      e_sign: 'signed',
      e_stamp: 'expired',
      state: 'Karnataka',
      date: '2019-07-22',
    },
    {
      status: 'completed',
      e_sign: 'expired',
      e_stamp: 'initiated',
      state: 'Maharashtra',
      date: '2017-04-15',
    },
    {
      status: 'cancelled',
      e_sign: 'initiated',
      e_stamp: 'pending',
      state: 'Gujarat',
      date: '2020-09-10',
    },
    {
      status: 'progress',
      e_sign: 'signed',
      e_stamp: 'expired',
      state: 'Punjab',
      date: '2021-02-03',
    },
    {
      status: 'completed',
      e_sign: 'expired',
      e_stamp: 'initiated',
      state: 'Tamil Nadu',
      date: '2018-10-17',
    },
    {
      status: 'cancelled',
      e_sign: 'initiated',
      e_stamp: 'pending',
      state: 'Rajasthan',
      date: '2020-12-31',
    },
    {
      status: 'progress',
      e_sign: 'signed',
      e_stamp: 'expired',
      state: 'Karnataka',
      date: '2019-03-05',
    },
    {
      status: 'completed',
      e_sign: 'expired',
      e_stamp: 'initiated',
      state: 'Maharashtra',
      date: '2022-06-11',
    },
    {
      status: 'cancelled',
      e_sign: 'initiated',
      e_stamp: 'pending',
      state: 'Gujarat',
      date: '2017-09-20',
    },
    {
      status: 'progress',
      e_sign: 'signed',
      e_stamp: 'expired',
      state: 'Punjab',
      date: '2023-04-14',
    },
    {
      status: 'completed',
      e_sign: 'expired',
      e_stamp: 'initiated',
      state: 'Tamil Nadu',
      date: '2021-08-01',
    },
    {
      status: 'cancelled',
      e_sign: 'initiated',
      e_stamp: 'pending',
      state: 'Rajasthan',
      date: '2018-12-25',
    },
    {
      status: 'progress',
      e_sign: 'signed',
      e_stamp: 'expired',
      state: 'Karnataka',
      date: '2021-01-14',
    },
    {
      status: 'completed',
      e_sign: 'expired',
      e_stamp: 'initiated',
      state: 'Maharashtra',
      date: '2022-05-21',
    },
  ];
  constructor() {}

  // <<<<<<<<<<<<<<<<<------------for all relevent data------------>>>>>>>>>>>>>>>>>
  flterData(branch: string, range: string, date: string) {
    let data;
    if (branch && !range && !date) {
      data = this.orders.filter((el, i) => {
        return el.state === branch;
      });
      return {
        orderDetail: [
          this.allData(data),
          this.proGress(data),
          this.compleTed(data),
          this.cancelled(data),
        ],
        esign: [
          this.initiated(data),
          this.signed(data),
          this.expired(data),
          this.pending(data),
        ],
        estamp: [
          this.initiatedStamp(data),
          this.signedStamp(data),
          this.expiredStamp(data),
          this.pendingStamp(data),
        ],
      };
    } else if (!branch && range && !date) {
      const currentDate = new Date();
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(currentDate.getFullYear() - Number(range));
      data = this.orders.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= fiveYearsAgo;
      });

      return {
        orderDetail: [
          this.allData(data),
          this.proGress(data),
          this.compleTed(data),
          this.cancelled(data),
        ],
      };
    } else if (!branch && !range && date) {
      data = this.orders.filter((el, i) => {
        return el.date === date;
      });
      return {
        orderDetail: [
          this.allData(data),
          this.proGress(data),
          this.compleTed(data),
          this.cancelled(data),
        ],
      };
    } else if (branch && range && !date) {
      const currentDate = new Date();
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(currentDate.getFullYear() - Number(range));
      data = this.orders.filter((el, i) => {
        const itemDate = new Date(el.date);
        return el.state === branch && itemDate >= fiveYearsAgo;
      });
      return {
        orderDetail: [
          this.allData(data),
          this.proGress(data),
          this.compleTed(data),
          this.cancelled(data),
        ],
      };
    } else if (!branch && range && date) {
      const currentDate = new Date();
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(currentDate.getFullYear() - Number(range));
      data = this.orders.filter((el, i) => {
        const itemDate = new Date(el.date);
        return el.date === date && itemDate >= fiveYearsAgo;
      });
      return {
        orderDetail: [
          this.allData(data),
          this.proGress(data),
          this.compleTed(data),
          this.cancelled(data),
        ],
      };
    } else if (branch && !range && date) {
      data = this.orders.filter((el, i) => {
        return el.state === branch && el.date === date;
      });
      return {
        orderDetail: [
          this.allData(data),
          this.proGress(data),
          this.compleTed(data),
          this.cancelled(data),
        ],
      };
    } else {
      return {
        orderDetail: [
          this.allData(this.orders),
          this.proGress(this.orders),
          this.compleTed(this.orders),
          this.cancelled(this.orders),
        ],
      };
    }
  }
  allData(data?: any) {
    if (data) {
      return data.length;
    } else {
      return this.orders.length;
    }
  }
  proGress(data?: any) {
    let Data;
    if (data) {
      Data = data.filter((el: any, i: number) => {
        return el.status === 'progress';
      });
    } else {
      Data = this.orders.filter((el, i) => {
        return el.status === 'progress';
      });
    }
    return Data.length;
  }
  compleTed(data?: any) {
    let Data;
    if (data) {
      Data = data.filter((el: any, i: number) => {
        return el.status === 'completed';
      });
    } else {
      Data = this.orders.filter((el: any, i: number) => {
        return el.status === 'completed';
      });
    }
    return Data.length;
  }
  cancelled(data?: any) {
    let Data;
    if (data) {
      Data = data.filter((el: any, i: number) => {
        return el.status === 'cancelled';
      });
    } else {
      Data = this.orders.filter((el, i) => {
        return el.status === 'cancelled';
      });
    }
    return Data.length;
  }

  // <<<<<<<<<<<<<<---------E sign------------>>>>>>>>>>>>>>>
  initiated(data?: any) {
    let Data;
    if (data) {
      Data = data.filter((el: any, i: number) => {
        return el.e_sign === 'initiated';
      });
    } else {
      Data = this.orders.filter((el, i) => {
        return el.e_sign === 'initiated';
      });
    }
    return Data.length;
  }

  signed(data?: any) {
    let Data;
    if (data) {
      Data = data.filter((el: any, i: number) => {
        return el.e_sign === 'signed';
      });
    } else {
      Data = this.orders.filter((el, i) => {
        return el.e_sign === 'signed';
      });
    }
    return Data.length;
  }

  expired(data?: any) {
    let Data;
    if (data) {
      Data = data.filter((el: any, i: number) => {
        return el.e_sign === 'expired';
      });
    } else {
      Data = this.orders.filter((el, i) => {
        return el.e_sign === 'expired';
      });
    }
    return Data.length;
  }
  pending(data?: any) {
    let Data;
    if (data) {
      Data = data.filter((el: any, i: number) => {
        return el.e_sign === 'pending';
      });
    } else {
      Data = this.orders.filter((el, i) => {
        return el.e_sign === 'pending';
      });
    }
    return Data.length;
  }

  // <<<<<<<<<<<<------------for E stamp---------------->>>>>>>>>>>>>

  initiatedStamp(data?: any) {
    let Data;
    if (data) {
      Data = data.filter((el: any, i: number) => {
        return el.e_stamp === 'initiated';
      });
    } else {
      Data = this.orders.filter((el, i) => {
        return el.e_stamp === 'initiated';
      });
    }
    return Data.length;
  }

  signedStamp(data?: any) {
    let Data;
    if (data) {
      Data = data.filter((el: any, i: number) => {
        return el.e_stamp === 'signed';
      });
    } else {
      Data = this.orders.filter((el, i) => {
        return el.e_stamp === 'signed';
      });
    }
    return Data.length;
  }

  expiredStamp(data?: any) {
    let Data;
    if (data) {
      Data = data.filter((el: any, i: number) => {
        return el.e_stamp === 'expired';
      });
    } else {
      Data = this.orders.filter((el, i) => {
        return el.e_stamp === 'expired';
      });
    }
    return Data.length;
  }
  pendingStamp(data?: any) {
    let Data;
    if (data) {
      Data = data.filter((el: any, i: number) => {
        return el.e_stamp === 'pending';
      });
    } else {
      Data = this.orders.filter((el, i) => {
        return el.e_stamp === 'pending';
      });
    }
    return Data.length;
  }
}
