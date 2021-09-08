const app = Vue.createApp({
  data() {
    /* 初期値を設定します */
    return {
      next: {
        stage1: false,
        stage2: false,
        stage3: false,
        stage4: false,
      },
      tab: {
        market: null,
        main: null,
        itemmenu: null,
      },
    }
  },
  methods: {
    nextStage(stage) {
      this.next[stage] = true;
    },

    openTab(name) {
      console.log(this.tab.market)
      if (!this.tab[name]) {
        this.tab[name] = window.open(name + ".html", '_blank');
        console.log(this.tab[name].closed);
      } else if (this.tab[name].closed) {
        console.log(this.tab[name].closed);
        this.tab[name] = window.open(name + ".html", '_blank');
      } else {
        console.log(this.tab[name].closed);
        this.tab[name].focus()
      }
    },
    closeTab(name) {
      if (this.tab[name]) { this.tab[name].close(); };
    },
    nextStart() {
      console.log("start")
      //this.st = this.getStorage("stage")
      //if (!this.st) {this.setStorage("stage",1);this.st=1};
      this.st = 1

      console.log("stage:" + this.st)
      this.openTab("main" + this.st);
      this.openTab("itemmenu");
      //next(4);
      this.tab["main" + this.st].focus();
      this.nextStage("stage2")
    },
    reStart() {
      this.openTab("main" + this.st);
      openTab("itemmenu");
      this.tab["main" + this.st].focus();
    },
    am_oder() {
      this.openTab("market")
    },
    am_odered() {
      this.closeTab("market");
      this.nextStage("stage1")
    },
  }
})


const vm = app.mount('body')

window.addEventListener('beforeunload', function (e) {
  e.returnValue = '';
}, false);
