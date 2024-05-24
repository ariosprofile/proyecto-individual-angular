import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLibraryUserListComponent } from './admin-library-user-list.component';

describe('AdminLibraryUserListComponent', () => {
  let component: AdminLibraryUserListComponent;
  let fixture: ComponentFixture<AdminLibraryUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLibraryUserListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLibraryUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
