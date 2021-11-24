<template>
  <div>
    <div class="container">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
          data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
          aria-selected="true">隨機產生</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
          data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
          aria-selected="false">自行輸入</button>
        </li>
      </ul>
    </div>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-home" role="tabpanel"
       aria-labelledby="pills-home-tab">
        <div class="container my-5">
          <div class="row" >
            <div class="col" v-for="(t,index) in newLotteryNumber" :key="index">
              <div class="h2 border border-success border-3 rounded-3">{{t}}</div>
            </div>
          </div>
        </div>
        <button type="button" :class="{'disabled':generateDisabled}"
        class="d-inline mx-auto btn btn-outline-info" @click="generateLottery">
          產出未出現過的號碼
        </button>
        <div class="h4 mx-2 d-inline">{{(disabledTime!==0)?disabledTime:null}}</div>
      </div>
      <div class="tab-pane fade" id="pills-profile" role="tabpanel"
       aria-labelledby="pills-profile-tab">
        <div class="container my-5">
          <form class="was-validated">
            <div class="row row-cols-3">
              <div class="col col-sm p-0" v-for="(t,index) in insertLotteryNumber" :key="index">
                <input type="number" class="form-control" :placeholder="'No.'+(index+1)"
                aria-label="Username" aria-describedby="basic-addon1" required
                min="1" max="49" v-model="insertLotteryNumber[index]">
              </div>
            </div>
            <div class="invalid-feedback d-block" v-if="hasRepeatNumber">
              號碼必須為1~49並不能有重複號碼
            </div>
          </form>
        </div>
        <button type="button" :class="{'disabled':hasRepeatNumber||
        insertLotteryNumber.indexOf(null)!==-1||insertLotteryNumber.indexOf('')!==-1}"
        class="d-inline btn btn-outline-info" @click="insertLottery">
          輸入號碼
        </button>
      </div>
    </div>
    <div class="container">
      <div id="chart-bigLottery"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  computed,
  defineComponent, onMounted, reactive, ref, watch,
} from 'vue';
import * as d3 from 'd3';
import axios from 'axios';

// class BarChart {
//     protected x = (d:any) => d;

//     protected y = (d:any, i:any) => i;

//     protected title?: string[];

//     protected marginTop = 30; // the top margin, in pixels

//     protected marginRight = 0; // the right margin, in pixels

//     protected marginBottom = 10; // the bottom margin, in pixels

//     protected marginLeft = 30;

//     protected width = 640;

//     protected height?: number;

//     protected xType = d3.scaleLinear; // type of x-scale

//     protected xDomain?:number[];

//     protected xRange = [this.marginLeft, this.width - this.marginRight];

//     protected xFormat?:string;

//     protected xLabel?:string;

//     protected yPadding = 0.1; // amount of y-range to reserve to separate bars

//     protected yDomain?:any; // an array of (ordinal) y-values

//     protected yRange?:number[];

//     protected color = 'currentColor'; // bar fill color

//     protected titleColor = 'white';// title fill color when atop bar

//     protected titleAltColor = 'currentColor'

//     constructor(data:{letter:string;frequency:number}[]) {
//       // Compute values.
//       const X = d3.map(data, this.x);
//       const Y = d3.map(data, this.y);

//       // Compute default domains, and unique the y-domain.
//       if (this.xDomain === undefined) this.xDomain = [0, d3.max(X)];
//       if (this.yDomain === undefined) this.yDomain = Y;
//       this.yDomain = new d3.InternSet(this.yDomain);

//       // Omit any data not present in the y-domain.
//       const I = d3.range(X.length).filter((i) => this.yDomain.has(Y[i]));

//       // Compute the default height.

//       // Construct scales and axes.
//       const xScale = this.xType(this.xDomain, this.xRange);
//       const yScale = d3.scaleBand(this.yDomain, this.yRange).padding(this.yPadding);
//       const xAxis = d3.axisTop(xScale).ticks(this.width / 80, this.xFormat);
//       const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);

