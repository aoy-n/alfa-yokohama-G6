/**********************************************************************************************************
 * 解答入力欄のコンポーネントです。入力欄・送信ボタン・エラーメッセージを表示します。
 * <answer-input v-bind:correct="解答" v-on:answer-input="answerInput(event, stage, number, final)"></answer-input>
 * 解答：correctAnswer['stage1']['q1']
 * answerInput(event, stage, number, final)：
 *          event ：$event
 *          stage ：STAGE名 'stage1'
 *          number：問題番号（数字） 1
 *          final ：最終ステージの場合 'final'
 *********************************************************************************************************/
const app = Vue.createApp({
  data() {
    /* 初期値を設定します */
    return {
      /* 

          　　　 ＿＿
          　/ 　/ ))))
          `/　／ __⊂ﾉ
          / ／ ／　　　答え見んなyo
          　＼ ＼　 ∧_∧
          ／　＼ ＼(´Д`)
          ／　　＼　　　⌒＼
          　　　 ｜　　 ／> >
          　　　 /　　 / 6三)
          _ 　　/　/＼ ＼
          ＿ 　/　/＿ ＼ ＼
          　　(＿＿　)　>　)
          ⌒ヽ　∴ L/_／ ／
          　 人　∴ (　イ
          Ｙ⌒ヽ⌒ヽ ＼_)

      */
      correctAnswer: {
        stage1: {
          q1: 'する',
        },
        stage2: {
          q1: 'い',
        },
        stage3: {
          q1: 'おしいれ',
        },    
        stage4: {
          q1: 'しない',
        },
        stage5: {
          q1: 'ゆかした',
        },
        stage6: {
          q1: 'おんな',
        },
      },
      /*

          オマエ答え見ただろ
          　　　　　 ∧_∧
          　　　　　(´Д`)
          　　　　 ／_　/
          　　　　(ぃ９｜
          　　　　/　　/、
          　　　 /　　∧_二つ
          　　　｜　　＼
          　　　/　/~＼ ＼
          　　 /　/　　>　)
          　 ／ ノ　　/ ／
          　/ ／　　 / /
          `/ /　　　( ヽ
          (＿)　　　 ＼_)



*/
      /* それぞれの問題が正解かどうか
      *  ex. 問題2-3を追加する場合は配列にfalseを追加します。
      */
      answer: {
        stage1: [
          false,
        ],
        stage2: [
          false,
        ],
        stage3: [
          false,
        ],  
        stage4: [
          false,
        ],
        stage5: [
          false,
        ],
        stage6: [
          false,
        ],
        stage7: [
          false,
        ],
      },

      /* ステージの問題が全て正解かどうか */
      clear: {
        stage1: false,
        stage2: false,
        stage3: false,
        stage4: false,
        stage5: false,
        stage6: false,
        stage7: false,
      },

      /* 次のステージを表示するかどうか
      *  最終ステージはページを遷移するので設定不要です。
      */
      next: {
        stage1: false,
        stage2: false,
        stage3: false,
        stage4: false,
        stage5: false,
        stage6: false,
      },
    }
  },
  methods: {
    setStorage(key, value) {
      var item = localStorage.setItem(key, value);
      return localStorage;
    },
    getStorage(key) {
      var value = localStorage.getItem(key);
      return value;
    },
    deleteStorage(key) {
      localStorage.removeItem(key);
    },
    
    /* 「送信」ボタンをクリックした場合の動作です。 */
    answerInput(event, stage, number, final) {
      /* answerをtrueまたはfalseにします。 */
      this.answer[stage][number-1] = event;
      /* STAGEのすべての問題がtrueか調べてclearの値を変更します。*/
      const result = this.answer[stage].every((element) => {
        return element;
      });
      this.clear[stage] = result;
      /* 最終ステージの入力を判定します。 */
      if ( this.clear[stage] === true && final === 'final' ) {
        this.setStorage("isFinished",true)
        if(this.getStorage("stage") == 1){
          this.setStorage("stage",2)
        }
        window.opener.vm.nextFinish()
        
      }
    },
    /* クリア画面「次のステージへ」ボタンをクリックした時の動作を設定します
    *  clearをfalseにしてクリア画面を非表示にします。
    *  nextをtrueにして次のステージを表示します。
    */
    nextStage(stage) {
      this.clear[stage] = false;
      this.next[stage] = true;
      
      setTimeout(onNewPage,100)
      
    },
    getItem(type,n,al){
      this.setStorage(type,n)
      if(al){
        window.alert("アイテムを入手！情報管理ウィンドウで確認できるようになった。")
      }
    },
  }
})

/* 解答入力欄のコンポーネント */
app.component('answer-input', {
  props: ['correct'],
  data: function () {
    return {
      /* 送信ボタン上下に表示されるメッセージ */
      okMessage: '正解！',
      ngMessage: '違っているようですね…',
      message: '',
      inputAnswer: '',
    }
  },
  template: `
    <div class="answer__container">
      <div class="answer">
        <input type="text" v-model="inputAnswer" placeholder="ここに答えを入力しよう">
      </div>
      <p v-if="message === ngMessage" class="err-message">{{ message }}</p>
      <button v-on:click="judgement(inputAnswer)">送信</button>
      <p v-if="message === okMessage" class="err-message">{{ message }}</p>
    </div>`,
  methods: {
    judgement(answer) {
      if(answer === this.correct) { // 入力値が解答と一致する場合
        this.message = this.okMessage;
        this.$emit('answerInput', true);
      } else { // 一致しない場合
        this.message = this.ngMessage; 
        this.$emit('answerInput', false);
      }
    },
  }
})

const vm = app.mount('#stage')

window.addEventListener('load', function() {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('loaded').style.display = 'block';
  setEvent("image__container", "click", showImg)
  localStorage.setItem("name", setNameEvent())  
  localStorage.setItem("item", 0)  
  localStorage.setItem("person", 0) 
}, false);

function showImg(e) {
  const img = e.currentTarget.childNodes[0]
  window.open(img.src, '_blank')
}
function changeName(e) {
  const elements = document.getElementsByClassName("you");
  for (el of elements) {
    el.innerText = e.target.value
  };
  localStorage.setItem("name", e.target.value)
}

function setEvent(cl, eve, func, call) {
  const elements = document.getElementsByClassName(cl);
  for (el of elements) {
    el.addEventListener(eve, {
      handleEvent: func,
      callFunc: call
    });
  };
}

function setNameEvent(){
  const elem = document.getElementById("plName");
  elem.addEventListener("change", changeName);
  const val = elem.value;
  const elements = document.getElementsByClassName("you");
  for (el of elements) {
    el.innerText = val
  };
  return val;
}
function onNewPage(){
  setEvent("image__container", "click", showImg)
  setNameEvent()
}
function badEnd(){
  window.opener.vm.badEnd()
}
function normalEnd(){
  window.opener.vm.normalEnd()
}
