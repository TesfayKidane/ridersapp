import { TestBed, inject } from '@angular/core/testing';

import { EventserviceService } from './event.service';

describe('EventserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventserviceService]
    });
  });

  it('should ...', inject([EventserviceService], (service: EventserviceService) => {
    expect(service).toBeTruthy();
  }));
});
