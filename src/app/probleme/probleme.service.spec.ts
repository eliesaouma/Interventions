import { TestBed } from '@angular/core/testing';

import { ProblemeService } from './probleme.service';

describe('ProblemeService', () => {
  let service: ProblemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemeService);
  });

});
