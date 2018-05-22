import React, {Component} from 'react'
import PropTypes from 'prop-types'
import uuidv4 from 'uuid/v4'
import HighCharts from 'highcharts'
import HighChartsExporting from 'highcharts/modules/exporting'
import HighChartsExportData from 'highcharts/modules/export-data'

HighChartsExporting(HighCharts)
HighChartsExportData(HighCharts)

class ReactHighCharts extends Component {
  static propTypes = {
    id: PropTypes.any,
    type: PropTypes.string,
    title: PropTypes.string,
    xAxis: PropTypes.object,
    yAxis: PropTypes.object,
    plotOptions: PropTypes.object,
    exporting: PropTypes.object,
    legend: PropTypes.any
  }

  static defaultProps = {
    type: 'bar',
    id: uuidv4(),
    plotOptions: {}
  }

  componentDidMount() {
    this._hcInit()
  }

  render() {
    const {id, style} = this.props
    return (
      <div id={id} style={style}>initializing</div>
    )
  }

  _hcInit() {
    if(this.props.type === 'funnel') {
      require('highcharts/modules/funnel')(HighCharts)
    }
    
    this._hcInst = HighCharts.chart(this.props.id, this._hcOptions())
  }

  _hcOptions() {
    return {
      chart: {
        type: this.props.type
      },
      title: this._typeOfOr(this.props.title, {}, title => ({text: title})),
      xAxis: this.props.xAxis,
      yAxis: this.props.yAxis,
      series: this.props.series,
      plotOptions: {
        ...this.props.plotOptions
      },
      exporting: {
        enabled: !!this.props.exporting,
        ...this._typeOfOr(this.props.exporting, {}, exporting => ({}))
      },
      legend: this._typeOfOr(this.props.legend, {}, legend => ({enabled: legend}))
    }
  }

  _typeOfOr(obj, expectedType, or) {
    return typeof(obj) === typeof(expectedType)
      ? obj
      : or(obj)
  }
}

export default ReactHighCharts