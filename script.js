// ========================================
// 怪しいポイントを探せ！
// ========================================


// ========================================
// 問題データ
// 10問の中から5問をランダム出題
// ========================================

const allQuestions = [

  // ================================
  // 1. ニセ警察
  // ================================

  {
    message: [
      "〇〇県警の□□です。",
      "先ほど確認した件について、追加で確認したいことがあります。",
      "あなた名義の口座が事件の捜査対象になっています。",
      "確認のため、現在利用している金融機関を教えてください。",
      "詳しい手続きについては、担当の者から改めて連絡します。"
    ],

    correct: [2],

    explanation:
      "警察を名乗って不安をあおり、個人情報などを聞き出そうとする手口があります。相手の説明だけで信用せず、公式の連絡先などから確認しましょう。"
  },


  // ================================
  // 2. オレオレ詐欺
  // ================================

  {
    message: [
      "「もしもし、俺だけど」",
      "ちょっと声が変かもしれないけど、風邪をひいてるんだ。",
      "今日、会社のことで急にお金が必要になって……。",
      "母さんなら分かってくれると思う。",
      "あとで別の人が取りに行くから、用意しておいて。"
    ],

    correct: [0, 1, 2, 4],

    explanation:
      "家族を装って「声が違う理由」を説明し、急な金銭要求につなげる手口があります。元の電話番号などにかけて本人か確認しましょう。"
  },


  // ================================
  // 3. 預貯金詐欺
  // ================================

  {
    message: [
      "こちらは金融機関のサポート窓口です。",
      "お客様の口座について、本人確認が必要となりました。",
      "確認のため、口座番号をお伺いします。",
      "本人確認が完了したら、手続きについてご案内します。",
      "なお、暗証番号をこちらからお聞きすることはありません。"
    ],

    correct: [2],

    explanation:
      "「本人確認」を理由に口座情報を聞き出そうとする連絡には注意が必要です。特に、相手が本当に金融機関なのか確認することが大切です。"
  },


  // ================================
  // 4. 架空請求
  // ================================

  {
    message: [
      "ご利用料金についてのお知らせです。",
      "以前ご利用になったサービスについて、未確認の請求があります。",
      "心当たりがない場合は、そのまま放置してください。",
      "確認をご希望の場合は、下記窓口までお問い合わせください。",
      "受付時間：平日9:00～17:00"
    ],

    correct: [1],

    explanation:
      "身に覚えのない料金を「未払い」「請求」などと伝えて不安にさせるケースがあります。心当たりがない請求について、メッセージに記載された連絡先へ慌てて連絡しないようにしましょう。"
  },


  // ================================
  // 5. 還付金詐欺
  // ================================

  {
    message: [
      "市役所の担当者です。",
      "以前お送りした書類について、まだ手続きが確認できておりません。",
      "期限が近づいているため、ご案内しています。",
      "手続き方法について説明しますので、近くのATMまで移動してください。",
      "ATMに到着したら、こちらの番号へ電話してください。"
    ],

    correct: [3, 4],

    explanation:
      "還付金などを理由にATMへ誘導し、電話で操作を指示する手口があります。ATMで還付金を受け取ることはできません。"
  },


  // ================================
  // 6. 融資保証金詐欺
  // ================================

  {
    message: [
      "【ご融資の仮審査結果】",
      "お申し込み内容を確認したところ、融資可能と判断されました。",
      "正式な契約の前に、保証料として2万円のお支払いが必要です。",
      "保証料のお支払い確認後、融資手続きを開始します。",
      "審査に通過していますので、ご安心ください。"
    ],

    correct: [2],

    explanation:
      "融資を受ける前に「保証料」「手数料」などの名目でお金を要求する手口があります。「融資できる」と言われても、先払いを求められた場合は慎重に確認しましょう。"
  },


  // ================================
  // 7. 金融商品詐欺
  // ================================

  {
    message: [
      "知り合いから投資について教えてもらいました。",
      "「この商品は今後かなり伸びる可能性がある」と説明されました。",
      "もちろん損をする可能性もあるそうです。",
      "詳しい資料を確認してから考えようと思います。",
      "分からないところは家族にも相談するつもりです。"
    ],

    correct: [],

    explanation:
      "この文章には、詐欺と判断できる決定的なポイントはありません。投資にはリスクがあることを説明している点や、資料を確認・相談しようとしている点も重要です。"
  },


  // ================================
  // 8. ギャンブル詐欺
  // ================================

  {
    message: [
      "「次の試合の予想を知りたい人はこちら」",
      "過去のデータを分析した独自予想を公開しています。",
      "予想を見るための有料プランもあります。",
      "ただし、結果を保証するものではありません。",
      "利用するかどうかは自分で判断してください。"
    ],

    correct: [],

    explanation:
      "有料サービスだからといって、それだけで詐欺とは限りません。重要なのは「絶対に当たる」「必ず儲かる」など、結果を保証しているかどうかです。"
  },


  // ================================
  // 9. SNS型投資詐欺
  // ================================

  {
    message: [
      "SNSで知り合った人から投資の話を聞きました。",
      "「自分も実際に利益が出た」と画面を見せてくれました。",
      "興味があるなら、同じ投資グループを紹介すると言われました。",
      "まず少額から試して、仕組みを理解してから判断するつもりです。",
      "分からない点があるので、家族にも相談してみます。"
    ],

    correct: [1, 2],

    explanation:
      "SNS上の相手が見せる利益画面や、投資グループへの勧誘だけでは、その情報が本物とは限りません。SNSで知り合った相手から投資を勧められた場合は特に慎重に確認しましょう。"
  },


  // ================================
  // 10. SNS型ロマンス詐欺
  // ================================

  {
    message: [
      "SNSで知り合った人と、毎日メッセージをしています。",
      "仕事や趣味の話をするうちに、とても仲良くなりました。",
      "相手から「将来一緒に暮らせたらいいね」と言われました。",
      "その後、「仕事のトラブルで少しお金が必要」と相談されました。",
      "まだ直接会ったことはありません。"
    ],

    correct: [3, 4],

    explanation:
      "SNSなどで親しくなった相手から、突然お金を要求されるケースがあります。直接会ったことがない相手からの金銭要求には特に注意しましょう。"
  }

];


