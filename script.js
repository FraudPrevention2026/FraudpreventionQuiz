// ===== ゲーム設定 =====

const totalQuestions = 5;

let currentQuestion = 0;
let score = 0;
let answered = false;

// 今回出題する5問
let selectedQuestions = [];


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
// 10問の中から5問をランダム出題

const questions = [

  // ===== 1 =====
  {
    message: `
      <div class="message-header">
        <div class="message-icon">📱</div>
        <div class="message-name">SMS</div>
      </div>

      <p>
        【重要】お客様のアカウントに異常なログインが確認されました。
        本人確認が必要です。
      </p>

      <p class="message-part suspicious"
         onclick="checkPoint(this)">
        https://example-security-login.com
      </p>
    `,
    answer:
      "公式サイトではない不自然なURLへ誘導している点が怪しいポイントです。"
  },


  // ===== 2 =====
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
      "「本日中」と急がせている点が怪しいポイントです。焦らず、公式アプリや公式サイトから確認しましょう。"
  },


  // ===== 3 =====
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
      "「必ず利益が出る」と断定している点が怪しいポイントです。投資に絶対に利益が出るという保証はありません。"
  },


  // ===== 4 =====
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
      "暗証番号などの重要な情報をメッセージから入力させようとしている点が怪しいポイントです。"
  },


  // ===== 5 =====
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
      "突然、高額な当選を知らせてくる「うまい話」は注意が必要です。応募していない懸賞などには特に注意しましょう。"
  },


  // ===== 6 =====
  {
    message: `
      <div class="message-header">
        <div class="message-icon">👮</div>
        <div class="message-name">警察</div>
      </div>

      <p>
        あなたの口座が犯罪に利用されていることが判明しました。
      </p>

      <p class="message-part suspicious"
         onclick="checkPoint(this)">
        すぐに指定された口座へお金を移してください。
      </p>
    `,
    answer:
      "警察を名乗ってお金を移動させようとしている点が怪しいポイントです。公的機関を名乗る連絡でも、すぐにお金を送らず確認しましょう。"
  },


  // ===== 7 =====
  {
    message: `
      <div class="message-header">
        <div class="message-icon">💳</div>
        <div class="message-name">カード会社</div>
      </div>

      <p>
        お客様のカードに不正利用の可能性があります。
      </p>

      <p class="message-part suspicious"
         onclick="checkPoint(this)">
        確認のため、カード番号と暗証番号を返信してください。
      </p>
    `,
    answer:
      "カード番号や暗証番号などの重要な情報を返信で要求している点が怪しいポイントです。"
  },


  // ===== 8 =====
  {
    message: `
      <div class="message-header">
        <div class="message-icon">📈</div>
        <div class="message-name">副業案内</div>
      </div>

      <p>
        スマホだけで簡単に稼げます！
      </p>

      <p class="message-part suspicious"
         onclick="checkPoint(this)">
        初心者でも1日で5万円稼げます。
      </p>
    `,
    answer:
      "簡単に大きな金額を稼げると強調している点が怪しいポイントです。うまい話ほど、条件や仕組みを確認することが大切です。"
  },


  // ===== 9 =====
  {
    message: `
      <div class="message-header">
        <div class="message-icon">🔐</div>
        <div class="message-name">アカウント管理</div>
      </div>

      <p>
        アカウントの利用を継続するには確認が必要です。
      </p>

      <p class="message-part suspicious"
         onclick="checkPoint(this)">
        10分以内にログインしないとアカウントを停止します。
      </p>
    `,
    answer:
      "「10分以内」など極端に短い時間を指定して、焦らせている点が怪しいポイントです。"
  },


  // ===== 10 =====
  {
    message: `
      <div class="message-header">
        <div class="message-icon">💬</div>
        <div class="message-name">知り合い？</div>
      </div>

      <p>
        久しぶり！スマホをなくして新しい番号になったよ。
      </p>

      <p class="message-part suspicious"
         onclick="checkPoint(this)">
        急ぎでお金が必要だから、今日中に振り込んでほしい。
      </p>
    `,
    answer:
      "知り合いを名乗って急にお金を要求している点が怪しいポイントです。本人に直接確認することが大切です。"
  }

];


// ===== 5問をランダムに選ぶ =====

function selectRandomQuestions() {

  const shuffled =
    [...questions].sort(() => Math.random() - 0.5);

  selectedQuestions =
    shuffled.slice(0, totalQuestions);
}


// ===== ゲーム開始 =====

function startGame() {

  currentQuestion = 0;
  score = 0;
  answered = false;

  // 5問をランダム選択
  selectRandomQuestions();

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
    selectedQuestions[currentQuestion];

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

  // 正解なので20点
  score += 20;

  element.style.background =
    "#dcfce7";

  element.style.borderBottom =
    "3px solid #22c55e";

  feedback.innerHTML = `
    <strong>⭕ 怪しいポイントです！</strong>
    <br><br>
    ${selectedQuestions[currentQuestion].answer}

    <button
      type="button"
      class="next-btn"
      onclick="nextQuestion()"
    >
      ${
        currentQuestion === totalQuestions - 1
          ? "結果を見る"
          : "次の問題へ"
      }
    </button>
  `;

  feedback.classList.add("show");
}


// ===== 次の問題 =====

function nextQuestion() {

  if (!answered) {
    return;
  }

  currentQuestion++;

  if (currentQuestion >= totalQuestions) {

    showResult();

  } else {

    showQuestion();

  }
}


// ===== 結果表示 =====

function showResult() {

  // クイズ画面を完全に隠す
  gameScreen.classList.add("hidden");

  // 結果画面を表示
  resultScreen.classList.remove("hidden");

  finalScore.textContent =
    `${score}点`;

  if (score >= 80) {

    resultMessage.innerHTML =
      "怪しいポイントをしっかり見つけられました！<br>この調子で、メッセージを受け取ったときは一度立ち止まって確認しましょう。";

  } else if (score >= 60) {

    resultMessage.innerHTML =
      "かなり見つけられています！<br>急かす言葉や不自然なリンク、個人情報の要求などにも注目してみましょう。";

  } else if (score >= 40) {

    resultMessage.innerHTML =
      "いくつか怪しいポイントを見つけられました！<br>焦らず、メッセージの内容を一つずつ確認してみましょう。";

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

  // 新しく5問をランダム選択
  selectRandomQuestions();

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
