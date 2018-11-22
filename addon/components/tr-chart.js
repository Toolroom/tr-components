import { inject } from '@ember/service';
import { observer } from '@ember/object';
import EmberHighChartsComponent from 'ember-highcharts/components/high-charts';

export default EmberHighChartsComponent.extend({
    i18n: inject.service(),
    moment: inject.service(),
    i18nTextKeyPrefix: 'highcharts.',

    didReceiveAttrs() {
        this._super(...arguments);
        this._updateHighchartsOptions();
    },

    _updateHighchartsOptions: function() {
        let self = this;
        //Highcharts language options can only be set once when initializing
        let i18n = self.get('i18n');
        if (!i18n) return;

        let moment = self.get('moment');
        if (!moment) return;

        let textKeyPrefix = self.get('i18nTextKeyPrefix');

        //https://api.highcharts.com/highcharts/lang
        Highcharts.setOptions({
            lang : {
                months: moment.moment()._locale._months,
                weekdays: moment.moment()._locale._weekdays,
                shortMonths: moment.moment()._locale._monthsShort,
                shortWeekdays: moment.moment()._locale._weekdaysShort,

                contextButtonTitle: i18n.t(textKeyPrefix + 'contextButtonTitle'),
                decimalPoint: i18n.t(textKeyPrefix + 'decimalPoint'),
                downloadCSV: i18n.t(textKeyPrefix + 'downloadCSV'),
                downloadJPEG: i18n.t(textKeyPrefix + 'downloadJPEG'),
                downloadPDF: i18n.t(textKeyPrefix + 'downloadPDF'),
                downloadPNG: i18n.t(textKeyPrefix + 'downloadPNG'),
                downloadSVG: i18n.t(textKeyPrefix + 'downloadSVG'),
                downloadXLS: i18n.t(textKeyPrefix + 'downloadXLS'),
                drillUpText: i18n.t(textKeyPrefix + 'drillUpText'),
                invalidDate: i18n.t(textKeyPrefix + 'invalidDate'),
                loading: i18n.t(textKeyPrefix + 'loading'),
                noData: i18n.t(textKeyPrefix + 'noData'),
                numericSymbolMagnitude: i18n.t(textKeyPrefix + 'numericSymbolMagnitude'),
                numericSymbols: i18n.t(textKeyPrefix + 'numericSymbols'),
                printChart: i18n.t(textKeyPrefix + 'printChart'),
                resetZoom: i18n.t(textKeyPrefix + 'resetZoom'),
                resetZoomTitle: i18n.t(textKeyPrefix + 'resetZoomTitle'),
                thousandsSep: i18n.t(textKeyPrefix + 'thousandsSep'),
                viewData: i18n.t(textKeyPrefix + 'viewData')
            }
        });
    },

    localeDidChange: observer('i18n.locale', function() {
        this._updateHighchartsOptions();
        //some options can be set multiple times when calling redraw (e.g. decimalPoint) - so at least update the view with these items
        let chart = this.get('chart');
        if (chart) {
            chart.redraw();
        }
    }),

    contentDidChange: observer('content', 'content.@each.isLoaded', function() {
        let chart = this.get('chart');

        if (chart) {
            // when re-rendered update the chart subtitle and series name
            /*let repo = this.get('content')[0].name;
            chart.series[0].update({ name: repo, data: this.get('content')[0].data }, false);
            chart.setTitle(null, { text: repo }, false);
            */
            chart.redraw();
        }

    }).on('didInsertElement'),

    redraw: observer('chartOptions', function() {
        let chart = this.get('chart'),
            chartOptions = this.get('chartOptions');

        if (!chart) return;

        chart.setSize(chartOptions.chart.width, chartOptions.chart.height);

        chart.redraw();
    })
});
