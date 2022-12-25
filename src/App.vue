<template>
  <div ref="appBoxRef" class="app-box"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import jsonData from '@/assets/kr_covid19_data.json'
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'

// 处理数据
jsonData.reverse()
const parsedJsonData = ref([])
const parsedJsonDataObj = {}
jsonData.forEach((row) => {
  const month = dayjs(row['日期']).format('YYYY-MM')
  if (parsedJsonDataObj[month] === undefined) {
    parsedJsonDataObj[month] = []
  }
  row.month = month
  parsedJsonDataObj[month].push(row)
})

for (const pObjKey in parsedJsonDataObj) {
  const dataByMonth = parsedJsonDataObj[pObjKey]
  const ret = {
    日期: '',
    累计确诊: 0,
    新增病例: 0,
    累计治愈: 0,
    累计死亡: 0,
    死亡新增: 0,
    现存病例: 0,
  }
  dataByMonth.forEach(row => {
    ret['日期'] = row.month
    ret['累计确诊'] += row['累计确诊']
    ret['新增病例'] += row['新增病例']
    ret['累计治愈'] += row['累计治愈']
    ret['累计死亡'] += row['累计死亡']
    ret['死亡新增'] += row['死亡新增']
    ret['现存病例'] += row['现存病例']
  })
  parsedJsonData.value.push(ret)
}

// echarts
const option = ref({
  title: {
    text: '2020-Now Korea Covid-19 Stacked Line',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['累计确诊', '新增病例', '累计治愈', '累计死亡', '死亡新增', '现存病例'],
  },
  grid: {
    top: '10%',
    bottom: '10%',
    left: '5%',
    right: '5%',
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} 人'
    }
  },
  series: [],
})

if (jsonData) {
  const xAxisData = []
  const series = [
    {
      name: '累计确诊',
      type: 'line',
      stack: 'Total',
      data: [],
    },
    {
      name: '新增病例',
      type: 'line',
      stack: 'Total',
      data: [],
    },
    {
      name: '累计治愈',
      type: 'line',
      stack: 'Total',
      data: [],
    },
    {
      name: '累计死亡',
      type: 'line',
      stack: 'Total',
      data: [],
    },
    {
      name: '死亡新增',
      type: 'line',
      stack: 'Total',
      data: [],
    },
    {
      name: '现存病例',
      type: 'line',
      stack: 'Total',
      data: [],
    },
  ]
  parsedJsonData.value.forEach((row) => {
    xAxisData.push(row['日期'])
    series[0].data.push(row['累计确诊'])
    series[1].data.push(row['新增病例'])
    series[2].data.push(row['累计治愈'])
    series[3].data.push(row['累计死亡'])
    series[4].data.push(row['死亡新增'])
    series[5].data.push(row['现存病例'])
  })
  option.value.xAxis.data = xAxisData
  option.value.series = series
}

const appBoxRef = ref()
const chartObj = ref()

onMounted(() => {
  chartObj.value = echarts.init(appBoxRef.value, 'dark')
  chartObj.value.setOption(option.value)
})
</script>

<style scoped>
.app-box {
  height: 100%;
}
</style>
