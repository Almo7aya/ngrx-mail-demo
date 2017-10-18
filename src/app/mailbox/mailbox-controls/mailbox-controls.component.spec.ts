import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailboxControlsComponent } from './mailbox-controls.component';

describe('MailboxControlsComponent', () => {
  let component: MailboxControlsComponent;
  let fixture: ComponentFixture<MailboxControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailboxControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
