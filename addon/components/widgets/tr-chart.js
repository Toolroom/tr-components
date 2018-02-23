import Ember from 'ember';
import Widget from './tr-widget';

export default Widget.extend({
    chartOptions: null,
    content: null,
    mode: null,
    theme: {
        colors: ['#009fe3', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        chart: {
            /*backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(240, 240, 255)']
                ]
            },*/
        },
        title: {
            style: {
                color: '#000',
                font: 'lighter 130% "PT Sans Caption", Verdana, sans-serif'
            }
        },
        subtitle: {
            style: {
                color: '#919191',
                font: 'lighter 90% "PT Sans narrow", Verdana, sans-serif'
            }
        },
        legend: {
            itemStyle: {
                font: '9pt "PT Sans", Verdana, sans-serif',
                color: 'black'
            },
            itemHoverStyle:{
                color: 'gray'
            }
        }
    },

    spacingBottom: 0,
    spacingTop: 0,
    spacingLeft: 0,
    spacingRight: 0,

    internalChartOptions: Ember.computed('chartOptions', 'absWidth', 'absHeight', function() {
        var sourceOptions = this.get('chartOptions'),
            chartOptions = Ember.copy((sourceOptions || {}));

        if(!chartOptions.chart) chartOptions.chart = {};
        chartOptions.chart.width = this.get('absWidth') - this.get('absPadding');
        chartOptions.chart.height = this.get('absHeight') - this.get('absPadding');
        chartOptions.chart.spacingBottom = this.get('spacingBottom');
        chartOptions.chart.spacingTop = this.get('spacingTop');
        chartOptions.chart.spacingLeft = this.get('spacingLeft');
        chartOptions.chart.spacingRight = this.get('spacingRight');

        return chartOptions;
    }),

    _internalChartOptionsDidChange: Ember.observer('internalChartOptions', function () {
        this.notifyPropertyChange('content');
    }),

    onResize: function() {
        this.notifyPropertyChange('internalChartOptions');
        //this.notifyPropertyChange('chartOptions');
        //this.notifyPropertyChange('content');
    }
});
