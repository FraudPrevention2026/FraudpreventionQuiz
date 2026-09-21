// ===== ゲーム設定 =====

const totalQuestions = 5;

let currentQuestion = 0;
let score = 0;
let answered = false;


// ===== HTML要素 =====

const gameScreen =
  document.getElementById("gameScreen");

const resultScreen =
  document.getElementById("resultScreen");

const progressText =
  document.getElementById("progressText");

const progressFill =
  document.getElementById("progressFill");

const messageCard =
  document.getElementById("messageCard");

const feedback =
  document.getElementById("feedback");

const finalScore =
  document.getElementById("finalScore");

const resultMessage =
  document.getElementById("resultMessage");


// ===== 問題データ =====

const questions = [
  {
    message: `
      <div class="message-header">
        <div class="message-icon">📱</div>
        <div class="message-name">SMS</div>
      </div>

      <p>
        【重要】お客様のアカウントに異常なログインが確認されました。
        下記URLから本人確認を行ってください。
      </p>

      <p class="message-part suspicious"
         onclick="checkPoint(this)">
        https://example-security-login.com
      </p>
    `,
    answer:
      "公式サイトではない不自然なURLへ誘導している点が怪しいポイントです。"
  },

  {
    message: `
      <div class="message-header">
        <div class="message-icon">📦</div>
        <div class="message-name">宅配業者</div>
      </div>

      <p>
        お荷物をお届けしましたが、ご不在のため持ち帰りました。
      </p>

      <p class="message-part suspicious"
         onclick="checkPoint(this)">
        本日中に再配達の手続きをしてください。
      </p>
    `,
    answer:
      "急いで手続きをさせようとしている点が怪しいポイントです。"
  },

  {
    message: `
      <div class="message-header">
        <div class="message-icon">💰</div>
        <div class="message-name">投資情報</div>
      </div>

      <p>
        今だけ特別公開！
      </p>

      <p class="message-part suspicious"
         onclick="checkPoint(this)">
        必ず利益が出る投資方法を無料で教えます。
      </p>
    `,
    answer:
      "「必ず利益が出る」と断定している点が怪しいポイントです。"
  },

  {
    message: `
      <div class="message-header">
        <div class="message-icon">🏦</div>
        <div class="message-name">銀行</div>
      </div>

      <p>
        セキュリティ確認のため、
      </p>

      <p class="message-part suspicious"
         onclick="checkPoint(this)">
        暗証番号を入力してください。
      </p>
    `,
    answer:
      "銀行が暗証番号などの重要な情報をメッセージで要求するのは不自然です。"
  },

  {
    message: `
      <div class="message-header">
        <div class="message-icon">🎁</div>
        <div class="message-name">キャンペーン</div>
      </div>

      <p>
        おめでとうございます！
      </p>

      <p class="message-part suspicious"
         onclick="checkPoint(this)">
        あなたは100万円の当選者に選ばれました！
      </p>
    `,
    answer:
      "突然高額な当選を知らせてくる「うまい話」は注意が必要です。"
  }
];


// ===== ゲーム開始 =====

function startGame() {

  currentQuestion = 0;
  score = 0;
  answered = false;

  // クイズ画面を表示
  gameScreen.classList.remove("hidden");

  // 結果画面を非表示
  resultScreen.classList.add("hidden");

  showQuestion();
}


// ===== 問題表示 =====

function showQuestion() {

  answered = false;

  const question =
    questions[currentQuestion];

  progressText.textContent =
    `${currentQuestion + 1} / ${totalQuestions}`;

  progressFill.style.width =
    `${((currentQuestion + 1) / totalQuestions) * 100}%`;

  messageCard.innerHTML =
    question.message;

  feedback.innerHTML = "";

  feedback.classList.remove("show");
}


// ===== 怪しいポイントをタップ =====

function checkPoint(element) {

  if (answered) {
    return;
  }

  answered = true;

  score += 20;

  element.style.background =
    "#dcfce7";

  element.style.borderBottom =
    "3px solid #22c55e";

  feedback.innerHTML = `
    <strong>⭕ 怪しいポイントです！</strong>
    <br><br>
    ${questions[currentQuestion].answer}
  `;

  feedback.classList.add("show");

  // 次の問題へ
  setTimeout(() => {

    currentQuestion++;

    if (currentQuestion >= totalQuestions) {

      showResult();

    } else {

      showQuestion();

    }

  }, 1800);
}


// ===== 結果表示 =====

function showResult() {

  // ★ クイズ画面を完全に隠す
  gameScreen.classList.add("hidden");

  // ★ 結果画面を表示
  resultScreen.classList.remove("hidden");

  finalScore.textContent =
    `${score}点`;

  if (score >= 80) {

    resultMessage.innerHTML =
      "怪しいポイントをしっかり見つけられました！<br>この調子で、メッセージを受け取ったときは一度立ち止まって確認しましょう。";

  } else if (score >= 60) {

    resultMessage.innerHTML =
      "かなり見つけられています！<br>急かす言葉や不自然なリンクなどにも注目してみましょう。";

  } else {

    resultMessage.innerHTML =
      "怪しいポイントを見つけるには、メッセージを落ち着いて確認することが大切です。<br>もう一度挑戦してみましょう！";

  }
}


// ===== ゲーム再スタート =====

function restartGame() {

  currentQuestion = 0;

  score = 0;

  answered = false;

  // 結果画面を隠す
  resultScreen.classList.add("hidden");

  // クイズ画面を表示
  gameScreen.classList.remove("hidden");

  showQuestion();
}


// ===== 警察サイトへ =====

function goToLearn() {

  window.open(
    "https://www.police.pref.osaka.lg.jp/",
    "_blank"
  );
}


// ===== 初回起動 =====

startGame();
