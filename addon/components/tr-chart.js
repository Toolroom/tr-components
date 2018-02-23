import Ember from '@ember';
import EmberHighChartsComponent from 'ember-highcharts/components/high-charts';
import layout from '../templates/components/tr-chart';

export default EmberHighChartsComponent.extend({
    layout,
    
    contentDidChange: Ember.observer('content', 'content.@each.isLoaded', function() {
        var chart = this.get('chart');

        if (chart) {
            // when re-rendered update the chart subtitle and series name
            /*var repo = this.get('content')[0].name;
            chart.series[0].update({ name: repo, data: this.get('content')[0].data }, false);
            chart.setTitle(null, { text: repo }, false);
            */
            chart.redraw();
        }

    }).on('didInsertElement'),

    redraw: Ember.observer('chartOptions', function() {
        var chart = this.get('chart'),
            chartOptions = this.get('chartOptions');

        if (!chart) return;

        chart.setSize(chartOptions.chart.width, chartOptions.chart.height);

        chart.redraw();
    })
});
