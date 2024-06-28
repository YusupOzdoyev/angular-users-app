import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddFolderComponent } from '../add-folder/add-folder.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule, AddFolderComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent implements OnInit{
  
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly facade = inject(MaterialsFacade);
  
  public readonly status$ = this.facade.status$;
  public readonly folders$ = this.facade.allFolders$;
  public readonly openedFolder$ = this.facade.openedFolder$;

  ngOnInit(): void {
    this.facade.initFolders()
  }

  public onOpenFolder(id: number) {
    this.router.navigate(['/materials/', id]);
  }

  public onDeleteFolder(folder: Folder): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` },
    });
    dialogRef.afterClosed().subscribe(
      (result: boolean) => {
        if (result) this.facade.deleteFolder(folder.id);
      })
  }
}
