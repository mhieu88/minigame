class Character {
  constructor({
    name,
    healthPoints,
    attackPower,
    dodgeChance,
    criticalHitRate,
  }) {
    this.name = name; // Tên nhân vật
    this.healthPoints = healthPoints; // Điểm sức khỏe (HP)
    this.attackPower = attackPower; // Sức mạnh tấn công
    this.dodgeChance = dodgeChance; // Tỷ lệ né tránh
    this.criticalHitRate = criticalHitRate; // Tỷ lệ đánh chí mạng
  }

  // Phương thức kiểm tra nhân vật còn sống
  isAlive() {
    return this.healthPoints > 0;
  }

  // Phương thức kiểm tra né tránh
  isDodge() {
    return Math.random() < this.dodgeChance;
  }

  // Phương thức kiểm tra chí mạng
  isCritical() {
    return Math.random() < this.criticalHitRate;
  }

  // Phương thức tấn công cơ bản
  attack(target) {
    if (target.isDodge()) {
      console.log(`${target.name} đã né được đòn tấn công của ${this.name}!`);
      return;
    }
    let damage = this.attackPower;
    if (this.isCritical()) {
      damage *= 2;
      console.log(`${this.name} đã thực hiện một đòn chí mạng!`);
    }

    target.healthPoints -= damage;

    console.log(
      `${this.name} tấn công ${target.name} gây ${damage} sát thương.`
    );
    if (target.isAlive()) {
      console.log(`${target.name} còn ${target.healthPoints} HP.`);
    }
  }
}

// Hàm xác định thứ tự tấn công ngẫu nhiên
function determineTurnOrder(char1, char2) {
  return Math.random() > 0.5 ? [char1, char2] : [char2, char1];
}

// Hàm điều khiển vòng lặp chiến đấu giữa hai nhân vật
function battle(char1, char2) {
  // Xác định thứ tự tấn công
  let [firstAttacker, secondAttacker] = determineTurnOrder(char1, char2);

  console.log(`Trận chiến bắt đầu giữa ${char1.name} và ${char2.name}!`);
  console.log(`${firstAttacker.name} sẽ tấn công trước.`);

  // Vòng lặp chiến đấu
  let round = 1;
  while (char1.isAlive() && char2.isAlive()) {
    console.log(`----------Round ${round}----------`);
    // Lượt tấn công của nhân vật đầu tiên
    firstAttacker.attack(secondAttacker);
    if (!secondAttacker.isAlive()) {
      console.log(`${secondAttacker.name} đã bị hạ gục!`);
      break;
    }

    // Lượt tấn công của nhân vật thứ hai
    secondAttacker.attack(firstAttacker);
    if (!firstAttacker.isAlive()) {
      console.log(`${firstAttacker.name} đã bị hạ gục!`);
      break;
    }
    ++round;
  }

  console.log(`Trận chiến kết thúc.`);
}

// Khởi tạo nhân vật Anh hùng
const player1 = new Character({
  name: "Ất",
  healthPoints: 100,
  attackPower: 2,
  dodgeChance: 0.3,
  criticalHitRate: 0.25,
});

// Khởi tạo nhân vật Quỷ
const player2 = new Character({
  name: "Giáp",
  healthPoints: 100,
  attackPower: 2,
  dodgeChance: 0.3,
  criticalHitRate: 0.25,
});

// Bắt đầu trận chiến
battle(player1, player2);
