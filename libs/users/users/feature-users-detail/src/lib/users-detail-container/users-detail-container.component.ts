import {
  inject,
  Component,
  DestroyRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  UsersErrors,
  UsersFacade,
  onSuccessEditionCbType,
} from '@users/users/data-access';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { CommonModule } from '@angular/common';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { selectQueryParam, CreateUserDTO, UsersEntity } from '@users/core/data-access';
import { DetailUsersCardComponent } from '../users-detail-card/detail-users-card.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'users-detail',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    MatDialogModule,
    DetailUsersCardComponent,
  ],
  templateUrl: './users-detail-container.component.html',
  styleUrls: ['./users-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDetailComponent {
  public user!: UsersEntity;
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly usersFacade = inject(UsersFacade);

  public readonly user$: Observable<UsersEntity | null> = this.usersFacade.openedUser$.pipe(
    tap((user) => {
      if (!user) {
        this.usersFacade.loadUser();
      } else {
        this.user = user;
      }
    })
  );
  public readonly status$ = this.usersFacade.status$;
  public readonly editMode$: Observable<boolean> = this.store.pipe(
    select(selectQueryParam('edit')),
    map((params) => params === 'true')
  );
  public readonly errors$: Observable<UsersErrors | null> = this.usersFacade.errors$;

  public onEditUser(userData: CreateUserDTO, onSuccessCb: onSuccessEditionCbType) {
    this.usersFacade.editUser(userData, this.user.id, onSuccessCb);
    this.router.navigate(['/admin/users', this.user.id], {
      queryParams: { edit: false },
    });
  }

  onCloseUser() {
    this.router.navigate(['/admin/users']);
  }

  onAddStoryPoints(userData: CreateUserDTO, onSuccessAddSP: onSuccessEditionCbType) {
    this.usersFacade.addStoryPoints(userData, this.user.id, onSuccessAddSP);
  }

  onCloseEditMode() {
    this.router.navigate(['/admin/users', this.user.id], {
      queryParams: { edit: false },
    });
  }

  onOpenEditMode() {
    this.router.navigate(['admin/users', this.user.id], {
      queryParams: { edit: true },
    });
  }

  onDeleteUser() {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: {
        dialogText: `Вы уверены, что хотите удалить ${this.user.name}`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.usersFacade.deleteUser(this.user.id);
          this.router.navigate(['/home']);
        }
      });
  }
}
