import Core from '../../index';

export class BenefitBus {
  private core: typeof Core;

  constructor(core: typeof Core) {
    this.core = core;
  }

}