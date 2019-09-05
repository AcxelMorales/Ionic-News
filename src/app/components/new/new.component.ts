import { Component, Input } from '@angular/core';
import { ActionSheetController, ToastController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { IArticle } from '../../interfaces/interfaces';
import { DataService } from '../../providers/data.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
})
export class NewComponent {

  @Input() n          : IArticle;
  @Input() inFavorites: boolean;

  constructor(
    private iab                  : InAppBrowser,
    public _dataService          : DataService,
    private socialSharing        : SocialSharing,
    public toastController       : ToastController,
    private actionSheetController: ActionSheetController,
  ) { }

  public showNew(): void {
    const browser = this.iab.create(this.n.url, '_system');
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });

    toast.present();
  }

  public async showMenu(): Promise<void> {
    let saveDeleteBtn;
    
    if (this.inFavorites) {
      saveDeleteBtn = {
        text    : 'Delete',
        icon    : 'trash',
        cssClass: 'action-light',
        handler : () => {
          this._dataService.deleteNew(this.n);
          this.presentToast('News removed from favorites');
        }
      }      
    } else {
      saveDeleteBtn = {
        text    : 'Favorite',
        icon    : 'heart',
        cssClass: 'action-light',
        handler : () => {
          this._dataService.saveNew(this.n);
          this.presentToast('News added to favorites');
        }
      }
    }

    const actionSheet = await this.actionSheetController.create({
      backdropDismiss: false,
      animated       : true,
      translucent    : true,
      buttons: [saveDeleteBtn, {
        text    : 'Share',
        icon    : 'share',
        cssClass: 'action-light',
        handler : () => {
          this.socialSharing.share(
            this.n.title,
            this.n.source.name,
            null,
            this.n.url
          );
        }
      }, {
        text    : 'Cancel',
        icon    : 'close',
        cssClass: 'action-danger',
        role    : 'cancel',
        handler : () => {}
      }]
    });

    await actionSheet.present();
  }

}
