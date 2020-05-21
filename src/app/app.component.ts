import { Component } from '@angular/core';
import { Button } from 'src/models/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  horizontal: number = 4;
  vertical: number = 3;
  counter: number = 0;
  endGame: boolean = false;
  errorCount: number = 0;
  successCount: number = 0;

  grouped: Array<Button[]> = new Array<Button[]>();
  buttons: Array<Button> = new Array<Button>();
  randomButtons: Array<Button> = new Array<Button>();

  selectButtons: Array<Button> = new Array<Button>();
  removeButtons: Array<Button> = new Array<Button>();

  newGame() {
    console.log("Yeni Oyunu Başlat");
  }

  async initialGame(horizontal: number, vertical: number) {
    this.initialButtons(horizontal, vertical);
    await this.randomButton();
    this.random();
  }

  initialButtons(horizontal: number, vertical: number) {
    this.horizontal = horizontal;
    this.vertical = vertical;
    var total = horizontal * vertical;

    for (let i = 1; i <= total / 2; i++) {
      var btn: Button = new Button();
      btn.title = i;

      this.buttons.push(btn);
      this.buttons.push(btn);
    }
  }

  random() {
    this.randomButtons.forEach((button, index) => {
      if (index % this.horizontal === 0) {
        var buttons = new Array<Button>();
        this.grouped.push(buttons);
      }
      this.grouped[this.grouped.length - 1].push(button);
    });
  }

  randomButton() {
    var total = this.horizontal * this.vertical;
    console.log("Total: ", total);
    for (let i = 0; i < total; i++) {
      var result = Math.floor(Math.random() * this.buttons.length);
      var button = this.buttons[result];

      var newButton = new Button();
      newButton.title = button.title;
      newButton.indexNumber = i;

      this.randomButtons.push(newButton);
      this.buttons.splice(result, 1);
    }
  }

  selectButton(button: Button) {

    for (let i = 0; i < this.selectButtons.length; i++) {
      if (button == this.selectButtons[i]) {
        return;
      }
    }

    if (this.selectButtons.length == 2) return;

    button.isSelected = true;
    button.isTitleShow = true;
    this.selectButtons.push(button);

    if (this.selectButtons.length == 2) {
      setTimeout(() => {
        if (this.selectButtons[0].title == this.selectButtons[1].title) {
          this.successCount++;
          this.selectButtons[0].isActive = true;
          this.selectButtons[1].isActive = true;
          this.selectButtons[0].isTitleShow = false;
          this.selectButtons[1].isTitleShow = false;
          this.removeButtons.push(this.selectButtons[0]);
          this.removeButtons.push(this.selectButtons[1]);
          this.selectButtons = new Array<Button>();
          this.counter++;
          this.boardControl();
        } else {
          this.errorCount++;
          this.selectButtons[0].isSelected = false;
          this.selectButtons[1].isSelected = false;
          this.selectButtons[0].isTitleShow = false;
          this.selectButtons[1].isTitleShow = false;
          this.selectButtons = new Array<Button>();
        }
      }, 700);
    }
  }

  boardControl() {
    if (this.randomButtons.length / 2 == this.counter) {
      alert("Oyun Bitti");
      this.endGame = true;
      return;
    }
  }
}
