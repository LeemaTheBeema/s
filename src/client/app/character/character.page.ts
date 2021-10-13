import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { SocketClusterService } from '../socket-cluster.service';
import { ServerEventName } from '../../../shared/interfaces';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage {

  constructor(
    private alertCtrl: AlertController,
    private socketService: SocketClusterService,
    public gameService: GameService
  ) { }

  changeGender($event) {
    const newGender = $event.detail.value;
    this.socketService.emit(ServerEventName.CharacterGender, { newGender });
  }

  changeTitle($event) {
    const newTitle = $event.detail.value;
    this.socketService.emit(ServerEventName.CharacterTitle, { newTitle });
  }

  async oocAction() {
    this.socketService.emit(ServerEventName.CharacterOOCAction);
  }

  async ascend() {
    const alert = await this.alertCtrl.create({
      header: 'Ascend',
      message: `Are you sure you want to ascend?
      <br>
      <br>
      You will go back to level 1 and your level cap will go up.
      <br>
      You will lose all collectibles, but retain the number of times you found them previously.
      <br>
      You will lose some level-based achievements.
      <br>
      You will lose access to pets that are not bought.
      <br>
      You and your pets will lose their equipment.
      <br>
      Your boosters and injuries will expire.
      <br>
      You will return to Norkos.
      <br>
      <br>
      You're probably going to do this anyway.`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Yes, ascend!', handler: () => {
          this.socketService.emit(ServerEventName.CharacterAscend);
        } }
      ]
    });

    alert.present();
  }

  async reviveHardcore() {
    this.socketService.emit(ServerEventName.CharacterHardcoreRevive);
  }

  async showTrail(trail = [], stat: string, total: number) {
    const baseString = trail.map(({ val, reason }) => {
      return `<tr><td>${val > 0 ? '+' + val : val}</td><td>${reason}</td></tr>`;
    }).join('');

    const resultString = `<tr><td><strong>${total > 0 ? '+' + total : total}</strong></td><td><strong>Total</strong></td>`;

    const finalString = '<table class="stat-trail-table">' + baseString + resultString + '</table>';

    const alert = await this.alertCtrl.create({
      header: `Stat Trail (${stat.toUpperCase()})`,
      message: trail.length > 0 ? finalString : 'No trail to display for this stat.',
      buttons: [
        'OK'
      ]
    });

    alert.present();
  }

  leaveParty() {
    this.socketService.emit(ServerEventName.CharacterLeaveParty);
  }

}