// ========================================
// ゲーム状態
// ========================================

let questions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;


// ========================================
// HTML要素
// ========================================

const gameScreen =
  document.getElementById("gameScreen");

const resultScreen =
  document.getElementById("resultScreen");

const messageCard =
  document.getElementById("messageCard");

const feedback =
  document.getElementById("feedback");

const progressText =
  document.getElementById("progressText");

const progressFill =
  document.getElementById("progressFill");

const finalScore =
  document.getElementById("finalScore");

const resultMessage =
  document.getElementById("resultMessage");


// ========================================
// 10問から5問をランダム選択
// ========================================

function selectRandomQuestions() {

  // 元の配列を直接変更しない
  const shuffled = [...allQuestions];


  // Fisher-Yatesシャッフル
  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      shuffled[i],
      shuffled[j]
    ] = [
      shuffled[j],
      shuffled[i]
    ];
  }


  // 先頭5問を使用
  questions =
    shuffled.slice(0, 5);
}


// ========================================
// 問題表示
// ========================================

function showQuestion() {

  const q =
    questions[currentQuestion];

  // 回答前の状態に戻す
  answered = false;

  // 解説を消す
  feedback.innerHTML = "";

  // 解説ボックスも非表示に戻す
  feedback.classList.remove("show");

  // 進捗表示
  progressText.innerText =
    `${currentQuestion + 1} / 5`;

  // プログレスバー
  const progress =
    (currentQuestion / 5) * 100;

  progressFill.style.width =
    `${progress}%`;

  // メッセージを空にする
  messageCard.innerHTML = "";

  // メッセージを1行ずつ作る
  q.message.forEach(
    (text, index) => {

      const part =
        document.createElement("div");

      part.className =
        "message-part";

      part.innerText =
        text;

      part.addEventListener(
        "click",
        () => {

          checkAnswer(
            index,
            part
          );

        }
      );

      messageCard.appendChild(part);

    }
  );
}


      messageCard.appendChild(part);

    }
  );
}


