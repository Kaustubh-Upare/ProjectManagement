import ReactEChart from 'echarts-for-react'

const GaugeChart=({perfo})=>{
  const options={
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Tasks Progress',
        type: 'gauge',
        progress: {
          show: true
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}%'
        },
        data: [
          {
            value: perfo,
            name: 'Performanace'
          }
        ]
      }
    ]
  }  
  
    
  return(
    <ReactEChart option={options}  style={{ width: "350px", height: "350px" }} />
  )
}
export default GaugeChart