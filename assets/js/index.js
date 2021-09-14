const app = Vue.createApp({
  data() {
    /* 初期値を設定します */
    return {
      next: {
        stage1: true,
        stage2: false,
        stage3: false,
        stage4: false,
        stage5: false,
      },
      tab: {
        market: null,
        main: null,
        itemmenu: null,
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
    
    nextStage(stage) {
      this.next[stage] = true;
    },
    hideStage(stage) {
      this.next[stage] = false;
    },
    openTab(name) {
      if (!this.tab[name]) {
        const tab = window.open(name + ".html", '_blank');
        this.tab[name] = tab
        return tab;
      } else if (this.tab[name].closed) {
        const tab = window.open(name + ".html", '_blank');
        this.tab[name] = tab
        return tab;
      } else {
        return this.tab[name].focus()
      }
    },
    closeTab(name) {
      if (this.tab[name]) {if (!this.tab[name].closed) {this.tab[name].close();};};
    },
    nextStart() {
      console.log("start")
      this.st = this.getStorage("stage")
      if (!this.st) {this.setStorage("stage",1);this.st=1};

      console.log("stage:" + this.st)
      this.openTab("itemmenu");
      this.openTab("main" + this.st);
      this.hideStage("stage1")
      this.hideStage("stage2")
      this.nextStage("stage3")
    },
    reStart() {
      this.openTab("itemmenu");
      this.openTab("main" + this.st);
    },
    nextFinish() {
      if (this.getStorage("isFinished") == "true") {
        this.setStorage("isFinished", false)
        console.log("finish")
        this.setStorage("ordered", false)
        this.closeTab("main" + this.st);
        this.hideStage("stage1");
        this.hideStage("stage2");
        this.hideStage("stage3");
      
        this.setStorage("mailList", this.getStorage("mailList")+",friend"+this.st);
        window.removeEventListener('beforeunload', this.allClose());
        window.location.href = 'final.html';
      }
    },
    badEnd() {
        this.setStorage("ordered", false)
        this.closeTab("main" + this.st);
        this.hideStage("stage1");
        this.hideStage("stage2");
        this.hideStage("stage3");
        window.removeEventListener('beforeunload', this.allClose());
        window.location.href = 'final0.html';
    },
    am_order() {
      this.openTab("market")
    },
    am_ordered() {
      if(this.getStorage("ordered") == "true"){
        this.closeTab("market");
        this.hideStage("stage1");
        this.nextStage("stage2")
      }
    },
    focusMain() {
      this.tab["main" + this.st].focus();
    },
    allClose() {
      this.closeTab("main" + this.st);
      this.closeTab("itemmenu");
    },
  }
})


const vm = app.mount('body')
window.vm = vm

window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  event.returnValue = '';
});
window.addEventListener('unload', vm.allClose, false);

window.addEventListener('load', function () {
  if (vm.getStorage("ordered") == "true") {
    vm.hideStage("stage1");
    vm.nextStage("stage2");
  }
  document.getElementById('loading').style.display = 'none';
  document.getElementById('loaded').style.display = 'block';
}, false);
