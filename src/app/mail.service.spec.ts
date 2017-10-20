import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { MailService } from './mail.service';

describe('MailService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ {provide: XHRBackend, useClass: MockBackend }, MailService ]
    });
  });

  it('should be created', inject([MailService], (service: MailService) => {
    expect(service).toBeTruthy();
  }));
});
