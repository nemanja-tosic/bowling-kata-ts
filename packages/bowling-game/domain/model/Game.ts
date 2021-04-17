export class Game {
  #rolls: number[] = [];
  #currentRole: number = 0;

  roll(pins: number): void {
    this.#rolls[this.#currentRole++] = pins;
  }

  score(): number {
    let score = 0;
    let roll = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (this.#isStrike(roll)) {
        score += 10 + this.#strikeBonus(roll);
        roll += 1;
      } else if (this.#isSpare(roll)) {
        score += 10 + this.#spareBonus(roll);
        roll += 2;
      } else {
        score += this.#sumBallsInFrame(roll);
        roll += 2;
      }
    }

    return score;
  }

  #isStrike = (roll: number): boolean => this.#rolls[roll] === 10;

  #isSpare = (roll: number): boolean =>
    this.#rolls[roll] + this.#rolls[roll + 1] === 10;

  #strikeBonus = (roll: number): number =>
    this.#rolls[roll + 1] + this.#rolls[roll + 2];

  #spareBonus = (roll: number): number => this.#rolls[roll + 2];

  #sumBallsInFrame = (roll: number): number =>
    this.#rolls[roll] + this.#rolls[roll + 1];
}
