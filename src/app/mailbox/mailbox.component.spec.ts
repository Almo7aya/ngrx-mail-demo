import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MailboxComponent } from './mailbox.component';
import { MailboxControlsComponent } from './mailbox-controls/mailbox-controls.component';

describe('MailboxComponent', () => {
  let component: MailboxComponent;
  let fixture: ComponentFixture<MailboxComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ MailboxComponent, MailboxControlsComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