//       // Compute titles.
//       if (this.title === undefined) {
//         const formatValue = xScale.tickFormat(100, this.xFormat);
//         this.title = (i) => `${formatValue(X[i])}`;
//       } else {
//         const O = d3.map(data, (d) => d);
//         const T = title;
//         title = (i) => T(O[i], i, data);
//       }
//     }
// }

export const BigLottery = defineComponent({
  name: 'BigLottery',
  setup() {
    const data:{ letter: string;frequency: number }[] = reactive([]);
    const newLotteryNumber:number[] = reactive([]);
    const insertLotteryNumber:number|null[] = reactive([null, null, null, null, null, null]);
    const hasRepeatNumber = computed(() => {
      const newInsertLotteryNumber = insertLotteryNumber.filter((e) => e !== null) as
      unknown as number[];
      return ((arr) => {
        if (arr[0] <= 0 || arr[0] > 49) return true;
        for (let i = 0; i < arr.length - 1; i += 1) {
          if (arr[i + 1] <= 0 || arr[i + 1] > 49) return true;
          if (arr[i] === arr[i + 1]) return true;
        }
        return false;
      })(newInsertLotteryNumber.sort((a:number, b:number) => a - b));
    });
    const dataChange = (res:any) => {
      data.length = 0;
      const resValues = Object.values(res) as number[];
      const sum = resValues.reduce(
        (previousValue:number, currentValue:number) => previousValue + currentValue,
      );
      // Object.keys()
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(res)) {
        data.push({ letter: key, frequency: value as number / sum });
      }
    };
    const insertLottery = () => {
      const newInsertLotteryNumber = [...insertLotteryNumber] as unknown as number[];
      axios({
        method: 'POST',
        url: 'biglottery',
        data: {
          number: newInsertLotteryNumber.sort((a, b) => a - b),
        },
      })
        .then((res) => {
          if ('Item' in res.data.times) {
            // eslint-disable-next-line no-param-reassign
            delete res.data.times.Item.id;
            dataChange(res.data.times.Item);
          } else if ('Attributes' in res.data.times) {
            // eslint-disable-next-line no-param-reassign
            delete res.data.times.Attributes.id;
            dataChange(res.data.times.Attributes);
          }
        });
      for (let i = 0; i < 6; i += 1) {
        insertLotteryNumber.splice(i, 1, null);
      }
    };
    (() => {
      axios({
        method: 'GET',
        url: 'biglottery',
      })
        .then((res) => {
          // eslint-disable-next-line no-param-reassign
          delete res.data.Item.id;
          dataChange(res.data.Item);
          // console.log(res.data.Item);
        });
    })();
    const generateDisabled = ref<boolean>(false);
    const disabledTime = ref<number>(0);
    const changeLotteryNumber = (arr:number[]) => {
      newLotteryNumber.length = 0;
      arr.forEach((e) => {
        newLotteryNumber.push(e);
      });
      generateDisabled.value = true;
      disabledTime.value = 10;
      const generateDisable = (time:number):void => {
        if (time === 0) {
          generateDisabled.value = false;
          return;
        }
        setTimeout(() => {
          disabledTime.value -= 1;
          return generateDisable(disabledTime.value);
        }, 1000);
      };
      generateDisable(disabledTime.value);
    };
    const generateLottery = () => {
      axios({
        method: 'GET',
        url: 'biglottery/newlottery',
      })
        .then((res) => {
          const result = res.data;
          delete result.times.Attributes.id;
          dataChange(result.times.Attributes);
          changeLotteryNumber(result.number);
        });
    };
    watch(data, () => {
      d3.select('#svg-bigLottery').remove();
      const chartSetting = {
        width: document.getElementById('chart-bigLottery')?.clientWidth,
        x: (d:any) => d.frequency,
        y: (d:any) => d.letter,
        yDomain: d3.groupSort(data, ([d]) => -d.frequency, (d) => d.letter),
        xDomain: undefined,
        height: undefined,
        yRange: undefined,
        xType: d3.scaleLinear,
        xLabel: '已出現機率 →',
        xFormat: '%',
        title: undefined,
        color: 'steelblue',
      };
      const marginTop = 30;
      const marginRight = 0;
      const marginBottom = 10;
      const marginLeft = 30;
      const yPadding = 0.1;
      // Compute values.
      const X = d3.map(data, chartSetting.x);
      const Y = d3.map(data, chartSetting.y);
      // Compute default domains, and unique the y-domain.
      const xDomain:number[] = [0, d3.max(X)];
      let yDomain:any = (chartSetting.yDomain === undefined) ? Y : chartSetting.yDomain;
      yDomain = new d3.InternSet(yDomain);

      // Omit any data not present in the y-domain.
      const I = d3.range(X.length).filter((i) => yDomain.has(Y[i]));

      // Compute the default height.
      const height:any = (chartSetting.height === undefined)
        ? Math.ceil((yDomain.size + yPadding) * 50) + marginTop + marginBottom
        : chartSetting.height;
      const yRange:any = (chartSetting.yRange === undefined)
        ? [marginTop, height - marginBottom] : chartSetting.yRange;

      // Construct scales and axes.
      const xRange = [marginLeft, chartSetting.width as number - marginRight];
      const xScale = chartSetting.xType(xDomain, xRange);
      const yScale:any = d3.scaleBand(yDomain, yRange).padding(yPadding);
      const xAxis = d3.axisTop(xScale).ticks(chartSetting.width as number / 80,
        chartSetting.xFormat);
      const yAxis = d3.axisLeft(yScale).tickSizeOuter(0);
      const titleColor = 'white'; // title fill color when atop bar
      const titleAltColor = 'currentColor';

      // Compute titles.
      let title;
      if (chartSetting.title === undefined) {
        const formatValue = xScale.tickFormat(100, chartSetting.xFormat);
        title = (i:any) => `${formatValue(X[i])}`;
      } else {
        const O = d3.map(data, (d) => d);
        const T:any = chartSetting.title;
        title = (i:any) => T(O[i], i, data);
      }
      const svg = d3.select('#chart-bigLottery')
        .append('svg')
        .attr('id', 'svg-bigLottery')
        .attr('width', chartSetting.width as number)
        .attr('height', height)
        .attr('viewBox', String([0, 0, chartSetting.width, height]))
        .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

      svg.append('g')
        .attr('transform', `translate(0,${marginTop})`)
        .call(xAxis)
        .call((g) => g.select('.domain').remove())
        .call((g) => g.selectAll('.tick line').clone()
          .attr('y2', height - marginTop - marginBottom)
          .attr('stroke-opacity', 0.1))
        .call((g) => g.append('text')
          .attr('x', chartSetting.width as number - marginRight)
          .attr('y', -22)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'end')
          .text(chartSetting.xLabel));

      svg.append('g')
        .attr('fill', chartSetting.color)
        .selectAll('rect')
        .data(I)
        .join('rect')
        .attr('x', xScale(0))
        .attr('y', (i) => yScale(Y[i]))
        .attr('width', (i) => xScale(X[i]) - xScale(0))
        .attr('height', yScale.bandwidth());

      svg.append('g')
        .attr('fill', titleColor)
        .attr('text-anchor', 'end')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 16)
        .selectAll('text')
        .data(I)
        .join('text')
        .attr('x', (i) => xScale(X[i]))
        .attr('y', (i) => yScale(Y[i]) + yScale.bandwidth() / 2)
        .attr('dy', '0.35em')
        .attr('dx', -4)
        .text(title)
        .call((text) => text.filter((i) => xScale(X[i]) - xScale(0) < 20) // short bars
          .attr('dx', +4)
          .attr('fill', titleAltColor)
          .attr('text-anchor', 'start'));

      svg.append('g')
        .attr('transform', `translate(${marginLeft},0)`)
        .call(yAxis);
    });
    return {
      generateLottery,
      newLotteryNumber,
      generateDisabled,
      disabledTime,
      insertLotteryNumber,
      hasRepeatNumber,
      insertLottery,
    };
  },
});
export default BigLottery;
</script>

<style lang='scss'>
</style>
