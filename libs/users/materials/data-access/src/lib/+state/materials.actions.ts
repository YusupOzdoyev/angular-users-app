import { createAction, emptyProps, props } from '@ngrx/store';
import { Folder, IAddFolder, Material } from './types/materials.interface';

export const getFolders = createAction('[Folders] Get Folders', emptyProps);
export const getFoldersSuccess = createAction('[Folders] Get Folders Success', props<{ folders: Folder[] }>());
export const getFoldersFailure = createAction('[Folders] Get Folders Failure',props<{ error: string }>());

export const addFolder = createAction('[Folders Page] Add Folder', props<{ folderData: IAddFolder }>());
export const addFolderSuccess = createAction('[Folders/Api] Add Folder Success', props<{ folderData: Folder }>());
export const addFolderFailure = createAction('[Folders/Api] Add Folder Failure', props<{ error: string }>());

export const deleteFolder = createAction('[Folders Page] Delete Folder', props<{ id: number }>());
export const deleteFolderSuccess = createAction('[Folders/Api] Delete Folder Success', props<{ id: number }>());
export const deleteFolderFailed = createAction('[Folders/Api] Delete Folder Failed', props<{ error: string }>());

export const openFolder = createAction('[Materials Page] Open Folder', emptyProps);
export const openFolderSuccess = createAction('[Materials Page] Open Folder Success', props<{ folder: Folder }>());
export const openFolderFailure = createAction('[Materials Page] Open Folder Failure', props<{ error: string }>());

export const getMaterials = createAction('[Materials] Get Materials', emptyProps);
export const getMaterialsSuccess = createAction('[Materials] Get Materials Success', props<{ materials: Material[] }>());
export const getMaterialsFailure = createAction('[Materials] Get Materials Failure',props<{ error: string }>());