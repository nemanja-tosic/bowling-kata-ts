import { Game } from "../domain/model/Game";
import { expect } from "chai";

describe(Game.name, () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  context("gutter game", () => {
    it("should have a score of 0", () => {
      rollMany(20, 0);

      expect(game.score()).to.equal(0);
    });
  });

  context("all ones", () => {
    it("should have a score of 20", () => {
      rollMany(20, 1);

      expect(game.score()).to.equal(20);
    });
  });

  context("spare", () => {
    it("should add a bonus to the first roll of the next frame", () => {
      rollSpare();
      game.roll(3);

      rollMany(17, 0);

      expect(game.score()).to.equal(16);
    });
  });

  context("strike", () => {
    it("should double the score after a strike", () => {
      rollStrike();
      game.roll(3);
      game.roll(4);

      rollMany(16, 0);

      expect(game.score()).to.equal(24);
    });
  });

  context("perfect game", () => {
    it("should have a score of 300", () => {
      rollMany(12, 10);

      expect(game.score()).to.equal(300);
    });
  });

  function rollMany(times: number, pins: number) {
    for (let i = 0; i < times; i++) {
      game.roll(pins);
    }
  }

  function rollSpare() {
    game.roll(5);
    game.roll(5);
  }

  function rollStrike() {
    game.roll(10);
  }
});
