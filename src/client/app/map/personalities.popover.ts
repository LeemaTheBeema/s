import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ServerEventName } from '../../../shared/interfaces';
import { SocketClusterService } from '../socket-cluster.service';
import { GameService } from '../game.service';

@Component({
  template: `
    <ion-list>
      <ion-list-header>Personalities</ion-list-header>
      <ion-item button *ngFor="let pers of validPersonalities" (click)="toggle(pers)">
        <ion-checkbox slot="start" [checked]="gameService.playerRef.$personalitiesData.activePersonalities[pers]"></ion-checkbox>

        <ion-label>
          {{ pers }}
        </ion-label>
      </ion-item>
    </ion-list>
  `,
})
export class PersonalitiesPopover {

  public validPersonalities = ['Camping', 'Delver', 'Drunk', 'ScaredOfTheDark', 'Solo'];

  constructor(
    private popoverCtrl: PopoverController,
    public gameService: GameService,
    private socketService: SocketClusterService
  ) {}

  toggle(personalityName: string) {
    this.socketService.emit(ServerEventName.TogglePersonality, { personalityName });
    this.dismiss();
  }

  dismiss() {
    this.popoverCtrl.dismiss();
  }
}
