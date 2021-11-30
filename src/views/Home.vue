<template>
  <div class="home">
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="people-circle" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7
         0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
      </symbol>
      <symbol id="chevron-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5
         0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      </symbol>
      <symbol id="dollar-sign" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </symbol>
    </svg>
    <div class="bg-secondary text-white py-5 my-4 text-center">
      <h1 class="display-5 fw-bold">樂透</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          本網頁最主要功能就是提供給所有使用者一個不跟別人相同號碼的機會，因為所有人都是獨一無二的，你們所買的號碼應該也要獨一無二。
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        </div>
      </div>
    </div>
    <div class="container px-4 py-5">
      <div class="row g-4 py-5 row-cols-1 row-cols-sm-2">
        <div class="feature col">
          <div class="feature-icon bg-primary bg-gradient">
            <svg class="bi" width="1em" height="1em"><use xlink:href="#dollar-sign"/></svg>
          </div>
          <h2>大樂透</h2>
          <p>大樂透必須從01~49中任選6個號碼(不可重複)進行投注。開獎時，開獎單位將隨機開出六個號碼加一個特別號，這一組號碼就是該期大樂透的中獎號碼，
            若選擇號碼與六個號碼相同者(非特別號)即為頭獎。
          </p>
          <p>詳細玩法請參考(台灣彩券):<a href="https://www.taiwanlottery.com.tw/lotto649/index.asp">台灣彩券官網</a></p>
          <router-link to="/BigLottery">
            前往
            <svg class="bi" width="1em" height="1em"><use xlink:href="#chevron-right"/></svg>
          </router-link>
        </div>
        <div class="feature col">
          <div class="feature-icon bg-primary bg-gradient">
            <svg class="bi" width="1em" height="1em"><use xlink:href="#dollar-sign"/></svg>
          </div>
          <h2>威力彩</h2>
          <p>
            威力彩是一種樂透型遊戲，其選號分為兩區，您必須從第1個選號區中的01~38的號碼中任選6個號碼，
            並從第2個選號區中的01~08的號碼中任選1個號碼進行投注，這6+1個號碼即為您的投注號碼。
          </p>
          <p>詳細玩法請參考(台灣彩券):<a href="https://www.taiwanlottery.com.tw/superlotto638/index.asp">台灣彩券官網</a></p>
          <p class="text-secondary">即將開放</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Home extends Vue {}
</script>
<style lang='scss'>
.feature-icon{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #fff;
  border-radius: 0.75rem;
}
</style>