// ========================================
// 回答判定
// ========================================

function checkAnswer(
  index,
  element
) {

  // すでに回答済みなら何もしない
  if (answered) return;

  const q =
    questions[currentQuestion];

  // 回答済みにする
  answered = true;

  // 解説を表示
  feedback.style.display = "block";

  // 以下そのまま

  // ======================================
  // 正解
  // ======================================

  if (
    q.correct.includes(index)
  ) {

    // 正解 → 20点
    score += 20;


    // 正解部分を強調
    element.classList.add(
      "correct"
    );


    // 正解ポイントをすべて表示
    const parts =
      messageCard.querySelectorAll(
        ".message-part"
      );


    q.correct.forEach(
      correctIndex => {

        if (
          parts[correctIndex]
        ) {

          parts[correctIndex]
            .classList.add(
              "correct"
            );

        }

      }
    );


    feedback.innerHTML =
      `🎉 正解！<br><br>${q.explanation}`;

  }


  // ======================================
  // 不正解
  // ======================================

  else {

    // 不正解 → 0点
    element.classList.add(
      "wrong"
    );


    feedback.innerHTML =
      `❌ 不正解！<br><br>${q.explanation}`;

  }


  // ======================================
  // 次の問題ボタン
  // ======================================

  const nextButton =
    document.createElement(
      "button"
    );


  nextButton.className =
    "main-btn";


  // 最後の問題か判定
  if (
    currentQuestion ===
    questions.length - 1
  ) {

    nextButton.innerText =
      "結果を見る";

  } else {

    nextButton.innerText =
      "次の問題へ";

  }


  // ボタンを押したら次へ
  nextButton.addEventListener(
    "click",
    nextQuestion
  );


  feedback.appendChild(
    nextButton
  );
  feedback.classList.add("show");
}


// ========================================
// 次の問題
// ========================================

function nextQuestion() {

  currentQuestion++;


  if (
    currentQuestion <
    questions.length
  ) {

    showQuestion();

  } else {

    showResult();

  }
}


// ========================================
// 結果表示
// ========================================

function showResult() {

  // プログレスバーを100%にする
  progressText.innerText =
    "5 / 5";

  progressFill.style.width =
    "100%";


  // ゲーム画面を隠す
  gameScreen.style.display =
    "none";


  // 結果画面を表示
  resultScreen.classList.remove(
    "hidden"
  );


  // 100点満点で表示
  finalScore.innerText =
    `${score} / 100`;


  // ======================================
  // スコア別メッセージ
  // ======================================

  if (score === 100) {

    resultMessage.innerText =
      "🏆 パーフェクト！\n" +
      "怪しいポイントをしっかり見抜けています！";

  }

  else if (score >= 80) {

    resultMessage.innerText =
      "🎉 すごい！\n" +
      "かなりの確率で怪しいポイントを見抜けています。";

  }

  else if (score >= 60) {

    resultMessage.innerText =
      "👍 いい感じ！\n" +
      "もう少し注意すると、さらに見抜けそうです。";

  }

  else if (score >= 40) {

    resultMessage.innerText =
      "🔍 もう一歩！\n" +
      "怪しいポイントを意識して確認してみましょう。";

  }

  else {

    resultMessage.innerText =
      "💡 これから覚えていこう！\n" +
      "怪しいメッセージは、一度立ち止まって確認することが大切です。";

  }
}


// ========================================
// もう一度遊ぶ
// ========================================

function restartGame() {

  // ゲーム状態をリセット
  currentQuestion = 0;

  score = 0;

  answered = false;


  // 新しく5問をランダム選択
  selectRandomQuestions();


  // ゲーム画面を表示
  gameScreen.style.display =
    "block";


  // 結果画面を隠す
  resultScreen.classList.add(
    "hidden"
  );


  // 最初の問題を表示
  showQuestion();
}


// ========================================
// 「詐欺について学ぶ」
// ========================================

function goToLearn() {

  window.open(
    "https://www.police.pref.osaka.lg.jp/seikatsu/tokusyusagi/8083.html",
    "_blank"
  );
}


// ========================================
// ゲーム開始
// ========================================

selectRandomQuestions();

showQuestion();
