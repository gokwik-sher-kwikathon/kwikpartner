import { chartColors } from './themeConfig';

export const chartTheme = {
  backgroundColor: 'transparent',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  textStyle: {
    color: '#666666',
  },
  title: {
    textStyle: {
      color: '#333333',
      fontSize: 16,
      fontWeight: 600,
    },
    subtextStyle: {
      color: '#999999',
      fontSize: 14,
    },
  },
  line: {
    itemStyle: {
      borderWidth: 2,
    },
    lineStyle: {
      width: 3,
    },
    symbolSize: 8,
    symbol: 'circle',
    smooth: true,
  },
  radar: {
    itemStyle: {
      borderWidth: 2,
    },
    lineStyle: {
      width: 3,
    },
    symbolSize: 8,
    symbol: 'circle',
    smooth: true,
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderRadius: 4,
    },
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderRadius: 4,
    },
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderRadius: 4,
    },
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderRadius: 4,
    },
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderRadius: 4,
    },
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderRadius: 4,
    },
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderRadius: 4,
    },
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderRadius: 4,
    },
  },
  candlestick: {
    itemStyle: {
      color: '#eb5454',
      color0: '#47b262',
      borderColor: '#eb5454',
      borderColor0: '#47b262',
      borderWidth: 1,
    },
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderRadius: 4,
    },
    lineStyle: {
      width: 1,
      color: '#aaaaaa',
    },
    symbolSize: 8,
    symbol: 'circle',
    smooth: true,
    color: [
      chartColors.primary,
      chartColors.secondary,
      chartColors.tertiary,
      chartColors.quaternary,
      chartColors.success,
      chartColors.warning,
    ],
    label: {
      color: '#ffffff',
    },
  },
  map: {
    itemStyle: {
      areaColor: '#eee',
      borderColor: '#444',
      borderWidth: 0.5,
    },
    label: {
      color: '#000',
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgba(255,215,0,0.8)',
        borderColor: '#444',
        borderWidth: 1,
      },
      label: {
        color: 'rgb(100,0,0)',
      },
    },
  },
  geo: {
    itemStyle: {
      areaColor: '#eee',
      borderColor: '#444',
      borderWidth: 0.5,
    },
    label: {
      color: '#000',
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgba(255,215,0,0.8)',
        borderColor: '#444',
        borderWidth: 1,
      },
      label: {
        color: 'rgb(100,0,0)',
      },
    },
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#eeeeee',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#eeeeee',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: '#eeeeee',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#eeeeee',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  logAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: '#eeeeee',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#eeeeee',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: '#eeeeee',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#eeeeee',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: '#999999',
    },
    emphasis: {
      iconStyle: {
        borderColor: '#666666',
      },
    },
  },
  legend: {
    textStyle: {
      color: '#999999',
    },
  },
  tooltip: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 0,
    borderRadius: 8,
    shadowBlur: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textStyle: {
      color: '#333333',
    },
    axisPointer: {
      lineStyle: {
        color: '#cccccc',
        width: 1,
      },
      crossStyle: {
        color: '#cccccc',
        width: 1,
      },
    },
  },
  timeline: {
    lineStyle: {
      color: '#626c91',
      width: 1,
    },
    itemStyle: {
      borderWidth: 1,
    },
    controlStyle: {
      color: '#626c91',
      borderColor: '#626c91',
      borderWidth: 0.5,
    },
    checkpointStyle: {
      color: '#3fb1e3',
      borderColor: '#3fb1e3',
    },
    label: {
      color: '#626c91',
    },
    emphasis: {
      itemStyle: {
        color: '#626c91',
      },
      controlStyle: {
        color: '#626c91',
        borderColor: '#626c91',
        borderWidth: 0.5,
      },
      label: {
        color: '#626c91',
      },
    },
  },
  visualMap: {
    color: ['#2a99c9', '#afe8ff'],
  },
  dataZoom: {
    backgroundColor: 'rgba(255,255,255,0)',
    dataBackgroundColor: 'rgba(222,222,222,1)',
    fillerColor: 'rgba(114,230,212,0.25)',
    handleColor: '#cccccc',
    handleSize: '100%',
    textStyle: {
      color: '#999999',
    },
  },
  markPoint: {
    label: {
      color: '#ffffff',
    },
    emphasis: {
      label: {
        color: '#ffffff',
      },
    },
  },
};
