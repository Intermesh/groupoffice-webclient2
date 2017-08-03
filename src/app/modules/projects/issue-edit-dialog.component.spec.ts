import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueEditDialogComponent } from './issue-edit-dialog.component';

describe('IssueEditDialogComponent', () => {
  let component: IssueEditDialogComponent;
  let fixture: ComponentFixture<IssueEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
