import { Component } from '@angular/core';
import { Button } from 'src/models/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  counter: number = 0;
  endGame: boolean = false;
  errorCount: number = 0;
  successCount: number = 0;
  isGameBoardShow: boolean = false;
  isLevelButtonsShow: boolean = true;

  grouped: Array<Button[]> = new Array<Button[]>();
  buttons: Array<Button> = new Array<Button>();
  randomButtons: Array<Button> = new Array<Button>();

  selectButtons: Array<Button> = new Array<Button>();
  removeButtons: Array<Button> = new Array<Button>();

  newGame() {
    this.counter = 0;
    this.endGame = false;
    this.errorCount = 0;
    this.successCount = 0;
    this.isGameBoardShow = false;
    this.isLevelButtonsShow = true;

    this.grouped = new Array<Button[]>();
    this.buttons = new Array<Button>();
    this.randomButtons = new Array<Button>();
    this.selectButtons = new Array<Button>();
    this.removeButtons = new Array<Button>();

  }

  async initialGame(horizontal: number, vertical: number) {
    this.isLevelButtonsShow = false;
    this.isGameBoardShow = true;
    this.initialButtons(horizontal, vertical);
    await this.randomButton(horizontal * vertical);
    this.random(horizontal);
  }

  initialButtons(horizontal: number, vertical: number) {
    var total = horizontal * vertical;

    for (let i = 1; i <= total / 2; i++) {
      var btn: Button = new Button();
      btn.title = i;

      this.buttons.push(btn);
      this.buttons.push(btn);
    }
  }

  random(horizontal) {
    this.randomButtons.forEach((button, index) => {
      if (index % horizontal === 0) {
        var buttons = new Array<Button>();
        this.grouped.push(buttons);
      }
      this.grouped[this.grouped.length - 1].push(button);
    });
  }

  randomButton(total: number) {
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
      alert("Oyun Bitti Hata Sayınız: " + this.errorCount);
      this.newGame();
    }
  }
}
